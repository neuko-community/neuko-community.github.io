
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// --- Config ---
import config from './script-config.json';
const HELIUS_API_KEY = process.env.HELIUS_API_KEY

if (!HELIUS_API_KEY) {
    console.warn('\x1b[33mWarning: HELIUS_API_KEY not set. Using Magic Eden for badges, SOL balance will be 0.\x1b[0m')
}

const WALLET_ADDRESS = "ES5SWKCcRkW8vwzDMcTd6utwEEpEkh6VH3vtWHv3sbDy"

// Fallback or derived RPC
const RPC_URL = HELIUS_API_KEY
    ? `${config.rpcUrl}/?api-key=${HELIUS_API_KEY}`
    : "https://api.mainnet-beta.solana.com"

// Constants for Valuation (Unused but kept in config if needed later)
// const TOTAL_SUPPLY_ALL = config.supply.total

// --- Types ---
interface RpcResponse<T> {
    jsonrpc: string
    result: T
    error?: { message: string }
    id: string
}

interface Asset {
    content?: {
        metadata?: {
            name?: string
        }
    }
}

interface AssetList {
    items: Asset[]
}

interface CoinGeckoResponse {
    solana?: {
        usd: number
    }
}

interface MagicEdenListing {
    price?: number
    token?: {
        name?: string
    }
}

// --- Utils ---
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function rpcCall<T>(method: string, params: unknown): Promise<T | null> {
    const payload = {
        jsonrpc: "2.0",
        id: "1",
        method,
        params
    }

    for (let attempt = 0; attempt < 5; attempt++) {
        try {
            const res = await fetch(RPC_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (res.status === 429) {
                const waitTime = Math.pow(2, attempt) * 2000
                console.warn(`Rate limit for ${method}. Retrying in ${waitTime}ms...`)
                await delay(waitTime)
                continue
            }

            if (!res.ok) {
                throw new Error(`RPC status ${res.status}`)
            }

            const json = (await res.json()) as RpcResponse<T>
            if (json.error) {
                throw new Error(json.error.message || 'Unknown RPC error')
            }

            // Success
            await delay(200) // Politeness delay
            return json.result
        } catch (e) {
            console.error(`RPC Error (${method}): ${(e as Error).message}`)
            await delay(2000)
        }
    }
    return null
}

async function getSolBalance(wallet: string): Promise<number> {
    const res = await rpcCall<{ value: number }>("getBalance", [wallet])
    return res?.value ? res.value / 1_000_000_000 : 0
}

interface MagicEdenToken {
    name?: string
    collection?: string
}

async function getAllAssets(wallet: string): Promise<Asset[]> {
    try {
        console.log(`Fetching badges from Magic Eden for ${wallet}...`)
        // Use the user-provided endpoint for tokens
        const url = `https://api-mainnet.magiceden.dev/v2/wallets/${wallet}/tokens?collection_symbol=gboy_badges_`

        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Magic Eden API returned ${res.status}`)
        }

        const tokens = (await res.json()) as MagicEdenToken[]

        // Map to existing Asset interface to preserve downstream logic
        return tokens.map(t => ({
            content: {
                metadata: {
                    name: t.name
                }
            }
        }))
    } catch (e) {
        console.error(`Error fetching from Magic Eden: ${(e as Error).message}`)
        return []
    }
}

async function fetchLivePrices() {
    let solPrice = 0
    // Default fallback values
    const badgeValues: Record<string, number> = {
        snake: 0,
        moth: 0,
        rabbit: 0
    }

    try {
        const cgRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
        if (cgRes.ok) {
            const data = (await cgRes.json()) as CoinGeckoResponse
            solPrice = data.solana?.usd || 0
        }
    } catch {
        console.warn('Failed to fetch SOL price, continuing...')
    }

    // Magic Eden Floor Check
    try {
        const meRes = await fetch("https://api-mainnet.magiceden.dev/v2/collections/gboy_badges_/listings?limit=100")
        if (meRes.ok) {
            const listings = (await meRes.json()) as MagicEdenListing[]
            const floors: Record<string, number[]> = { snake: [], moth: [], rabbit: [] }

            for (const item of listings) {
                const price = item.price || 0
                const name = (item.token?.name || '').toLowerCase()

                if (price > 0) {
                    if (name.includes("snake")) floors.snake.push(price)
                    else if (name.includes("moth")) floors.moth.push(price)
                    else if (name.includes("rabbit")) floors.rabbit.push(price)
                }
            }

            for (const [key, prices] of Object.entries(floors)) {
                if (prices.length > 0) {
                    const minPrice = Math.min(...prices)
                    // 7% Fee markup
                    badgeValues[key] = minPrice * 1.07
                }
            }
        }
    } catch {
        console.warn('Failed to fetch Magic Eden listings, utilizing 0 or fallback')
    }

    return { solPrice, badgeValues }
}

async function main() {
    console.log(`\x1b[1mChecking Wallet:\x1b[0m \x1b[96m${WALLET_ADDRESS}\x1b[0m\n`)

    const balance = await getSolBalance(WALLET_ADDRESS)
    const assets = await getAllAssets(WALLET_ADDRESS)

    let snakeCount = 0
    let mothCount = 0
    let rabbitCount = 0

    for (const asset of assets) {
        const name = (asset.content?.metadata?.name || '').toLowerCase()
        if (name.includes("snake")) snakeCount++
        else if (name.includes("moth")) mothCount++
        else if (name.includes("rabbit")) rabbitCount++
    }

    const { solPrice, badgeValues } = await fetchLivePrices()

    const snakeVal = snakeCount * badgeValues.snake
    const mothVal = mothCount * badgeValues.moth
    const rabbitVal = rabbitCount * badgeValues.rabbit
    const totalBadgeSol = snakeVal + mothVal + rabbitVal
    const totalBadgeUsd = totalBadgeSol * solPrice

    // Output
    console.log(`\x1b[1m--- Badges Sent ---\x1b[0m`)
    console.log(`\x1b[92mSnake:  ${snakeCount}\x1b[0m`)
    console.log(`\x1b[93mMoth:   ${mothCount}\x1b[0m`)
    console.log(`\x1b[91mRabbit: ${rabbitCount}\x1b[0m`)
    console.log("")
    console.log(`\x1b[1m--- Balance ---\x1b[0m`)
    console.log(`SOL:    ${balance.toFixed(4)}`)
    console.log("")
    console.log(`Badge Value: \x1b[1m${totalBadgeSol.toFixed(2)} SOL\x1b[0m (\x1b[96m$${totalBadgeUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\x1b[0m)`)
    console.log(`Wallet Sol:  ${balance.toFixed(4)} SOL`)
    const totalSol = balance + totalBadgeSol
    console.log(`Total Est:   ${totalSol.toFixed(2)} SOL (\x1b[96m$${(totalSol * solPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\x1b[0m)`)

    // Save
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const jsonPath = path.resolve(__dirname, '../public/badge_stats.json')

    const statsData = {
        "Snake": snakeCount,
        "Moth": mothCount,
        "Rabbit": rabbitCount
    }

    fs.writeFileSync(jsonPath, JSON.stringify(statsData, null, 2))
    console.log(`\n\x1b[92mSuccessfully updated ${jsonPath}\x1b[0m`)
    console.log("\n" + "=".repeat(30) + "\n")
}

main().catch(err => console.error(err))
