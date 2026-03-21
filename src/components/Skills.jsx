import { useEffect, useRef, useState } from 'react'
import styles from './Skills.module.css'

const skillGroups = [
  {
    label: 'Languages',
    items: [
      { name: 'Python',     level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'C++',        level: 78 },
      { name: 'Java',       level: 70 },
      { name: 'Solidity',   level: 80 },
    ],
  },
  {
    label: 'Frameworks & Tools',
    items: [
      { name: 'React.js',  level: 85 },
      { name: 'Node.js',   level: 80 },
      { name: 'Web3.js',   level: 75 },
      { name: 'MongoDB',   level: 72 },
      { name: 'MySQL',     level: 68 },
    ],
  },
]

const tags = [
  'Ethereum', 'Smart Contracts', 'NFTs', 'dApps',
  'Blockchain Consensus', 'Data Structures', 'Algorithms',
  'Operating Systems', 'Computer Networks', 'Artificial Intelligence',
]

export default function Skills() {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className={styles.section} id="skills" ref={ref}>
      <div className={styles.header}>
        <span className={styles.sectionNum}>02</span>
        <div>
          <h2 className={`${styles.title} reveal`}>Technical Skills</h2>
          <p className={`${styles.sub} reveal`}>Languages, frameworks, and core concepts</p>
        </div>
      </div>

      <div className={styles.grid}>
        {skillGroups.map((group) => (
          <div key={group.label} className={`${styles.group} reveal`}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <div className={styles.bars}>
              {group.items.map((skill, i) => (
                <div key={skill.name} className={styles.barRow}>
                  <div className={styles.barMeta}>
                    <span className={styles.barName}>{skill.name}</span>
                    <span className={styles.barPct}>{skill.level}%</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: animated ? `${skill.level}%` : '0%',
                        transitionDelay: `${i * 0.08}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`${styles.tagCloud} reveal`}>
        <p className={styles.tagLabel}>Core concepts</p>
        <div className={styles.tags}>
          {tags.map(t => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
