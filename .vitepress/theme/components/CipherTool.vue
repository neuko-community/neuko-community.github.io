<script setup>
import { ref, computed } from 'vue'
import CryptoJS from 'crypto-js'

// --- State ---
const mainText = ref('')
const userKey = ref('neukosecret')
const mode = ref('encryption') // 'encryption' or 'decryption'
const copyStatus = ref({})
const showFilterModal = ref(false)

// --- Morse Map Constants ---
const MORSE_MAP = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  0: '-----',
  ' ': '/'
}
const REVERSE_MORSE = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]))

// --- Tool Definitions ---
const tools = [
  {
    name: 'Base64',
    isHash: false,
    enc: (s) => btoa(s),
    dec: (s) => {
      try {
        return atob(s)
      } catch {
        return ''
      }
    }
  },
  {
    name: 'AES Encryption',
    isHash: false,
    enc: (s, k) => CryptoJS.AES.encrypt(s, k).toString(),
    dec: (s, k) => {
      try {
        const bytes = CryptoJS.AES.decrypt(s, k)
        return bytes.toString(CryptoJS.enc.Utf8) || 'Invalid Key'
      } catch {
        return 'Invalid Key'
      }
    }
  },
  {
    name: 'Caesar Cipher (Shift 3)',
    isHash: false,
    enc: (s) =>
      s.replace(/[a-z]/gi, (c) =>
        String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 3) ? c : c - 26)
      ),
    dec: (s) =>
      s.replace(/[a-z]/gi, (c) =>
        String.fromCharCode((c <= 'Z' ? 65 : 97) <= (c = c.charCodeAt(0) - 3) ? c : c + 26)
      )
  },
  {
    name: 'Vigenere Cipher',
    isHash: false,
    enc: (s, k) => {
      if (!k) return s
      let keyIndex = 0
      return s
        .split('')
        .map((c) => {
          if (!/[a-z]/i.test(c)) return c
          const base = c <= 'Z' ? 65 : 97
          const shift = k.toLowerCase().charCodeAt(keyIndex % k.length) - 97
          keyIndex++
          return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base)
        })
        .join('')
    },
    dec: (s, k) => {
      if (!k) return s
      let keyIndex = 0
      return s
        .split('')
        .map((c) => {
          if (!/[a-z]/i.test(c)) return c
          const base = c <= 'Z' ? 65 : 97
          const shift = k.toLowerCase().charCodeAt(keyIndex % k.length) - 97
          keyIndex++
          return String.fromCharCode(((c.charCodeAt(0) - base - shift + 26) % 26) + base)
        })
        .join('')
    }
  },
  {
    name: 'ROT13',
    isHash: false,
    enc: (s) =>
      s.replace(/[a-zA-Z]/g, (c) =>
        String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)
      ),
    dec: (s) =>
      s.replace(/[a-zA-Z]/g, (c) =>
        String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)
      )
  },
  {
    name: 'LeetSpeak',
    isHash: false,
    enc: (s) =>
      s
        .toUpperCase()
        .replace(/A/g, '4')
        .replace(/E/g, '3')
        .replace(/G/g, '6')
        .replace(/I/g, '1')
        .replace(/O/g, '0')
        .replace(/S/g, '5')
        .replace(/T/g, '7'),
    dec: (s) =>
      s
        .toUpperCase()
        .replace(/4/g, 'A')
        .replace(/3/g, 'E')
        .replace(/6/g, 'G')
        .replace(/1/g, 'I')
        .replace(/0/g, 'O')
        .replace(/5/g, 'S')
        .replace(/7/g, 'T')
  },
  {
    name: 'Hexadecimal',
    isHash: false,
    enc: (s) =>
      s
        .split('')
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(' '),
    dec: (s) => {
      try {
        return s
          .split(' ')
          .map((h) => String.fromCharCode(parseInt(h, 16)))
          .join('')
      } catch {
        return ''
      }
    }
  },
  {
    name: 'Binary',
    isHash: false,
    enc: (s) =>
      s
        .split('')
        .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' '),
    dec: (s) => {
      try {
        return s
          .split(' ')
          .map((b) => String.fromCharCode(parseInt(b, 2)))
          .join('')
      } catch {
        return ''
      }
    }
  },
  {
    name: 'Unicode Escape',
    isHash: false,
    enc: (s) =>
      s
        .split('')
        .map((c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'))
        .join(''),
    dec: (s) => {
      try {
        // Validate format first - only allow valid \uXXXX patterns
        // Remove whitespace for validation, but preserve structure
        const cleaned = s.replace(/\s/g, '')
        // Check if string contains only valid \uXXXX patterns
        if (!cleaned || !/^(\\u[0-9a-fA-F]{4})+$/.test(cleaned)) {
          return ''
        }
        // Safe parsing - JSON.parse with validated input
        const parsed = JSON.parse('"' + s + '"')
        // Additional safety: ensure result is a string
        // Note: Output is rendered in <textarea> which treats content as text, not HTML
        // This prevents XSS even if decoded content contains HTML/JS
        return typeof parsed === 'string' ? parsed : ''
      } catch {
        return ''
      }
    }
  },
  {
    name: 'Atbash Cipher',
    isHash: false,
    enc: (s) =>
      s.replace(/[a-z]/gi, (c) =>
        String.fromCharCode((c <= 'Z' ? 90 : 122) - (c.charCodeAt(0) - (c <= 'Z' ? 65 : 97)))
      ),
    dec: (s) =>
      s.replace(/[a-z]/gi, (c) =>
        String.fromCharCode((c <= 'Z' ? 90 : 122) - (c.charCodeAt(0) - (c <= 'Z' ? 65 : 97)))
      )
  },
  {
    name: 'URL Encode',
    isHash: false,
    enc: (s) => encodeURIComponent(s),
    dec: (s) => {
      try {
        return decodeURIComponent(s)
      } catch {
        return ''
      }
    }
  },
  {
    name: 'Morse Code',
    isHash: false,
    enc: (s) =>
      s
        .toUpperCase()
        .split('')
        .map((c) => MORSE_MAP[c] || '')
        .join(' '),
    dec: (s) => {
      // Split on word boundaries: '/' or 2+ spaces
      // Handle both '/' and multiple spaces as word separators
      const parts = s.split(/(?:\s{2,}|\/)/)

      return parts
        .map((part) => {
          // Split each part on single spaces to get Morse code patterns
          return part
            .trim()
            .split(/\s+/)
            .filter((pattern) => pattern.length > 0) // Remove empty patterns
            .map((pattern) => REVERSE_MORSE[pattern] || '')
            .join('')
        })
        .filter((word) => word.length > 0) // Remove empty words
        .join(' ')
    }
  },
  { name: 'SHA-256', isHash: true, enc: (s) => CryptoJS.SHA256(s).toString() },
  { name: 'SHA-512', isHash: true, enc: (s) => CryptoJS.SHA512(s).toString() },
  { name: 'SHA-3', isHash: true, enc: (s) => CryptoJS.SHA3(s).toString() },
  { name: 'MD5', isHash: true, enc: (s) => CryptoJS.MD5(s).toString() },
  { name: 'RIPEMD-160', isHash: true, enc: (s) => CryptoJS.RIPEMD160(s).toString() }
]

const selectedTools = ref(tools.map((t) => t.name))

// --- Computed Results ---

const filteredResults = computed(() => {
  const allResults = tools.map((tool) => {
    let output = ''
    if (!mainText.value || mainText.value.trim() === '') {
      output = ''
    } else {
      try {
        if (mode.value === 'encryption') {
          output = tool.enc(mainText.value, userKey.value)
        } else {
          output = tool.isHash
            ? '[One-Way Hash]'
            : tool.dec
              ? tool.dec(mainText.value, userKey.value)
              : ''
        }
      } catch {
        output = '[Error processing input]'
      }
    }
    return { ...tool, output }
  })

  return allResults.filter((tool) => selectedTools.value.includes(tool.name))
})

// --- Methods ---

const clearAll = () => {
  mainText.value = ''
}

const copy = (text, toolName) => {
  if (!text || text.includes('Invalid') || text === '[One-Way Hash]') return
  navigator.clipboard.writeText(text)

  copyStatus.value[toolName] = 'COPIED!'
  setTimeout(() => {
    copyStatus.value[toolName] = 'COPY'
  }, 1000)
}

const closeModal = () => {
  showFilterModal.value = false
}

const sanitizeKey = (event) => {
  // Remove spaces and special characters, keep only alphanumeric
  const sanitized = event.target.value.replace(/[^a-zA-Z0-9]/g, '')
  userKey.value = sanitized
  // Update the input value to reflect the sanitized version
  event.target.value = sanitized
}
</script>

<template>
  <div class="cipher-container">
    <div class="tabs">
      <button :class="{ active: mode === 'encryption' }" @click="mode = 'encryption'">
        ENCRYPT / HASH
      </button>
      <button :class="{ active: mode === 'decryption' }" @click="mode = 'decryption'">
        DECRYPT
      </button>
      <button class="clear-btn" @click="clearAll">CLEAR ALL</button>
    </div>

    <div class="input-group">
      <div class="field">
        <label>{{ mode === 'encryption' ? 'Plain Text Input' : 'Encrypted / Cipher Text' }}</label>
        <textarea
          v-model="mainText"
          placeholder="Start typing to see the magic..."
          class="main-input"
        ></textarea>
      </div>

      <div class="field">
        <label>Secret Key (Password)</label>
        <input
          v-model="userKey"
          type="text"
          class="key-input"
          placeholder="Enter custom key..."
          @input="sanitizeKey"
        />
      </div>
    </div>

    <!-- Mobile: Button to open modal -->
    <button class="filter-modal-trigger" @click="showFilterModal = true">
      <span>Select Algorithms</span>
      <span class="selected-count">({{ selectedTools.length }}/{{ tools.length }})</span>
    </button>

    <!-- Desktop: Inline filter section -->
    <div class="filter-section filter-section-desktop">
      <div class="filter-header">
        <label class="filter-label">Active Algorithms</label>
        <div class="filter-actions">
          <button @click="selectedTools = tools.map((t) => t.name)" class="action-link">
            Select All
          </button>
          <button
            @click="selectedTools = tools.filter((t) => !t.isHash).map((t) => t.name)"
            class="action-link"
          >
            Ciphers Only
          </button>
          <button
            @click="selectedTools = tools.filter((t) => t.isHash).map((t) => t.name)"
            class="action-link"
          >
            Hashes Only
          </button>
          <button @click="selectedTools = []" class="action-link">Clear</button>
        </div>
      </div>

      <div class="filter-chips">
        <label v-for="tool in tools" :key="'filter-' + tool.name" class="modern-chip">
          <input type="checkbox" v-model="selectedTools" :value="tool.name" />
          <div class="chip-content">
            <span class="chip-indicator"></span>
            <span class="chip-text">{{ tool.name }}</span>
          </div>
        </label>
      </div>
    </div>

    <!-- Mobile: Modal overlay -->
    <div
      v-if="showFilterModal"
      class="filter-modal-overlay"
      @click="closeModal"
      @touchstart="closeModal"
    >
      <div class="filter-modal" @click.stop @touchstart.stop>
        <div class="filter-modal-header">
          <h3>Select Algorithms</h3>
          <button class="filter-modal-close" @click="closeModal">×</button>
        </div>
        <div class="filter-modal-content">
          <div class="filter-header">
            <label class="filter-label">Active Algorithms</label>
            <div class="filter-actions">
              <button @click="selectedTools = tools.map((t) => t.name)" class="action-link">
                Select All
              </button>
              <button
                @click="selectedTools = tools.filter((t) => !t.isHash).map((t) => t.name)"
                class="action-link"
              >
                Ciphers Only
              </button>
              <button
                @click="selectedTools = tools.filter((t) => t.isHash).map((t) => t.name)"
                class="action-link"
              >
                Hashes Only
              </button>
              <button @click="selectedTools = []" class="action-link">Clear</button>
            </div>
          </div>

          <div class="filter-chips">
            <label v-for="tool in tools" :key="'modal-filter-' + tool.name" class="modern-chip">
              <input type="checkbox" v-model="selectedTools" :value="tool.name" />
              <div class="chip-content">
                <span class="chip-indicator"></span>
                <span class="chip-text">{{ tool.name }}</span>
              </div>
            </label>
          </div>
        </div>
        <div class="filter-modal-footer">
          <button class="filter-modal-done" @click="closeModal">Done</button>
        </div>
      </div>
    </div>

    <div v-if="filteredResults.length > 0" class="grid">
      <div v-for="tool in filteredResults" :key="tool.name" class="card">
        <div class="card-header">
          <span class="badge">{{ tool.isHash ? 'Hash' : 'Cipher' }}</span>
          <button class="copy-btn" @click="copy(tool.output, tool.name)">
            {{ copyStatus[tool.name] || 'COPY' }}
          </button>
        </div>

        <h3 class="card-title">{{ tool.name }}</h3>

        <textarea
          :readonly="true"
          :value="tool.output"
          :placeholder="'Output is shown here...'"
          class="result-box"
          :class="{ 'hash-readonly': tool.isHash }"
        ></textarea>
      </div>
    </div>
    <div v-else class="empty-placeholder">
      <div class="empty-icon">🛸</div>
      <h3>No algorithms selected</h3>
      <p>Pick some tools from the filters above to start de-coding.</p>
      <button @click="selectedTools = tools.map((t) => t.name)" class="btn-restore">
        Restore All Tools
      </button>
    </div>
    <div class="tool-footer">
      Built with love by
      <a href="https://x.com/feezybellz_ii" target="_blank" rel="noopener noreferrer">
        "That Chill Guy"
      </a>
      to help save <strong>GBOY</strong>
    </div>
  </div>
</template>

<style scoped>
.cipher-container {
  margin-top: 1rem;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
}

.tabs button {
  padding: 10px 20px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  color: var(--vp-c-text-1);
  font-weight: 700;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.tabs button.active {
  background: var(--vp-c-brand-1);
  color: #000;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.field label {
  display: block;
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.main-input {
  width: 100%;
  height: 120px;
  padding: 15px;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 2px solid var(--vp-c-divider);
  font-size: 1.1rem;
  transition: border-color 0.2s;
}

.main-input:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
}

.key-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-family: monospace;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  padding: 20px;
  border-radius: 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.badge {
  font-size: 9px;
  background: var(--vp-c-bg-mute);
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 900;
  color: var(--vp-c-text-2);
}

.copy-btn {
  color: var(--vp-c-brand-1);
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.result-box {
  width: 100%;
  height: 100px;
  background: var(--vp-c-bg-mute);
  border-radius: 12px;
  border: 1px solid transparent;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  padding: 12px;
  resize: none;
  color: var(--vp-c-text-1);
  transition: all 0.2s;
}

.result-box:focus:not(.hash-readonly) {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  outline: none;
}

.hash-readonly {
  opacity: 0.6;
  cursor: not-allowed;
}

.tool-footer {
  margin-top: 3rem;
  padding: 2rem 0;
  text-align: center;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-base);
}

.tool-footer a {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.2s;
}

.tool-footer a:hover {
  text-decoration: underline;
  opacity: 0.8;
}

.tool-footer strong {
  color: var(--vp-c-brand-1);
  letter-spacing: 1px;
}

.filter-section {
  margin-bottom: 2.5rem;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 24px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 5px;
}

.filter-actions {
  display: flex;
  gap: 12px;
}

.action-link {
  font-size: 10px;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  opacity: 0.7;
}

.action-link:hover {
  opacity: 1;
  text-decoration: underline;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.modern-chip {
  cursor: pointer;
  user-select: none;
}

.modern-chip input {
  display: none;
}

.chip-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  border-radius: 100px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chip-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  transition: all 0.3s ease;
}

.chip-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

/* Active State */
.modern-chip input:checked + .chip-content {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modern-chip input:checked + .chip-content .chip-text {
  color: var(--vp-c-brand-1);
}

.modern-chip input:checked + .chip-content .chip-indicator {
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 8px var(--vp-c-brand-1);
  transform: scale(1.5);
}

.modern-chip:hover .chip-content {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.empty-placeholder {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--vp-c-bg-soft);
  border: 2px dashed var(--vp-c-divider);
  border-radius: 32px;
  margin: 2rem 0;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 10px var(--vp-c-brand-1));
}

.empty-placeholder h3 {
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.empty-placeholder p {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.btn-restore {
  background: var(--vp-c-brand-1);
  color: #000;
  padding: 10px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-restore:hover {
  transform: scale(1.05);
}

/* Mobile filter modal trigger button */
.filter-modal-trigger {
  width: 100%;
  padding: 14px 20px;
  margin-bottom: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 12px;
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-modal-trigger:hover {
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.selected-count {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* Modal overlay */
.filter-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Modal content */
.filter-modal {
  background: var(--vp-c-bg);
  border-radius: 24px 24px 0 0;
  width: 100%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.2);
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.filter-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.filter-modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.filter-modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.filter-modal-close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.filter-modal-content {
  padding: 20px 24px;
  overflow-y: auto;
  flex: 1;
}

.filter-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.filter-modal-done {
  width: 100%;
  padding: 14px;
  background: var(--vp-c-brand-1);
  color: #000;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.filter-modal-done:hover {
  transform: scale(1.02);
}

.filter-modal-done:active {
  transform: scale(0.98);
}

/* Responsive: Show/hide based on screen size */
@media (min-width: 768px) {
  .filter-modal-trigger {
    display: none !important;
  }

  .filter-section-desktop {
    display: block;
  }
}

@media (max-width: 767px) {
  .filter-modal-trigger {
    display: flex !important;
  }

  .filter-section-desktop {
    display: none;
  }
}
</style>
