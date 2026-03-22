import { useState } from 'react'
import styles from './Contact.module.css'

const INITIAL = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm]       = useState(INITIAL)
  const [status, setStatus]   = useState('idle') // idle | sending | success | error
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setForm(INITIAL)
      } else {
        console.error('API error:', data.error)
        setStatus('error')
      }
    } catch (err) {
      console.error('Network error:', err)
      setStatus('error')
    }
  }

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        {/* Left col */}
        <div className={styles.left}>
          <span className={styles.sectionNum}>06</span>
          <h2 className={`${styles.title} reveal`}>Let's talk</h2>
          <p className={`${styles.body} reveal`}>
            Whether it's a project collaboration, an opportunity, or just want
            to connect — drop a message and I'll get back to you.
          </p>

          <div className={`${styles.contacts} reveal`}>
            <a href="mailto:maanitkhatkar22@gmail.com" className={styles.contactRow}>
              <span className={styles.contactIcon}>✉</span>
              <span>maanitkhatkar22@gmail.com</span>
            </a>
            <a href="tel:+919729881170" className={styles.contactRow}>
              <span className={styles.contactIcon}>✆</span>
              <span>+91 97298 81170</span>
            </a>
            <a
              href="https://github.com/Maanitk22"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactRow}
            >
              <span className={styles.contactIcon}>⌥</span>
              <span>github.com/Maanitk22</span>
            </a>
            <a
              href="https://linkedin.com/in/maanitkhatkar"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactRow}
            >
              <span className={styles.contactIcon}>⊞</span>
              <span>linkedin.com/in/maanitkhatkar</span>
            </a>
          </div>
        </div>

        {/* Right col — form */}
        <div className={`${styles.right} reveal`}>
          {status === 'success' ? (
            <div className={styles.successBox}>
              <span className={styles.successIcon}>✓</span>
              <h3 className={styles.successTitle}>Message sent!</h3>
              <p className={styles.successBody}>
                Thanks for reaching out, {form.name || 'there'}. I'll reply to your email shortly.
              </p>
              <button
                className={styles.resetBtn}
                onClick={() => setStatus('idle')}
              >
                Send another
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <Field
                  label="Name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  focused={focused}
                  setFocused={setFocused}
                  required
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  focused={focused}
                  setFocused={setFocused}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <Field
                label="Subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                focused={focused}
                setFocused={setFocused}
                placeholder="What's this about?"
              />

              <Field
                label="Message"
                name="message"
                type="textarea"
                value={form.message}
                onChange={handleChange}
                focused={focused}
                setFocused={setFocused}
                required
                placeholder="Tell me more…"
                rows={5}
              />

              <div className={styles.formFooter}>
                <p className={styles.formNote}>
                  * I'll receive an email notification instantly
                </p>
                <button
                  type="submit"
                  className={`${styles.submitBtn} ${status === 'sending' ? styles.sending : ''}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>Send message <span className={styles.arrow}>→</span></>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <p className={styles.errorMsg}>
                  Something went wrong. Please try emailing me directly.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type, value, onChange, focused, setFocused, placeholder, required, rows }) {
  const isActive = focused === name || value.length > 0

  return (
    <div className={`${styles.field} ${isActive ? styles.fieldActive : ''}`}>
      <label className={styles.label} htmlFor={name}>{label}{required && ' *'}</label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          className={styles.input}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused(null)}
          placeholder={placeholder}
          rows={rows || 4}
          required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={styles.input}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused(null)}
          placeholder={placeholder}
          required={required}
        />
      )}
      <span className={styles.underline} />
    </div>
  )
}
