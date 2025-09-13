import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  Send
} from "lucide-react";
import { useLanguage } from "../components/providers/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('contact.alert'));
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Card className="bg-white shadow-xl animate-in fade-in-0 zoom-in-95">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-900">{t('contact.title')}</CardTitle>
            <p className="text-blue-700">{t('contact.subtitle')}</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-blue-800">{t('contact.name.label')}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contact.name.placeholder')}
                    required />
                </div>
                <div>
                  <Label htmlFor="email" className="text-blue-800">{t('contact.email.label')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('contact.email.placeholder')}
                    required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="text-blue-800" dir="auto">{t('contact.phone.label')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('contact.phone.placeholder')} />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-blue-800">{t('contact.subject.label')}</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t('contact.subject.placeholder')}
                    required />
                </div>
              </div>
              <div>
                <Label htmlFor="message" className="text-blue-800">{t('contact.message.label')}</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('contact.message.placeholder')}
                  className="h-32"
                  required />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                <Send className="w-4 h-4 mr-2" />
                {t('contact.button')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}