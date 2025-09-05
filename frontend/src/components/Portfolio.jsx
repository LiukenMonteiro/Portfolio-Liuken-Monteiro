import { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Brain, Palette, Server, Globe, Instagram, Download, Moon, Sun, Settings, Cpu, Zap, Target, Award, Heart, Star, Coffee, Rocket } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [primaryColor, setPrimaryColor] = useState('blue');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(null);
  
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  const words = ['Desenvolvedor Full Stack', 'Especialista em React', 'Expert em Node.js', 'Entusiasta de IA'];
  
  const colorThemes = {
    blue: { primary: 'from-blue-400 to-cyan-400', secondary: 'from-blue-500 to-cyan-600', accent: 'blue-400' },
    purple: { primary: 'from-purple-400 to-pink-400', secondary: 'from-purple-500 to-pink-600', accent: 'purple-400' },
    green: { primary: 'from-green-400 to-emerald-400', secondary: 'from-green-500 to-emerald-600', accent: 'green-400' },
    orange: { primary: 'from-orange-400 to-red-400', secondary: 'from-orange-500 to-red-600', accent: 'orange-400' },
    teal: { primary: 'from-teal-400 to-blue-400', secondary: 'from-teal-500 to-blue-600', accent: 'teal-400' }
  };

  const currentTheme = colorThemes[primaryColor];

  // Projetos mais elaborados
  const projects = [
    {
      id: 1,
      title: "Clínica Aria",
      description: "Projeto para estágio em desenvolvimento de software em Instituto Aria",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      liveUrl: "https://clinica-aria.vercel.app/",
      githubUrl: "https://github.com/LiukenMonteiro/Cl-nicaAria",
      image: "https://clinica-aria.vercel.app/assets/imagem.png",
      status: "Em produção",
      featured: true,
      stats: { users: "10K+", performance: "99.9%", rating: 4.9 }
    },
    {
      id: 2,
      title: "E-commerce Inteligente",
      description: "Marketplace com recomendações por IA, chatbot integrado, sistema de pagamentos múltiplos, AR para visualização de produtos e analytics avançados.",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "OpenAI", "Three.js"],
      liveUrl: "https://ecommerce-ia-liuken.vercel.app",
      githubUrl: "https://github.com/LiukenMonteiro/ecommerce-inteligente",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      status: "Beta",
      featured: true,
      stats: { users: "5K+", performance: "98.5%", rating: 4.8 }
    },
    {
      id: 3,
      title: "Sistema de Gestão Empresarial",
      description: "ERP completo com módulos de CRM, financeiro, estoque, RH e BI. Interface moderna, relatórios dinâmicos e integração com múltiplas APIs.",
      technologies: ["React", "Node.js", "MySQL", "Express", "Chart.js", "Socket.io", "JWT"],
      liveUrl: "https://erp-system-liuken.vercel.app",
      githubUrl: "https://github.com/LiukenMonteiro/erp-system",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      status: "Ativo",
      featured: true,
      stats: { users: "2K+", performance: "99.2%", rating: 4.7 }
    },
    {
      id: 4,
      title: "App de Fitness com IA",
      description: "Aplicativo de treino personalizado com IA, reconhecimento de exercícios por câmera, planos adaptativos e gamificação completa.",
      technologies: ["React Native", "TensorFlow.js", "Firebase", "Node.js", "Computer Vision"],
      liveUrl: "https://fitness-ai-liuken.vercel.app",
      githubUrl: "https://github.com/LiukenMonteiro/fitness-ai",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      status: "Desenvolvimento",
      featured: false,
      stats: { users: "1K+", performance: "97.8%", rating: 4.6 }
    },
    {
      id: 5,
      title: "Plataforma de Educação Online",
      description: "LMS completo com aulas interativas, gamificação, certificados blockchain, mentoria IA e analytics de aprendizado.",
      technologies: ["Vue.js", "Laravel", "MySQL", "WebRTC", "Blockchain", "AI Tutoring"],
      liveUrl: "https://edutech-liuken.vercel.app",
      githubUrl: "https://github.com/LiukenMonteiro/edutech-platform",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
      status: "Ativo",
      featured: false,
      stats: { users: "15K+", performance: "99.1%", rating: 4.9 }
    },
    {
      id: 6,
      title: "IoT Smart Home Dashboard",
      description: "Sistema de automação residencial com controle IoT, IA para otimização energética, segurança inteligente e interface voice-control.",
      technologies: ["React", "Node.js", "MQTT", "InfluxDB", "TensorFlow", "Voice API"],
      liveUrl: "https://smarthome-liuken.vercel.app",
      githubUrl: "https://github.com/LiukenMonteiro/smart-home",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      status: "Beta",
      featured: false,
      stats: { users: "500+", performance: "98.9%", rating: 4.8 }
    }
  ];

  const technologies = [
  { name: "React", icon: <Code className="w-8 h-8" />, level: "Domino", category: "Frontend" },
  { name: "Node.js", icon: <Server className="w-8 h-8" />, level: "Domino", category: "Backend" },
  { name: "JavaScript", icon: <Code className="w-8 h-8" />, level: "Domino", category: "Language" },
  { name: "TypeScript", icon: <Cpu className="w-8 h-8" />, level: "Aprendendo", category: "Language" },
  { name: "Python", icon: <Brain className="w-8 h-8" />, level: "Básico", category: "Language" },
  { name: "MySQL", icon: <Database className="w-8 h-8" />, level: "Básico", category: "Database" },
  { name: "MongoDB", icon: <Database className="w-8 h-8" />, level: "Básico", category: "Database" },
  { name: "Next.js", icon: <Zap className="w-8 h-8" />, level: "Estudando", category: "Framework" },
  { name: "AWS", icon: <Globe className="w-8 h-8" />, level: "Básico", category: "Cloud" },
  { name: "Docker", icon: <Target className="w-8 h-8" />, level: "Uso", category: "DevOps" },
  { name: "IA Coding", icon: <Brain className="w-8 h-8" />, level: "Ativo", category: "AI Tools" },
  { name: "HTML5 & CSS3", icon: <Palette className="w-8 h-8" />, level: "Domino", category: "Frontend" }
  ];

  const achievements = [
  { icon: <Code className="w-6 h-6 hover:animate-spin" />, title: "Linhas de Código", desc: "Escritas com amor", value: "10K+" }
,
  { icon: <Brain className="w-6 h-6 hover:animate-pulse" />, title: "Bugs Corrigidos", desc: "Paciência infinita", value: "100+" },
  { icon: <Heart className="w-6 h-6 animate-pulse" />, title: "Vontade de Aprender", desc: "Sempre crescendo", value: " ∞" },
  { icon: <Coffee className="w-6 h-6 animate-bounce" />, title: "Cafés Tomados", desc: "Verdadeiro combustível", value: "999+" }

];

  // Animação de digitação
  useEffect(() => {
    const typeWriter = () => {
      const currentWord = words[currentWordIndex];
      const currentLength = typedText.length;
      
      if (currentLength < currentWord.length) {
        setTypedText(currentWord.slice(0, currentLength + 1));
      } else {
        setTimeout(() => {
          setTypedText('');
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    };

    const timer = setTimeout(typeWriter, 100);
    return () => clearTimeout(timer);
  }, [typedText, currentWordIndex, words]);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particles animation
  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };

    createParticles();
    
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
        y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'technologies', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const scrollToSection = (sectionId) => {
  console.log('🎯 Clicou no botão:', sectionId);
  const element = document.getElementById(sectionId);
  console.log('📍 Elemento encontrado:', element);
  
  if (element) {
    console.log('✅ Fazendo scroll para:', sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.log('❌ ERRO: Elemento não encontrado para ID:', sectionId);
  }
  setIsMenuOpen(false);
};

    const downloadCV = () => {
  try {
    const link = document.createElement('a');
    link.href = '/LiukenMonteiro.pdf';
    link.download = 'LiukenMonteiro.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Download do CV iniciado!');
  } catch (error) {
    console.error('Erro ao baixar CV:', error);
    // Fallback: abrir em nova aba
    window.open('/LiukenMonteiro.pdf', '_blank');
  }
};

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className={`w-20 h-20 border-4 border-transparent bg-gradient-to-r ${currentTheme.primary} rounded-full animate-spin mb-4`}></div>
          <div className={`text-2xl font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
            Carregando Portfolio...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative overflow-x-hidden`}>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed w-6 h-6 bg-gradient-to-r ${currentTheme.primary} rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Particles Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`absolute w-1 h-1 bg-gradient-to-r ${currentTheme.primary} rounded-full`}
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`
            }}
          />
        ))}
      </div>

      {/* Settings Panel */}
      <div className={`fixed top-12 right-4 z-50 transition-all duration-300 ${isSettingsOpen ? 'translate-x-0' : 'translate-x-72'}`}>
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl p-6 w-64 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-lg font-bold mb-4">Personalizar</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tema</label>
            <div className="flex space-x-2">
              <button
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`p-2 rounded-lg ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-200'}`}
              >
                <Sun className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Cor Principal</label>
            <div className="grid grid-cols-5 gap-2">
              {Object.keys(colorThemes).map(color => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  className={`w-8 h-8 rounded-full bg-gradient-to-r ${colorThemes[color].primary} ${primaryColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`absolute -left-12 top-4 p-3 bg-gradient-to-r ${currentTheme.secondary} rounded-l-lg shadow-lg hover:shadow-xl transition-all`}
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg z-40 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className={`text-2xl font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent animate-pulse`}>
              Liuken.dev
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'technologies', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  onMouseEnter={() => setShowTooltip(section)}
                  onMouseLeave={() => setShowTooltip(null)}
                  className={`relative capitalize transition-all duration-300 hover:scale-110 ${
                    activeSection === section 
                      ? `text-${currentTheme.accent}` 
                      : `${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                  }`}
                >
                  {section === 'home' ? 'Início' : 
                   section === 'about' ? 'Sobre' :
                   section === 'technologies' ? 'Skills' :
                   section === 'projects' ? 'Projetos' :
                   section === 'contact' ? 'Contato' : section}
                  
                  {showTooltip === section && (
                    <div className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r ${currentTheme.secondary} text-white text-sm rounded-lg shadow-lg`}>
                      {section === 'home' ? 'Página inicial' : 
                       section === 'about' ? 'Sobre mim' :
                       section === 'technologies' ? 'Minhas habilidades' :
                       section === 'projects' ? 'Meus trabalhos' :
                       section === 'contact' ? 'Entre em contato' : section}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`w-full h-0.5 bg-gradient-to-r ${currentTheme.primary} transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <div className={`w-full h-0.5 bg-gradient-to-r ${currentTheme.primary} transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-full h-0.5 bg-gradient-to-r ${currentTheme.primary} transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`md:hidden absolute top-full left-0 w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl rounded-b-lg pb-4 animate-slide-down`}>
              {['home', 'about', 'technologies', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left py-3 px-6 capitalize transition-all hover:bg-gradient-to-r ${currentTheme.secondary} hover:text-white`}
                >
                  {section === 'home' ? 'Início' : 
                   section === 'about' ? 'Sobre' :
                   section === 'technologies' ? 'Skills' :
                   section === 'projects' ? 'Projetos' :
                   section === 'contact' ? 'Contato' : section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative">
        <div className="text-center max-w-6xl mx-auto relative z-10">
          <div className="mb-8 relative">
            <div className={`w-40 h-40 mx-auto mb-8 bg-gradient-to-br ${currentTheme.primary} rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl animate-bounce relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-full"></div>
             <img 
                  src="/profile.jpg"
                  alt="Liuken Monteiro" 
                  className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                />
              <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.primary} opacity-10 animate-pulse rounded-full`}></div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 relative">
            <span className={`bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent animate-gradient`}>
              Liuken Monteiro
            </span>
            <div className={`absolute -inset-4 bg-gradient-to-r ${currentTheme.primary} opacity-20 blur-xl animate-pulse`}></div>
          </h1>
          
          <div className="h-16 mb-8">
            <h2 className="text-2xl md:text-4xl text-gray-400 mb-2">
              {typedText}
              <span className={`animate-ping text-${currentTheme.accent}`}>|</span>
            </h2>
          </div>
          
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-12 max-w-3xl mx-auto leading-relaxed`}>
            Transformando ideias em soluções digitais inovadoras. Especializado em desenvolvimento full-stack 
            com foco em performance, experiência do usuário e integração com tecnologias de IA.
          </p>
          
          {/* Achievements Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-lg rounded-lg p-4 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:scale-105 transition-all duration-300 group cursor-pointer`}
                onMouseEnter={() => setShowTooltip(`achievement-${index}`)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <div className={`text-${currentTheme.accent} mb-2 group-hover:scale-110 transition-transform`}>
                  {achievement.icon}
                </div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
                  {achievement.value}
                </div>
                <div className="text-sm text-gray-500">{achievement.title}</div>
                
                {showTooltip === `achievement-${index}` && (
                  <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r ${currentTheme.secondary} text-white text-sm rounded-lg shadow-lg whitespace-nowrap`}>
                    {achievement.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => scrollToSection('projects')}
              className={`group relative px-8 py-4 bg-gradient-to-r ${currentTheme.secondary} rounded-lg font-medium transition-all transform hover:scale-105 hover:shadow-2xl overflow-hidden`}
            >
              <span className="relative z-10 text-white flex items-center justify-center space-x-2">
                <Rocket className="w-5 h-5" />
                <span>Ver Projetos</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            <button 
              onClick={downloadCV}
              className={`px-8 py-4 border-2 border-${currentTheme.accent} rounded-lg font-medium transition-all hover:bg-gradient-to-r ${currentTheme.secondary} hover:text-white hover:border-transparent transform hover:scale-105 flex items-center justify-center space-x-2`}
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-4 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-lg font-medium transition-all transform hover:scale-105 hover:shadow-xl`}
            >
              Contato
            </button>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[Code, Database, Brain, Globe, Zap, Target].map((Icon, index) => (
            <Icon 
              key={index}
              className={`absolute w-6 h-6 text-${currentTheme.accent} opacity-20 animate-float`}
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 40}%`,
                animationDelay: `${index * 0.5}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 relative">
            <span className={`bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
              Sobre Mim
            </span>
            <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r ${currentTheme.primary} rounded-full`}></div>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className={`text-3xl font-semibold text-${currentTheme.accent} mb-6`}>
                Desenvolvedor Full Stack & Entusiasta de Tecnologia
              </h3>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Olá! Sou Liuken Monteiro, um desenvolvedor apaixonado por criar soluções digitais que fazem a diferença. 
                  Especializo-me em desenvolvimento full-stack.
                </p>
                
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Minha jornada começou com curiosidade sobre como as coisas funcionam "por trás dos panos" na web. 
                  Hoje, trabalho com as tecnologias mais modernas do mercado, sempre buscando entregar a melhor experiência possível.
                </p>
                
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Quando não estou codando, você me encontrará explorando novas tecnologias, contribuindo para projetos, abrindo computadores, 
                  ou planejando a próxima grande ideia.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                {[
                  { icon: <Heart className="w-5 h-5" />, text: "Apaixonado por Código" },
                  { icon: <Star className="w-5 h-5" />, text: "Foco em Qualidade" },
                  { icon: <Zap className="w-5 h-5" />, text: "Rápido Aprendizado" },
                  { icon: <Coffee className="w-5 h-5" />, text: "Amante de Café" }
                ].map((item, index) => (
                  <span 
                    key={index}
                    className={`flex items-center space-x-2 px-4 py-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-pointer`}
                  >
                    <span className={`text-${currentTheme.accent}`}>{item.icon}</span>
                    <span>{item.text}</span>
                  </span>
                ))}
              </div>
            </div>
            
            <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-lg p-8 rounded-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-2xl hover:shadow-3xl transition-all`}>
              <h4 className={`text-2xl font-semibold mb-8 text-${currentTheme.accent}`}>Skills Overview</h4>
              
              <div className="space-y-6">
                {[
                  { skill: "Frontend Development", level: "Domino React e JS", icon: <Code className="w-5 h-5" /> },
                  { skill: "Backend Development", level: "Node.js e APIs", icon: <Server className="w-5 h-5" /> },
                  { skill: "Database", level: "MySQL e MongoDB básico", icon: <Database className="w-5 h-5" /> },
                  { skill: "Novas Tecnologias", level: "Sempre aprendendo", icon: <Brain className="w-5 h-5" /> },
                  { skill: "Desenvolvimento com IA", level: "Uso diário", icon: <Rocket className="w-5 h-5" /> }
                ].map((item, index) => (
                    <div key={index} className="relative group">
                      <div className="flex items-center space-x-3">
                        <span className={`text-${currentTheme.accent} group-hover:scale-110 transition-transform`}>
                          {item.icon}
                        </span>
                        <div>
                          <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {item.skill}
                          </span>
                          <div className="text-sm text-gray-500">{item.level}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className={`py-20 px-4 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-50/50'} relative`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 relative">
            <span className={`bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
              Tecnologias & Skills
            </span>
            <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r ${currentTheme.primary} rounded-full`}></div>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className={`relative group p-6 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-lg rounded-xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:border-${currentTheme.accent} transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden`}
                onMouseEnter={() => setShowTooltip(`tech-${index}`)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.primary} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`text-${currentTheme.accent} mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center`}>
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-center mb-2 group-hover:text-white transition-colors">
                    {tech.name}
                  </h3>
                  <div className="text-sm text-gray-500 text-center mb-2">{tech.category}</div>
                  
                  {/* Badge de Nível (sem porcentagem) */}
                  <div className={`text-center text-xs font-medium px-3 py-1 rounded-full ${
                    tech.level === 'Domino' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    tech.level === 'Aprendendo' || tech.level === 'Estudando' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    tech.level === 'Ativo' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {tech.level}
                  </div>
                </div>

                {showTooltip === `tech-${index}` && (
                  <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r ${currentTheme.secondary} text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-20`}>
                    {tech.level} - {tech.category}
                  </div>
                )}
              </div>
            ))}
          </div>
                  </div>
                </section>
       
            {/* Seção IA */}
<div className="mt-16 text-center">
  <h3 className={`text-2xl font-semibold mb-6 text-${currentTheme.accent}`}>
    🤖 Desenvolvimento com IA
  </h3>
  <div className={`max-w-3xl mx-auto p-6 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-lg rounded-xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
      Utilizo ferramentas de IA como <strong>ChatGPT</strong>, <strong>GitHub Copilot</strong> e <strong>Claude </strong>
      para acelerar o desenvolvimento, debugar código, gerar documentação e explorar novas soluções. 
      Acredito que dominar essas ferramentas é essencial para se manter competitivo no mercado atual. 
      A IA não substitui o desenvolvedor, mas potencializa nossa capacidade de criar soluções mais eficientes! 🚀
    </p>
    
    <div className="flex justify-center space-x-4 mt-4">
      <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
        💡 ChatGPT
      </span>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
        🔧 GitHub Copilot
      </span>
      <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm font-medium">
        🧠 Claude AI
      </span>
    </div>
  </div>
</div>

      {/* Contact Section */}
     <section id="projects" className="py-20 px-4 relative"> 
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 relative">
            <span className={`bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
              Meus Projetos
            </span>
            <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r ${currentTheme.primary} rounded-full`}></div>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`group relative ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-lg rounded-2xl overflow-hidden border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:border-${currentTheme.accent} transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  {project.featured && (
                    <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${currentTheme.secondary} text-white text-xs font-medium rounded-full shadow-lg`}>
                      ⭐ Featured
                    </div>
                  )}
                  
                  <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full shadow-lg ${
                    project.status === 'Em produção' ? 'bg-green-500 text-white' :
                    project.status === 'Beta' ? 'bg-yellow-500 text-white' :
                    project.status === 'Ativo' ? 'bg-blue-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {project.status}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-3 text-${currentTheme.accent} group-hover:text-white transition-colors`}>
                    {project.title}
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4 text-sm leading-relaxed line-clamp-3`}>
                    {project.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    <div className="text-center">
                      <div className={`font-bold text-${currentTheme.accent}`}>{project.stats.users}</div>
                      <div className="text-gray-500">Users</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-bold text-${currentTheme.accent}`}>{project.stats.performance}</div>
                      <div className="text-gray-500">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-bold text-${currentTheme.accent}`}>{project.stats.rating}</div>
                      <div className="text-gray-500">Rating</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className={`px-3 py-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} text-xs rounded-full font-medium hover:bg-gradient-to-r ${currentTheme.secondary} hover:text-white transition-all cursor-pointer`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className={`px-3 py-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} text-xs rounded-full font-medium`}>
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r ${currentTheme.secondary} text-white rounded-lg hover:shadow-lg transition-all hover:scale-105 text-sm font-medium`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center space-x-2 px-4 py-2 border border-${currentTheme.accent} rounded-lg hover:bg-gradient-to-r ${currentTheme.secondary} hover:text-white hover:border-transparent transition-all hover:scale-105 text-sm font-medium`}
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.primary} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-50/50'} relative`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 relative">
            <span className={`bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
              Vamos Trabalhar Juntos?
            </span>
            <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r ${currentTheme.primary} rounded-full`}></div>
          </h2>
          
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-12 max-w-2xl mx-auto`}>
            Tenho sempre espaço para novos projetos desafiadores. Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade!
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                icon: <Mail className="w-8 h-8" />, 
                title: "Email", 
                value: "Liuken37@gmail.com", 
                href: "mailto:Liuken37@gmail.com",
                desc: "Respondo em até 24h"
              },
              { 
                icon: <Linkedin className="w-8 h-8" />, 
                title: "LinkedIn", 
                value: "liukenmonteirodev", 
                href: "https://www.linkedin.com/in/liukenmonteirodev/",
                desc: "Vamos nos conectar!"
              },
              { 
                icon: <Github className="w-8 h-8" />, 
                title: "GitHub", 
                value: "LiukenMonteiro", 
                href: "https://github.com/LiukenMonteiro",
                desc: "Confira meus repos"
              }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group p-8 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-lg rounded-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:border-${currentTheme.accent} transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer block`}
                onMouseEnter={() => setShowTooltip(`contact-${index}`)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <div className={`text-${currentTheme.accent} mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center`}>
                  {contact.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{contact.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{contact.value}</p>
                <p className="text-sm text-gray-500">{contact.desc}</p>
                
                {showTooltip === `contact-${index}` && (
                  <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r ${currentTheme.secondary} text-white text-sm rounded-lg shadow-lg whitespace-nowrap`}>
                    Clique para {contact.title === 'Email' ? 'enviar email' : 'visitar perfil'}
                  </div>
                )}
              </a>
            ))}
          </div>

          {/* Instagram adicional */}
          <div className="mb-12">
            <a
              href="https://www.instagram.com/liukensnoo/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105 font-medium`}
            >
              <Instagram className="w-5 h-5" />
              <span>@liukensnoo</span>
            </a>
          </div>

          <div className="space-y-4">
            <a 
              href="mailto:Liuken37@gmail.com"
              className={`inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r ${currentTheme.secondary} text-white rounded-lg font-medium transition-all transform hover:scale-105 hover:shadow-2xl group`}
            >
              <Mail className="w-5 h-5 group-hover:animate-bounce" />
              <span>Enviar Email</span>
            </a>
            
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Disponível para projetos freelance e oportunidades full-time
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 border-t ${theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} relative`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent mb-4`}>
                Liuken.dev
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Desenvolvedor Full Stack especializado em criar soluções digitais inovadoras com foco em performance e experiência do usuário.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Github className="w-5 h-5" />, href: "https://github.com/LiukenMonteiro" },
                  { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/liukenmonteirodev/" },
                  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/liukensnoo/" },
                  { icon: <Mail className="w-5 h-5" />, href: "mailto:Liuken37@gmail.com" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`p-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg hover:bg-gradient-to-r ${currentTheme.secondary} hover:text-white transition-all hover:scale-110`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Navegação Rápida</h4>
              <div className="space-y-2">
                {['home', 'about', 'technologies', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`block ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors capitalize`}
                  >
                    {section === 'home' ? 'Início' : 
                     section === 'about' ? 'Sobre' :
                     section === 'technologies' ? 'Skills' :
                     section === 'projects' ? 'Projetos' :
                     section === 'contact' ? 'Contato' : section}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Tecnologias Principais</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'Python', 'MySQL'].map((tech, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-full text-sm hover:bg-gradient-to-r ${currentTheme.secondary} hover:text-white transition-all cursor-pointer`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className={`text-center pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>&copy; 2024 Liuken Monteiro. Feito com ❤️ e muito ☕</p>
            <p className="text-sm mt-2">Desenvolvido com React, Tailwind CSS e muito carinho</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
