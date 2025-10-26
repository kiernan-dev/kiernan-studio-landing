import React from 'react';
import { motion } from 'framer-motion';
import ToolCard from '@/components/ToolCard';
import { MessageSquare, Search, Workflow } from 'lucide-react';

const tools = [
  {
    id: 'startups',
    name: 'Startups',
    description: 'Cutting-edge Svelte solutions for remote teams and innovative projects. Fast, reactive, and built for scale.',
    icon: MessageSquare,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'neon-glow',
    url: 'https://portfolio-s.kiernan.studio',
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  },
  {
    id: 'corporations',
    name: 'Corporations',
    description: 'Robust React applications for enterprise-grade reliability. Scalable, maintainable, and production-ready.',
    icon: Search,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'neon-glow-purple',
    url: 'https://portfolio-r.kiernan.studio',
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  },
  {
    id: 'freelance',
    name: 'Freelance',
    description: 'Custom Astro-powered solutions for entrepreneurs and gig platforms. Fast, flexible, and future-proof.',
    icon: Workflow,
    color: 'from-pink-500 to-orange-500',
    glowColor: 'neon-glow-pink',
    url: 'https://portfolio-a.kiernan.studio',
    features: ['Feature 1', 'Feature 2', 'Feature 3']
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