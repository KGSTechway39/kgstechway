import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaAws,
  FaDocker,
  FaCode,
  FaDatabase,
  FaMobileAlt,
  FaCloud,
  FaCogs,
  FaBug,
  FaTachometerAlt,
} from 'react-icons/fa';
import {
  SiAngular,
  SiVuedotjs,
  SiNextdotjs,
  SiDotnet,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiGooglecloud,
  SiKubernetes,
  SiJenkins,
  SiGithubactions,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiSelenium,
  SiCypress,
  SiPostman,
} from 'react-icons/si';

// Playwright brand icon (not yet in react-icons/si)
const PlaywrightIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c2.71 0 5.195.978 7.115 2.59L4.59 19.115A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2zm0 20c-2.71 0-5.195-.978-7.115-2.59L19.41 4.885A9.964 9.964 0 0 1 22 12c0 5.523-4.477 10-10 10z"/>
  </svg>
);
import './TechStackSection.css';

interface Tech {
  name: string;
  icon: React.ReactNode;
  color: string;
  featured?: boolean;
}

interface Category {
  id: string;
  name: string;
  categoryColor: string;
  categoryIcon: React.ReactNode;
  techs: Tech[];
}

const TechStackSection = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const categories: Category[] = [
    {
      id: 'frontend',
      name: 'Frontend',
      categoryColor: '#61dafb',
      categoryIcon: <FaCode />,
      techs: [
        { name: 'React', icon: <FaReact />, color: '#61dafb' },
        { name: 'Angular', icon: <SiAngular />, color: '#dd0031' },
        { name: 'Vue.js', icon: <SiVuedotjs />, color: '#42b883' },
        { name: 'Next.js', icon: <SiNextdotjs />, color: isDarkMode ? '#ffffff' : '#000000' },
      ],
    },
    {
      id: 'backend',
      name: 'Backend',
      categoryColor: '#339933',
      categoryIcon: <FaDatabase />,
      techs: [
        { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
        { name: 'Python', icon: <FaPython />, color: '#3776ab' },
        { name: 'Java', icon: <FaJava />, color: '#f89820' },
        { name: '.NET', icon: <SiDotnet />, color: '#512bd4' },
      ],
    },
    {
      id: 'mobile',
      name: 'Mobile',
      categoryColor: '#54c5f8',
      categoryIcon: <FaMobileAlt />,
      techs: [
        { name: 'Flutter', icon: <SiFlutter />, color: '#54c5f8' },
        { name: 'React Native', icon: <FaReact />, color: '#61dafb' },
        { name: 'Swift', icon: <SiSwift />, color: '#fa7343' },
        { name: 'Kotlin', icon: <SiKotlin />, color: '#7f52ff' },
      ],
    },
    {
      id: 'cloud',
      name: 'Cloud',
      categoryColor: '#ff9900',
      categoryIcon: <FaCloud />,
      techs: [
        { name: 'AWS', icon: <FaAws />, color: '#ff9900' },
        { name: 'Azure', icon: <FaCloud />, color: '#0089d6' },
        { name: 'GCP', icon: <SiGooglecloud />, color: '#4285f4' },
      ],
    },
    {
      id: 'devops',
      name: 'DevOps',
      categoryColor: '#326ce5',
      categoryIcon: <FaCogs />,
      techs: [
        { name: 'Docker', icon: <FaDocker />, color: '#2496ed' },
        { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326ce5' },
        { name: 'Jenkins', icon: <SiJenkins />, color: '#d33833' },
        { name: 'GitHub Actions', icon: <SiGithubactions />, color: '#2088ff' },
      ],
    },
    {
      id: 'database',
      name: 'Database',
      categoryColor: '#336791',
      categoryIcon: <FaDatabase />,
      techs: [
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
        { name: 'MySQL', icon: <SiMysql />, color: '#4479a1' },
        { name: 'Redis', icon: <SiRedis />, color: '#dc382d' },
      ],
    },
    {
      id: 'qa',
      name: 'QA Tools',
      categoryColor: '#11998e',
      categoryIcon: <FaBug />,
      techs: [
        { name: 'Playwright', icon: <PlaywrightIcon />, color: '#2EAD33', featured: true },
        { name: 'Selenium', icon: <SiSelenium />, color: '#43b02a' },
        { name: 'Cypress', icon: <SiCypress />, color: '#69d3a7' },
        { name: 'JMeter', icon: <FaTachometerAlt />, color: '#d22128' },
        { name: 'Postman', icon: <SiPostman />, color: '#ff6c37' },
      ],
    },
  ];

  return (
    <section id="tech-stack" className={`techstack-section ${isDarkMode ? 'dark' : 'light'}`}>
      <Container>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="techstack-header text-center"
        >
          <div className="techstack-badge">
            <FaCogs className="me-2" />
            Technologies We Work With
          </div>
          <h2 className="techstack-title">
            Our Full
            <span className="techstack-gradient-text"> Technology Stack</span>
          </h2>
          <p className="techstack-description">
            From frontend frameworks to cloud infrastructure and QA tooling — we bring the right technology to every layer of your product.
          </p>
        </motion.div>

        {/* Category rows */}
        <div className="techstack-categories">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.id}
              className="techstack-row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.07 }}
              viewport={{ once: true }}
            >
              {/* Category label */}
              <div
                className="techstack-category-label"
                style={{
                  borderColor: `${cat.categoryColor}40`,
                  background: `${cat.categoryColor}12`,
                }}
              >
                <span className="techstack-category-icon" style={{ color: cat.categoryColor }}>
                  {cat.categoryIcon}
                </span>
                <span className="techstack-category-name" style={{ color: cat.categoryColor }}>
                  {cat.name}
                </span>
              </div>

              {/* Tech pills */}
              <div className="techstack-pills">
                {cat.techs.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    className={`techstack-pill ${isDarkMode ? 'dark' : 'light'}${tech.featured ? ' techstack-pill--featured' : ''}`}
                    style={{
                      '--pill-color': tech.color,
                      ...(tech.featured ? {
                        background: 'linear-gradient(135deg, rgba(46,173,51,0.2), rgba(0,200,150,0.15))',
                        border: '1.5px solid rgba(46,173,51,0.7)',
                        boxShadow: '0 0 14px rgba(46,173,51,0.35)',
                      } : {}),
                    } as React.CSSProperties}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: catIndex * 0.07 + techIndex * 0.05 }}
                    whileHover={{ y: -4, scale: 1.06 }}
                    viewport={{ once: true }}
                  >
                    <span className="techstack-pill-icon" style={{ color: tech.color }}>
                      {tech.icon}
                    </span>
                    <span className="techstack-pill-name" style={tech.featured ? { fontWeight: 700, color: '#2EAD33' } : {}}>
                      {tech.featured ? '⚡ ' : ''}{tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TechStackSection;
