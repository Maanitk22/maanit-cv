import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const roles = [
  'Blockchain Developer',
  'AI Builder',
  'Full-Stack Engineer',
  'CS Undergraduate',
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [fading, setFading]   = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % roles.length)
        setFading(false)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero} id="hero" tabIndex={-1}>
      {/* Background grid lines */}
      <div className={styles.grid} aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.gridLine} style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>

      <div className={styles.inner}>
        {/* Eyebrow */}
        <p className={styles.eyebrow} style={{ animationDelay: '0.1s' }}>
          <span className={styles.dot} />
          Available for opportunities
        </p>

        {/* Name */}
        <h1 className={styles.name}>
          <span className={styles.nameLine} style={{ animationDelay: '0.2s' }}>Maanit</span>
          <span className={`${styles.nameLine} ${styles.nameItalic}`} style={{ animationDelay: '0.35s' }}>Khatkar</span>
        </h1>

        {/* Rotating role */}
        <div className={styles.roleWrap} style={{ animationDelay: '0.5s' }}>
          <span className={`${styles.role} ${fading ? styles.roleFade : ''}`}>
            {roles[roleIdx]}
          </span>
        </div>

        {/* Tagline */}
        <p className={styles.tagline} style={{ animationDelay: '0.65s' }}>
          Building at the intersection of blockchain, AI, and modern web —<br />
          2nd year CS student at CCET, Chandigarh.
        </p>

        {/* CTA row */}
        <div className={styles.ctas} style={{ animationDelay: '0.8s' }}>
          <a href="#projects" className={styles.ctaPrimary}>View Projects</a>
          <a href="#contact"  className={styles.ctaSecondary}>Get in touch</a>
          <span className={styles.divider} />
          <a href="https://github.com/Maanitk22" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href="https://linkedin.com/in/maanitkhatkar" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll</span>
      </div>

      {/* Large background number */}
      <span className={styles.bgNumber} aria-hidden="true">01</span>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
