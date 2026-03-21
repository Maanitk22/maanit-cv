import { useState } from 'react'
import styles from './Projects.module.css'

const projects = [
  {
    id: '01',
    title: 'DynaChain',
    subtitle: 'Hybrid PoS–dBFT Blockchain Framework',
    tags: ['Python', 'Blockchain', 'Consensus Protocol', 'Research'],
    desc: 'A hybrid blockchain consensus protocol that dynamically switches between Proof of Stake and delegated Byzantine Fault Tolerance based on real-time network conditions — including latency, transaction volume, and validator participation.',
    highlights: [
      'Adaptive consensus switching via live network metrics',
      'Analytics: validator participation, switching timelines',
      'Published as research: evaluated against block finalization time & energy consumption',
    ],
    github: 'https://github.com/Maanitk22',
    live: null,
    accent: '#c4601a',
  },
  {
    id: '02',
    title: 'Blockchain Ticketing',
    subtitle: 'NFT-Based Anti-Scalping Ticket Platform',
    tags: ['React.js', 'Solidity', 'Web3.js', 'Ethereum'],
    desc: 'An NFT-based ticketing platform that eliminates ticket scalping through blockchain-enforced ownership. Smart contracts handle secure transfer and KYC-verified authentication.',
    highlights: [
      'Smart contracts for ownership verification & transfer',
      'KYC integration for secure identity verification',
      'React.js frontend with Web3.js wallet connectivity',
    ],
    github: 'https://github.com/Maanitk22',
    live: null,
    accent: '#2d6a4f',
  },
  {
    id: '03',
    title: 'PREP.AI',
    subtitle: 'AI Interview Simulation Platform',
    tags: ['AI', 'Chatbot', 'Voice Interface', 'Google GenAI'],
    desc: 'AI-powered platform for resume analysis, career guidance, and mock interview simulation. Built during Google GenAI Hackathon 2025 with chatbot and voice-based interaction for realistic interview prep.',
    highlights: [
      'Voice + chatbot interview simulation engine',
      'Resume parsing and personalized career guidance',
      'Built at Google GenAI Hackathon 2025',
    ],
    github: 'https://github.com/Maanitk22',
    live: 'https://prep-ai-blush.vercel.app/',
    accent: '#1a4a8a',
  },
  {
    id: '04',
    title: 'CCET Website Revamp',
    subtitle: 'College Website Rebuild',
    tags: ['React.js', 'UI/UX', 'Performance', 'Responsive'],
    desc: 'Rebuilding the official Chandigarh College of Engineering & Technology website with a focus on modern UI/UX, performance optimization, and responsive design across all devices.',
    highlights: [
      'Full UI/UX redesign from ground up',
      'Optimized performance and loading times',
      'Scalable, accessible component architecture',
    ],
    github: 'https://github.com/Maanitk22',
    live: 'https://www.ccet.ac.in',
    accent: '#6b3fa0',
  },
]

export default function Projects() {
  const [active, setActive] = useState(null)

  const handleCardClick = (e, cardId) => {
    // Don't toggle if clicking on a link or button
    if (e.target.closest('a') || e.target.closest('button')) {
      return
    }
    e.stopPropagation()
    setActive(active === cardId ? null : cardId)
  }

  return (
    <section className={styles.section} id="projects">
      <div className={styles.header}>
        <span className={styles.sectionNum}>03</span>
        <div>
          <h2 className={`${styles.title} reveal`}>Projects</h2>
          <p className={`${styles.sub} reveal`}>Selected work & experiments</p>
        </div>
      </div>

      <div className={`${styles.list} reveal`}>
        {projects.map((p, i) => (
          <article
            key={p.id}
            className={`${styles.card} ${active === p.id ? styles.expanded : ''}`}
            style={{ '--card-accent': p.accent, animationDelay: `${i * 0.1}s` }}
            onClick={(e) => handleCardClick(e, p.id)}
            data-hover
          >
            <div className={styles.cardTop}>
              <div className={styles.cardLeft}>
                <span className={styles.cardNum}>{p.id}</span>
                <div>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardSub}>{p.subtitle}</p>
                </div>
              </div>

              <div className={styles.cardRight}>
                <div className={styles.tags}>
                  {p.tags.map(t => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <span className={`${styles.arrow} ${active === p.id ? styles.arrowOpen : ''}`}>↓</span>
              </div>
            </div>

            <div className={`${styles.cardBody} ${active === p.id ? styles.cardBodyOpen : ''}`}>
              <div className={styles.cardBodyInner}>
                <p className={styles.desc}>{p.desc}</p>
                <ul className={styles.highlights}>
                  {p.highlights.map((h, i) => (
                    <li key={i}><span className={styles.bullet}>—</span>{h}</li>
                  ))}
                </ul>
                <div className={styles.links}>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.linkBtn} ${styles.linkLive}`}
                      onClick={e => e.stopPropagation()}
                    >
                      Live Demo ↗
                    </a>
                  )}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkBtn}
                    onClick={e => e.stopPropagation()}
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
