
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  CheckCircle, 
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "../components/providers/LanguageContext";

export default function Pricing() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('pricing.plan.basic.name'),
      description: t('pricing.plan.basic.desc'),
      features: [
        t('pricing.plan.basic.feature1'),
        t('pricing.plan.basic.feature2'),
        t('pricing.plan.basic.feature3'), 
        t('pricing.plan.basic.feature4'),
        t('pricing.plan.basic.feature5')
      ],
      badge: null,
      buttonText: t('pricing.plan.basic.button')
    },
    {
      name: t('pricing.plan.pro.name'), 
      description: t('pricing.plan.pro.desc'),
      features: [
        t('pricing.plan.pro.feature1'),
        t('pricing.plan.pro.feature2'),
        t('pricing.plan.pro.feature3'),
        t('pricing.plan.pro.feature4'),
        t('pricing.plan.pro.feature5'),
        t('pricing.plan.pro.feature6')
      ],
      badge: t('pricing.plan.pro.badge'),
      buttonText: t('pricing.plan.pro.button')
    },
    {
      name: t('pricing.plan.enterprise.name'),
      description: t('pricing.plan.enterprise.desc'),
      features: [
        t('pricing.plan.enterprise.feature1'),
        t('pricing.plan.enterprise.feature2'),
        t('pricing.plan.enterprise.feature3'),
        t('pricing.plan.enterprise.feature4'),
        t('pricing.plan.enterprise.feature5'),
        t('pricing.plan.enterprise.feature6'),
        t('pricing.plan.enterprise.feature7'),
        t('pricing.plan.enterprise.feature8')
      ],
      badge: t('pricing.plan.enterprise.badge'),
      buttonText: t('pricing.plan.enterprise.button')
    }
  ];

  const additionalServices = [
    {
      service: t('pricing.additional.service1.name'),
      features: [
        t('pricing.additional.service1.feature1'), 
        t('pricing.additional.service1.feature2'), 
        t('pricing.additional.service1.feature3')
      ]
    },
    {
      service: t('pricing.additional.service2.name'),
      features: [
        t('pricing.additional.service2.feature1'), 
        t('pricing.additional.service2.feature2'), 
        t('pricing.additional.service2.feature3')
      ]
    },
    {
      service: t('pricing.additional.service3.name'),
      features: [
        t('pricing.additional.service3.feature1'), 
        t('pricing.additional.service3.feature2'), 
        t('pricing.additional.service3.feature3')
      ]
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
            {t('pricing.badge')}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto mb-8">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative bg-white shadow-lg ${plan.badge ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-blue-900 mb-4">
                  {plan.name}
                </CardTitle>
                <p className="text-blue-700">{plan.description}</p>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-blue-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={createPageUrl("Contact")}>
                  <Button className={`w-full py-3 ${plan.badge ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                    {plan.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white shadow-xl mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-blue-900 mb-4">{t('pricing.additional.title')}</CardTitle>
            <p className="text-blue-700">{t('pricing.additional.subtitle')}</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => (
                <div key={index} className="text-center p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">{service.service}</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-blue-700 text-sm">• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            {t('pricing.cta.title')}
          </h2>
          <p className="text-xl text-blue-700 mb-8">
            {t('pricing.cta.subtitle')}
          </p>
          <Link to={createPageUrl("Auth")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              {t('pricing.cta.button')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
