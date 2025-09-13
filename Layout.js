
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { LanguageProvider, useLanguage } from "./components/providers/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";
import MobileNavigation from "./components/MobileNavigation";
import { Button } from "@/components/ui/button";
import { Menu, MessageSquare } from "lucide-react";

const AppLayout = ({ children }) => {
  const { t, language } = useLanguage();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3 transition-transform hover:scale-105">
              <img
                src="https://gslyudiisdmzpsxesyor.supabase.co/storage/v1/object/public/interpreter-files/last%20logo%20booklingo.png"
                alt="BookLingo"
                className="h-10 w-auto" />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className={`hidden md:flex items-center ${language === 'ar' ? 'space-x-8' : 'space-x-6'}`}>
              <a href="/#services" className="text-blue-700 mx-6 font-medium hover:text-blue-900 transition-colors">{t('services')}</a>
              <a href="/#how-it-works" className="text-blue-700 pr-4 font-medium hover:text-blue-900 transition-colors">{t('layout.nav.howItWorks')}</a>
              <Link to={createPageUrl("About")} className="text-blue-700 hover:text-blue-900 font-medium transition-colors">{t('layout.nav.about')}</Link>
              <LanguageSwitcher />
              <Link to={createPageUrl("Auth")}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                      {t('getStarted')}
                  </Button>
              </Link>
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileNav}
                className="text-blue-700 hover:bg-blue-50"
                aria-label="Toggle navigation menu">

                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isMobileNavOpen} onClose={closeMobileNav} />
      
      <main>{children}</main>
      
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link to={createPageUrl("SupportChat")}>
          <Button size="icon" className="bg-amber-300 text-primary-foreground text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 w-16 h-16 rounded-full hover:bg-blue-700 shadow-lg">
            <MessageSquare className="w-8 h-8" />
          </Button>
        </Link>
      </div>
    </div>);
};

export default function Layout({ children, currentPageName }) {
  const noLayoutPages = ["Auth", "Profile", "Dashboard", "InterpreterPublicProfile", "SupportChat"];
  const simpleLayoutPages = ["SimultaneousInterpretation", "ConsecutiveInterpretation", "RemoteInterpretation", "DocumentTranslation", "About", "Pricing", "Contact"];

  if (noLayoutPages.includes(currentPageName)) {
    return <LanguageProvider>{children}</LanguageProvider>;
  }

  // For other pages that should not have the main landing page nav
  if (simpleLayoutPages.includes(currentPageName)) {
    const SimpleLayout = () => {
      const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

      return (
        <div>
          <header className="bg-white/80 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link to={createPageUrl("Home")} className="flex items-center space-x-3 transition-transform hover:scale-105">
                  <img
                    src="https://gslyudiisdmzpsxesyor.supabase.co/storage/v1/object/public/interpreter-files/last%20logo%20booklingo.png"
                    alt="BookLingo"
                    className="h-10 w-auto" />
                </Link>
                <div className="flex items-center space-x-2">
                  <LanguageSwitcher />
                  <div className="md:hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                      className="text-blue-700 hover:bg-blue-50"
                      aria-label="Toggle navigation menu">

                      <Menu className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <MobileNavigation isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
          {children}
        </div>);

    };

    return (
      <LanguageProvider>
        <SimpleLayout />
      </LanguageProvider>);
  }

  return (
    <LanguageProvider>
      <AppLayout>{children}</AppLayout>
    </LanguageProvider>);
}