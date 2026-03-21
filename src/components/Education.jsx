import styles from './Education.module.css'

const education = [
  {
    degree: 'Bachelor of Engineering',
    field: 'Computer Science & Engineering',
    institution: 'Chandigarh College of Engineering and Technology (CCET)',
    location: 'Chandigarh, India',
    period: '2023 — 2027',
    status: 'In Progress',
  },
]

const certifications = [
  {
    title: 'Oracle Cloud Infrastructure AI Foundations Associate',
    issuer: 'Oracle',
    year: '2025',
  },
  {
    title: 'Blockchain Basics',
    issuer: 'NPTEL / Coursera',
    year: '2025',
  },
]

const achievements = [
  {
    title: 'Google GenAI Hackathon 2025',
    desc: 'Built PREP.AI — an AI-powered interview simulation platform',
  },
  {
    title: 'Website Head — Apratim Annual Fest, CCET',
    desc: 'Led web presence for the college annual cultural festival',
    year: '2024',
  },
  {
    title: 'PR Head — ACM Student Chapter, CCET',
    desc: 'Managed public relations for the ACM student chapter',
  },
]

export default function Education() {
  return (
    <section className={styles.section} id="education">
      <div className={styles.header}>
        <span className={styles.sectionNum}>04</span>
        <div>
          <h2 className={`${styles.title} reveal`}>Education & Achievements</h2>
          <p className={`${styles.sub} reveal`}>Academic background & recognitions</p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Education */}
        <div className={`${styles.block} reveal`}>
          <h3 className={styles.blockLabel}>Education</h3>
          {education.map((e, i) => (
            <div key={i} className={styles.eduCard}>
              <div className={styles.eduPeriod}>{e.period}</div>
              <div className={styles.eduContent}>
                <span className={styles.eduStatus}>{e.status}</span>
                <h4 className={styles.eduDegree}>{e.degree}</h4>
                <p className={styles.eduField}>{e.field}</p>
                <p className={styles.eduInst}>{e.institution}</p>
                <p className={styles.eduLoc}>{e.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className={`${styles.block} reveal`}>
          <h3 className={styles.blockLabel}>Certifications</h3>
          <div className={styles.certList}>
            {certifications.map((c, i) => (
              <div key={i} className={styles.certItem}>
                <div className={styles.certDot} />
                <div>
                  <p className={styles.certTitle}>{c.title}</p>
                  <p className={styles.certMeta}>{c.issuer} · {c.year}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className={`${styles.blockLabel} ${styles.blockLabelMt}`}>Leadership & Achievements</h3>
          <div className={styles.certList}>
            {achievements.map((a, i) => (
              <div key={i} className={styles.certItem}>
                <div className={styles.certDot} />
                <div>
                  <p className={styles.certTitle}>{a.title}{a.year ? ` (${a.year})` : ''}</p>
                  <p className={styles.certMeta}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
