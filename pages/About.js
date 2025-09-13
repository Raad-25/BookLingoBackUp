import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Target,
  Heart,
  Lightbulb,
  ArrowRight,
  Users,
  Award,
  Globe,
  Shield,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "../components/providers/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { number: "50+", label: t('about.stat.clients') },
    { number: "30+", label: t('about.stat.interpreters') },
    { number: "5+", label: t('about.stat.languages') },
    { number: "15+", label: t('about.stat.reliability') }
  ];

  const values = [
    {
      icon: Target,
      title: t('about.value1.title'),
      description: t('about.value1.desc')
    },
    {
      icon: Heart,
      title: t('about.value2.title'),
      description: t('about.value2.desc')
    },
    {
      icon: Lightbulb,
      title: t('about.value3.title'),
      description: t('about.value3.desc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link to={createPageUrl("Home")} className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToHome')}
          </Link>
        </div>

        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-6">
            {t('about.badge')}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto mb-8">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-blue-900 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <Card className="bg-white shadow-xl mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-blue-900 mb-4">{t('about.story.title')}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="max-w-4xl mx-auto space-y-6 text-blue-700 text-lg leading-relaxed">
              <p>{t('about.story.p1')}</p>
              <p>{t('about.story.p2')}</p>
              <p>{t('about.story.p3')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">{t('about.values.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-blue-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 text-center">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">{t('about.mission.title')}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-xl text-center max-w-4xl mx-auto leading-relaxed">
              {t('about.mission.desc')}
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            {t('about.cta.title')}
          </h2>
          <Link to={createPageUrl("Auth")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              {t('about.cta.button')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}