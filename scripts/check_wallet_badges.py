import requests
import json
import time
import os

# Configuration
# Configuration
API_KEY = os.environ.get("HELIUS_API_KEY")
if not API_KEY:
    # Fallback/Error if not found
    print(f"{os.environ.get('RED', '')}Error: HELIUS_API_KEY environment variable not set.{os.environ.get('RESET', '')}")
    exit(1)
RPC_URL = f"https://mainnet.helius-rpc.com/?api-key={API_KEY}"
WALLET_ADDRESS = "ES5SWKCcRkW8vwzDMcTd6utwEEpEkh6VH3vtWHv3sbDy"

# ANSI Color Codes
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
RESET = "\033[0m"
BOLD = "\033[1m"
CYAN = "\033[96m"

def rpc_call(method, params):
    headers = {"Content-Type": "application/json"}
    payload = {
        "jsonrpc": "2.0",
        "id": "1",
        "method": method,
        "params": params
    }
    for attempt in range(5):
        try:
            response = requests.post(RPC_URL, headers=headers, json=payload, timeout=30)
            if response.status_code == 429:
                wait_time = (2 ** attempt) * 2
                print(f"{YELLOW}Rate limit hit for {method}. Retrying in {wait_time}s...{RESET}")
                time.sleep(wait_time)
                continue
            response.raise_for_status()
            # Add a small delay between requests to avoid hitting rate limits (even successful ones)
            time.sleep(0.2)
            return response.json().get("result")
        except Exception as e:
            print(f"{RED}RPC Error ({method}): {e}{RESET}")
            time.sleep(2)
    return None

def get_sol_balance(wallet):
    # Retrieve balance in Lamports and convert to SOL
    result = rpc_call("getBalance", [wallet])
    if result is not None:
        return result.get("value", 0) / 1_000_000_000
    return 0.0

def get_all_assets(wallet):
    all_items = []
    page = 1
    while True:
        params = {
            "ownerAddress": wallet,
            "page": page,
            "limit": 1000
        }
        result = rpc_call("getAssetsByOwner", params)
        
        if not result:
            break
            
        items = result.get("items", [])
        if not items:
            break
            
        all_items.extend(items)
        if len(items) < 1000:
            break
        page += 1
        
    return all_items


# Function to load config
def load_config():
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        config_path = os.path.join(script_dir, "config.json")
        with open(config_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"{YELLOW}Warning: config.json not found. Using defaults.{RESET}")
        return {}

def fetch_live_prices(config):
    sol_price = config.get("sol_price_usd", 0)
    # Default values from config
    badge_values = config.get("badge_values_sol", {}).copy()
    
    # 1. Fetch Live SOL Price (CoinGecko)
    try:
        cg_url = "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        cg_resp = requests.get(cg_url, timeout=5)
        if cg_resp.status_code == 200:
            sol_price = cg_resp.json().get("solana", {}).get("usd", sol_price)
    except Exception as e:
        print(f"{YELLOW}Warning: Could not fetch live SOL price ({e}). Using config value.{RESET}")

    # 2. Fetch Magic Eden Listings for Trait Floors
    # We fetch valid listings to find the lowest price for each badge type
    try:
        # Fetch up to 100 listings to have a good chance of seeing all types
        me_url = "https://api-mainnet.magiceden.dev/v2/collections/gboy_badges_/listings?limit=100"
        me_resp = requests.get(me_url, timeout=10)
        
        if me_resp.status_code == 200:
            listings = me_resp.json()
            
            # Temporary storage for found prices
            found_floors = {
                "snake": [],
                "moth": [],
                "rabbit": []
            }
            
            for item in listings:
                price = item.get("price", 0)
                # Parse metadata from 'token' object or 'extra' (structure varies, but 'token' usually has attributes or name)
                token_data = item.get("token", {})
                name = token_data.get("name", "").lower()
                
                # Check Name first (e.g. "Snake Badge #...")
                badge_type = None
                if "snake" in name:
                    badge_type = "snake"
                elif "moth" in name:
                    badge_type = "moth"
                elif "rabbit" in name:
                    badge_type = "rabbit"
                
                # If name logic works, add price
                if badge_type and price > 0:
                    found_floors[badge_type].append(price)

            # Update badge_values with found minimums
            for b_type, prices in found_floors.items():
                if prices:
                    min_price = min(prices)
                    # Apply 7% Fee Markup (5% Royalties + 2% Market Fees) matches Magic Eden UI
                    price_with_fees = min_price * 1.07
                    badge_values[b_type] = price_with_fees

    except Exception as e:
        print(f"{YELLOW}Warning: Could not fetch Magic Eden listings ({e}). Using config values.{RESET}")
        pass
        
    return sol_price, badge_values

