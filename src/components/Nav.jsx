import { useState, useEffect, useRef } from 'react'
import styles from './Nav.module.css'

const links = [
  { label: 'Skills',    href: 'skills'    },
  { label: 'Projects',  href: 'projects'  },
  { label: 'Education', href: 'education' },
  { label: 'Certificates', href: 'certificates' },
  { label: 'Contact',   href: 'contact'   },
]

// Easing function — ease-in-out-cubic
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Controlled scroll — lands exactly on target, no overshoot
function smoothScrollTo(targetId, offset = 80) {
  const el = document.getElementById(targetId)
  if (!el) return

  const startY   = window.scrollY
  const targetY  = el.getBoundingClientRect().top + startY - offset
  const distance = targetY - startY
  const duration = Math.min(Math.max(Math.abs(distance) * 0.4, 400), 900)
  let startTime  = null

  // Cancel any CSS smooth scroll that might interfere
  document.documentElement.style.scrollBehavior = 'auto'

  function step(timestamp) {
    if (!startTime) startTime = timestamp
    const elapsed  = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased    = easeInOutCubic(progress)

    window.scrollTo(0, startY + distance * eased)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeId,  setActiveId]  = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track which section is in view for active link highlight
  useEffect(() => {
    const ids = links.map(l => l.href)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    smoothScrollTo(id)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a
        href="#"
        className={styles.logo}
        onClick={e => { e.preventDefault(); smoothScrollTo('hero', 0) }}
      >
        MK
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {links.map(l => (
          <li key={l.label}>
            <a
              href={`#${l.href}`}
              onClick={e => handleNavClick(e, l.href)}
              className={`${styles.link} ${activeId === l.href ? styles.active : ''}`}
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="/resume.pdf"
            className={styles.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé ↗
          </a>
        </li>
      </ul>

      <button
        className={`${styles.burger} ${menuOpen ? styles.active : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
