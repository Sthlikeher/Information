// Greeting based on time of day
function setGreeting() {
  const hour = new Date().getHours()
  const greetingElement = document.getElementById("greeting")

  if (hour < 12) {
    greetingElement.textContent = "Good morning"
  } else if (hour < 18) {
    greetingElement.textContent = "Good afternoon"
  } else {
    greetingElement.textContent = "Good evening"
  }
}

// Mouse tracking for animated blobs
let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY

  const blob1 = document.querySelector(".blob-1")
  const blob2 = document.querySelector(".blob-2")

  if (blob1) {
    blob1.style.transform = `translate(${mouseX * 0.02}px, ${mouseY * 0.02}px)`
  }
  if (blob2) {
    blob2.style.transform = `translate(${mouseX * -0.02}px, ${mouseY * -0.02}px)`
  }
})

// Navigation functionality
function setupNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn, .mobile-nav-btn")
  const sections = document.querySelectorAll(".content-section")

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetSection = button.getAttribute("data-section")

      // Remove active class from all buttons
      document.querySelectorAll(".nav-btn, .mobile-nav-btn").forEach((btn) => {
        btn.classList.remove("active")
      })

      // Add active class to clicked button and its counterpart
      document.querySelectorAll(`[data-section="${targetSection}"]`).forEach((btn) => {
        btn.classList.add("active")
      })

      // Hide all sections
      sections.forEach((section) => {
        section.classList.remove("active")
      })

      // Show target section
      const targetElement = document.getElementById(`${targetSection}-section`)
      if (targetElement) {
        targetElement.classList.add("active")
      }
    })
  })
}

// Skills data and rendering
const skills = [
  { name: "React", level: 95, color: "linear-gradient(to right, #22d3ee, #3b82f6)" },
  { name: "Next.js", level: 92, color: "linear-gradient(to right, #374151, #111827)" },
  { name: "TypeScript", level: 90, color: "linear-gradient(to right, #60a5fa, #6366f1)" },
  { name: "Node.js", level: 88, color: "linear-gradient(to right, #4ade80, #10b981)" },
  { name: "Python", level: 85, color: "linear-gradient(to right, #3b82f6, #eab308)" },
  { name: "PostgreSQL", level: 87, color: "linear-gradient(to right, #2563eb, #1e40af)" },
  { name: "MongoDB", level: 84, color: "linear-gradient(to right, #22c55e, #15803d)" },
  { name: "REST APIs", level: 93, color: "linear-gradient(to right, #a855f7, #ec4899)" },
  { name: "GraphQL", level: 82, color: "linear-gradient(to right, #ec4899, #f43f5e)" },
  { name: "Docker", level: 86, color: "linear-gradient(to right, #60a5fa, #06b6d4)" },
  { name: "AWS", level: 80, color: "linear-gradient(to right, #fb923c, #f59e0b)" },
  { name: "Git", level: 94, color: "linear-gradient(to right, #ef4444, #f97316)" },
]

const technologies = [
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Redux",
  "Express.js",
  "Nest.js",
  "Prisma",
  "Redis",
  "Kubernetes",
  "CI/CD",
  "Jest",
  "Webpack",
  "Vite",
  "Vercel",
  "Firebase",
  "Supabase",
]

function renderSkills() {
  const skillsGrid = document.getElementById("skills-grid")

  skills.forEach((skill) => {
    const skillCard = document.createElement("div")
    skillCard.className = "card skill-card"

    skillCard.innerHTML = `
            <div class="skill-header">
                <div class="skill-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>
                    </svg>
                </div>
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 0%; background: ${skill.color}"></div>
            </div>
        `

    skillsGrid.appendChild(skillCard)

    // Animate skill bar after a short delay
    setTimeout(() => {
      const progressBar = skillCard.querySelector(".skill-progress")
      progressBar.style.width = `${skill.level}%`
    }, 100)
  })
}

function renderTechnologies() {
  const techTags = document.getElementById("tech-tags")

  technologies.forEach((tech) => {
    const tag = document.createElement("span")
    tag.className = "tech-tag"
    tag.textContent = tech
    techTags.appendChild(tag)
  })
}

// Chat Widget Functionality
function setupChatWidget() {
  const chatToggle = document.getElementById('chatToggle')
  const chatWidget = document.getElementById('chatWidget')
  const chatClose = document.getElementById('chatClose')
  const chatInput = document.getElementById('chatInput')
  const chatSend = document.getElementById('chatSend')

  if (!chatToggle || !chatWidget) {
    console.log('[v0] Chat widget elements not found')
    return
  }

  let chatVisible = false

  chatToggle.addEventListener('click', () => {
    chatVisible = !chatVisible
    chatWidget.classList.toggle('active')
    if (chatVisible) {
      chatInput.focus()
    }
  })

  chatClose.addEventListener('click', () => {
    chatVisible = false
    chatWidget.classList.remove('active')
  })

  function displayMessage(content, isUser = false) {
    const chatMessages = document.getElementById('chatMessages')
    const messageDiv = document.createElement('div')
    messageDiv.className = `message ${isUser ? 'user' : 'ai'}`
    messageDiv.innerHTML = `
      <div class="message-content">${content}</div>
    `
    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  async function sendMessage() {
    const message = chatInput.value.trim()
    if (!message) return

    displayMessage(message, true)
    chatInput.value = ''
    chatSend.disabled = true

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (response.ok) {
        const data = await response.json()
        displayMessage(data.reply)
      } else {
        displayMessage('Sorry, I encountered an error. Please try again.')
      }
    } catch (error) {
      console.error('Chat error:', error)
      displayMessage('Sorry, I encountered an error. Please make sure your OpenAI API is configured.')
    } finally {
      chatSend.disabled = false
      chatInput.focus()
    }
  }

  chatSend.addEventListener('click', sendMessage)
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setGreeting()
  setupNavigation()
  renderSkills()
  renderTechnologies()
  setupChatWidget()
})
