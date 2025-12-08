<script setup>
import { ref } from 'vue'

// REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx_PLACEHOLDER_YOUR_SCRIPT_ID_HERE/exec'

const name = ref('')
const type = ref('text')
const content = ref('')
const link = ref('')
const context = ref('')
const target = ref('')
const file = ref(null)
const isSubmitting = ref(false)
const statusMessage = ref('')

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result.split(',')[1]) // Remove data:image/...;base64, prefix
    reader.onerror = error => reject(error)
  })
}

const submit = async () => {
  if (!name.value) {
    alert('Please enter your name or handle.')
    return
  }

  isSubmitting.value = true
  statusMessage.value = 'Submitting...'

  try {
    let fileData = ''
    let fileName = ''
    let mimeType = ''

    if (file.value) {
      if (file.value.size > 5 * 1024 * 1024) { // 5MB limit check
         alert('File is too large. Please keep it under 5MB.')
         isSubmitting.value = false
         return
      }
      fileData = await fileToBase64(file.value)
      fileName = file.value.name
      mimeType = file.value.type
    }

    // Construct payload
    const payload = {
      name: name.value,
      type: type.value,
      content: content.value,
      link: link.value,
      context: context.value,
      target: target.value,
      fileName: fileName,
      mimeType: mimeType,
      fileData: fileData
    }

    // Use fetch with no-cors if simple POST, but for JSON body we usually need cors.
    // However, Google Apps Script Web App can handle CORS if deployed correctly.
    // We'll use text/plain to avoid preflight if possible, or just standard JSON.
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    // Note: With 'no-cors' (if we had to use it), we wouldn't get a readable response.
    // But standard Apps Script setup returns JSON.
    
    if (response.ok || response.type === 'opaque') {
      statusMessage.value = 'Success! Thank you for your contribution.'
      // Reset form
      name.value = ''
      content.value = ''
      link.value = ''
      context.value = ''
      target.value = ''
      file.value = null
      // Reset file input manually if needed
      const fileInput = document.getElementById('file')
      if (fileInput) fileInput.value = ''
    } else {
      statusMessage.value = 'Error submitting. Please try again.'
      console.error('Submission failed', response)
    }

  } catch (e) {
    console.error(e)
    statusMessage.value = 'Error: ' + e.message
  } finally {
    isSubmitting.value = false
  }
}

const handleFileUpload = (event) => {
  file.value = event.target.files[0]
}
</script>

<template>
  <div class="contribute-form">
    <div class="form-group">
      <label for="name">Name / Handle</label>
      <input id="name" v-model="name" type="text" placeholder="@username" />
    </div>

    <div class="form-group">
      <label>Type of Contribution</label>
      <div class="radio-group">
        <label>
          <input type="radio" v-model="type" value="text" /> Text
        </label>
        <label>
          <input type="radio" v-model="type" value="x-thread" /> X Thread
        </label>
        <label>
          <input type="radio" v-model="type" value="media" /> Image / Video
        </label>
        <label>
          <input type="radio" v-model="type" value="correction" /> Edit / Correction
        </label>
      </div>
    </div>

    <!-- Text Contribution -->
    <div v-if="type === 'text'" class="form-group">
      <label for="content">Content</label>
      <textarea id="content" v-model="content" rows="5" placeholder="Write your contribution here..."></textarea>
    </div>

    <!-- X Thread -->
    <div v-if="type === 'x-thread'" class="form-group">
      <label for="link">X Thread Link</label>
      <input id="link" v-model="link" type="url" placeholder="https://x.com/..." />
    </div>

    <!-- Media -->
    <div v-if="type === 'media'" class="form-group">
      <label for="file">Upload Image or Video (Max 5MB)</label>
      <input id="file" type="file" @change="handleFileUpload" accept="image/*,video/*" />
      
      <div style="margin-top: 1rem;">
        <label for="context">Context / Usage</label>
        <input id="context" v-model="context" type="text" placeholder="e.g. Homepage Banner, Section Image, Meme..." />
      </div>
    </div>

    <!-- Edit / Correction -->
    <div v-if="type === 'correction'" class="form-group">
      <label for="target">Page URL or Section</label>
      <input id="target" v-model="target" type="text" placeholder="e.g. /lore or 'The Story' section" />
      
      <div style="margin-top: 1rem;">
        <label for="content">Correction Details</label>
        <textarea id="content" v-model="content" rows="5" placeholder="Describe the error and the fix..."></textarea>
      </div>
    </div>

    <button class="submit-btn" @click="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Submitting...' : 'Submit Contribution' }}
    </button>
    
    <p v-if="statusMessage" class="status-message" :class="{ error: statusMessage.includes('Error') }">
      {{ statusMessage }}
    </p>
  </div>
</template>

<style scoped>
.contribute-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-alt);
  font-family: var(--vp-font-family-mono);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
}

input[type="text"],
input[type="url"],
textarea,
input[type="file"] {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-base);
  font-size: 1rem;
}

input[type="text"]:focus,
input[type="url"]:focus,
textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.radio-group {
  display: flex;
  gap: 1.5rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--vp-c-text-1);
  text-transform: none;
}

input[type="radio"] {
  accent-color: var(--vp-c-brand-1);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background-color: var(--vp-c-brand-1);
  color: #000;
}
</style>
