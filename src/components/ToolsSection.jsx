import React from 'react';
import { motion } from 'framer-motion';
import ToolCard from '@/components/ToolCard';
import { Rocket, Building2, Users } from 'lucide-react';

const tools = [
  {
    id: 'startups',
    name: 'Startups',
    description: 'Agile development for fast-moving teams who need rapid prototyping and quick iteration cycles.',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'neon-glow',
    url: 'https://portfolio-s.kiernan.studio',
    features: ['Rapid Prototyping', 'Market Validation', 'Growth Strategy'],
    buttonText: 'Startup-Focused View'
  },
  {
    id: 'corporations',
    name: 'Corporations',
    description: 'Enterprise-grade solutions with comprehensive documentation, security, and long-term maintenance.',
    icon: Building2,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'neon-glow-purple',
    url: 'https://portfolio-r.kiernan.studio',
    features: ['Risk Assessment', 'Quality Assurance', 'Performance Optimization'],
    buttonText: 'Enterprise-Focused View'
  },
  {
    id: 'freelance',
    name: 'Freelance Clients',
    description: 'Personal attention and custom solutions tailored to your unique vision and business goals.',
    icon: Users,
    color: 'from-pink-500 to-orange-500',
    glowColor: 'neon-glow-pink',
    url: 'https://portfolio-a.kiernan.studio',
    features: ['Discovery Sessions', 'Iterative Design', 'Launch Support'],
    buttonText: 'Freelance-Focused View'
  }
];

const ToolsSection = () => {
  return (
    <section className="py-4 px-4 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;