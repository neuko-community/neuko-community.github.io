<script setup>
import { ref, computed } from 'vue'
// Importing the JSON file directly so it gets bundled into the JS
import rawData from '../../data/community_x_wallet.json'

// --- State ---
const password = ref('')
const searchQuery = ref('')
const isUnlocked = ref(false)
const error = ref('')

// Configuration
const ACCESS_KEY = 'HOODUP'

// --- Methods ---
const checkPassword = () => {
  if (password.value === ACCESS_KEY) {
    isUnlocked.value = true
    error.value = ''
  } else {
    error.value = 'ACCESS DENIED: INVALID CLEARANCE'
    password.value = ''
  }
}

const disconnect = () => {
  isUnlocked.value = false
  password.value = ''
  searchQuery.value = ''
}

// --- Computed Properties ---
const tableHeaders = computed(() => {
  if (rawData && rawData.length > 0) {
    return Object.keys(rawData[0])
  }
  return []
})

const filteredData = computed(() => {
  // Sort alphabetically by wallet x handle
  const sortedData = [...rawData].sort((a, b) => {
    const handleA = a['X handle'].toLowerCase()
    const handleB = b['X handle'].toLowerCase()
    if (handleA < handleB) return -1
    if (handleA > handleB) return 1
    return 0
  })

  if (!searchQuery.value) return sortedData

  const query = searchQuery.value.toLowerCase()

  return sortedData.filter((row) => {
    // Searches across all columns in the row
    return Object.values(row).some((value) => String(value).toLowerCase().includes(query))
  })
})
</script>

<template>
  <div class="secure-terminal">
    <div v-if="!isUnlocked" class="lock-gate">
      <div class="terminal-header">
        <span class="status-dot blink"></span>
        <span class="header-text">SECURE ACCESS GATEWAY</span>
      </div>

      <div class="lock-content">
        <div class="cypher-text">RESTRICTED ACCESS</div>
        <p class="instruction">Enter clearance key to decrypt wallet database...</p>

        <div class="input-container">
          <input
            v-model="password"
            type="password"
            @keyup.enter="checkPassword"
            placeholder="ACCESS KEY"
            class="terminal-input"
          />
          <button @click="checkPassword" class="auth-btn">AUTHENTICATE</button>
        </div>
        <p v-if="error" class="error-log">{{ error }}</p>
      </div>
    </div>

    <div v-else class="data-view">
      <div class="view-header">
        <div class="header-left">
          <span class="status-dot active"></span>
          <span>DATABASE_LOGS // UNLOCKED</span>
        </div>
        <button @click="disconnect" class="logout-btn">TERMINATE_SESSION</button>
      </div>

      <div class="search-bar-container">
        <div class="search-wrapper">
          <span class="search-icon">🔎</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="FILTER BY WALLET, NAME, OR ID..."
            class="search-input"
          />
        </div>
        <div class="results-meta">
          MATCHES: {{ filteredData.length }} / TOTAL: {{ rawData.length }}
        </div>
      </div>

      <div class="scroll-wrapper">
        <table class="neuko-table">
          <thead>
            <tr>
              <th v-for="header in tableHeaders" :key="header">
                {{ header.replace(/_/g, ' ') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in filteredData" :key="index">
              <td v-for="key in tableHeaders" :key="key" :class="key">
                {{ row[key] }}
              </td>
            </tr>
            <tr v-if="filteredData.length === 0">
              <td :colspan="tableHeaders.length" class="empty-state">
                <div class="warning">NO RECORDS FOUND MATCHING QUERY</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base Terminal Styling */
.secure-terminal {
  background: #0a0a0a;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 25px;
  font-family: 'Courier New', Courier, monospace;
  box-shadow: inset 0 0 15px rgba(0, 255, 157, 0.05);
  margin: 2rem 0;
}

/* Header UI */
.terminal-header,
.view-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: #666;
  margin-bottom: 20px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #444;
}
.status-dot.blink {
  background: #ff4d4d;
  animation: pulse 1.5s infinite;
}
.status-dot.active {
  background: var(--vp-c-brand-1);
}

/* Password Screen */
.lock-content {
  text-align: center;
  padding: 40px 0;
}
.cypher-text {
  color: var(--vp-c-brand-1);
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
}
.instruction {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 25px;
}

.input-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.terminal-input {
  background: #111;
  border: 1px solid #333;
  color: #fff;
  padding: 12px;
  border-radius: 4px;
  width: 250px;
}
.auth-btn {
  background: var(--vp-c-brand-1);
  color: #000;
  font-weight: 900;
  padding: 0 20px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

/* Search UI */
.search-bar-container {
  margin-bottom: 25px;
}
.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 15px;
  font-size: 0.8rem;
  color: #444;
}
.search-input {
  width: 100%;
  background: #111;
  border: 1px solid #222;
  color: var(--vp-c-brand-1);
  padding: 12px 12px 12px 40px;
  border-radius: 6px;
  font-size: 0.85rem;
}
.results-meta {
  font-size: 0.65rem;
  color: #444;
  margin-top: 8px;
  text-align: right;
}

/* Table UI */
.scroll-wrapper {
  overflow-x: auto;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
}
.neuko-table {
  width: 100%;
  border-collapse: collapse;
  background: #0c0c0c;
}
.neuko-table th {
  background: #111;
  color: #555;
  font-size: 0.65rem;
  text-transform: uppercase;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #1a1a1a;
}
.neuko-table td {
  padding: 12px;
  color: #aaa;
  font-size: 0.8rem;
  border-bottom: 1px solid #161616;
}
.neuko-table tr:hover td {
  background: rgba(0, 255, 157, 0.02);
  color: #fff;
}

/* Special Column highlighting */
.wallet,
.address {
  font-family: 'Consolas', monospace;
  color: var(--vp-c-brand-1);
  opacity: 0.8;
}

.logout-btn {
  background: transparent;
  border: 1px solid #333;
  color: #555;
  font-size: 0.6rem;
  padding: 4px 8px;
  cursor: pointer;
}
.logout-btn:hover {
  border-color: #ff4d4d;
  color: #ff4d4d;
}

.empty-state {
  text-align: center;
  color: #333;
  padding: 50px !important;
  font-size: 0.7rem;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
