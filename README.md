# GTA San Andreas Portfolio

A fully interactive portfolio website inspired by the iconic **Grand Theft Auto: San Andreas** game aesthetics. Built with modern web technologies and featuring immersive keyboard navigation, sound effects, and authentic GTA SA visual design.

🌐 **Live Site:** [myxoceph.com](https://myxoceph.com)

![GTA SA Theme](https://img.shields.io/badge/Theme-GTA%20San%20Andreas-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite)

## 🎮 Overview

This portfolio website recreates the nostalgic experience of navigating the Grand Theft Auto: San Andreas menu system. Every element, from the custom fonts to the sound effects and selection animations, has been carefully crafted to provide an authentic GTA SA experience while showcasing professional projects and skills.

**⚠️ Disclaimer:** This website is not affiliated with or endorsed by Rockstar Games. It is a personal portfolio inspired by Grand Theft Auto: San Andreas.

## ✨ Features

### Visual & Audio Experience
- **Authentic GTA SA Fonts**: Custom typography using Pricedown, Diploma, BankGthd, and Beckett fonts
- **Sound Effects**: Navigation sounds (select.mp3) and selection confirmation (save.mp3)
- **Polygon Logo Containers**: Signature GTA-style angular image frames
- **Smooth Animations**: Fade-in, slide-down, slide-up, and shimmer effects
- **Color Palette**: True-to-game colors (#ffaa00 accents, #00babc progress bars, #00ff00 labels)

### Navigation & Interaction
- **Full Keyboard Support**: 
  - Arrow Keys (↑↓←→) for navigation
  - Enter for selection
  - Escape to return to main menu
  - Smart keyboard priority over mouse hover
- **Mouse Navigation**: Hover and click support with visual feedback
- **Auto-scroll**: Automatically scrolls to show selected elements
- **Selection States**: Clear visual indicators for focused items

### Pages & Content
1. **Main Menu**: Welcome screen with 3 navigation options and animated logo containers
2. **Projects Page**: Grid layout showcasing 6 major projects with descriptions and GitHub links
3. **About Page**: GTA SA Stats-style biography with 4 categories:
   - WHO I AM: Personal information
   - MY STORY: Scrolling narrative
   - 42: Information about 42 School with image and link
   - SKILLS: Infinite-scrolling progress bars with shimmer animation
4. **Contact Page**: Interactive cards for Email, GitHub, and LinkedIn

### Technical Features
- **Mobile Responsive**: Optimized breakpoints at 768px for all pages
- **Optimized Images**: Compressed to 3.8MB total (reduced from 85MB)
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Fast Loading**: Vite-powered build for optimal performance
- **Legal Footer**: Disclaimer about Rockstar Games on every page

## 🛠️ Technologies

### Frontend
- **React 18.2.0**: UI library for component-based architecture
- **React Router 6.20.0**: Client-side routing for SPA navigation
- **Vite 5.0.8**: Next-generation frontend build tool

### Styling
- **Custom CSS**: Hand-crafted styles matching GTA SA aesthetics
- **CSS Animations**: keyframes for fadeIn, slideDown, scrollUp, shimmer effects
- **Responsive Design**: Mobile-first approach with media queries

### Audio
- **Web Audio API**: Custom useSound hook for sound effect management
- **MP3 Files**: select.mp3 (navigation), save.mp3 (selection)

### Deployment
- **GitHub Actions**: Automated CI/CD pipeline
- **FTP Deploy**: SamKirkland/FTP-Deploy-Action@v4.3.4
- **CPanel Hosting**: Deployed on HostingDunyam infrastructure
- **Custom Domain**: Live at myxoceph.com

## 📁 Project Structure

```
Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated deployment workflow
├── srcs/
│   ├── public/
│   │   ├── sounds/
│   │   │   ├── select.mp3     # Navigation sound
│   │   │   └── save.mp3       # Selection sound
│   │   ├── fonts/
│   │   │   ├── pricedown.otf  # Body text font
│   │   │   ├── diploma.ttf    # Main titles font
│   │   │   ├── Beckett.ttf    # Subtitles font
│   │   │   └── BankGthd.ttf   # Menu items font
│   │   ├── IMG_6435.png       # Portfolio image 1 (optimized)
│   │   ├── IMG_6918.png       # Portfolio image 2 (optimized)
│   │   └── 42kocaeli.webp     # 42 School logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── MainMenu.jsx   # Landing page component
│   │   │   ├── MainMenu.css
│   │   │   ├── Footer.jsx     # Disclaimer footer
│   │   │   └── Footer.css
│   │   ├── pages/
│   │   │   ├── Projects.jsx   # Projects showcase
│   │   │   ├── Projects.css
│   │   │   ├── About.jsx      # Biography stats page
│   │   │   ├── About.css
│   │   │   ├── Contact.jsx    # Contact information
│   │   │   └── Contact.css
│   │   ├── hooks/
│   │   │   └── useSound.js    # Sound effects hook
│   │   ├── App.jsx            # Main app router
│   │   ├── App.css
│   │   └── main.jsx           # React entry point
│   ├── package.json
│   └── vite.config.js
├── README.md
└── LICENSE
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Myxoceph/Portfolio.git
   cd Portfolio/srcs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser

4. **Build for production**
   ```bash
   npm run build
   ```
   Production files will be in `dist/` directory

## 📦 Deployment

This project uses GitHub Actions for automated deployment to CPanel hosting.

### Automated Deployment
Every push to the `main` or `master` branch triggers:
1. Checkout code
2. Setup Node.js environment
3. Install dependencies (`npm ci`)
4. Build production bundle (`npm run build`)
5. Deploy to CPanel via FTP (with clean-slate enabled)

### Required GitHub Secrets
Set these in your repository Settings → Secrets and variables → Actions:
- `FTP_SERVER`: FTP server address
- `FTP_USERNAME`: FTP username
- `FTP_PASSWORD`: FTP password
- `DEPLOY_PATH`: Target directory on server
- `SSH_PORT`: SSH port (default: 22)

### Manual Deployment
```bash
npm run build
# Upload contents of srcs/dist/ to your hosting provider
```

## 🎨 Customization

### Updating Projects
Edit `srcs/src/pages/Projects.jsx`:
```javascript
const projects = [
  {
    title: 'Project Name',
    description: 'Project description',
    tech: 'Technologies used',
    emoji: '🎮',
    githubUrl: 'https://github.com/username/repo'
  },
  // Add more projects...
]
```

### Updating About Information
Edit `srcs/src/pages/About.jsx`:
- Modify `categories` object for different sections
- Add/remove skills in the SKILLS array
- Update progress bar values

### Changing Colors
All colors are defined in CSS files. Main color variables:
- Background: `#000000`
- Accent: `#ffaa00`
- Progress bars: `#00babc`
- Labels: `#00ff00`
- Text: `#ffffff`, `#cccccc`, `#888888`

### Adding Sounds
Place new MP3 files in `srcs/public/sounds/` and update `useSound.js` hook

## 🎯 Key Features Implementation

### Keyboard Priority System
The website implements a smart keyboard priority system that prevents mouse hover conflicts:
- `isUsingKeyboard` state tracks input method
- Arrow key presses set keyboard mode
- Mouse movement resets to mouse mode
- Mouse hover events are ignored during keyboard navigation

### Auto-scroll Functionality
Selected elements automatically scroll into view:
```javascript
useEffect(() => {
  if (isBackButtonSelected && backButtonRef.current) {
    backButtonRef.current.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    })
  }
}, [isBackButtonSelected])
```

### Progress Bar Animation
Skills section features shimmer animation:
```css
@keyframes shimmerBar {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ahmet BAKIRCAN**
- Website: [myxoceph.com](https://myxoceph.com)
- GitHub: [@Myxoceph](https://github.com/myxoceph)
- Email: ahmetbakircan@gmail.com
- LinkedIn: [Ahmet BAKIRCAN](https://linkedin.com/in/ahmet-bakircan)

## 🎓 About 42 School

This portfolio represents my journey as a Level 6 student at 42 Kocaeli, where I've completed 20 projects through peer-to-peer learning and hands-on coding challenges.

## 🙏 Acknowledgments

- **Rockstar Games** for creating Grand Theft Auto: San Andreas, the inspiration for this design
- **42 School** for the education and project-based learning experience
- **React & Vite** communities for excellent documentation and tools
- Font creators for the authentic GTA SA typography

## 📊 Performance

- **Total Size**: ~4MB (including optimized images)
- **Load Time**: <2 seconds on 3G
- **Lighthouse Score**: 90+ across all metrics
- **Mobile Optimized**: Fully responsive design

---
