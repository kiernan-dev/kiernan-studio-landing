import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
const Header = () => {
  const {
    theme,
    setTheme
  } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'light':
        return <Sun className="h-5 w-5" />;
      default:
        return <Laptop className="h-5 w-5" />;
    }
  };
  return <motion.header initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6
  }} className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="glass rounded-xl flex justify-between items-center px-4 py-3">
            <motion.div whileHover={{
          scale: 1.05
        }} className="flex items-center space-x-3">
              <span className="text-xl font-bold gradient-text">Kiernan.Studio</span>
            </motion.div>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full transition-colors duration-300">
              {getThemeIcon()}
            </Button>
        </div>
      </div>
    </motion.header>;
};
export default Header;