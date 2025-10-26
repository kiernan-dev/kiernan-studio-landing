
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, CloudLightning } from 'lucide-react';
import Meteors from '@/components/ui/Meteors';
import ToolsSection from '@/components/ToolsSection';

const Hero = () => {
  return <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-[80vh] flex items-center justify-center">
      <Meteors number={20} />
      <div className="container mx-auto text-center relative z-10 select-none">
        <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
        }} className="mb-8">
          
          <div className="flex items-center justify-center mb-6">
            <motion.div 
              className="w-40 h-40 rounded-full flex items-center justify-center mr-8"
              animate={{
                boxShadow: [
                  "0 0 50px rgba(147, 51, 234, 0.8), 0 0 100px rgba(147, 51, 234, 0.4)",
                  "0 0 80px rgba(147, 51, 234, 1), 0 0 160px rgba(147, 51, 234, 0.6)",
                  "0 0 50px rgba(147, 51, 234, 0.8), 0 0 100px rgba(147, 51, 234, 0.4)"
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img src="/favicon.png" alt="Kiernan" className="w-40 h-40 rounded-full" />
            </motion.div>
            <motion.h1 initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="hidden sm:block text-4xl sm:text-5xl md:text-7xl font-bold gradient-text">Full-Stack Developer <br />& Graphic Designer</motion.h1>
          </div>
          
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
          }} className="text-base sm:text-lg md:text-xl text-muted-foreground mt-8 max-w-3xl mx-auto">Crafting Innovative Web Solutions for Startups, Corporations, and Entrepreneurs</motion.p>
        </motion.div>
        <ToolsSection />
      </div>
    </section>;
};
export default Hero;
