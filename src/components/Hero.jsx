
import React from 'react';
import { motion } from 'framer-motion';
import Meteors from '@/components/ui/Meteors';
import ToolsSection from '@/components/ToolsSection';

const Hero = () => {
  return <section className="pt-24 lg:pt-32 pb-12 lg:pb-20 px-2 lg:px-4 relative overflow-hidden min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center">
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
          
          {/* Mobile Layout - Stack vertically */}
          <div className="flex flex-col items-center mb-6 md:hidden">
            <motion.div 
              className="w-32 h-32 rounded-full flex items-center justify-center mb-6"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(147, 51, 234, 0.8), 0 0 60px rgba(147, 51, 234, 0.4)",
                  "0 0 50px rgba(147, 51, 234, 1), 0 0 100px rgba(147, 51, 234, 0.6)",
                  "0 0 30px rgba(147, 51, 234, 0.8), 0 0 60px rgba(147, 51, 234, 0.4)"
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img src="/favicon.png" alt="Kiernan" className="w-32 h-32 rounded-full" />
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
            }} className="text-2xl font-bold gradient-text leading-tight pb-2 text-center">Full-Stack Developer <br />& Graphic Designer</motion.h1>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden md:flex items-center justify-center mb-6">
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
            }} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight pb-2">Full-Stack Developer <br />& Graphic Designer</motion.h1>
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
          }} className="text-base sm:text-lg lg:text-xl text-muted-foreground mx-2 sm:mx-8 lg:mx-20 max-w-5xl text-center">Crafting Innovative Web Solutions for Startups, Corporations, and Entrepreneurs</motion.p>
        </motion.div>
        <ToolsSection />
      </div>
    </section>;
};
export default Hero;
