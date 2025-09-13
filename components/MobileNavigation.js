import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from './providers/LanguageContext';
import { Button } from '@/components/ui/button';
import { X, Home, Globe, Users, Briefcase, Phone, Mail, DollarSign, Info } from 'lucide-react';

export default function MobileNavigation({ isOpen, onClose }) {
  const { t } = useLanguage();

  const navigationItems = [
    {
      icon: Home,
      label: t('home.nav.home'),
      href: createPageUrl('Home'),
      action: () => {
        window.location.href = createPageUrl('Home');
        onClose();
      }
    },
    {
      icon: Globe,
      label: t('services'),
      href: '/#services',
      action: () => {
        window.location.href = '/#services';
        onClose();
      }
    },
    {
      icon: Users,
      label: t('home.services.simultaneous'),
      href: createPageUrl('SimultaneousInterpretation'),
      action: () => {
        window.location.href = createPageUrl('SimultaneousInterpretation');
        onClose();
      }
    },
    {
      icon: Users,
      label: t('home.services.consecutive'),
      href: createPageUrl('ConsecutiveInterpretation'),
      action: () => {
        window.location.href = createPageUrl('ConsecutiveInterpretation');
        onClose();
      }
    },
    {
      icon: Globe,
      label: t('home.services.online'),
      href: createPageUrl('RemoteInterpretation'),
      action: () => {
        window.location.href = createPageUrl('RemoteInterpretation');
        onClose();
      }
    },
    {
      icon: Briefcase,
      label: t('home.services.translation'),
      href: createPageUrl('DocumentTranslation'),
      action: () => {
        window.location.href = createPageUrl('DocumentTranslation');
        onClose();
      }
    },
    {
      icon: Info,
      label: t('layout.nav.about'),
      href: createPageUrl('About'),
      action: () => {
        window.location.href = createPageUrl('About');
        onClose();
      }
    },
    {
      icon: DollarSign,
      label: t('home.footer.pricing'),
      href: createPageUrl('Pricing'),
      action: () => {
        window.location.href = createPageUrl('Pricing');
        onClose();
      }
    },
    {
      icon: Phone,
      label: t('home.footer.contact'),
      href: createPageUrl('Contact'),
      action: () => {
        window.location.href = createPageUrl('Contact');
        onClose();
      }
    }
  ];

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Slide-out Navigation Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center space-x-3">
            <img
              src="https://gslyudiisdmzpsxesyor.supabase.co/storage/v1/object/public/interpreter-files/last%20logo%20booklingo.png"
              alt="BookLingo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-blue-900">BookLingo</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-4">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200 group"
              >
                <item.icon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 space-y-3">
          <Link to={createPageUrl('Auth')} onClick={onClose}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {t('getStarted')}
            </Button>
          </Link>
          <div className="text-center">
            <p className="text-sm text-gray-500">{t('home.footer.tagline')}</p>
          </div>
        </div>
      </div>
    </>
  );
}