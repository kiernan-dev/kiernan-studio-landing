import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const ToolCard = React.memo(({ tool }) => {
  const { name, description, icon: Icon, color, glowColor, features, url } = tool;

  const handleLaunchTool = useCallback(() => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [url]);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative h-full cursor-pointer"
      onClick={handleLaunchTool}
    >
      <div className={`glass rounded-2xl p-8 h-full flex flex-col dark:hover:${glowColor} transition-all duration-500`}>
        <div className="relative mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg dark:shadow-none dark:${glowColor}`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        <div className="flex-grow flex flex-col space-y-4">
          <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
            {name}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed flex-grow">
            {description}
          </p>

          <div className="space-y-2 pt-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 text-sm text-muted-foreground"
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`} />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-8"
        >
          <div
            className={`w-full bg-gradient-to-r ${color} hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 group/btn inline-flex items-center justify-center`}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Launch {name}</span>
              <motion.div
                className="group-hover:translate-x-1 transition-transform duration-200"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </span>
          </div>
        </motion.div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink className="w-5 h-5 text-muted-foreground" />
        </div>

        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
      </div>
    </motion.div>
  );
});

ToolCard.displayName = 'ToolCard';

export default ToolCard;