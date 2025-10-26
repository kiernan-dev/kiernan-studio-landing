# Kiernan.Studio

A modern, high-performance portfolio landing page built with React and Vite, showcasing full-stack development and graphic design work for startups, corporations, and freelance clients.

## ✨ Features

- **Modern React**: Built with React 18 and modern hooks
- **Lightning Fast**: Powered by Vite for instant development and optimized builds
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Automatic system theme detection with manual toggle
- **Smooth Animations**: Hardware-accelerated animations with Framer Motion
- **Performance Optimized**: Zero memory leaks, memoized components, and optimized bundle size
- **Accessible**: Built with semantic HTML and ARIA best practices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd kiernan.studio-landing

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Available Scripts

```bash
# Development
pnpm run dev          # Start Vite dev server on http://localhost:5173

# Production
pnpm run build        # Build for production
pnpm run preview      # Preview production build locally
```

## 🛠 Tech Stack

### Core

- **React 18** - UI library with modern hooks
- **Vite** - Build tool and development server
- **JavaScript** - No TypeScript overhead for this simple landing page

### Styling

- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Custom CSS** - Optimized animations and glassmorphism effects

### UI & UX

- **Framer Motion** - Smooth animations and gestures
- **Lucide React** - Beautiful, customizable icons
- **Custom Theme System** - Dark/light mode with system detection

### Development

- **ESLint** - Code linting with React best practices
- **Autoprefixer** - Automatic CSS vendor prefixes

## 📁 Project Structure

```txt
kiernan.studio-landing/
├── public/
│   └── favicon.png           # Site favicon
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── button.jsx    # Reusable button component
│   │   ├── Footer.jsx        # Site footer
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Hero.jsx          # Hero section with interactive particles
│   │   ├── ThemeProvider.jsx # Theme context provider
│   │   ├── ToolCard.jsx      # Tool showcase cards
│   │   └── ToolsSection.jsx  # Tools grid section
│   ├── App.jsx               # Root component
│   ├── index.css             # Global styles and CSS variables
│   └── main.jsx              # React entry point
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Dependencies and scripts
```

## 🎨 Design System

### Colors

- **Primary**: Blue to purple gradient (`#3b82f6` → `#8b5cf6`)
- **Accent**: Pink highlight (`#ec4899`)
- **Background**: Dynamic gradients for dark/light modes
- **Glass Effects**: Backdrop blur with subtle transparency

### Typography

- **Font**: Inter with system font fallbacks
- **Gradient Text**: Animated gradient text effects
- **Responsive**: Scales from mobile to desktop

### Components

- **Glass Cards**: Glassmorphism effect with backdrop blur
- **Neon Glows**: Subtle glow effects in dark mode
- **Smooth Animations**: Hardware-accelerated transitions

## 🚀 Performance

### Optimizations Applied

- **Memory Leak Prevention**: Proper event listener cleanup
- **React Optimization**: Memoized components and callbacks
- **CSS Optimization**: Minimal CSS variables, hardware acceleration
- **Bundle Size**: Tree-shaking, no unused dependencies
- **Animation Performance**: GPU-accelerated transforms

### Bundle Size

- **CSS**: ~16KB (4KB gzipped)
- **JavaScript**: ~260KB (85KB gzipped)
- **Total**: Optimized for fast loading

## 🌐 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Features Used**: CSS Grid, Flexbox, CSS Custom Properties, backdrop-filter
- **Graceful Degradation**: Core functionality works without JavaScript

## 📱 Responsive Breakpoints

- **Mobile**: 0px - 640px
- **Tablet**: 641px - 1024px  
- **Desktop**: 1025px+
- **Large**: 1400px+ (max container width)

## 🎯 SEO & Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Meta Tags**: Optimized title and description
- **ARIA Labels**: Screen reader friendly
- **Keyboard Navigation**: Full keyboard accessibility
- **Performance**: Lighthouse score optimized

## 🔧 Configuration

### Theme Customization

Edit `src/index.css` to customize:

- Color variables in `:root` and `.dark`
- Animation timings and effects
- Glassmorphism opacity and blur

### Content Updates

- **Hero Text**: Update in `src/components/Hero.jsx`
- **Tools**: Modify `src/components/ToolsSection.jsx`

## 📄 License

This project is for personal use. All rights reserved.

---
