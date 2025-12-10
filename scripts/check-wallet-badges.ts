
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// --- Config ---
const HELIUS_API_KEY = process.env.HELIUS_API_KEY
if (!HELIUS_API_KEY) {
    console.error('\x1b[31mError: HELIUS_API_KEY environment variable not set.\x1b[0m')
    process.exit(1)
}

const RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`
const WALLET_ADDRESS = "ES5SWKCcRkW8vwzDMcTd6utwEEpEkh6VH3vtWHv3sbDy"

// Constants for Valuation
const SUPPLY_SNAKE = 834
const SUPPLY_MOTH = 462
const SUPPLY_RABBIT = 200
const TOTAL_SUPPLY_ALL = 1496

// --- Utils ---
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function rpcCall(method: string, params: any) {
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

            const json = await res.json()
            if (json.error) {
                throw new Error(json.error.message || 'Unknown RPC error')
            }

            // Success
            await delay(200) // Politeness delay
            return json.result
        } catch (e: any) {
            console.error(`RPC Error (${method}): ${e.message}`)
            await delay(2000)
        }
    }
    return null
}

async function getSolBalance(wallet: string): Promise<number> {
    const res = await rpcCall("getBalance", [wallet])
    return res?.value ? res.value / 1_000_000_000 : 0
}

async function getAllAssets(wallet: string) {
    let allItems: any[] = []
    let page = 1
    while (true) {
        const params = {
            ownerAddress: wallet,
            page,
            limit: 1000
        }
        const result = await rpcCall("getAssetsByOwner", params)
        if (!result) break

        const items = result.items || []
        if (items.length === 0) break

        allItems.push(...items)
        if (items.length < 1000) break
        page++
    }
    return allItems
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
            const data = await cgRes.json()
            solPrice = data.solana?.usd || 0
        }
    } catch (e) {
        console.warn('Failed to fetch SOL price, continuing...')
    }

    // Magic Eden Floor Check
    try {
        const meRes = await fetch("https://api-mainnet.magiceden.dev/v2/collections/gboy_badges_/listings?limit=100")
        if (meRes.ok) {
            const listings = await meRes.json()
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
    } catch (e) {
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
