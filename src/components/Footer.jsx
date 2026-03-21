import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.logo}>MK</span>
        <p className={styles.copy}>
          © {year} Maanit Khatkar · Built with React + Vite
        </p>
        <div className={styles.links}>
          <a href="https://github.com/Maanitk22" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/maanitkhatkar" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:maanitkhatkar22@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  )
}
