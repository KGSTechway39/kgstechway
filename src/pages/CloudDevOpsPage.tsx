import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaCloud,
  FaArrowLeft,
  FaDocker,
  FaCode,
  FaChartLine,
  FaExchangeAlt,
  FaCodeBranch,
  FaClock,
  FaCheckCircle,
} from 'react-icons/fa';
import {
  SiKubernetes,
  SiTerraform,
  SiPrometheus,
  SiGrafana,
} from 'react-icons/si';
import SEO from '../components/SEO';
import { generateServiceStructuredData, generateWebPageStructuredData } from '../utils/seoUtils';
import './ServiceDetailPage.css';

const CLOUD_COLOR = '#667eea';
const CLOUD_GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

const CloudDevOpsPage: React.FC = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);
  const navigate = useNavigate();
  const goToContact = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => navigate('/contact'), 300); };

  const features = [
    {
      title: 'Cloud Deployment & Management',
      description:
        'End-to-end provisioning, configuration, and ongoing management of workloads across AWS, Azure, and GCP with cost optimisation built in.',
      icon: <FaCloud />,
      technologies: ['AWS EC2 / EKS', 'Azure App Service', 'GCP Cloud Run', 'Auto-scaling', 'Cost Management', 'IAM & Security'],
    },
    {
      title: 'Docker & Kubernetes Containerisation',
      description:
        'Containerise applications for portability and reliability, then orchestrate them at scale with Kubernetes for zero-downtime deployments.',
      icon: <FaDocker />,
      technologies: ['Docker', 'Kubernetes', 'Helm Charts', 'OpenShift', 'Service Mesh (Istio)', 'Container Security'],
    },
    {
      title: 'CI/CD Pipelines',
      description:
        'Automated build, test, and deploy pipelines that integrate quality gates and security scans into every push — cutting release time drastically.',
      icon: <FaCodeBranch />,
      technologies: ['Jenkins', 'GitHub Actions', 'Azure DevOps', 'GitLab CI', 'CircleCI', 'ArgoCD'],
    },
    {
      title: 'Infrastructure as Code',
      description:
        'Define, version, and provision your entire infrastructure programmatically for repeatable, auditable, and drift-free environments.',
      icon: <FaCode />,
      technologies: ['Terraform', 'CloudFormation', 'Pulumi', 'Ansible', 'AWS CDK', 'Chef / Puppet'],
    },
    {
      title: 'Monitoring & Logging',
      description:
        'Full-stack observability — metrics, traces, and logs — giving your team early warning of issues and the context to fix them fast.',
      icon: <FaChartLine />,
      technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'Datadog', 'AWS CloudWatch', 'Jaeger (Tracing)'],
    },
    {
      title: 'Cloud Migration Services',
      description:
        'Lift-and-shift, re-platform, or re-architect — we assess your current estate and move workloads to the cloud with minimal disruption.',
      icon: <FaExchangeAlt />,
      technologies: ['Migration Assessment', 'Lift & Shift', 'Re-platforming', 'Data Migration', 'Hybrid Cloud', 'Cutover Planning'],
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Assessment & Strategy',
      description:
        'Audit current infrastructure, identify risks and quick wins, and build a prioritised cloud roadmap.',
      duration: '1–2 weeks',
    },
    {
      step: '02',
      title: 'Infrastructure Design',
      description:
        'Architect scalable, secure cloud environments with network topology, IAM policies, and IaC blueprints.',
      duration: '2–4 weeks',
    },
    {
      step: '03',
      title: 'Implementation & Automation',
      description:
        'Provision infrastructure, build CI/CD pipelines, containerise apps, and run automated deployment tests.',
      duration: '4–10 weeks',
    },
    {
      step: '04',
      title: 'Monitoring & Optimisation',
      description:
        'Set up observability dashboards, define SLOs, and run continuous cost and performance tuning.',
      duration: 'Ongoing',
    },
  ];

  const offerings = [
    {
      title: 'Cloud Strategy & Migration',
      description: 'End-to-end cloud transformation from assessment through to post-migration stabilisation.',
      items: [
        'Multi-cloud strategy',
        'Legacy modernisation',
        'Data migration & sync',
        'Security & compliance',
      ],
    },
    {
      title: 'DevOps & Automation',
      description: 'Cultural and tooling transformation that makes continuous delivery the default, not the exception.',
      items: [
        'CI/CD pipeline setup',
        'IaC implementation',
        'Container orchestration',
        'GitOps workflows',
      ],
    },
    {
      title: 'Observability & Security',
      description: 'Comprehensive monitoring, alerting, and security hardening so nothing catches you off-guard.',
      items: [
        'Real-time metrics & dashboards',
        'Centralised log management',
        'Security scanning & SIEM',
        'Incident response playbooks',
      ],
    },
  ];

  const serviceData = {
    name: 'Cloud & DevOps Solutions',
    description:
      'Full-spectrum cloud and DevOps services: deployment, containerisation, CI/CD pipelines, infrastructure as code, monitoring, and cloud migration.',
    features: features.map((f) => f.title),
    technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Prometheus'],
    benefits: ['Faster Releases', 'Infrastructure Reliability', 'Cost Optimisation', 'Security at Scale'],
    priceRange: '$$$',
  };

  const structuredData = [
    generateServiceStructuredData(serviceData),
    generateWebPageStructuredData({
      name: 'Cloud & DevOps Solutions | KGSTechway',
      description:
        'Professional cloud and DevOps services including AWS / Azure / GCP management, Kubernetes, CI/CD pipelines, Terraform IaC, monitoring, and cloud migration.',
      url: 'https://kgstechway.com/services/cloud-devops',
      breadcrumbs: [
        { name: 'Home', url: 'https://kgstechway.com' },
        { name: 'Services', url: 'https://kgstechway.com/services' },
        { name: 'Cloud & DevOps', url: 'https://kgstechway.com/services/cloud-devops' },
      ],
    }),
  ];

  return (
    <div className={`service-detail-page ${isDarkMode ? 'dark' : 'light'}`}>
      <SEO structuredData={structuredData} />

      {/* Hero */}
      <section className="service-hero">
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Link to="/services" className="back-link mb-3 d-inline-flex align-items-center">
                  <FaArrowLeft className="me-2" />
                  Back to Services
                </Link>

                <div className="service-icon-large mb-4" style={{ background: CLOUD_GRADIENT }}>
                  <FaCloud />
                </div>

                <h1 className="hero-title">
                  Cloud &amp; DevOps
                  <span className="gradient-text"> Solutions</span>
                </h1>

                <p className="hero-description">
                  Accelerate delivery, reduce operational risk, and cut infrastructure costs.
                  Our cloud and DevOps engineers design, build, and run the platforms that
                  keep your product fast, reliable, and secure at any scale.
                </p>

                <div className="hero-actions">
                  <Button size="lg" className="primary-btn me-3" onClick={goToContact}>
                    Start Cloud Journey
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={goToContact}>
                    Free Cloud Assessment
                  </Button>
                </div>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-visual"
              >
                <div className="tech-showcase">
                  <div className="hero-dashboard">
                    <div className="dashboard-header">
                      <div className="dashboard-header-left">
                        <FaCloud className="dashboard-header-icon" style={{ color: CLOUD_COLOR }} />
                        Cloud & DevOps Pipeline
                      </div>
                      <div className="dashboard-live-badge">
                        <span className="live-dot" /> DEPLOYED
                      </div>
                    </div>
                    <div className="dashboard-metrics">
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: `${CLOUD_COLOR}22`, color: CLOUD_COLOR }}><FaCloud /></div>
                        <span className="metric-value">99.9%</span>
                        <span className="metric-label">Uptime SLA</span>
                        <span className="metric-sub">Multi-region failover</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(250,112,154,0.18)', color: '#fa709a' }}><FaCodeBranch /></div>
                        <span className="metric-value">CI/CD</span>
                        <span className="metric-label">Auto Pipeline</span>
                        <span className="metric-sub">Build → Test → Deploy</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(67,233,123,0.18)', color: '#43e97b' }}><FaDocker /></div>
                        <span className="metric-value">K8s</span>
                        <span className="metric-label">Container Orchestration</span>
                        <span className="metric-sub">Docker & Kubernetes</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(241,196,15,0.18)', color: '#f1c40f' }}><FaChartLine /></div>
                        <span className="metric-value">40%</span>
                        <span className="metric-label">Cost Savings</span>
                        <span className="metric-sub">Cloud cost optimization</span>
                      </div>
                    </div>
                    <div className="dashboard-footer">
                      <span className="footer-label">Stack:</span>
                      {['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Prometheus'].map(t => (
                        <span key={t} className="tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Service Categories */}
      <section className="features-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Cloud &amp; DevOps Capabilities</h2>
            <p className="section-description">
              Six core disciplines that cover the full cloud-native delivery lifecycle
            </p>
          </motion.div>

          <Row>
            {features.map((feature, index) => (
              <Col lg={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`feature-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <Card.Body>
                      <div className="feature-header">
                        <div className="feature-icon" style={{ color: CLOUD_COLOR }}>
                          {feature.icon}
                        </div>
                        <h4 className="feature-title">{feature.title}</h4>
                      </div>
                      <p className="feature-description">{feature.description}</p>
                      <div className="feature-technologies">
                        {feature.technologies.map((tech, i) => (
                          <Badge key={i} bg="primary" className="me-2 mb-2">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Service Offerings */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Service Offerings</h2>
            <p className="section-description">
              Packaged cloud and DevOps services designed around your team's maturity and goals
            </p>
          </motion.div>

          <Row>
            {offerings.map((offering, index) => (
              <Col lg={4} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`feature-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <Card.Body>
                      <h5 className="mb-3">{offering.title}</h5>
                      <p className="mb-3">{offering.description}</p>
                      <div>
                        {offering.items.map((item, i) => (
                          <div key={i} className="d-flex align-items-center mb-2">
                            <FaCheckCircle className="me-2 flex-shrink-0" style={{ color: primaryColor }} />
                            <small>{item}</small>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Implementation Process */}
      <section className="process-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Implementation Process</h2>
            <p className="section-description">
              Our proven methodology for cloud migration and DevOps transformation
            </p>
          </motion.div>

          <Row>
            {process.map((step, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="process-step"
                >
                  <div className="step-number" style={{ backgroundColor: CLOUD_COLOR }}>
                    {step.step}
                  </div>
                  <div className="step-content">
                    <h5 className="step-title">{step.title}</h5>
                    <p className="step-description">{step.description}</p>
                    <div className="step-duration">
                      <FaClock className="me-1" />
                      {step.duration}
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Key Tools Highlight */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Core Tools &amp; Platforms</h2>
            <p className="section-description">
              Industry-standard technology we bring expertise in from day one
            </p>
          </motion.div>

          <Row className="justify-content-center">
            {[
              { label: 'AWS', icon: <FaCloud />, color: '#ff9900' },
              { label: 'Azure', icon: <FaCloud />, color: '#0089d6' },
              { label: 'GCP', icon: <FaCloud />, color: '#4285f4' },
              { label: 'Docker', icon: <FaDocker />, color: '#2496ed' },
              { label: 'Kubernetes', icon: <SiKubernetes />, color: '#326ce5' },
              { label: 'Terraform', icon: <SiTerraform />, color: '#7b42bc' },
              { label: 'Prometheus', icon: <SiPrometheus />, color: '#e6522c' },
              { label: 'Grafana', icon: <SiGrafana />, color: '#f46800' },
            ].map((tool, index) => (
              <Col key={tool.label} xs={6} sm={4} md={3} lg={2} className="mb-4 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.08 }}
                  viewport={{ once: true }}
                  className={`feature-card py-3 ${isDarkMode ? 'dark' : 'light'}`}
                  style={{ cursor: 'default' }}
                >
                  <div style={{ fontSize: '2rem', color: tool.color, marginBottom: '0.4rem' }}>
                    {tool.icon}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{tool.label}</div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="cta-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className={`cta-card ${isDarkMode ? 'dark' : 'light'}`}>
              <Card.Body className="py-5">
                <h3 className="cta-title">Ready for Cloud Transformation?</h3>
                <p className="cta-description">
                  Let's design a cloud strategy that ships faster, costs less, and scales without surprises.
                </p>
                <div className="cta-actions">
                  <Button size="lg" className="primary-btn me-3" onClick={goToContact}>
                    Start Cloud Journey
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={goToContact}>
                    Free Cloud Assessment
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default CloudDevOpsPage;
