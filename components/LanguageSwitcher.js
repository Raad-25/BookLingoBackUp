import React from 'react';
import { useLanguage } from './providers/LanguageContext';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold"
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
    </Button>
  );
}