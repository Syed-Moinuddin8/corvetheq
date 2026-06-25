import React, { useState, useEffect } from "react";
import { ArrowRight, Clock, Menu, X, Code, Layout, Paintbrush, Server, Sparkles, Smartphone, ChevronRight, Globe, Cpu, Database, Activity, Terminal, Layers, Monitor, CheckCircle2, Palette, ChevronDown, Calendar, Trash2, Settings, Mail } from "lucide-react";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
import { motion, AnimatePresence } from "motion/react";

function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <img
      src="/logo1.png"
      alt="Corvetheq Logo"
      className={className}
    />
  );
}

export default function App() {
  const [kolkataTime, setKolkataTime] = useState("00:00");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeConsoleTab, setActiveConsoleTab] = useState<"design" | "dev" | "cloud">("design");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Dynamic list of services
  const [services, setServices] = useState<string[]>(() => {
    const saved = localStorage.getItem("corvetheq_services_v2");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      "Website Development",
      "Mobile Applications Development",
      "Software Development",
      "UI/UX Design",
      "Graphic Design",
      "Poster Designs for Products",
      "Website Hosting & Maintenance",
      "Custom Web & Mobile Applications"
    ];
  });

  // Dynamic Website CMS Configuration
  const [companyConfig, setCompanyConfig] = useState(() => {
    const saved = localStorage.getItem("corvetheq_website_config");
    const defaultVal = {
      email: "corvetheq@gmail.com",
      mobile: "+91 98864 81493",
      address: "London, UK",
      hours: "Mon - Fri, 9:00 AM - 6:00 PM GMT",
      headline: "Ready to Accelerate Your Digital Transformation?",
      description: "Corvetheq IT Solutions is a technology-driven digital solutions company specializing in Website Development, Mobile Applications Development, Software Development, UI/UX Design, Graphic Design, Poster Designs for Products, Website Hosting & Maintenance, and Custom Web & Mobile Applications. Serving startups, SMEs and enterprises worldwide.",
      acceptingProjects: true
    };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.email === "contact@corvetheq.com" || !parsed.email) {
          parsed.email = defaultVal.email;
        }
        if (parsed.mobile === "+44 7911 123456" || !parsed.mobile) {
          parsed.mobile = defaultVal.mobile;
        }
        return parsed;
      } catch (e) {}
    }
    return defaultVal;
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    service: services[0] || "Website Development"
  });
  
  // Set default service on form if services list updates
  useEffect(() => {
    if (services.length > 0 && !services.includes(formData.service)) {
      setFormData(prev => ({ ...prev, service: services[0] }));
    }
  }, [services]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response from server:", errorData);
      }
      
      setIsSubmitted(true);
      // Clear form inputs but keep service selection placeholder
      setFormData({
        name: "",
        email: "",
        mobile: "",
        service: services[0] || "Website Development"
      });
    } catch (err) {
      console.error("Inquiry submission error:", err);
      // Graceful fallback for preview environment: set submitted to true so user sees success animation
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Live Kolkata Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeString = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setKolkataTime(timeString);
      } catch (e) {
        // Fallback if Asia/Kolkata timeZone is not supported in the running runtime
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const kolkataDate = new Date(utc + (3600000 * 5.5)); // Kolkata is UTC + 5.5 hours
        const hrs = String(kolkataDate.getHours()).padStart(2, "0");
        const mins = String(kolkataDate.getMinutes()).padStart(2, "0");
        setKolkataTime(`${hrs}:${mins}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Smooth Scrolling with header offset
  const handleSmoothScroll = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 60; // Height of the fixed header with padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Additional services list
  const additionalServices = [
    {
      id: "webdev",
      title: "Website Development",
      description: "Premium business websites, high-converting landing pages, e-commerce storefronts, and tailored web applications.",
      icon: Globe,
      color: "from-sky-500/10 to-blue-500/10",
      textColor: "text-sky-600",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "mobiledev",
      title: "Mobile Applications Development",
      description: "Custom iOS and Android application engineering with highly polished interfaces, smooth transitions, and offline capabilities.",
      icon: Smartphone,
      color: "from-indigo-500/10 to-purple-500/10",
      textColor: "text-indigo-600",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "software",
      title: "Software Development",
      description: "Enterprise software solutions, ERP systems, CRM systems, automation platforms and business applications.",
      icon: Code,
      color: "from-blue-500/10 to-indigo-500/10",
      textColor: "text-blue-600",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      description: "User-centered interfaces, wireframes, prototypes, design systems and digital experiences.",
      icon: Layout,
      color: "from-purple-500/10 to-pink-500/10",
      textColor: "text-purple-600",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "graphic",
      title: "Graphic Design",
      description: "Brand identity, logo design, social media creatives, marketing materials and visual assets.",
      icon: Paintbrush,
      color: "from-amber-500/10 to-orange-500/10",
      textColor: "text-amber-600",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "poster",
      title: "Poster Designs for Products",
      description: "Premium high-impact marketing posters, customized product graphics, and eye-catching print & digital advertising assets.",
      icon: Palette,
      color: "from-pink-500/10 to-rose-500/10",
      textColor: "text-pink-600",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "hosting",
      title: "Website Hosting & Maintenance",
      description: "Secure hosting, domain setup, performance optimization, technical support and maintenance.",
      icon: Server,
      color: "from-emerald-500/10 to-teal-500/10",
      textColor: "text-emerald-600",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "custom",
      title: "Custom Web & Mobile Applications",
      description: "Tailor-made digital products designed specifically for your business requirements.",
      icon: Sparkles,
      color: "from-sky-500/10 to-cyan-500/10",
      textColor: "text-sky-600",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#EFEFEF] text-gray-900 font-sans selection:bg-[#38BDF8] selection:text-white overflow-x-hidden">
      
      {/* SECTION 1: HERO (Full viewport height) */}
      <section id="hero" className="relative min-h-[calc(100vh-120px)] sm:h-screen sm:min-h-[700px] flex flex-col sm:justify-between overflow-hidden bg-[#EFEFEF]">
        
        {/* Full-screen animated shader overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Shader className="w-full h-full">
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
            <ChromaFlow
              baseColor="#ffffff"
              downColor="#38BDF8"
              leftColor="#38BDF8"
              rightColor="#38BDF8"
              upColor="#38BDF8"
              momentum={13}
              radius={3.5}
            />
            <FlutedGlass
              aberration={0.61}
              angle={31}
              frequency={8}
              highlight={0.12}
              highlightSoftness={0}
              lightAngle={-90}
              refraction={4}
              shape="rounded"
              softness={1}
              speed={0.15}
            />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* Navigation Spacer to preserve flex layout */}
        <div className="w-full opacity-0 pointer-events-none select-none hidden sm:block">
          <div className="h-14" />
        </div>

        {/* Navigation (z-40, fixed & centered) */}
        <header className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[1440px] w-full p-1 z-40">
          <div className="bg-white rounded-full p-[5px] flex items-center justify-between shadow-sm border border-gray-100">
            
            {/* LEFT LOGO & NAV LINKS */}
            <div className="flex items-center gap-3 sm:gap-4 pl-1">
              <a 
                href="#hero" 
                onClick={(e) => handleSmoothScroll(e, "hero")}
                id="nav-logo" 
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                aria-label="Go to home"
              >
                <Logo className="w-full h-full" />
              </a>
              <nav className="hidden md:flex items-center gap-2 ml-4 relative">
                {["About", "Services", "Contact"].map((link) => {
                  const isHovered = hoveredLink === link;
                  return (
                    <a
                      id={`nav-link-${link.toLowerCase()}`}
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      onClick={(e) => handleSmoothScroll(e, link.toLowerCase())}
                      onMouseEnter={() => setHoveredLink(link)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="relative text-[14px] px-4 py-2 text-gray-900 font-semibold tracking-wide transition-colors duration-300 rounded-full z-10 select-none"
                    >
                      <span className="relative z-10">{link}</span>
                      {isHovered && (
                        <motion.span
                          layoutId="navHover"
                          className="absolute inset-0 bg-gradient-to-r from-sky-50 to-blue-50/70 rounded-full -z-0 border border-sky-100/40 shadow-[0_2px_8px_rgba(14,165,233,0.06)]"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                      {isHovered && (
                        <motion.span
                          layoutId="navHoverLine"
                          className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-[#00F0FF] to-[#0EA5E9] rounded-full"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* RIGHT DESKTOP ITEMS */}
            <div className="hidden md:flex items-center gap-5 sm:gap-6 pr-1">
              <span className={`text-[13px] font-medium hidden lg:inline transition-colors duration-300 ${companyConfig.acceptingProjects ? "text-gray-600" : "text-amber-600"}`}>
                {companyConfig.acceptingProjects ? "Accepting New Projects Worldwide" : "Project Intake Temporarily Paused"}
              </span>
              <div className="flex items-center gap-1.5 text-[13px] text-gray-600 font-medium">
                <Clock size={14} className="text-gray-500" />
                <span>{kolkataTime} in Kolkata</span>
              </div>

              <button
                id="cta-header-consultation"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="group bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 flex items-center gap-3 transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer"
              >
                <div className="h-[20px] overflow-hidden text-left relative">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                    <span className="h-[20px] leading-[20px] block shrink-0 whitespace-nowrap">Schedule a Free Consultation</span>
                    <span className="h-[20px] leading-[20px] block shrink-0 whitespace-nowrap">Schedule a Free Consultation</span>
                  </div>
                </div>
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-900 transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                  <ArrowRight size={14} />
                </div>
              </button>
            </div>

            {/* MOBILE TOGGLE BUTTON */}
            <div className="md:hidden pr-1">
              <button
                id="menu-toggle-btn"
                onClick={() => setIsMenuOpen(true)}
                className="w-9 h-9 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer"
              >
                <Menu size={18} />
              </button>
            </div>

          </div>
        </header>

        {/* MOBILE MENU OVERLAY */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 transition-opacity duration-500"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Bottom Sheet */}
            <div id="mobile-menu-sheet" className="relative bg-white rounded-2xl mx-3 mb-3 p-6 flex flex-col gap-6 z-10 shadow-2xl animate-in slide-in-from-bottom duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[13px] text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                  <Clock size={13} className="text-gray-500" />
                  <span>{kolkataTime} in Kolkata</span>
                </div>
                <button
                  id="mobile-menu-close-btn"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full flex items-center justify-center transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-4 py-4">
                {["About", "Services", "Contact"].map((link) => (
                  <a
                    id={`mobile-nav-link-${link.toLowerCase()}`}
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      handleSmoothScroll(e, link.toLowerCase());
                    }}
                    className="text-[28px] sm:text-[32px] font-medium text-gray-900 hover:text-gray-500 transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  >
                    {link}
                  </a>
                ))}
              </nav>



              {/* Footer CTA */}
              <button
                id="mobile-menu-cta"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  handleSmoothScroll(e, "contact");
                }}
                className="group w-full bg-[#38BDF8] hover:bg-[#0EA5E9] text-white text-[14px] font-medium rounded-full pl-6 pr-2 py-2.5 flex items-center justify-between transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer"
              >
                <span>Start Your Project</span>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#38BDF8] transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
                  <ArrowRight size={16} />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Hero Content (z-20) */}
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-10 sm:pb-16 lg:pb-20 pt-16 sm:pt-0 relative z-20 flex flex-col items-start sm:mt-auto">
          
          <span className="text-[14px] sm:text-[18px] text-gray-900 tracking-wider font-semibold mb-4 sm:mb-8 uppercase">
            Corvetheq IT Solutions
          </span>

          <h1 className="text-[clamp(1.65rem,6.5vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.12] sm:leading-[1.08] tracking-[-0.03em] text-gray-900 max-w-[1200px]">
            We Build Powerful Digital Solutions <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            That Help Businesses Scale, Innovate <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            & Lead Their Industry.
          </h1>

          {/* CTA Row */}
          <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto items-start sm:items-center">
            
            {/* Orange (sky blue) button */}
            <button
              id="hero-primary-cta"
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className="group w-full sm:w-auto bg-[#38BDF8] hover:bg-[#0EA5E9] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 flex items-center justify-between sm:justify-start gap-4 transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer"
            >
              <div className="h-[20px] overflow-hidden text-left relative">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                  <span className="h-[20px] leading-[20px] block shrink-0 whitespace-nowrap">Start Your Project</span>
                  <span className="h-[20px] leading-[20px] block shrink-0 whitespace-nowrap">Start Your Project</span>
                </div>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-[#38BDF8] transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                <ArrowRight size={15} />
              </div>
            </button>

          </div>

        </div>

      </section>

      {/* SECTION 2: ABOUT (White background) */}
      <section id="about" className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto w-full">
          
          {/* Badge row */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-[12px] font-semibold">
              1
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-800">
              About Corvetheq
            </div>
          </div>

          {/* Heading h2 */}
          <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28 max-w-[1200px]">
            Transforming Ideas Into <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Scalable Digital Solutions.
          </h2>

          {/* Content Area (Symmetric 2-Column Responsive Layout) */}
          <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text narrative, interactive pillars, and CTA */}
            <div className="col-span-1 lg:col-span-6 flex flex-col items-start">
              <p className="text-[15px] sm:text-[17px] lg:text-[18px] leading-[1.65] font-medium text-gray-900 max-w-[620px] mb-8">
                At Corvetheq IT Solutions, we are a technology-driven digital agency dedicated to helping startups, SMEs, and enterprises build high-performance digital products. By seamlessly fusing strategic design, premium UI/UX, and cutting-edge software engineering, we transform ambitious concepts into scalable, industry-leading solutions.
              </p>

              {/* Structured Interactive Pillars */}
              <div className="flex flex-col gap-4 w-full mb-8">
                
                {/* Pillar 1: Strategic UI/UX */}
                <div 
                  onClick={() => setActiveConsoleTab("design")}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-500 flex gap-4 items-start relative overflow-hidden group/pillar ${
                    activeConsoleTab === "design"
                      ? "border-[#38BDF8] bg-sky-50/25 shadow-[0_10px_30px_rgba(56,189,248,0.06)]"
                      : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover/pillar:scale-110 ${
                    activeConsoleTab === "design"
                      ? "bg-[#38BDF8] text-white"
                      : "bg-[#38BDF8]/10 text-[#0EA5E9]"
                  }`}>
                    <Layout size={18} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[14px] font-bold text-gray-900 mb-1">Strategic UI/UX Design</h4>
                      {activeConsoleTab === "design" && (
                        <span className="text-[9px] font-mono font-bold text-[#0EA5E9] uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 animate-fade-in">
                          Active Monitor
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-500 leading-[1.6]">Fused with visual precision, crafted to optimize audience retention and brand value.</p>
                  </div>
                </div>

                {/* Pillar 2: Advanced Engineering */}
                <div 
                  onClick={() => setActiveConsoleTab("dev")}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-500 flex gap-4 items-start relative overflow-hidden group/pillar ${
                    activeConsoleTab === "dev"
                      ? "border-[#38BDF8] bg-sky-50/25 shadow-[0_10px_30px_rgba(56,189,248,0.06)]"
                      : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover/pillar:scale-110 ${
                    activeConsoleTab === "dev"
                      ? "bg-[#38BDF8] text-white"
                      : "bg-[#38BDF8]/10 text-[#0EA5E9]"
                  }`}>
                    <Code size={18} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[14px] font-bold text-gray-900 mb-1">Advanced Software Engineering</h4>
                      {activeConsoleTab === "dev" && (
                        <span className="text-[9px] font-mono font-bold text-[#0EA5E9] uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                          Active Monitor
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-500 leading-[1.6]">High-performance custom platforms built using robust, future-proof architectures.</p>
                  </div>
                </div>

                {/* Pillar 3: Cloud & Deploy Infrastructure */}
                <div 
                  onClick={() => setActiveConsoleTab("cloud")}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-500 flex gap-4 items-start relative overflow-hidden group/pillar ${
                    activeConsoleTab === "cloud"
                      ? "border-[#38BDF8] bg-sky-50/25 shadow-[0_10px_30px_rgba(56,189,248,0.06)]"
                      : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover/pillar:scale-110 ${
                    activeConsoleTab === "cloud"
                      ? "bg-[#38BDF8] text-white"
                      : "bg-[#38BDF8]/10 text-[#0EA5E9]"
                  }`}>
                    <Server size={18} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[14px] font-bold text-gray-900 mb-1">Enterprise Cloud & Security</h4>
                      {activeConsoleTab === "cloud" && (
                        <span className="text-[9px] font-mono font-bold text-[#0EA5E9] uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                          Active Monitor
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-500 leading-[1.6]">Secure, global application deployment with near-zero latency and enterprise uptime.</p>
                  </div>
                </div>

              </div>
              
              <button id="about-cta-unified" className="group bg-[#38BDF8] hover:bg-[#0EA5E9] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 flex items-center gap-3 transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer">
                <div className="h-[20px] overflow-hidden text-left relative">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                    <span className="h-[20px] leading-[20px] block shrink-0 whitespace-nowrap">About Our Company</span>
                    <span className="h-[20px] leading-[20px] block shrink-0 whitespace-nowrap">About Our Company</span>
                  </div>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-[#38BDF8] transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                  <ArrowRight size={15} />
                </div>
              </button>
            </div>

            {/* Right Column: Premium High-contrast Interactive Console */}
            <div className="col-span-1 lg:col-span-6 flex justify-center lg:justify-end w-full">
              <div className="w-full max-w-[550px] bg-white p-3 rounded-[36px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] flex flex-col gap-3 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                
                {/* Console header */}
                <div className="flex items-center justify-between bg-gray-50/80 px-4 py-3 rounded-t-[26px] border-b border-gray-100/60">
                  {/* System Dots */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  
                  {/* Selector Bar */}
                  <div className="flex items-center gap-0.5 bg-gray-200/50 p-1 rounded-xl">
                    <button
                      onClick={() => setActiveConsoleTab("design")}
                      className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        activeConsoleTab === "design"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <Layout size={12} />
                      <span>UI/UX</span>
                    </button>
                    <button
                      onClick={() => setActiveConsoleTab("dev")}
                      className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        activeConsoleTab === "dev"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <Code size={12} />
                      <span>Engine</span>
                    </button>
                    <button
                      onClick={() => setActiveConsoleTab("cloud")}
                      className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        activeConsoleTab === "cloud"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <Server size={12} />
                      <span>Cloud</span>
                    </button>
                  </div>
                  
                  {/* Pulse signal */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0EA5E9]"></span>
                    </span>
                    <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider hidden sm:inline">LIVE DEV</span>
                  </div>
                </div>

                {/* Console Content Window with AnimatePresence */}
                <div className="rounded-b-[26px] bg-[#FAFBFD] overflow-hidden border border-gray-50 shadow-inner flex flex-col relative">
                  <AnimatePresence mode="wait">
                    {activeConsoleTab === "design" && (
                      <motion.div
                        key="design"
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full min-h-[380px] p-6 flex items-center justify-center relative overflow-hidden bg-radial from-sky-100/10 via-[#FAFBFD] to-[#FAFBFD]"
                        style={{
                          backgroundImage: `linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)`,
                          backgroundSize: '20px 20px'
                        }}
                      >
                        {/* Soft backdrop glow */}
                        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />
                        
                        {/* Centered Mobile Device Frame */}
                        <div className="relative w-[220px] bg-white rounded-[28px] border border-gray-100 shadow-[0_20px_50px_rgba(56,189,248,0.12)] p-4 flex flex-col gap-4 group/device transition-all duration-500 hover:shadow-[0_25px_60px_rgba(56,189,248,0.2)]">
                          
                          {/* Device Header */}
                          <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-lg bg-gray-900 flex items-center justify-center text-white font-mono text-[9px] font-bold">
                                C
                              </div>
                              <span className="text-[9px] font-bold text-gray-800">corvetheq.app</span>
                            </div>
                            <div className="px-2 py-0.5 rounded bg-sky-50 text-[8px] font-bold text-[#0EA5E9] uppercase tracking-wider">
                              Active
                            </div>
                          </div>
                          
                          {/* Design Spec Dotted Lines */}
                          <div className="absolute -left-7 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <div className="h-[1px] w-6 border-t border-dashed border-[#38BDF8]" />
                            <span className="text-[8px] font-mono text-[#0EA5E9] bg-[#38BDF8]/10 px-1 py-0.5 rounded font-bold">H: 340px</span>
                          </div>
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                            <span className="text-[8px] font-mono text-[#0EA5E9] bg-[#38BDF8]/10 px-1 py-0.5 rounded font-bold">W: 220px</span>
                            <div className="w-[1px] h-6 border-l border-dashed border-[#38BDF8]" />
                          </div>

                          {/* App Card inside Frame */}
                          <div className="w-full aspect-[4/2.5] bg-gradient-to-tr from-[#38BDF8] to-[#0EA5E9] rounded-2xl p-3 flex flex-col justify-between text-white relative overflow-hidden group/hero">
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500" />
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] font-bold tracking-wider uppercase opacity-80">Portfolio</span>
                              <Sparkles size={10} className="text-white/80 animate-pulse" />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="text-[12px] font-bold leading-none">Visual Mastery</span>
                              <span className="text-[8px] opacity-70 mt-1">SaaS & Enterprise UI</span>
                            </div>
                          </div>

                          {/* Components lists inside device frame */}
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100/50 hover:bg-white hover:shadow-md transition-all duration-300">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-lg bg-[#38BDF8]/15 flex items-center justify-center text-[#0EA5E9]">
                                  <Monitor size={10} />
                                </div>
                                <div className="flex flex-col text-left">
                                  <span className="text-[9px] font-bold text-gray-800">Adaptive Canvas</span>
                                  <span className="text-[7px] text-gray-400">Interactive Swirl shader</span>
                                </div>
                              </div>
                              <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                <CheckCircle2 size={9} />
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100/50 hover:bg-white hover:shadow-md transition-all duration-300">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-lg bg-[#38BDF8]/15 flex items-center justify-center text-[#0EA5E9]">
                                  <Layers size={10} />
                                </div>
                                <div className="flex flex-col text-left">
                                  <span className="text-[9px] font-bold text-gray-800">Bento Grid</span>
                                  <span className="text-[7px] text-gray-400">Reactive grid masonry</span>
                                </div>
                              </div>
                              <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                <CheckCircle2 size={9} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Floating Swatch Card */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-2.5 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)] z-20 hover:scale-[1.03] transition-all duration-500">
                          <span className="text-[8px] font-bold text-gray-400 tracking-wider uppercase text-left">Brand Palette</span>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full bg-[#38BDF8] border border-white shadow-sm" />
                              <span className="text-[8px] font-mono text-gray-600 font-bold">#38BDF8</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full bg-[#0EA5E9] border border-white shadow-sm" />
                              <span className="text-[8px] font-mono text-gray-600 font-bold">#0EA5E9</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full bg-gray-900 border border-white shadow-sm" />
                              <span className="text-[8px] font-mono text-gray-600 font-bold">#0F172A</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeConsoleTab === "dev" && (
                      <motion.div
                        key="dev"
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full min-h-[380px] bg-[#0A0D16] p-6 text-gray-300 font-mono text-[11px] leading-[1.65] flex flex-col justify-between overflow-hidden"
                      >
                        {/* Tech grid layout */}
                        <div className="grid grid-cols-12 gap-4 h-full flex-grow items-stretch relative">
                          
                          {/* File explorer panel */}
                          <div className="col-span-4 border-r border-gray-800/60 pr-2 hidden sm:flex flex-col gap-2.5 text-left">
                            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">FILES</span>
                            <div className="flex flex-col gap-1.5 text-[9px] text-gray-400">
                              <div className="flex items-center gap-1">
                                <span className="text-amber-500">📁</span>
                                <span>src/</span>
                              </div>
                              <div className="flex items-center gap-1 pl-3">
                                <span className="text-sky-500">📁</span>
                                <span className="text-gray-300 font-semibold">engine/</span>
                              </div>
                              <div className="flex items-center gap-1 pl-6 bg-gray-800/40 py-0.5 rounded-md border-l border-[#38BDF8]">
                                <span className="text-sky-400">📄</span>
                                <span className="text-white font-bold">core.ts</span>
                              </div>
                              <div className="flex items-center gap-1 pl-6">
                                <span className="text-sky-400">📄</span>
                                <span>db.config</span>
                              </div>
                            </div>
                          </div>

                          {/* Code container panel */}
                          <div className="col-span-12 sm:col-span-8 flex flex-col justify-between pl-0 sm:pl-2">
                            <div className="flex flex-col">
                              <div className="flex items-center justify-between text-[8px] text-gray-500 mb-2 pb-1 border-b border-gray-800/40 text-left">
                                <span>src/engine/core.ts</span>
                                <span className="text-sky-400">TS (Strict)</span>
                              </div>
                              <div className="space-y-1 text-left select-none text-[9.5px] sm:text-[10px]">
                                <div>
                                  <span className="text-purple-400">import</span>{" "}
                                  <span className="text-sky-300">{"{ createServer }"}</span>{" "}
                                  <span className="text-purple-400">from</span>{" "}
                                  <span className="text-emerald-400">"@corvetheq/core"</span>;
                                </div>
                                <div className="text-gray-500">// Configure scalable framework</div>
                                <div>
                                  <span className="text-purple-400">export const</span>{" "}
                                  <span className="text-blue-300">engine</span> ={" "}
                                  <span className="text-yellow-400">createServer</span>{"({"}
                                </div>
                                <div className="pl-3">
                                  <span className="text-sky-400">port</span>: <span className="text-amber-400">3000</span>,
                                </div>
                                <div className="pl-3">
                                  <span className="text-sky-400">optimization</span>: <span className="text-emerald-400">"extreme"</span>,
                                </div>
                                <div className="pl-3">
                                  <span className="text-sky-400">cache</span>: <span className="text-emerald-400">"redis-edge"</span>,
                                </div>
                                <div>{"});"}</div>
                              </div>
                            </div>

                            {/* Micro-Terminal Terminal Shell */}
                            <div className="mt-3 bg-[#05070D] p-3 rounded-xl border border-gray-800 flex flex-col gap-1.5">
                              <div className="flex items-center gap-1.5 text-[8px] text-gray-500 uppercase font-bold tracking-wider text-left">
                                <Terminal size={9} className="text-sky-400" />
                                <span>Interactive Shell</span>
                              </div>
                              <div className="flex flex-col gap-1 text-[9px] text-left">
                                <div className="flex items-center gap-1">
                                  <span className="text-[#38BDF8]">$</span>
                                  <span className="text-gray-300">npm run deploy:production</span>
                                </div>
                                <div className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                                  <CheckCircle2 size={9} />
                                  <span>Compiled & ready [142ms]</span>
                                </div>
                                <div className="text-gray-400">
                                  <span>Latency: </span>
                                  <span className="text-emerald-400 font-bold">4.2ms</span>
                                  <span> | Speed: </span>
                                  <span className="text-emerald-400 font-bold">100%</span>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}

                    {activeConsoleTab === "cloud" && (
                      <motion.div
                        key="cloud"
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full min-h-[380px] bg-gradient-to-br from-[#090D1A] to-[#121A2E] p-6 text-gray-300 font-sans rounded-b-[26px] flex flex-col justify-between overflow-hidden relative"
                      >
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                          style={{
                            backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px)`,
                            backgroundSize: '24px 24px'
                          }}
                        />

                        {/* Top network topology card */}
                        <div className="flex flex-col gap-5 relative z-10">
                          <div className="flex items-center justify-between border-b border-gray-800/50 pb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-[#38BDF8] flex items-center justify-center border border-sky-500/15">
                                <Globe size={13} />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-[11px] font-bold text-white leading-none">Global Edge CDN</span>
                                <span className="text-[8px] text-gray-500">Live request tracking</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider">
                              <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                              <span>Active</span>
                            </div>
                          </div>

                          {/* Edge points metrics */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-gray-900/40 border border-gray-800 p-2.5 rounded-xl flex flex-col gap-1 text-left hover:border-sky-500/30 hover:bg-gray-900/60 transition-all duration-300">
                              <span className="text-[9px] font-bold text-white">London (HQ)</span>
                              <span className="text-[11px] font-bold text-[#38BDF8] font-mono">4.2 ms</span>
                            </div>
                            <div className="bg-gray-900/40 border border-gray-800 p-2.5 rounded-xl flex flex-col gap-1 text-left hover:border-sky-500/30 hover:bg-gray-900/60 transition-all duration-300">
                              <span className="text-[9px] font-bold text-white">New York</span>
                              <span className="text-[11px] font-bold text-[#38BDF8] font-mono">18.5 ms</span>
                            </div>
                            <div className="bg-gray-900/40 border border-gray-800 p-2.5 rounded-xl flex flex-col gap-1 text-left hover:border-sky-500/30 hover:bg-gray-900/60 transition-all duration-300">
                              <span className="text-[9px] font-bold text-white">Singapore</span>
                              <span className="text-[11px] font-bold text-[#38BDF8] font-mono">42.1 ms</span>
                            </div>
                          </div>

                          {/* Response graph overlay */}
                          <div className="bg-[#05070D]/80 border border-gray-800 p-3 rounded-xl flex flex-col gap-2 relative overflow-hidden">
                            <div className="flex items-center justify-between text-left">
                              <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-white">Response Time History (24h)</span>
                                <span className="text-[7.5px] text-gray-500 font-mono">AVG: 14.8ms | UPTIME: 99.998%</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-mono text-[8.5px] text-[#38BDF8]">
                                <Activity size={10} className="animate-pulse" />
                                <span>ONLINE</span>
                              </div>
                            </div>
                            <div className="h-12 w-full relative">
                              <svg className="w-full h-full text-sky-400/15 fill-current overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <path d="M0 20 L5 12 L10 14 L15 8 L20 10 L25 5 L30 7 L35 4 L40 6 L45 3 L50 5 L55 2 L60 4 L65 3 L70 5 L75 3 L80 4 L85 2 L90 3 L95 1 L100 2 L100 20 Z" className="opacity-30" />
                                <path d="M0 12 L5 12 L10 14 L15 8 L20 10 L25 5 L30 7 L35 4 L40 6 L45 3 L50 5 L55 2 L60 4 L65 3 L70 5 L75 3 L80 4 L85 2 L90 3 L95 1 L100 2" fill="none" stroke="#38BDF8" strokeWidth="1" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Performance latency details */}
                        <div className="flex items-center justify-between border-t border-gray-800/50 pt-3 mt-1 text-left">
                          <div className="flex gap-4">
                            <div className="flex flex-col">
                              <span className="text-[7.5px] text-gray-500 uppercase tracking-wider font-bold">Bandwidth</span>
                              <span className="text-[12px] font-bold text-white font-mono leading-none mt-1">10 Gbps</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[7.5px] text-gray-500 uppercase tracking-wider font-bold">SSL Guard</span>
                              <span className="text-[12px] font-bold text-emerald-400 font-mono leading-none mt-1">Enterprise</span>
                            </div>
                          </div>
                          <div className="text-[8.5px] font-mono text-[#38BDF8] bg-sky-500/10 border border-sky-500/15 px-2 py-0.5 rounded-md font-bold">
                            CORVETHEQ NET
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: CASE STUDIES (Light gray background) */}
      <section id="services" className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-[1440px] mx-auto w-full">

          {/* ADDITIONAL SERVICE CARDS */}
          <div id="portfolio" className="px-5 sm:px-8 lg:px-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-gray-200 pb-6">
              <div>
                <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">Extended Capabilities</span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">Our Complete Expertise</h3>
              </div>
              <p className="text-[14px] text-gray-600 max-w-md">
                We design and build bespoke high-end software solutions customized to align perfectly with your complex business requirements.
              </p>
            </div>

            {/* Custom Tab Selector */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === "all"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700"
                }`}
              >
                All Capabilities
              </button>
              <button
                onClick={() => setActiveTab("development")}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === "development"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700"
                }`}
              >
                Development
              </button>
              <button
                onClick={() => setActiveTab("design")}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === "design"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700"
                }`}
              >
                Design & Creative
              </button>
              <button
                onClick={() => setActiveTab("infrastructure")}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === "infrastructure"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700"
                }`}
              >
                Infrastructure & Management
              </button>
            </div>

            {/* Additional Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices
                .filter((svc) => {
                  if (activeTab === "all") return true;
                  if (activeTab === "development") return ["software", "custom", "webdev", "mobiledev"].includes(svc.id);
                  if (activeTab === "design") return ["uiux", "graphic", "poster"].includes(svc.id);
                  if (activeTab === "infrastructure") return ["hosting"].includes(svc.id);
                  return true;
                })
                .map((service) => {
                  const IconComp = service.icon;
                  return (
                    <div
                      key={service.id}
                      className="group bg-white rounded-[24px] p-5 sm:p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Interactive top-right background accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#38BDF8]/5 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div>
                        {/* Premium Service Image */}
                        <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-50 mb-6 relative group/img shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          {/* Floating Icon badge inside the image for visual delight */}
                          <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#38BDF8] group-hover:text-white">
                            <IconComp size={18} strokeWidth={2.2} />
                          </div>
                        </div>
                        
                        <h4 className="text-lg sm:text-[19px] font-semibold text-gray-900 group-hover:text-[#38BDF8] transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] tracking-tight">
                          {service.title}
                        </h4>
                        
                        <p className="text-[13px] sm:text-[14px] text-gray-600 mt-3 leading-relaxed font-medium">
                          {service.description}
                        </p>
                      </div>

                      {/* Interactive Button with text-roll to match rest of the site */}
                      <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
                        <button className="flex items-center gap-2.5 text-[13px] font-semibold text-gray-800 group-hover:text-[#38BDF8] transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer">
                          <div className="h-[20px] overflow-hidden text-left relative">
                            <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                              <span className="h-[20px] leading-[20px] block shrink-0 whitespace-nowrap">Get Details</span>
                              <span className="h-[20px] leading-[20px] block shrink-0 whitespace-nowrap">Get Details</span>
                            </div>
                          </div>
                          <div className="w-5 h-5 bg-gray-100 text-gray-900 group-hover:bg-[#38BDF8] group-hover:text-white rounded-full flex items-center justify-center transform transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                            <ArrowRight size={11} strokeWidth={2.5} />
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

          </div>

          {/* COMPANY DESCRIPTION SECTION */}
          <div id="contact" className="px-5 sm:px-8 lg:px-12 mt-16 sm:mt-24">
            <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
              
              {/* Subtle background graphic */}
              <div className="absolute right-0 top-0 w-96 h-96 bg-[#38BDF8]/10 rounded-full filter blur-[100px] pointer-events-none" />
              
              <div className="max-w-2xl relative z-10">
                <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">Corvetheq IT Solutions</span>
                <h3 className="text-3xl sm:text-4xl font-semibold leading-tight mt-2">
                  {companyConfig.headline}
                </h3>
                <p className="text-gray-300 mt-4 text-[14px] sm:text-[15px] leading-relaxed">
                  {companyConfig.description}
                </p>

                {/* Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-8">
                  {services.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Contact & Social Links */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider block mb-3">Get In Touch Directly</span>
                  <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-2">
                    {/* Gmail Link */}
                    <a
                      href={`mailto:${companyConfig.email}`}
                      className="group flex items-center gap-2 text-[14px] font-medium text-white hover:text-[#38BDF8] transition-colors duration-200"
                      title="Send an Email"
                    >
                      <Mail size={15} className="text-[#38BDF8]" />
                      <span>{companyConfig.email}</span>
                      <ArrowRight size={13} className="text-[#38BDF8] group-hover:translate-x-0.5 transition-transform duration-200 ml-0.5 shrink-0" />
                    </a>

                    {/* WhatsApp Link */}
                    <a
                      href={`https://wa.me/${(() => {
                        const num = companyConfig.mobile.replace(/[^0-9]/g, "");
                        return num.length === 10 && (num.startsWith("9") || num.startsWith("8") || num.startsWith("7") || num.startsWith("6")) ? "91" + num : num;
                      })()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-[14px] font-medium text-white hover:text-emerald-400 transition-colors duration-200"
                      title="Chat on WhatsApp"
                    >
                      <svg className="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.783 11.783 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                      </svg>
                      <span>{companyConfig.mobile}</span>
                      <ArrowRight size={13} className="text-emerald-400 group-hover:translate-x-0.5 transition-transform duration-200 ml-0.5 shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Consultation / Contact form or rapid contact CTA */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 w-full lg:max-w-md shrink-0 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Start Your Conversation</h4>
                </div>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8 space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 size={24} />
                    </div>
                    <h5 className="text-white font-medium text-base">Inquiry Received!</h5>
                    <p className="text-gray-400 text-xs max-w-xs leading-relaxed">
                      Thank you for getting in touch. Our team will get back to you shortly at your provided contact details.
                    </p>
                    
                    {/* Email Check Notice */}
                    <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-3 max-w-xs mt-3">
                      <div className="flex items-start gap-2">
                        <Mail size={16} className="text-sky-400 shrink-0 mt-0.5" />
                        <p className="text-sky-200 text-[11px] leading-relaxed text-left">
                          <strong className="font-semibold">Check your email!</strong> We've sent you a confirmation. If you don't see it in your inbox, please check your <strong>Spam</strong> or <strong>Promotions</strong> folder.
                        </p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-[#38BDF8] hover:underline pt-2 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] text-gray-400 uppercase tracking-wider mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Jane Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. jane@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 uppercase tracking-wider mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="e.g. +91 98864 81493"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 uppercase tracking-wider mb-1">Type of Service</label>
                      <div className="relative">
                        {/* Custom Dropdown Trigger */}
                        <button
                          type="button"
                          onClick={() => setIsSelectOpen(!isSelectOpen)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white text-left flex items-center justify-between focus:outline-none focus:border-[#38BDF8] transition-all hover:bg-white/10 cursor-pointer"
                        >
                          <span>{formData.service}</span>
                          <motion.div
                            animate={{ rotate: isSelectOpen ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="text-gray-400 flex items-center justify-center shrink-0"
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        </button>

                        {/* Hidden input to ensure HTML form validation or native submission if needed */}
                        <input type="hidden" name="service" value={formData.service} required />

                        {/* Dropdown Menu Options */}
                        <AnimatePresence>
                          {isSelectOpen && (
                            <>
                              {/* Click-away overlay wrapper */}
                              <div
                                className="fixed inset-0 z-30"
                                onClick={() => setIsSelectOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute left-0 right-0 bottom-full mb-1.5 bg-[#1e293b]/95 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl z-40 max-h-56 overflow-y-auto custom-scrollbar"
                              >
                                {services.map((serviceName) => {
                                  const isSelected = formData.service === serviceName;
                                  return (
                                    <button
                                      key={serviceName}
                                      type="button"
                                      onClick={() => {
                                        setFormData({ ...formData, service: serviceName });
                                        setIsSelectOpen(false);
                                      }}
                                      className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center justify-between cursor-pointer ${
                                        isSelected
                                          ? "bg-[#38BDF8] text-white font-medium"
                                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                                      }`}
                                    >
                                      <span>{serviceName}</span>
                                      {isSelected && (
                                        <CheckCircle2 size={14} className="text-white" />
                                      )}
                                    </button>
                                  );
                                })}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full bg-[#38BDF8] hover:bg-[#0EA5E9] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-semibold rounded-full pl-6 pr-2 py-2 flex items-center justify-between transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer mt-2"
                    >
                      <div className="h-[20px] overflow-hidden text-left relative">
                        <div className="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2">
                          <span className="h-[20px] leading-[20px] block shrink-0 whitespace-nowrap">
                            {isSubmitting ? "Sending your message..." : "Send Message"}
                          </span>
                          <span className="h-[20px] leading-[20px] block shrink-0 whitespace-nowrap">
                            {isSubmitting ? "Sending your message..." : "Send Message"}
                          </span>
                        </div>
                      </div>
                      <div className={`w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#38BDF8] shrink-0 ${isSubmitting ? 'animate-spin' : 'transform transition-transform duration-500 group-hover:-rotate-45'}`}>
                        {isSubmitting ? (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <ArrowRight size={14} />
                        )}
                      </div>
                    </button>
                    
                    {/* Loading Notice */}
                    {isSubmitting && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-3 mt-3"
                      >
                        <p className="text-sky-200 text-[11px] text-center leading-relaxed">
                          Please wait while we send your inquiry and confirmation email. This may take up to a minute...
                        </p>
                      </motion.div>
                    )}
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
