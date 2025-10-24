import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaAws, 
  FaDocker,
  FaGitAlt,
  FaDatabase,
  FaMobile
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiKubernetes, 
  SiTensorflow, 
  SiMongodb, 
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiNextdotjs,
  SiTailwindcss,
  SiJenkins,
  SiElasticsearch,
  SiAngular,
  SiVuedotjs,
  SiFlutter
} from 'react-icons/si';
import './TechnologySection.css';

const TechnologySection = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);

  const techStacks = [
    {
      category: 'Frontend Technologies',
      icon: <FaReact />,
      color: '#61dafb',
      technologies: [
        { name: 'React.js', icon: <FaReact />, level: 95 },
        { name: 'Next.js', icon: <SiNextdotjs />, level: 90 },
        { name: 'TypeScript', icon: <SiTypescript />, level: 92 },
        { name: 'Angular', icon: <SiAngular />, level: 85 },
        { name: 'Vue.js', icon: <SiVuedotjs />, level: 80 },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 88 }
      ]
    },
    {
      category: 'Backend Technologies',
      icon: <FaNodeJs />,
      color: '#339933',
      technologies: [
        { name: 'Node.js', icon: <FaNodeJs />, level: 93 },
        { name: 'Python', icon: <FaPython />, level: 90 },
        { name: 'GraphQL', icon: <SiGraphql />, level: 85 },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 88 },
        { name: 'MongoDB', icon: <SiMongodb />, level: 87 },
        { name: 'Redis', icon: <SiRedis />, level: 82 }
      ]
    },
    {
      category: 'Cloud & DevOps',
      icon: <FaAws />,
      color: '#ff9900',
      technologies: [
        { name: 'AWS', icon: <FaAws />, level: 90 },
        { name: 'Docker', icon: <FaDocker />, level: 88 },
        { name: 'Kubernetes', icon: <SiKubernetes />, level: 85 },
        { name: 'Azure', icon: <SiJenkins />, level: 83 },
        { name: 'Jenkins', icon: <SiJenkins />, level: 80 },
        { name: 'Git', icon: <FaGitAlt />, level: 95 }
      ]
    },
    {
      category: 'Mobile Development',
      icon: <FaMobile />,
      color: '#007acc',
      technologies: [
        { name: 'React Native', icon: <FaReact />, level: 88 },
        { name: 'Flutter', icon: <SiFlutter />, level: 85 },
        { name: 'iOS Development', icon: <FaMobile />, level: 82 },
        { name: 'Android Development', icon: <FaMobile />, level: 80 }
      ]
    },
    {
      category: 'AI & Data Science',
      icon: <SiTensorflow />,
      color: '#ff6f00',
      technologies: [
        { name: 'TensorFlow', icon: <SiTensorflow />, level: 85 },
        { name: 'Machine Learning', icon: <FaDatabase />, level: 88 },
        { name: 'Data Analytics', icon: <SiElasticsearch />, level: 82 },
        { name: 'Computer Vision', icon: <FaDatabase />, level: 80 }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

//   const cardVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: 'easeInOut'
//       }
//     }
//   };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="technology" className={`technology-section ${isDarkMode ? 'dark' : 'light'}`}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header text-center"
        >
          <div className="section-badge">
            <FaDatabase className="me-2" />
            Technology Stack
          </div>
          <h2 className="section-title">
            Cutting-Edge Technologies
            <span className="gradient-text"> We Master</span>
          </h2>
          <p className="section-description">
            We leverage the latest technologies and frameworks to build robust, 
            scalable, and innovative solutions that drive your business forward.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="technologies-grid"
        >
          <Row>
            {techStacks.map((stack, index) => (
              <Col lg={6} key={index} className="mb-4">
                <motion.div>
                  <Card className={`tech-stack-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <div className="tech-header">
                      <div 
                        className="category-icon"
                        style={{ color: stack.color }}
                      >
                        {stack.icon}
                      </div>
                      <h4 className="category-title">{stack.category}</h4>
                    </div>
                    
                    <div className="tech-grid">
                      {stack.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          className="tech-item"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="tech-icon" style={{ color: stack.color }}>
                            {tech.icon}
                          </div>
                          <div className="tech-info">
                            <span className="tech-name">{tech.name}</span>
                            <div className="tech-level">
                              <div 
                                className="level-bar"
                                style={{ 
                                  width: `${tech.level}%`,
                                  backgroundColor: stack.color 
                                }}
                              ></div>
                            </div>
                            <span className="level-percentage">{tech.level}%</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Technology Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="tech-philosophy"
        >
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="philosophy-content">
                <h3 className="philosophy-title">Our Technology Philosophy</h3>
                <p className="philosophy-text">
                  We believe in choosing the right tool for the right job. Our technology decisions 
                  are driven by your business requirements, scalability needs, and long-term vision.
                </p>
                <div className="philosophy-points">
                  <div className="point-item">
                    <div className="point-icon" style={{ backgroundColor: primaryColor }}>1</div>
                    <div className="point-content">
                      <h5>Future-Proof Architecture</h5>
                      <p>We design systems that evolve with your business</p>
                    </div>
                  </div>
                  <div className="point-item">
                    <div className="point-icon" style={{ backgroundColor: primaryColor }}>2</div>
                    <div className="point-content">
                      <h5>Performance Optimization</h5>
                      <p>Every solution is optimized for speed and efficiency</p>
                    </div>
                  </div>
                  <div className="point-item">
                    <div className="point-icon" style={{ backgroundColor: primaryColor }}>3</div>
                    <div className="point-content">
                      <h5>Security First</h5>
                      <p>Security is built into every layer of our solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="tech-visual">
                <div className="floating-tech-icons">
                  <motion.div
                    className="floating-icon"
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <FaReact size={60} color="#61dafb" />
                  </motion.div>
                  <motion.div
                    className="floating-icon"
                    animate={{
                      y: [10, -10, 10],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1
                    }}
                  >
                    <FaNodeJs size={55} color="#339933" />
                  </motion.div>
                  <motion.div
                    className="floating-icon"
                    animate={{
                      y: [-8, 12, -8],
                      rotate: [0, 3, -3, 0]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 2
                    }}
                  >
                    <FaAws size={65} color="#ff9900" />
                  </motion.div>
                  <motion.div
                    className="floating-icon"
                    animate={{
                      y: [12, -8, 12],
                      rotate: [0, -3, 3, 0]
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5
                    }}
                  >
                    <FaPython size={50} color="#3776ab" />
                  </motion.div>
                </div>
              </div>
            </Col>
          </Row>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="tech-cta"
        >
          <div className="cta-content text-center">
            <h3>Ready to Leverage These Technologies?</h3>
            <p>
              Let's discuss how we can use our technical expertise to build 
              the perfect solution for your business needs.
            </p>
            <motion.button
              className="cta-button"
              style={{ backgroundColor: primaryColor }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
            >
              Start Your Project
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default TechnologySection;