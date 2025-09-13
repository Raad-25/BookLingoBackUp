import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  MessageCircle, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  UserCheck,
  Volume2,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "../components/providers/LanguageContext";

export default function ConsecutiveInterpretation() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: MessageCircle,
      title: t('consecutive.benefit1.title'),
      description: t('consecutive.benefit1.desc')
    },
    {
      icon: Users,
      title: t('consecutive.benefit2.title'),
      description: t('consecutive.benefit2.desc')
    },
    {
      icon: UserCheck,
      title: t('consecutive.benefit3.title'),
      description: t('consecutive.benefit3.desc')
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
          <Badge className="bg-green-100 text-green-800 border-green-200 mb-6">
            {t('consecutive.badge')}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            {t('consecutive.title')}
          </h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto mb-8">
            {t('consecutive.subtitle')}
          </p>
          <Link to={createPageUrl("Auth")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              {t('consecutive.bookButton')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-green-600" />
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
            <CardTitle className="text-3xl text-blue-900 mb-4">{t('consecutive.perfectFor.title')}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                t('consecutive.perfectFor.item1'),
                t('consecutive.perfectFor.item2'), 
                t('consecutive.perfectFor.item3'),
                t('consecutive.perfectFor.item4'),
                t('consecutive.perfectFor.item5'),
                t('consecutive.perfectFor.item6')
              ].map((use, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-blue-700">{use}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            {t('consecutive.cta.title')}
          </h2>
          <Link to={createPageUrl("Auth")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              {t('consecutive.cta.button')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}