def main():
    config = load_config()
    config = load_config()
    # proceeding with empty config if not found

    print(f"{BOLD}Checking Wallet:{RESET} {CYAN}{WALLET_ADDRESS}{RESET}\n")

    # 1. Get SOL Balance
    balance = get_sol_balance(WALLET_ADDRESS)
    
    # 2. Get Assets and Count Badges
    assets = get_all_assets(WALLET_ADDRESS)
    
    snake_count = 0
    moth_count = 0
    rabbit_count = 0
    
    if assets:
        for asset in assets:
            name = asset.get("content", {}).get("metadata", {}).get("name", "")
            lower_name = name.lower()
            
            if "snake" in lower_name:
                snake_count += 1
            elif "moth" in lower_name:
                moth_count += 1
            elif "rabbit" in lower_name:
                rabbit_count += 1

    # 3. Calculate Values
    sol_price, badge_values = fetch_live_prices(config)
    
    snake_val = snake_count * badge_values.get("snake", 0)
    moth_val = moth_count * badge_values.get("moth", 0)
    rabbit_val = rabbit_count * badge_values.get("rabbit", 0)
    
    total_badge_sol = snake_val + moth_val + rabbit_val
    total_badge_usd = total_badge_sol * sol_price
    
    # --- OUTPUT ---
    
    # 1. BASIC VIEW (Matches Screenshot)
    print(f"{BOLD}--- Badges Sent ---{RESET}")
    print(f"{GREEN}Snake:  {snake_count}{RESET}")
    print(f"{YELLOW}Moth:   {moth_count}{RESET}")
    print(f"{RED}Rabbit: {rabbit_count}{RESET}")
    print("")
    print(f"{BOLD}--- Balance ---{RESET}")
    print(f"SOL:    {balance:.4f}")
    print("")
    print(f"Badge Value: {BOLD}{total_badge_sol:.2f} SOL{RESET} ({CYAN}${total_badge_usd:,.2f}{RESET})")
    print(f"Wallet Sol:  {balance:.4f} SOL")
    print(f"Total Est:   {balance + total_badge_sol:.2f} SOL ({CYAN}${(balance + total_badge_sol) * sol_price:,.2f}{RESET})")
    
    # Removed duplicate Total Est print
    
    # 4. WRITE TO JSON FILE
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        # Path to site/public/badge_stats.json (script is in site/scripts)
        json_path = os.path.join(script_dir, "../public/badge_stats.json")
        
        stats_data = {
            "Snake": snake_count,
            "Moth": moth_count,
            "Rabbit": rabbit_count
        }
        
        with open(json_path, "w") as f:
            json.dump(stats_data, f, indent=2)
        print(f"\n{GREEN}Successfully updated {json_path}{RESET}")
        
    except Exception as e:
        print(f"{RED}Error writing config: {e}{RESET}")

    print("\n" + "="*30 + "\n")

    # 2. EXTENDED VIEW (Valuation)
    # Total Supply for each badge type
    SUPPLY_SNAKE = 834
    SUPPLY_MOTH = 462
    SUPPLY_RABBIT = 200
    TOTAL_SUPPLY_ALL = 1496

    snake_pct = (snake_count / SUPPLY_SNAKE * 100)
    moth_pct = (moth_count / SUPPLY_MOTH * 100)
    rabbit_pct = (rabbit_count / SUPPLY_RABBIT * 100)
    
    total_badges = snake_count + moth_count + rabbit_count
    total_supply_pct = (total_badges / TOTAL_SUPPLY_ALL * 100)

    print(f"{BOLD}--- Extended Valuation (Incl. ~7% Fees) ---{RESET}")
    print(f"{GREEN}Snake:  {snake_count} {RESET}(@{badge_values.get('snake'):.2f}/ea) - {snake_pct:.1f}%")
    print(f"{YELLOW}Moth:   {moth_count} {RESET}(@{badge_values.get('moth'):.2f}/ea) - {moth_pct:.1f}%")
    print(f"{RED}Rabbit: {rabbit_count} {RESET}(@{badge_values.get('rabbit'):.2f}/ea) - {rabbit_pct:.1f}%")
    print("")
    print(f"Badge Value: {BOLD}{total_badge_sol:.2f} SOL{RESET} ({CYAN}${total_badge_usd:,.2f}{RESET})")
    print(f"Wallet Sol:  {balance:.4f} SOL")
    print(f"Total Est:   {balance + total_badge_sol:.2f} SOL ({CYAN}${(balance + total_badge_sol) * sol_price:,.2f}{RESET})")
    print(f"Total Supply Owned: {BOLD}{total_supply_pct:.2f}%{RESET} ({total_badges}/{TOTAL_SUPPLY_ALL})")
    print(f"{YELLOW}(SOL Price: ${sol_price:.2f}){RESET}")

if __name__ == "__main__":
    main()
