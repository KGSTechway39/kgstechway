import React, { memo } from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface StatCardProps {
  stat: {
    icon: React.ReactNode;
    number: string;
    label: string;
    description: string;
    color: string;
  };
  isDarkMode: boolean;
  index: number;
}

const StatCard = memo(({ stat, isDarkMode }: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="stat-card-wrapper"
    >
      <Card className={`stat-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
        <div 
          className="stat-icon"
          style={{ color: stat.color }}
        >
          {stat.icon}
        </div>
        <div className="stat-content">
          <div className="stat-number" style={{ color: stat.color }}>
            {stat.number}
          </div>
          <div className="stat-label">{stat.label}</div>
          <div className="stat-description">{stat.description}</div>
        </div>
      </Card>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';
export default StatCard;