import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Globe, 
  Monitor, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Wifi,
  Video,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "../components/providers/LanguageContext";

export default function RemoteInterpretation() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Globe,
      title: t('remote.benefit1.title'),
      description: t('remote.benefit1.desc')
    },
    {
      icon: Clock,
      title: t('remote.benefit2.title'),
      description: t('remote.benefit2.desc')
    },
    {
      icon: Monitor,
      title: t('remote.benefit3.title'),
      description: t('remote.benefit3.desc')
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
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-6">
            {t('remote.badge')}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            {t('remote.title')}
          </h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto mb-8">
            {t('remote.subtitle')}
          </p>
          <Link to={createPageUrl("Auth")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              {t('remote.bookButton')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-purple-600" />
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
            <CardTitle className="text-3xl text-blue-900 mb-4">{t('remote.requirements.title')}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                  <Wifi className="w-5 h-5 me-2" />
                  {t('remote.requirements.basic.title')}
                </h3>
                <ul className="space-y-2">
                  {[
                    t('remote.requirements.basic.item1'),
                    t('remote.requirements.basic.item2'), 
                    t('remote.requirements.basic.item3'),
                    t('remote.requirements.basic.item4')
                  ].map((req, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-blue-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                  <Video className="w-5 h-5 me-2" />
                  {t('remote.requirements.platform.title')}
                </h3>
                <ul className="space-y-2">
                  {[
                    t('remote.requirements.platform.item1'),
                    t('remote.requirements.platform.item2'),
                    t('remote.requirements.platform.item3'),
                    t('remote.requirements.platform.item4')
                  ].map((platform, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-blue-700">{platform}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            {t('remote.cta.title')}
          </h2>
          <Link to={createPageUrl("Auth")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              {t('remote.cta.button')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}