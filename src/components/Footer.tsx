export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <button className="nav-logo footer-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="logo-bracket">&lt;</span>Dev<span className="logo-bracket">/&gt;</span>
          </button>
          <p className="footer-text">
            Crafted with <span className="heart">♥</span> by Bhupendra Tale &copy; {new Date().getFullYear()}
          </p>
          <div className="footer-links">
            {['home', 'about', 'projects', 'contact'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
