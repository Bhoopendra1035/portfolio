import { useState, type FormEvent } from 'react'

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/mreornle", { // Actual Formspree ID
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setSuccess(true)
        form.reset()
        setTimeout(() => setSuccess(false), 5000)
      } else {
        const data = await response.json()
        if (data.errors) {
          alert(data.errors.map((error: any) => error.message).join(", "))
        } else {
          alert("Oops! There was a problem submitting your form")
        }
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form")
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Contact</span>
          <h2 className="section-title">Let's Work<br /><em>Together</em></h2>
        </div>

        <div className="contact-grid">
          {/* Info Column */}
          <div className="contact-info" data-aos="fade-right">
            <p className="contact-intro">
              Have a project in mind? I'd love to hear about it. Drop me a message and
              let's create something amazing.
            </p>

            <div className="contact-items">
              <a href="mailto:bhoopendratale8@gmail.com" className="contact-item" id="email-link">
                <div className="contact-icon"><i className="ph ph-envelope" /></div>
                <div>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">bhoopendratale8@gmail.com</span>
                </div>
              </a>
              <a href="tel:+916263541948" className="contact-item" id="phone-link">
                <div className="contact-icon"><i className="ph ph-phone" /></div>
                <div>
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+91 6263541948</span>
                </div>
              </a>
              <div className="contact-item" id="location-info">
                <div className="contact-icon"><i className="ph ph-map-pin" /></div>
                <div>
                  <span className="contact-label">Location</span>
                  <span className="contact-value">Bhopal (M.P), India</span>
                </div>
              </div>
            </div>

            <div className="social-links">
            {[
              { id: 'github-link',    icon: 'ph-github-logo',    label: 'GitHub',    url: 'https://github.com/bhupendratale' },
              { id: 'linkedin-link',  icon: 'ph-linkedin-logo',  label: 'LinkedIn',  url: 'https://linkedin.com/in/bhupendra-tale' },
              { id: 'instagram-link', icon: 'ph-instagram-logo', label: 'Instagram', url: 'https://www.instagram.com/bhoopendra_gurjar_05/' },
              { id: 'whatsapp-link',  icon: 'ph-whatsapp-logo',  label: 'WhatsApp',  url: 'https://wa.me/916263541948' },
              { id: 'vercel-link',    icon: 'ph-circles-three',  label: 'Vercel',    url: 'https://vercel.com/bhupendra-tales-projects' },
            ].map((s) => (
              <a href={s.url} key={s.id} id={s.id} className="social-link" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                <i className={`ph ${s.icon}`} />
              </a>
            ))}
            </div>
          </div>

          {/* Form */}
          <form className="contact-form" id="contact-form" onSubmit={handleSubmit} data-aos="fade-left">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Project Inquiry" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell me about your project..." required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" id="submit-btn" disabled={sending}>
              <span>{sending ? 'Sending…' : 'Send Message'}</span>
              <i className="ph ph-paper-plane-tilt" />
            </button>
            {success && (
              <div className="form-success show" id="form-success">
                <i className="ph ph-check-circle" />
                <span>Message sent successfully! I'll get back to you soon.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
