
import React from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import {

  Users,
  Clock,
  CheckCircle,
  Globe,
  Headphones,
  ArrowRight,
  Shield,
  Zap,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "../components/providers/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Headphones,
      title: t('home.services.simultaneous'),
      description: t('home.services.simultaneous.desc')
    },
    {
      icon: Users,
      title: t('home.services.consecutive'),
      description: t('home.services.consecutive.desc')
    },
    {
      icon: Globe,
      title: t('home.services.online'),
      description: t('home.services.online.desc')
    }
  ];


  const features = [
    {
      icon: Shield,
      title: t('home.feature.professional'),
      description: t('home.feature.professional.desc')
    },
    {
      icon: Zap,
      title: t('home.feature.instant'),
      description: t('home.feature.instant.desc')
    },
    {
      icon: Clock,
      title: t('home.feature.support'),
      description: t('home.feature.support.desc')
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl text-blue-700 mb-8 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to={createPageUrl("Auth")}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                    {t('home.hero.book')}
                    <ArrowRight className="w-5 h-5 ms-2" />
                  </Button>
                </Link>
                <Link to={createPageUrl("Auth")}>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-3 text-lg">
                    {t('home.hero.become')}
                  </Button>
                </Link>
              </div>
              <div className="flex items-center mt-8 space-x-6 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) =>
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white"></div>
                  )}
                </div>
                <span className="ml-3 text-sm text-blue-600">{t('home.hero.interpretersCount')}</span>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional interpretation services"
                  className="rounded-2xl shadow-2xl" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-blue-600 max-w-3xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) =>
              <Card key={index} className="border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                    <service.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-4">{service.title}</h3>
                  <p className="text-blue-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
              {t('home.how.title')}
            </h2>
            <p className="text-xl text-blue-600 max-w-3xl mx-auto">
              {t('home.how.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: t('home.how.step1.title'),
                description: t('home.how.step1.desc')
              },
              {
                step: "02",
                title: t('home.how.step2.title'),
                description: t('home.how.step2.desc')
              },
              {
                step: "03",
                title: t('home.how.step3.title'),
                description: t('home.how.step3.desc')
              }].
              map((step, index) =>
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-4">{step.title}</h3>
                    <p className="text-blue-600 leading-relaxed">{step.description}</p>
                  </div>
                  {index < 2 &&
                    <div className="hidden md:block absolute top-8 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-blue-300 mx-auto" />
                    </div>
                  }
                </div>
              )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">
                {t('home.why.title')}
              </h2>
              <p className="text-xl text-blue-600 mb-8">
                {t('home.why.subtitle')}
              </p>
              <div className="space-y-6">
                {features.map((feature, index) =>
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">{feature.title}</h3>
                      <p className="text-blue-600">{feature.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Professional team meeting with interpretation"
                className="rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Auth")}>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold">
                {t('home.cta.button')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <img
                src="https://gslyudiisdmzpsxesyor.supabase.co/storage/v1/object/public/interpreter-files/last%20logo%20booklingo.png"
                alt="BookLingo"
                className="h-10 mb-4" />
              <p className="text-blue-800 text-sm max-w-xs">
                {t('home.footer.tagline')}
              </p>
            </div>

            <div>
              <h3 className="text-blue-900 font-semibold mb-4">{t('services')}</h3>
              <ul className="space-y-2 text-blue-800">
                <li>
                  <Link to={createPageUrl("SimultaneousInterpretation")} className="hover:text-blue-600 transition-colors">
                    {t('home.services.simultaneous')}
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("ConsecutiveInterpretation")} className="hover:text-blue-600 transition-colors">
                    {t('home.services.consecutive')}
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("RemoteInterpretation")} className="hover:text-blue-600 transition-colors">
                    {t('home.services.online')}
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("DocumentTranslation")} className="hover:text-blue-600 transition-colors">
                    {t('home.services.translation')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-blue-900 font-semibold mb-4">{t('company')}</h3>
              <ul className="space-y-2 text-blue-800">
                <li>
                  <Link to={createPageUrl("About")} className="hover:text-blue-600 transition-colors">
                    {t('home.footer.aboutUs')}
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("Pricing")} className="hover:text-blue-600 transition-colors">
                    {t('home.footer.pricing')}
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("Contact")} className="hover:text-blue-600 transition-colors">
                    {t('home.footer.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-blue-900 font-semibold mb-4">{t('contactUs')}</h3>
              <div className="text-blue-800 space-y-3">
                <div className="flex items-center justify-center md:justify-start">
                  <a href="https://maps.google.com/?q=52HF+FV5+Erbil" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                    <MapPin className="w-4 h-4 me-2 flex-shrink-0 cursor-pointer hover:scale-110 transition-transform" />
                  </a>
                  <span className="text-left text-sm no-underline">{t('home.footer.address')}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="w-4 h-4 me-2" />
                  <a href="tel:+9647504486008" className="hover:text-blue-600 text-sm" dir="ltr">+964 750 448 6008</a>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="w-4 h-4 me-2" />
                  <a href="mailto:raadmail@yahoo.com" className="hover:text-blue-600 text-sm">raadmail@yahoo.com</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-200 mt-10 pt-8 text-center text-blue-700">
            <p className="">{t('allRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );

}
