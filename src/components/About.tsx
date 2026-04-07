

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Turning Ideas into<br /><em>Digital Reality</em>
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-image-col" data-aos="fade-right">
            <div className="about-img-wrapper">
              <div className="about-img-bg" />
              <div className="about-img-card">
                <div className="about-img-inner">
                  <img src="/2.jpeg" alt="Bhupendra Tale" className="about-img" />
                </div>
              </div>
              <div className="about-badge-floating">
                <i className="ph ph-star" />
                <span>Top Rated</span>
              </div>
            </div>
          </div>

          <div className="about-text-col" data-aos="fade-left">
            <p className="about-intro">
              I'm a <strong>Full-stack developer</strong> specializing in building high-performance, responsive 
              web applications using the MERN stack (MongoDB, Express, React, Node.js). 
              I focus on creating intuitive user experiences and maintainable, clean code.
            </p>
            <p className="about-body">
              Currently pursuing a B.Tech. in Computer Science at SIRT Bhopal (Batch of 2026), 
              I have a strong foundation in data structures and algorithms, with 
              over 150+ coding problems solved on GeeksforGeeks.
            </p>
 
            <div className="about-highlights">
              <div className="highlight-item">
                <i className="ph ph-graduation-cap" />
                <span>B.Tech CSE @ SIRT (7.12 CGPA)</span>
              </div>
              <div className="highlight-item">
                <i className="ph ph-certificate" />
                <span>Academic Excellence: 89% in XII | 88% in X</span>
              </div>
              <div className="highlight-item">
                <i className="ph ph-trophy" />
                <span>150+ Coding Problems Solved</span>
              </div>
              <div className="highlight-item">
                <i className="ph ph-palette" />
                <span>Professional UI/UX Design Skills</span>
              </div>
            </div>

            <a href="#contact" className="btn btn-primary about-cta">
              <span>Let's Collaborate</span>
              <i className="ph ph-hand-waving" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
