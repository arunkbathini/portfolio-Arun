import { profile } from "@/content/site";

export function AboutSection() {
  return (
    <section className="about-section">
      <h2>About Me</h2>
      <p>{profile.bio}</p>
    </section>
  );
}

export function CertificationWall() {
  return (
    <section className="certifications-section">
      <h2>Certifications</h2>
      <div className="certifications-grid">
        {profile.certifications?.map((cert, idx) => (
          <div key={idx} className="certification-card">
            <h3>{cert.name}</h3>
            <p className="issuer">{cert.issuer}</p>
            {cert.date && <p className="date">{cert.date}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ExperienceShowcase() {
  return (
    <section className="experience-section">
      <h2>Experience</h2>
      <div className="experience-list">
        {profile.experience?.map((job, idx) => (
          <div key={idx} className="experience-item">
            <h3>{job.title}</h3>
            <p className="company">{job.company}</p>
            <p className="period">{job.period}</p>
            {job.description && <p className="description">{job.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkillProcessBoard() {
  return (
    <section className="skills-section">
      <h2>Skills</h2>
      <div className="skills-grid">
        {profile.skills?.map((skill, idx) => (
          <div key={idx} className="skill-category">
            <h3>{skill.category}</h3>
            <ul>
              {skill.items?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="contact-section">
      <h2>Get in Touch</h2>
      <p>Feel free to reach out for any opportunities or collaborations.</p>
      <div className="contact-links">
        {profile.social?.map((link, idx) => (
          <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.name}
          </a>
        ))}
      </div>
    </section>
  );
}
