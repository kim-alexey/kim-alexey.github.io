"use client";

import { useEffect, useRef, useState } from "react";
import {
  experiences,
  profile,
  projects,
  skillGroups,
  type Project,
} from "@/lib/content";
import { CursorTrail } from "./cursor-trail";

const resume = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Alexey-Kim-Resume.pdf`;
const links = ["About", "Experience", "Skills", "Projects", "Contact"];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConnectionMap() {
  const [focus, setFocus] = useState(0);
  const domains = [
    {
      label: "Technology",
      detail: "Understanding the tools behind the solution.",
      short: "BUILD",
      x: 110,
      y: 128,
    },
    {
      label: "Business",
      detail: "Starting with the people and the problem.",
      short: "UNDERSTAND",
      x: 352,
      y: 160,
    },
    {
      label: "Data",
      detail: "Turning information into useful questions.",
      short: "EXPLORE",
      x: 241,
      y: 370,
    },
  ];
  return (
    <div className="connection-map">
      <div className="map-topline">
        <span className="eyebrow">A CONNECTED PERSPECTIVE</span>
        <span className="map-marker">AK / 01</span>
      </div>
      <div className="graph-stage">
        <svg viewBox="0 0 460 455" fill="none" aria-hidden="true">
          <defs>
            <radialGradient id="halo">
              <stop stopColor="#95baff" stopOpacity=".14" />
              <stop offset="1" stopColor="#95baff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="230" cy="231" r="203" fill="url(#halo)" />
          <g stroke="currentColor" className="graph-guides">
            <circle cx="230" cy="231" r="170" />
            <circle cx="230" cy="231" r="116" />
            <path d="M230 16v430M14 231h432" strokeDasharray="3 7" />
            <path d="M104 128 352 160 241 370 104 128Z" />
          </g>
          {domains.map((d, i) => (
            <path
              key={d.label}
              d={`M230 231L${d.x} ${d.y}`}
              stroke={focus === i ? "#96bcff" : "#414953"}
              strokeWidth={focus === i ? 1.5 : 1}
            />
          ))}
          <g className="orbit-dot">
            <circle cx="230" cy="61" r="3" fill="#96bcff" />
          </g>
          <circle cx="230" cy="231" r="38" fill="#181e26" stroke="#687d9c" />
          <text
            x="230"
            y="241"
            textAnchor="middle"
            fill="#f3f2eb"
            fontSize="29"
            fontFamily="Instrument Serif, serif"
          >
            ak.
          </text>
          {domains.map((d, i) => (
            <g key={d.label}>
              <circle
                cx={d.x}
                cy={d.y}
                r="8"
                fill={focus === i ? "#a9c7ff" : "#1c2532"}
                stroke="#92b5ed"
              />
              <circle
                cx={d.x}
                cy={d.y}
                r="15"
                stroke="#92b5ed"
                opacity={focus === i ? 0.4 : 0}
              />
            </g>
          ))}
          <text x="28" y="440" fill="#8a939e" fontSize="10" letterSpacing="2">
            40.91° N
          </text>
          <text x="354" y="440" fill="#8a939e" fontSize="10" letterSpacing="2">
            73.12° W
          </text>
        </svg>
        {domains.map((d, i) => (
          <button
            key={d.label}
            className={`graph-label graph-label-${i} ${focus === i ? "selected" : ""}`}
            onClick={() => setFocus(i)}
            aria-pressed={focus === i}
          >
            <span>{d.short}</span>
            {d.label}
          </button>
        ))}
      </div>
      <p className="map-caption" aria-live="polite">
        <span className="tiny-dot" />
        {domains[focus].detail}
      </p>
    </div>
  );
}

function ProjectArt({ kind }: { kind: Project["illustration"] }) {
  if (kind === "map")
    return (
      <div className="project-art map-art" aria-hidden="true">
        <svg viewBox="0 0 360 210" fill="none">
          <g stroke="#627389" opacity=".45" strokeWidth="14">
            <path d="M-10 85h380M85-10v240M254-10v240M-10 210 370-10" />
          </g>
          <g stroke="#95baff" opacity=".35">
            <path d="M0 27h360M0 157h360M33 0v210M166 0v210M313 0v210" />
          </g>
          <path
            d="M85 155h82V85h87"
            stroke="#a6c6ff"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <circle cx="85" cy="155" r="5" fill="#a6c6ff" />
          <path
            d="M254 49c-15 0-26 11-26 25 0 19 26 38 26 38s26-19 26-38c0-14-11-25-26-25Z"
            fill="#9fc2ff"
          />
          <circle cx="254" cy="75" r="8" fill="#1b2636" />
        </svg>
        <span className="art-label">LOCAL PROBLEMS. MAPPED.</span>
      </div>
    );
  if (kind === "database")
    return (
      <div className="project-art database-art" aria-hidden="true">
        <div className="db-table">
          <b>TEAMS</b>
          <span>
            <i>PK</i> team_id
          </span>
          <span>team_name</span>
        </div>
        <div className="db-link" />
        <div className="db-table">
          <b>MATCHES</b>
          <span>
            <i>PK</i> match_id
          </span>
          <span>
            <i>FK</i> team_id
          </span>
        </div>
        <span className="art-label">A GAME OF RELATIONSHIPS.</span>
      </div>
    );
  return (
    <div className="project-art board-art" aria-hidden="true">
      {["PLAN", "IN PROGRESS", "REVIEW"].map((label, i) => (
        <div className="board-column" key={label}>
          <span>{label}</span>
          {Array.from({ length: i === 1 ? 3 : 2 }, (_, n) => (
            <div className="board-ticket" key={n}>
              <i />
              <b />
              <em />
            </div>
          ))}
        </div>
      ))}
      <span className="art-label">FROM SCOPE TO STRUCTURE.</span>
    </div>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (project && dialog && !dialog.open) dialog.showModal();
    if (!project && dialog?.open) dialog.close();
    if (project) {
      const prior = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prior;
      };
    }
  }, [project]);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="dialog-body">
          <button
            className="dialog-close"
            aria-label="Close project notes"
            onClick={onClose}
          >
            ×
          </button>
          <span className="eyebrow">{project.context}</span>
          <h2 id="project-title">{project.title}</h2>
          <div className="tags">
            {project.tools.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <h3>Project overview</h3>
          <p>{project.confirmed}</p>

          {project.sections?.map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.text}</p>
            </section>
          ))}

          {project.files && project.files.length > 0 && (
            <section>
              <h3>Explore the project files</h3>

              <div className="project-files">
                {project.files.map((file) => (
                  <a
                    key={file.path}
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${file.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{file.label}</span>
                    <Arrow diagonal />
                  </a>
                ))}
              </div>
            </section>
          )}

          {project.pending && (
            <>
              <h3>More to come</h3>
              <p>{project.pending}</p>
            </>
          )}
          <p className="illustration-note">
            The card graphic is an illustration, not a screenshot of the
            project.
          </p>
        </div>
      )}
    </dialog>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [trail, setTrail] = useState(true);
  const [filter, setFilter] = useState("All work");
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => {
    try {
      setTrail(localStorage.getItem("ak-cursor-trail") !== "off");
    } catch {
      /* storage can be unavailable */
    }
  }, []);
  const toggleTrail = () => {
    const next = !trail;
    setTrail(next);
    try {
      localStorage.setItem("ak-cursor-trail", next ? "on" : "off");
    } catch {
      /* optional preference */
    }
  };
  return (
    <>
      <CursorTrail enabled={trail} inDialog={project !== null} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="brand" aria-label="Alexey Kim home">
            ak<span>.</span>
            <span className="brand-name">ALEXEY KIM</span>
          </a>
          <nav
            aria-label="Main navigation"
            id="main-nav"
            className={menuOpen ? "nav-open" : ""}
          >
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </a>
            ))}
          </nav>
          <a className="resume-link" href={resume} download>
            Resume <Arrow diagonal />
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? (
              "×"
            ) : (
              <>
                <span />
                <span />
              </>
            )}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <div className="availability">
              <span />
              SEEKING SUMMER 2027 INTERNSHIPS
            </div>
            <h1>
              Technology.
              <br />
              With a business
              <br />
              perspective
            </h1>
            <p className="hero-description">{profile.introduction}</p>
            <div className="hero-actions">
              <a href="#projects" className="button button-primary">
                Explore my work <Arrow />
              </a>
              <a href={resume} download className="button button-quiet">
                Download resume <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <ConnectionMap />
          <div className="hero-foot">
            <span>BASED IN NEW YORK · ROOTED IN KOREA · BORN IN KAZAKHSTAN</span>
            <a href="#about">
              A little more about me <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <section
          className="about-section section-shell section-space"
          id="about"
        >
          <div className="section-label">
            <span>01 / ABOUT</span>
            <span className="label-line" />
          </div>
          <div className="about-grid">
            <div>
              <h2>
                Curious about systems.
                <br />
                Grounded in people
              </h2>
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/alexey-kim.png`}
                alt="Alexey Kim"
                className="profile-photo"
              />
            </div>
            <div className="about-copy">
              <div className="education-card">
                <span className="eyebrow">STONY BROOK UNIVERSITY</span>
                <h3>B.S. Information Systems</h3>
                <p>
                  Business & Economics specialization
                  <br />
                  Finance and Industrial Engineering minors
                </p>
                <div className="education-bottom">
                  <span>Expected graduation</span>
                  <b>
                    Spring 2028
                  </b>
                </div>
              </div>
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <div className="interest-note">
                <span className="eyebrow">WHAT I’M LOOKING TOWARD</span>
                <p>
                  Business & systems analysis · Data & business intelligence ·
                  Fintech · Product operations · Technical project management ·
                  Solutions engineering
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="experience-section section-shell section-space"
          id="experience"
        >
          <div className="section-label">
            <span>02 / EXPERIENCE</span>
            <span className="label-line" />
          </div>
          <div className="section-heading">
            <h2>
              Technology meets real people.
            </h2>
            <p>
              Campus work, teaching and support.
              <br />
              Different settings. A shared human focus.
            </p>
          </div>
          <div className="experience-list">
            {experiences.map((e, i) => (
              <details className="experience-item" key={e.role} open={i === 0}>
                <summary>
                  <span className="experience-date">{e.date}</span>
                  <span className="experience-title">
                    <strong>{e.role}</strong>
                    <span>{e.organization}</span>
                  </span>
                  <span className="experience-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="experience-detail">
                  <span className="eyebrow">{e.kind}</span>
                  <p>{e.description}</p>
                  <div className="tags">
                    {e.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
          </section>
          <section
            className="activities-section section-shell section-space"
            id="activities"
          >
            <div className="section-label">
              <span>03 / ACTIVITIES</span>
              <span className="label-line" />
            </div>

            <div className="section-heading">
              <h2>Beyond the classroom</h2>
              <p>
                Leadership, volunteering, and sports.
                <br />
                Experiences that shaped me.
              </p>
            </div>
          <div className="volunteer-note">
          <span className="volunteer-icon" aria-hidden="true">
            ✳
          </span>
          <div>
            <span className="eyebrow">
              HOST CITY AMBASSADOR · SUMMER 2026
            </span>

            <h3>FIFA World Cup 2026</h3>

            <p>New York City · City Hall Park & Staten Island Ferry</p>

            <ul className="activity-bullets">
              <li>
                Organized and facilitated transportation guidance for
                international visitors, streamlining pedestrian workflows
                and providing tournament information at high-traffic
                New York City locations.
              </li>
              <li>
                Resolved real-time visitor inquiries across busy locations
                by applying multilingual communication (Russian and Kazakh),
                optimizing workflows and ensuring a positive guest experience.
              </li>
            </ul>
            <div className="activity-documents">
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/documents/fifa-volunteer-certificate.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Volunteer certificate
                <Arrow diagonal />
              </a>

              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/documents/fifa-recommendation-letter.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Recommendation letter
                <Arrow diagonal />
              </a>
            </div>
          </div>

          <span className="volunteer-tag">VOLUNTEER</span>
        </div>
          <div className="volunteer-note">
          <span className="volunteer-icon" aria-hidden="true">
            ◎
          </span>

          <div>
            <span className="eyebrow">
              CO-FOUNDER & PRESIDENT · SEP 2022 — MAY 2024
            </span>

            <h3>English Speaking Club</h3>

            <p>
              Specialized Gymnasium No. 8 · Shymkent, Kazakhstan
            </p>

            <ul className="activity-bullets">
              <li>
                Co-founded an English-speaking club and used peer outreach
                to grow membership from 5 founding members to more than
                30 active participants over two years.
              </li>
            </ul>
          </div>

          <span className="volunteer-tag">LEADERSHIP</span>
        </div>

        <div className="volunteer-note">
          <span className="volunteer-icon" aria-hidden="true">
            ◇
          </span>

          <div>
            <span className="eyebrow">
              VICE PRESIDENT · SEP 2021 — MAY 2024
            </span>

            <h3>Debate Club</h3>

            <p>
              Specialized Gymnasium No. 8 · Shymkent, Kazakhstan
            </p>

            <ul className="activity-bullets">
              <li>
                Recruited students and organized debates on selected topics,
                helping grow club membership from 4 to 10 members.
              </li>
              <li>
                Led debate practices to help members prepare arguments and
                strengthen their speaking skills, contributing to one team
                victory in a city-level debate competition.
              </li>
            </ul>
          </div>

          <span className="volunteer-tag">PUBLIC SPEAKING</span>
        </div>
        <div className="volunteer-note">
          <span className="volunteer-icon" aria-hidden="true">
            ◇
          </span>

          <div>
            <span className="eyebrow">REGIONAL YOUTH TEAM · September 2016 - December 2020</span>

            <h3>Football (Soccer)</h3>

            <p>Kazakhstan</p>

            <ul className="activity-bullets">
              <li>
                Central Asian Championship Winner with the Kazakhstan U-15 National Team in 2019.
              </li>
              <li>
                Played for a regional youth football team in Kazakhstan
                from ages ten to fourteen.
              </li>
              <li>
                Traveled with my teammates and coach to compete in
                tournaments in neighboring countries.
              </li>
            </ul>
          </div>

          <span className="volunteer-tag">SPORTS</span>
        </div>
        <div className="volunteer-note">
          <span className="volunteer-icon" aria-hidden="true">
            ◉
          </span>

          <div>
            <span className="eyebrow">COMPETITIVE TRAINING · MAY 2011 - October 2016</span>

            <h3>Tennis</h3>

            <p>Kazakhstan</p>

            <ul className="activity-bullets">
              <li>
                Shymkent City Tennis Champion in 2014 and 2015, winning the city-level tournament for two consecutive years.
              </li>
              <li>
                Trained competitively in tennis from ages five to ten,
                developing my technique, footwork and coordination through
                everyday practice.
              </li>
              <li>
                Built concentration and persistence through individual training,
                learning to respond to mistakes and improve over time.
              </li>
            </ul>
          </div>

          <span className="volunteer-tag">SPORTS</span>
        </div>
        <p className="sports-note">
          I stepped away from competitive sports for health reasons.
        </p>
        </section>
        <section
          className="skills-section section-shell section-space"
          id="skills"
        >
          <div className="section-label">
            <span> 04 / SKILLS</span>
            <span className="label-line" />
          </div>
          <div className="section-heading">
            <h2>
              A practical toolkit
            </h2>
            <p>
              Built through study and experience.
              <br />
              Always adding to it.
            </p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.name}>
                <span className="skill-number">{group.number}</span>
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section className="projects-section section-space" id="projects">
          <div className="section-shell">
            <div className="section-label">
              <span>05 / PROJECTS</span>
              <span className="label-line" />
            </div>
            <div className="section-heading">
              <h2>
                Learning by building
              </h2>
              <p>
                Coursework and practical projects.
                <br />A growing collection of my work.
              </p>
            </div>
            <div className="project-filters" aria-label="Filter projects">
              {["All work", "Planning"].map((f) => (
                <button
                  key={f}
                  className={filter === f ? "active" : ""}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                  {f === "All work" && (
                    <span>{String(projects.length).padStart(2, "0")}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="project-grid" aria-live="polite">
              {projects
                .filter((p) => filter === "All work" || p.category === filter)
                .map((p) => (
                  <article className="project-card" key={p.id}>
                    <ProjectArt kind={p.illustration} />
                    <div className="project-content">
                      <div className="project-meta">
                        <span>{p.context}</span>
                        <span>{p.id}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      <div className="tags">
                        {p.tools.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                      <button
                        className="project-open"
                        onClick={() => setProject(p)}
                        aria-label={`Read project notes: ${p.title}`}
                      >
                        Project notes <Arrow diagonal />
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
        <section className="contact-section section-space" id="contact">
          <div className="section-shell">
            <div className="section-label">
              <span>06 / CONTACT</span>
              <span className="label-line" />
            </div>
            <div className="contact-grid">
              <div>
                <span className="eyebrow">LET’S CONNECT</span>
                <h2>
                  Have a problem
                  <br />
                  worth exploring?
                </h2>
                <p>
                  I’m seeking Summer 2027 internships, particularly in New York
                  City. I’d love to hear about opportunities involving
                  technology, business and data.
                </p>
                <a className="contact-email" href={`mailto:${profile.email}`}>
                  {profile.email}
                  <Arrow diagonal />
                </a>
              </div>
              <div className="contact-links">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <small>PROFESSIONAL PROFILE</small>LinkedIn
                  </span>
                  <Arrow diagonal />
                </a>
                <a href={resume} download>
                  <span>
                    <small>EXPERIENCE & EDUCATION</small>Download my resume
                  </span>
                  <span aria-hidden="true">↓</span>
                </a>
                <div className="contact-location">
                  <span className="tiny-dot" />
                  New York
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <a className="footer-brand" href="#home">
          ak.
        </a>
        <span>© 2026 Alexey Kim</span>
        <button
          className="trail-toggle"
          onClick={toggleTrail}
          aria-pressed={trail}
        >
          Cursor trail <span>{trail ? "On" : "Off"}</span>
        </button>
        <a href="#home">Back to top ↑</a>
      </footer>
      <ProjectDialog project={project} onClose={() => setProject(null)} />
    </>
  );
}
