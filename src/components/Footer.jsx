import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Zap } from 'lucide-react';
const Footer = () => {
  return <motion.footer initial={{
    opacity: 0
  }} whileInView={{
    opacity: 1
  }} transition={{
    duration: 0.8
  }} viewport={{
    once: true
  }} className="py-8 px-4 border-t border-white/10 glass">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
          {/* Logo section */}
          <motion.div whileHover={{
            scale: 1.05
          }} className="flex items-center space-x-2">
            <img src="/favicon.png" alt="Kiernan" className="w-8 h-8 rounded-xl" />
            <span className="text-lg font-semibold gradient-text">Kiernan.Studio</span>
          </motion.div>

          {/* Tech info section */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-blue-400" />
              <span>Built with React & Tailwind</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Powered by Innovation</span>
            </div>
          </div>

          {/* Copyright section */}
          <div className="text-xs text-muted-foreground text-center lg:text-right">
            <span>© 2025 Kiernan. All rights reserved.</span>
          </div>
        </div>
      </div>
    </motion.footer>;
};
export default Footer;