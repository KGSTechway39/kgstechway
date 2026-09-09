import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FaPython,
  FaJsSquare,
  FaGithub,
  FaGraduationCap,
  FaLaptopCode,
  FaRobot,
  FaCertificate,
  FaUsers,
  FaCheckCircle,
  FaTheaterMasks,
  FaProjectDiagram,
  FaBriefcase,
  FaDatabase,
  FaNetworkWired,
  FaPlug
} from 'react-icons/fa';
import {
  SiTypescript,
  SiSelenium,
  SiOpenai,
  SiAnthropic,
  SiGooglegemini,
  SiLangchain,
  SiHuggingface
} from 'react-icons/si';
import InternshipApplyModal from './InternshipApplyModal';
import './InternshipProgram.css';

interface InternshipProgramProps {
  /** Render the title as <h1> — use only where this block is the page's main heading */
  asPageHeading?: boolean;
}

const InternshipProgram = ({ asPageHeading = false }: InternshipProgramProps) => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const [showApplyModal, setShowApplyModal] = useState(false);

  const tracks = [
    {
      name: 'Programming Foundations',
      color: '#00C896',
      duration: '4 Weeks',
      icon: <FaLaptopCode />,
      tools: [
        { name: 'Python', icon: <FaPython /> },
        { name: 'JavaScript', icon: <FaJsSquare /> },
        { name: 'TypeScript', icon: <SiTypescript /> }
      ],
      skills: [
        'Core syntax, logic building and problem solving',
        'Functions, OOP and clean code habits',
        'Modern ES6+ and type-safe development'
      ],
      project: {
        title: 'Student Placement Tracker',
        detail: 'A typed web app to record students, drives and results — your first end-to-end build.'
      }
    },
    {
      name: 'Test Automation',
      color: '#E67E22',
      duration: '4 Weeks',
      icon: <FaProjectDiagram />,
      tools: [
        { name: 'Selenium', icon: <SiSelenium /> },
        { name: 'Playwright', icon: <FaTheaterMasks /> }
      ],
      skills: [
        'Locators, waits and the Page Object Model',
        'Cross-browser and mobile-view testing',
        'HTML reports that read like real QA output'
      ],
      project: {
        title: 'E-Commerce Automation Suite',
        detail: 'Automate login, search, cart and checkout with a clean, reusable framework.'
      }
    },
    {
      name: 'Git & GitHub Workflow',
      color: '#F1C40F',
      duration: '2 Weeks',
      icon: <FaGithub />,
      tools: [{ name: 'GitHub', icon: <FaGithub /> }],
      skills: [
        'Branching, commits and pull requests',
        'Code review the way real teams do it',
        'CI pipelines with GitHub Actions'
      ],
      project: {
        title: 'Team Collaboration Simulation',
        detail: 'Work in a shared repo, raise PRs, review a teammate and ship green builds.'
      }
    },
    {
      name: 'Gen AI & Agentic AI',
      color: '#8B5CF6',
      duration: '4 Weeks',
      icon: <FaRobot />,
      tools: [
        { name: 'OpenAI', icon: <SiOpenai /> },
        { name: 'Claude API', icon: <SiAnthropic /> },
        { name: 'Gemini', icon: <SiGooglegemini /> },
        { name: 'LangChain', icon: <SiLangchain /> },
        { name: 'LangGraph', icon: <FaNetworkWired /> },
        { name: 'RAG + Vector DB', icon: <FaDatabase /> },
        { name: 'Hugging Face', icon: <SiHuggingface /> },
        { name: 'MCP', icon: <FaPlug /> }
      ],
      skills: [
        'Prompt engineering, few-shot patterns and structured JSON output',
        'RAG pipelines end to end — chunking, embeddings and vector search',
        'Agents that plan, call tools, remember context and self-correct',
        'Multi-agent workflows orchestrated with LangChain and LangGraph',
        'Connect agents to real tools and live data using MCP',
        'Guardrails, evaluation and token-cost control before you ship'
      ],
      project: {
        title: 'College Query AI Agent',
        detail: 'A RAG agent that answers questions from real college documents, calls tools to book appointments, and ships with its own chat UI.'
      }
    }
  ];

  const highlights = [
    { icon: <FaLaptopCode />, value: '8', label: 'Technologies' },
    { icon: <FaProjectDiagram />, value: '100%', label: 'Real-Time Projects' },
    { icon: <FaUsers />, value: '100%', label: 'Hands-On Training' },
    { icon: <FaCertificate />, value: '1', label: 'Verified Certificate' }
  ];

  const outcomes = [
    'A GitHub portfolio recruiters can actually open',
    'Real projects you can explain line by line',
    'Resume and LinkedIn profile built with you',
    'Mock interviews with honest, useful feedback',
    'Internship certificate from KGS Techway',
    'Daily mentor support — never stuck alone'
  ];

  return (
    <section
      id="internship"
      className={`internship-program ${isDarkMode ? 'dark' : 'light'}`}
    >
      <Container>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="internship-header text-center"
        >
          <div className="internship-badge">
            <FaGraduationCap className="me-2" />
            Internship Program
          </div>
          {asPageHeading ? (
            <h1 className="internship-title">
              Learn the Tools.
              <span className="internship-gradient"> Build Real Projects.</span>
            </h1>
          ) : (
            <h2 className="internship-title">
              Learn the Tools.
              <span className="internship-gradient"> Build Real Projects.</span>
            </h2>
          )}
          <p className="internship-subtitle">
            A practical technology internship for Final Year and 3rd Year students.
            No theory dumps — you write code, break things, fix them, and finish with
            projects worth showing in an interview.
          </p>

          <div className="internship-eligibility">
            <FaCheckCircle />
            <span>
              Priority for <strong>Final Year</strong> and <strong>3rd Year</strong> students —
              any degree, any branch. Beginners welcome.
            </span>
          </div>
        </motion.div>

        {/* ── Highlights ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="internship-highlights"
        >
          {highlights.map((item, i) => (
            <div className="highlight-item" key={i}>
              <div className="highlight-icon">{item.icon}</div>
              <div className="highlight-value">{item.value}</div>
              <div className="highlight-label">{item.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Tracks ── */}
        <Row className="internship-tracks">
          {tracks.map((track, index) => (
            <Col lg={6} key={track.name} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="track-card h-100"
                style={{ ['--track-color' as string]: track.color }}
              >
                <div className="track-head">
                  <div className="track-icon">{track.icon}</div>
                  <div className="track-heading">
                    <h4 className="track-name">{track.name}</h4>
                    <span className="track-duration">{track.duration}</span>
                  </div>
                </div>

                <div className="track-tools">
                  {track.tools.map((tool) => (
                    <span className="track-tool" key={tool.name}>
                      <span className="track-tool-icon">{tool.icon}</span>
                      {tool.name}
                    </span>
                  ))}
                </div>

                <ul className="track-skills">
                  {track.skills.map((skill) => (
                    <li key={skill}>
                      <FaCheckCircle className="track-tick" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>

                <div className="track-project">
                  <span className="track-project-label">
                    <FaBriefcase /> Project You Will Build
                  </span>
                  <strong className="track-project-title">{track.project.title}</strong>
                  <p className="track-project-detail">{track.project.detail}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* ── Outcomes + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="internship-outcome-card"
        >
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <h3 className="outcome-title">What You Walk Away With</h3>
              <ul className="outcome-list">
                {outcomes.map((item) => (
                  <li key={item}>
                    <FaCheckCircle className="outcome-tick" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg={5}>
              <div className="internship-cta">
                <h4>Seats are limited each batch</h4>
                <p>
                  Tell us your college, year and preferred track. Our team will share the
                  batch dates and next steps.
                </p>
                <motion.button
                  className="internship-cta-button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowApplyModal(true)}
                >
                  Apply for Internship
                </motion.button>
                <span className="internship-cta-note">
                  Online &amp; offline batches · Beginner friendly
                </span>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>

      <InternshipApplyModal
        show={showApplyModal}
        onHide={() => setShowApplyModal(false)}
      />
    </section>
  );
};

export default InternshipProgram;
