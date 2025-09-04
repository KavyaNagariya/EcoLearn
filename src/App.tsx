import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { 
  Leaf, Trees as Tree, Globe, Award, BookOpen, Camera, Trophy, BarChart3, 
  Menu, X, Mail, Twitter, Instagram, Linkedin, Star, Users, Target, 
  ChevronRight, Play, Sparkles, Zap, Heart, Rocket
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-blue-200/30 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-emerald-200/20 rounded-full blur-2xl"
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Cursor Follower */}
      <motion.div
        className="fixed w-6 h-6 bg-green-400/20 rounded-full pointer-events-none z-50 mix-blend-multiply"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />

      {/* Header */}
      <motion.header 
        className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-green-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Leaf className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                EcoLearn
              </span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['Home', 'Features', 'About', 'Sign Up'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-700 hover:text-green-600 transition-colors duration-300 font-medium relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-green-50 transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                className="md:hidden pb-4 border-t border-green-100 pt-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {['Home', 'Features', 'About', 'Sign Up'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="block py-2 text-gray-700 hover:text-green-600 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                <Sparkles className="h-4 w-4" />
                <span>Smart India Hackathon 2025</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Gamifying{' '}
                <motion.span 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Environmental Education
                </motion.span>{' '}
                for a Greener Future
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Motivate students to adopt eco-friendly habits through interactive lessons, 
                real-world challenges, and school competitions. Make environmental learning 
                engaging and impactful.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.button 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center space-x-2 relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Get Started</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.div>
                </motion.button>
                
                <motion.button 
                  className="bg-white text-green-600 border-2 border-green-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 flex items-center justify-center space-x-2 relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(34, 197, 94, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="h-5 w-5" />
                  </motion.div>
                  <span>Watch Demo</span>
                </motion.button>
              </motion.div>

              {/* Floating Stats */}
              <motion.div 
                className="flex flex-wrap gap-6 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                {[
                  { icon: Users, value: "10K+", label: "Students" },
                  { icon: Trophy, value: "500+", label: "Schools" },
                  { icon: Award, value: "1M+", label: "Eco-Points" }
                ].map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 1.2 + index * 0.2, 
                        type: "spring", 
                        stiffness: 200 
                      }}
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <IconComponent className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
            
            {/* 3D Spline Model */}
            <motion.div
              initial={{ x: 100, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-3xl"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))",
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2))",
                      "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                {/* Fallback for Spline - Beautiful 3D-like illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative"
                    variants={floatingVariants}
                    animate="animate"
                  >
                    <div className="relative">
                      <motion.div
                        className="w-64 h-64 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-2xl"
                        animate={{
                          boxShadow: [
                            "0 25px 50px rgba(34, 197, 94, 0.3)",
                            "0 35px 70px rgba(34, 197, 94, 0.4)",
                            "0 25px 50px rgba(34, 197, 94, 0.3)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                      {/* Floating Icons */}
                      <motion.div
                        className="absolute -top-8 -right-8 bg-yellow-400 p-4 rounded-full shadow-lg"
                        animate={{
                          y: [-5, 5, -5],
                          rotate: [0, 10, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      >
                        <Award className="h-8 w-8 text-yellow-800" />
                      </motion.div>
                      
                      <motion.div
                        className="absolute -bottom-6 -left-6 bg-blue-500 p-4 rounded-full shadow-lg"
                        animate={{
                          y: [5, -5, 5],
                          rotate: [0, -10, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      >
                        <Globe className="h-8 w-8 text-white" />
                      </motion.div>
                      
                      <motion.div
                        className="absolute top-1/2 -right-12 bg-emerald-500 p-3 rounded-full shadow-lg"
                        animate={{
                          x: [-3, 3, -3],
                          y: [-3, 3, -3]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                      >
                        <Tree className="h-6 w-6 text-white" />
                      </motion.div>
                      
                      <motion.div
                        className="absolute top-1/4 -left-10 bg-purple-500 p-3 rounded-full shadow-lg"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                      >
                        <Sparkles className="h-6 w-6 text-white" />
                      </motion.div>

                      {/* Center Earth */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-full shadow-xl"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity }
                        }}
                      >
                        <Globe className="h-12 w-12 text-green-600" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Particle Effects */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-green-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-20, 20, -20],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              Powerful Features for Environmental Learning
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Our platform combines education with gamification to create an engaging 
              learning experience that drives real environmental impact.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: BookOpen,
                title: "Interactive Lessons & Quizzes",
                description: "Engaging multimedia content with gamified learning modules covering climate change, sustainability, and environmental science.",
                color: "from-green-500 to-emerald-600",
                accent: "green"
              },
              {
                icon: Award,
                title: "Eco-Points & Digital Badges",
                description: "Reward system that motivates students with points and achievements for completing lessons and environmental actions.",
                color: "from-blue-500 to-cyan-600",
                accent: "blue"
              },
              {
                icon: Camera,
                title: "Real-World Challenges",
                description: "Photo-based environmental challenges that encourage students to take action in their communities and schools.",
                color: "from-emerald-500 to-teal-600",
                accent: "emerald"
              },
              {
                icon: Trophy,
                title: "School Leaderboards",
                description: "Competitive ranking system that motivates schools and classes to excel in environmental initiatives.",
                color: "from-yellow-500 to-orange-600",
                accent: "yellow"
              },
              {
                icon: BarChart3,
                title: "Teacher Analytics",
                description: "Comprehensive dashboard for educators to track student progress and measure environmental impact.",
                color: "from-purple-500 to-indigo-600",
                accent: "purple"
              },
              {
                icon: Users,
                title: "Community Engagement",
                description: "Connect schools, students, and local communities for collaborative environmental projects and initiatives.",
                color: "from-pink-500 to-rose-600",
                accent: "pink"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5`}
                    initial={{ scale: 0, rotate: 45 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl inline-block mb-6 relative`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -10, 10, 0]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                    
                    {/* Sparkle Effect */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3"
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      <Sparkles className="h-3 w-3 text-yellow-400" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-3"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 leading-relaxed"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Hover Arrow */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="h-5 w-5 text-green-600" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for Everyone in the Education Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              EcoLearn serves multiple stakeholders, creating a comprehensive environmental education network.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Users,
                title: "Students",
                description: "Engaging gamified learning experience with rewards and achievements",
                stats: "10,000+ Active Learners",
                color: "from-green-500 to-emerald-600"
              },
              {
                icon: Target,
                title: "Teachers",
                description: "Powerful analytics and curriculum tools for effective environmental education",
                stats: "500+ Educators",
                color: "from-blue-500 to-cyan-600"
              },
              {
                icon: Globe,
                title: "Schools",
                description: "Institution-wide environmental programs with competitive leaderboards",
                stats: "100+ Schools",
                color: "from-purple-500 to-indigo-600"
              },
              {
                icon: Leaf,
                title: "Communities",
                description: "Local environmental initiatives and real-world impact projects",
                stats: "50+ Communities",
                color: "from-emerald-500 to-teal-600"
              }
            ].map((stakeholder, index) => {
              const IconComponent = stakeholder.icon;
              return (
                <motion.div
                  key={stakeholder.title}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 text-center relative overflow-hidden group"
                  whileHover={{ 
                    y: -15,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stakeholder.color} opacity-0 group-hover:opacity-10`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className={`bg-gradient-to-br ${stakeholder.color} p-4 rounded-full inline-block mb-6 relative`}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                    
                    {/* Pulse Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stakeholder.color} rounded-full`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{stakeholder.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{stakeholder.description}</p>
                  
                  <motion.div 
                    className="text-green-600 font-semibold"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {stakeholder.stats}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Demo Section with 3D Elements */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See EcoLearn in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience our gamified learning platform through these interactive previews.
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Lesson Module Interface",
                description: "Interactive lessons with multimedia content, progress tracking, and instant feedback.",
                image: "https://images.pexels.com/photos/5428833/pexels-photo-5428833.jpeg?auto=compress&cs=tinysrgb&w=800",
                badge: "Learning Module",
                color: "green"
              },
              {
                title: "Eco-Point Badge Collection",
                description: "Reward system showcasing earned badges, points, and achievement milestones.",
                image: "https://images.pexels.com/photos/8923181/pexels-photo-8923181.jpeg?auto=compress&cs=tinysrgb&w=800",
                badge: "Achievements",
                color: "blue"
              },
              {
                title: "Live Leaderboard System",
                description: "Real-time rankings for schools, classes, and individual students to drive competition.",
                image: "https://images.pexels.com/photos/7876704/pexels-photo-7876704.jpeg?auto=compress&cs=tinysrgb&w=800",
                badge: "Competition",
                color: "purple"
              }
            ].map((demo, index) => (
              <motion.div
                key={demo.title}
                variants={itemVariants}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100 group relative"
                whileHover={{ 
                  y: -20,
                  rotateY: 5,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={demo.image} 
                    alt={demo.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <motion.div
                    className={`absolute top-4 left-4 bg-${demo.color}-500 text-white px-3 py-1 rounded-full text-sm font-semibold`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {demo.badge}
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                  
                  {/* Floating Play Button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="h-8 w-8 text-green-600" />
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className="p-6 relative">
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-3"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    {demo.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 leading-relaxed"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {demo.description}
                  </motion.p>

                  {/* Interactive Elements */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="h-5 w-5 text-green-600" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section with 3D Earth */}
      <section id="about" className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white relative overflow-hidden">
        {/* Animated Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold mb-6"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Our Mission
              </motion.h2>
              
              <motion.p 
                className="text-xl mb-8 leading-relaxed opacity-90"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Foster practical environmental literacy and sustainable habits through innovative 
                game mechanics. We believe that when learning is fun and rewarding, students 
                naturally develop lifelong eco-conscious behaviors.
              </motion.p>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 relative overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <div className="flex items-center space-x-3 mb-3 relative">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Trophy className="h-6 w-6 text-yellow-400" />
                  </motion.div>
                  <span className="text-lg font-semibold">Smart India Hackathon 2025</span>
                </div>
                <p className="opacity-90 leading-relaxed relative">
                  Developed as part of India's premier innovation challenge, EcoLearn represents 
                  the future of environmental education technology.
                </p>
              </motion.div>
            </motion.div>
            
            {/* 3D Stats Visualization */}
            <motion.div 
              className="relative"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 relative">
                <motion.div 
                  className="grid grid-cols-2 gap-6 text-center"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: Users, value: "10K+", label: "Students Engaged", color: "text-blue-400" },
                    { icon: Tree, value: "500+", label: "Trees Planted", color: "text-green-400" },
                    { icon: Award, value: "1M+", label: "Eco-Points Earned", color: "text-yellow-400" },
                    { icon: Globe, value: "100+", label: "Schools Connected", color: "text-purple-400" }
                  ].map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        className="text-center relative"
                        variants={itemVariants}
                        whileHover={{ scale: 1.1, z: 10 }}
                      >
                        <motion.div
                          animate={{
                            y: [-5, 5, -5],
                            rotateY: [0, 180, 360]
                          }}
                          transition={{
                            duration: 4 + index,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <IconComponent className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                        </motion.div>
                        
                        <motion.div 
                          className="text-3xl font-bold mb-1"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: 0.5 + index * 0.1, 
                            type: "spring", 
                            stiffness: 300 
                          }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Floating Particles */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      x: [-5, 5, -5],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get Involved with EcoLearn
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join our mission to revolutionize environmental education. Share your feedback or express your interest.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            {/* Animated Background Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.05))",
                  "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05))",
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.05))"
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <form className="space-y-6 relative">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300"
                    placeholder="Your full name"
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)"
                    }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300"
                    placeholder="your.email@example.com"
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)"
                    }}
                  />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="feedback" className="block text-sm font-semibold text-gray-700 mb-2">
                  Feedback / Interest
                </label>
                <motion.textarea
                  id="feedback"
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Share your thoughts, feedback, or interest in EcoLearn..."
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)"
                  }}
                />
              </motion.div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center space-x-2 relative overflow-hidden"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="relative z-10"
                >
                  <Mail className="h-5 w-5" />
                </motion.div>
                <span className="relative z-10">Send Message</span>
                
                {/* Sparkle Effect */}
                <motion.div
                  className="absolute top-2 right-4 relative z-10"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                </motion.div>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white relative overflow-hidden">
        {/* Animated Wave Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q25 25 50 50 T100 50 V100 H0 Z' fill='white' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 100px"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Making a Real Impact</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Our platform is already creating positive environmental change across educational institutions.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { value: "25,000+", label: "Lessons Completed", icon: BookOpen, color: "text-blue-300" },
              { value: "500,000+", label: "Eco-Points Earned", icon: Star, color: "text-yellow-300" },
              { value: "1,200+", label: "Challenges Completed", icon: Camera, color: "text-green-300" },
              { value: "98%", label: "Student Satisfaction", icon: Award, color: "text-purple-300" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center relative"
                  whileHover={{ 
                    scale: 1.1,
                    y: -10
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Glowing Background */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-2xl"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  <motion.div
                    animate={{
                      y: [-5, 5, -5],
                      rotateY: [0, 360]
                    }}
                    transition={{
                      duration: 3 + index,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10"
                  >
                    <IconComponent className={`h-10 w-10 mx-auto mb-4 ${stat.color}`} />
                  </motion.div>
                  
                  <motion.div 
                    className="text-4xl font-bold mb-2 relative z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.3 + index * 0.1, 
                      type: "spring", 
                      stiffness: 200 
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-lg opacity-90 relative z-10">{stat.label}</div>

                  {/* Pulse Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Animated Grid Background */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1'%3E%3Cpath d='M20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-4 gap-8">
            <motion.div 
              className="lg:col-span-2"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="flex items-center space-x-2 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Leaf className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  EcoLearn
                </span>
              </motion.div>
              
              <p className="text-gray-300 mb-6 leading-relaxed max-w-lg">
                Gamifying environmental education to create the next generation of eco-conscious citizens. 
                Built for Smart India Hackathon 2025.
              </p>
              
              <motion.div 
                className="flex space-x-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: Mail, href: "#", label: "Email", color: "hover:bg-blue-600" },
                  { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-blue-500" },
                  { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
                  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" }
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className={`bg-gray-800 p-3 rounded-xl ${social.color} transition-all duration-300 relative overflow-hidden`}
                      aria-label={social.label}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360,
                        y: -5
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <IconComponent className="h-5 w-5 relative z-10" />
                      
                      {/* Ripple Effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-xl"
                        initial={{ scale: 0, opacity: 1 }}
                        whileHover={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'Features', 'About', 'Sign Up'].map((link, index) => (
                  <motion.li 
                    key={link}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <motion.a 
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-300 relative"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h3 className="text-lg font-semibold mb-6">Features</h3>
              <ul className="space-y-3">
                {['Interactive Lessons', 'Eco-Points System', 'Real-World Challenges', 'Teacher Dashboard'].map((feature, index) => (
                  <motion.li 
                    key={feature}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <motion.span 
                      className="text-gray-300 flex items-center space-x-2"
                      whileHover={{ x: 5, color: "#22c55e" }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: index * 0.3 
                        }}
                      >
                        <Zap className="h-4 w-4 text-green-400" />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div 
            className="border-t border-gray-800 pt-8 mt-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-center md:text-left">
                EcoLearn © 2025. Built for Smart India Hackathon 2025. All rights reserved.
              </p>
              <motion.div 
                className="flex items-center space-x-2 mt-4 md:mt-0"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Globe className="h-4 w-4 text-green-400" />
                </motion.div>
                <span className="text-gray-400 text-sm">Making the world greener, one lesson at a time.</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="h-4 w-4 text-red-400" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.footer>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <motion.button
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Rocket className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default App;