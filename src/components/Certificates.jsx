import styles from './Certificates.module.css'
import bharattechImg from '../assets/cert/bharattech.jpg'
import zerotooneImg from '../assets/cert/zerotoone.jpeg'
import oracleImg from '../assets/cert/oracle.png'
import blockchainImg from '../assets/cert/blockchain.png'
import technovateImg from '../assets/cert/technovate.png'

const certificates = [
  {
    title: 'Oracle Cloud Infrastructure AI Foundations Associate',
    issuer: 'Oracle University',
    year: 'Oct 2025',
    image: oracleImg,
    color: '#c4601a',
    icon: '☁',
  },
  {
    title: 'Blockchain Basics Course',
    issuer: 'Cyfrin Updraft',
    year: 'Oct 2025',
    image: blockchainImg,
    color: '#2d6a4f',
    icon: '⛓',
  },
  {
    title: 'Zero to One — Startup Challenge',
    issuer: 'Chandigarh University · Student Innovation Cell',
    year: 'Aug 2025',
    image: zerotooneImg,
    color: '#0e7c6b',
    icon: null,
  },
  {
    title: 'BharatTech 2.0 — National Hackathon',
    issuer: 'SVIET College · 30-hour National Level Hackathon',
    year: 'Feb 2025',
    image: bharattechImg,
    color: '#1a4a8a',
    icon: null,
  },
  {
    title: 'Technovate-25 — 24hr Hackathon',
    issuer: 'GDGC UIET · Panjab University',
    year: 'Feb 2025',
    image: technovateImg,
    color: '#6b3fa0',
    icon: '⚡',
  },
]

// Triplicate for seamless looping
const triplicatedCerts = [...certificates, ...certificates, ...certificates]

export default function Certificates() {
  return (
    <section className={styles.section} id="certificates">
      <div className={styles.header}>
        <span className={styles.sectionNum}>05</span>
        <div>
          <h2 className={`${styles.title} reveal`}>Certificates & Achievements</h2>
          <p className={`${styles.sub} reveal`}>Continuous learning and recognition</p>
        </div>
      </div>

      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeGradientLeft} />
        <div className={styles.marqueeGradientRight} />

        <div className={styles.track}>
          {triplicatedCerts.map((cert, idx) => (
            <div key={idx} className={styles.card}>
              {cert.image ? (
                // Image card
                <div className={styles.imageCard}>
                  <img src={cert.image} alt={cert.title} className={styles.cardImage} />
                  <div className={styles.imageOverlay}>
                    <p className={styles.overlayTitle}>{cert.title}</p>
                    <p className={styles.overlayIssuer}>{cert.issuer}</p>
                  </div>
                </div>
              ) : (
                // Placeholder card with icon
                <div className={styles.placeholderCard}>
                  <div className={styles.cardAccentBar} style={{ backgroundColor: cert.color }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardIcon}>{cert.icon}</div>
                    <div className={styles.yearBadge}>{cert.year}</div>
                    <h3 className={styles.cardTitle}>{cert.title}</h3>
                    <p className={styles.cardIssuer}>{cert.issuer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
