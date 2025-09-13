import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Headphones, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Mic,
  Globe,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "../components/providers/LanguageContext";

export default function SimultaneousInterpretation() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Clock,
      title: t('simultaneous.benefit1.title'),
      description: t('simultaneous.benefit1.desc')
    },
    {
      icon: Users,
      title: t('simultaneous.benefit2.title'),
      description: t('simultaneous.benefit2.desc')
    },
    {
      icon: Mic,
      title: t('simultaneous.benefit3.title'),
      description: t('simultaneous.benefit3.desc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link to={createPageUrl("Home")} className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 me-2" />
            {t('backToHome')}
          </Link>
        </div>

        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-6">
            {t('simultaneous.badge')}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            {t('simultaneous.title')}
          </h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto mb-8">
            {t('simultaneous.subtitle')}
          </p>
          <Link to={createPageUrl("Auth")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              {t('simultaneous.bookButton')}
              <ArrowRight className="w-5 h-5 ms-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-blue-900">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 text-center">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white shadow-xl mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-blue-900 mb-4">{t('simultaneous.how.title')}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                t('simultaneous.how.step1'),
                t('simultaneous.how.step2'),
                t('simultaneous.how.step3')
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {index + 1}
                  </div>
                  <p className="text-blue-700">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            {t('simultaneous.cta.title')}
          </h2>
          <Link to={createPageUrl("Auth")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              {t('simultaneous.cta.button')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}