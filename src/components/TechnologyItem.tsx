import React, { memo } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface TechnologyItemProps {
  tech: {
    name: string;
    level: number;
    description: string;
    icon: string;
  };
  index: number;
  primaryColor: string;
}

const TechnologyItem = memo(({ tech, index, primaryColor }: TechnologyItemProps) => {
  return (
    <motion.div
      className="tech-item enhanced"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="tech-header">
        <div className="tech-icon-name">
          <span className="tech-emoji">{tech.icon}</span>
          <span className="tech-name">{tech.name}</span>
        </div>
        <span className="tech-percentage">{tech.level}%</span>
      </div>
      <p className="tech-description">{tech.description}</p>
      <ProgressBar
        now={tech.level}
        className="tech-progress"
        style={{ 
          '--progress-color': primaryColor,
          height: '6px',
          borderRadius: '3px'
        } as React.CSSProperties}
      />
    </motion.div>
  );
});

TechnologyItem.displayName = 'TechnologyItem';
export default TechnologyItem;