import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  FileText,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Upload,
  Award,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "../components/providers/LanguageContext";

export default function DocumentTranslation() {
  const { t } = useLanguage();
  
  const services = [
  {
    icon: FileText,
    title: t('translation.service1.title'),
    description: t('translation.service1.desc')
  },
  {
    icon: Award,
    title: t('translation.service2.title'),
    description: t('translation.service2.desc')
  },
  {
    icon: Shield,
    title: t('translation.service3.title'),
    description: t('translation.service3.desc')
  }];


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
          <Badge className="bg-amber-100 text-amber-800 border-amber-200 mb-6">
            {t('translation.badge')}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            {t('translation.title')}
          </h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto mb-8">
            {t('translation.subtitle')}
          </p>
          <Link to={createPageUrl("Auth")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              {t('translation.bookButton')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) =>
          <Card key={index} className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-xl text-blue-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 text-center">{service.description}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="bg-white shadow-xl mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-blue-900 mb-4">{t('translation.types.title')}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                t('translation.types.item1'),
                t('translation.types.item2'),
                t('translation.types.item3'),
                t('translation.types.item4'),
                t('translation.types.item5'),
                t('translation.types.item6'),
                t('translation.types.item7'),
                t('translation.types.item8')
              ].map((docType, index) =>
              <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-blue-700">{docType}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {t('translation.turnaround.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-blue-700">
                <li>{t('translation.turnaround.item1')}</li>
                <li>{t('translation.turnaround.item2')}</li>
                <li>{t('translation.turnaround.item3')}</li>
                <li>{t('translation.turnaround.item4')}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                {t('translation.process.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-blue-700">
                <li>{t('translation.process.item1')}</li>
                <li>{t('translation.process.item2')}</li>
                <li>{t('translation.process.item3')}</li>
                <li>{t('translation.process.item4')}</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            {t('translation.cta.title')}
          </h2>
          <Link to={createPageUrl("Auth")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              {t('translation.cta.button')}
            </Button>
          </Link>
        </div>
      </div>
    </div>);
}