import React from 'react';
import { useSelector } from 'react-redux';
import InternshipProgram from '../components/InternshipProgram';
import SEO from '../components/SEO';
import {
  generateWebPageStructuredData,
  generateCompanyStructuredData,
  generateFAQStructuredData
} from '../utils/seoUtils';

const InternshipPage: React.FC = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const internshipFAQs = [
    {
      question: 'Who can apply for the KGS Techway internship program?',
      answer:
        'The program is open to college students of any degree and any branch, with priority given to Final Year and 3rd Year students. Beginners are welcome — we start from the basics and build up to real projects.'
    },
    {
      question: 'Which technologies are covered in the internship?',
      answer:
        'Eight core technologies across four tracks: Python, JavaScript and TypeScript (Programming Foundations), Selenium and Playwright (Test Automation), GitHub (Git and GitHub Workflow), and Gen AI with Agentic AI (AI Track).'
    },
    {
      question: 'Will I build real projects during the internship?',
      answer:
        'Yes. Every track ends with a working project you build yourself — a Student Placement Tracker, an E-Commerce Automation Suite, a Team Collaboration Simulation, and a College Query AI Agent. All of them go into your GitHub portfolio.'
    },
    {
      question: 'Do I get a certificate after completing the internship?',
      answer:
        'Yes. You receive a verified internship certificate from KGS Techway Services Private Limited, along with a GitHub portfolio, a rebuilt resume and LinkedIn profile, and mock interview practice.'
    },
    {
      question: 'Is the internship online or offline?',
      answer:
        'Both online and offline batches are available. Share your college, year and preferred track through the enquiry form and our team will send you the current batch dates.'
    }
  ];

  const structuredData = [
    generateWebPageStructuredData({
      name: 'Technology Internship Program | KGS Techway',
      description:
        'Practical technology internship for Final Year and 3rd Year students covering Python, JavaScript, TypeScript, Selenium, Playwright, GitHub, Gen AI and Agentic AI — with four real projects and a verified certificate.',
      url: 'https://kgstechway.com/internship',
      breadcrumbs: [
        { name: 'Home', url: 'https://kgstechway.com' },
        { name: 'Internship', url: 'https://kgstechway.com/internship' }
      ]
    }),
    generateFAQStructuredData(internshipFAQs),
    generateCompanyStructuredData()
  ];

  return (
    <div
      className={isDarkMode ? 'dark-theme' : 'light-theme'}
      style={{ minHeight: '100vh', paddingTop: '80px' }}
    >
      <SEO
        title="Technology Internship Program for College Students | KGS Techway"
        description="Practical internship in Python, JavaScript, TypeScript, Selenium, Playwright, GitHub, Gen AI and Agentic AI. Build four real projects, get a verified certificate. Priority for Final Year and 3rd Year students."
        keywords="internship for college students, final year internship, Python internship, Selenium Playwright internship, Gen AI internship, Agentic AI internship, software testing internship, internship in Krishnagiri, Tamil Nadu internship program"
        canonicalUrl="https://kgstechway.com/internship"
        ogTitle="Technology Internship Program - KGS Techway"
        ogDescription="Learn the tools. Build real projects. A hands-on internship for Final Year and 3rd Year students across 8 in-demand technologies."
        structuredData={structuredData}
      />

      {/* Program Details — carries the page's <h1> now that the header block is gone */}
      <InternshipProgram asPageHeading />
    </div>
  );
};

export default InternshipPage;
