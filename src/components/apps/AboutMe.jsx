import React from 'react';
import styles from './AboutMe.module.css';
import { FiGithub, FiInstagram, FiMail, FiPhone, FiLinkedin } from 'react-icons/fi';

const AboutMe = () => {
  const user = {
    realName: 'Muhamad Zaki',
    devName: 'Feunix',
    title: 'Full-Stack Developer',
    location: 'Jakarta, Indonesia',
    bio: 'A detail-oriented Full-Stack Developer with a unique background in performance analysis and data administration. My experience in analyzing business metrics and managing large-scale operational data has provided me with a strong foundation for building efficient, data-driven web applications. I am passionate about leveraging my analytical skills and technical expertise in both frontend and backend development to create innovative and impactful solutions.',
    education:
      'Completed 6 semesters towards a Bachelor of Information Systems at Budi Luhur University, building a strong theoretical foundation before transitioning to project-based learning to further specialize my skills.',
    email: 'feunixwork@gmail.com',
    phone: '(+62) 896-7775-0947',
    github: 'https://github.com/feunixs',
    linkedin: 'https://www.linkedin.com/in/feunix',
    instagram: 'https://www.instagram.com/feunixs',
    skills: {
      frontend: [
        'Next.js',
        'React.js',
        'Vue.js',
        'TailwindCSS',
        'UI/UX Design',
      ],
      backend: ['Node.js', 'Express.js', 'Nest.js', 'Fastify'],
      databases: ['PostgreSQL', 'MySQL', 'In-Memory DB', 'NewSQL'],
    },
    journey: [
      {
        role: 'Administrator',
        company: 'PT. Perkebunan Nusantara VI',
        summary:
          'Honed skills in systematic data management by overseeing daily operational data for a large-scale tea production facility, processing up to 35 tons of raw material daily.',
      },
      {
        role: 'Freelance Developer & Designer',
        company: 'Self-Employed',
        summary:
          'Developed full-stack solutions and designed user interfaces for various clients, gaining hands-on experience with a modern web technology stack.',
      },
      {
        role: 'Performance Analyst',
        company: 'WOM Finance',
        summary:
          'Built a strong analytical foundation by evaluating sales performance and providing data-driven solutions to achieve business targets across marketing, operational, and collection functions.',
      },
    ],
  };

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.header}>
        <img
          src="/assets/images/profile.svg"
          alt="Muhamad Zaki"
          className={styles.profilePic}
        />
        <div className={styles.headerText}>
          <h1 className={styles.name}>{user.realName}</h1>
          <p className={styles.devNameWrapper}>
            <span className={styles.devName}>{user.title}</span>
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.bio}>{user.bio}</p>

        <div className={styles.infoSection}>
          <h3 className={styles.sectionTitle}>Skills & Technologies</h3>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCategory}>
              <h4>Frontend</h4>
              <ul>
                {user.skills.frontend.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className={styles.skillCategory}>
              <h4>Backend</h4>
              <ul>
                {user.skills.backend.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className={styles.skillCategory}>
              <h4>Databases</h4>
              <ul>
                {user.skills.databases.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h3 className={styles.sectionTitle}>Professional Journey</h3>
          <div className={styles.journeyList}>
            {user.journey.map((job) => (
              <div key={job.role} className={styles.journeyItem}>
                <strong>{job.role}</strong> at <span>{job.company}</span>
                <p>{job.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.infoSection}>
          <h3 className={styles.sectionTitle}>Education</h3>
          <p>{user.education}</p>
        </div>

        <div className={styles.infoSection}>
          <h3 className={styles.sectionTitle}>Contact & Links</h3>
          <div className={styles.contactLinks}>
            <a
              href={user.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <FiGithub /> GitHub
            </a>
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <FiLinkedin /> LinkedIn
            </a>
            <a
              href={user.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <FiInstagram /> Instagram
            </a>
            <a href={`mailto:${user.email}`} className={styles.link}>
              <FiMail /> Email
            </a>
            <a href={`tel:${user.phone}`} className={styles.link}>
              <FiPhone /> Phone
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
