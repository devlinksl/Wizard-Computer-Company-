// ========================================
// Born To Blog - Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // Sidebar Toggle Functionality
  // ========================================
  const sidebar = document.getElementById("sidebar")
  const sidebarOverlay = document.getElementById("sidebar-overlay")
  const menuToggle = document.getElementById("menu-toggle")
  const sidebarClose = document.getElementById("sidebar-close")

  function openSidebar() {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.add("open")
      sidebarOverlay.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  }

  function closeSidebar() {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.remove("open")
      sidebarOverlay.classList.remove("active")
      document.body.style.overflow = ""
    }
  }

  if (menuToggle) {
    menuToggle.onclick = (e) => {
      e.preventDefault()
      openSidebar()
    }
  }

  if (sidebarClose) {
    sidebarClose.onclick = (e) => {
      e.preventDefault()
      closeSidebar()
    }
  }

  if (sidebarOverlay) {
    sidebarOverlay.onclick = () => {
      closeSidebar()
    }
  }

  // Close sidebar on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("open")) {
      closeSidebar()
    }
  })

  // ========================================
  // Active Navigation Link
  // ========================================
  const navLinks = document.querySelectorAll(".nav-link[data-section]")
  const sections = document.querySelectorAll("section[id]")

  function updateActiveNav() {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)
  updateActiveNav()

  // Close sidebar when clicking nav link on mobile/tablet
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1024) {
        closeSidebar()
      }
    })
  })

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        const headerOffset = window.innerWidth <= 1024 ? 80 : 0
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        if (window.innerWidth <= 1024) {
          closeSidebar()
        }
      }
    })
  })

  // ========================================
  // Scroll Animations (Fade In)
  // ========================================
  const fadeElements = document.querySelectorAll(".fade-in")

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        fadeObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  fadeElements.forEach((element) => {
    fadeObserver.observe(element)
  })

  // ========================================
  // Newsletter Form Handler
  // ========================================
  const newsletterForm = document.getElementById("newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value

      if (email) {
        const button = this.querySelector("button")
        const originalText = button.textContent

        button.textContent = "Subscribing..."
        button.disabled = true

        setTimeout(() => {
          button.textContent = "Subscribed!"
          emailInput.value = ""

          setTimeout(() => {
            button.textContent = originalText
            button.disabled = false
          }, 2000)
        }, 1000)
      }
    })
  }

  // ========================================
  // Mobile Header Background on Scroll
  // ========================================
  const mobileHeader = document.getElementById("mobile-header")

  if (mobileHeader) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        mobileHeader.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
      } else {
        mobileHeader.style.boxShadow = "none"
      }
    })
  }

  // ========================================
  // Staggered Animation for Cards
  // ========================================
  const cardGrids = document.querySelectorAll(
    ".content-grid, .features-grid, .team-grid, .blog-grid, .testimonials-grid, .impact-grid, .tech-grid, .why-grid",
  )

  cardGrids.forEach((grid) => {
    const cards = grid.querySelectorAll(
      ".content-card, .feature-card, .team-card, .blog-card, .testimonial-card, .impact-card, .tech-card, .why-card",
    )

    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 100}ms`
    })
  })

  // ========================================
  // ========================================
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      this.style.transform = "scale(0.97)"

      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ripple = document.createElement("span")
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        pointer-events: none;
        width: 100px;
        height: 100px;
        left: ${x - 50}px;
        top: ${y - 50}px;
        transform: scale(0);
        animation: btnRipple 0.6s ease-out forwards;
      `

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        this.style.transform = ""
        ripple.remove()
      }, 600)
    })
  })

  // ========================================
  // ========================================
  document
    .querySelectorAll(
      ".content-card, .feature-card, .team-card, .blog-card, .testimonial-card, .impact-card, .tech-card, .why-card, .step-card, .roadmap-card",
    )
    .forEach((card) => {
      card.style.cursor = "pointer"
      card.addEventListener("click", function (e) {
        this.style.transform = "scale(0.98)"
        this.style.boxShadow = "0 2px 8px rgba(230, 92, 0, 0.2)"

        const rect = this.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const ripple = document.createElement("span")
        ripple.style.cssText = `
        position: absolute;
        background: rgba(230, 92, 0, 0.15);
        border-radius: 50%;
        pointer-events: none;
        width: 200px;
        height: 200px;
        left: ${x - 100}px;
        top: ${y - 100}px;
        transform: scale(0);
        animation: btnRipple 0.8s ease-out forwards;
      `

        this.style.position = "relative"
        this.style.overflow = "hidden"
        this.appendChild(ripple)

        setTimeout(() => {
          this.style.transform = ""
          this.style.boxShadow = ""
          ripple.remove()
        }, 800)
      })
    })

  // ========================================
  // ========================================
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      this.style.opacity = "0.7"
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.opacity = ""
        this.style.transform = ""
      }, 200)
    })
  })

  // ========================================
  // ========================================
  const style = document.createElement("style")
  style.textContent = `
    @keyframes btnRipple {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(4);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)

  // ========================================
  // Parallax Effect for Hero
  // ========================================
  const heroSection = document.querySelector(".hero-section")

  if (heroSection && window.innerWidth > 768) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY
      const heroContent = heroSection.querySelector(".hero-content")

      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
        heroContent.style.opacity = 1 - scrolled / window.innerHeight
      }
    })
  }

  // ========================================
  // Handle Window Resize
  // ========================================
  let resizeTimeout
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth > 1024 && sidebar && sidebar.classList.contains("open")) {
        closeSidebar()
      }
    }, 250)
  })
})
