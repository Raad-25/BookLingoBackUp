import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Users, Briefcase, Mail, Lock, ArrowLeft } from "lucide-react";
import { createPageUrl } from "@/utils";
import { useLanguage } from "../components/providers/LanguageContext";

const GoogleIcon = (props) => (
  <svg role="img" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-5.07 1.9-4.75 0-8.58-3.92-8.58-8.75s3.83-8.75 8.58-8.75c2.63 0 4.37.99 5.37 1.94l2.6-2.58C18.97 1.22 16.25 0 12.48 0 5.88 0 .52 5.56.52 12.25s5.36 12.25 11.96 12.25c3.4 0 6.33-1.15 8.49-3.34 2.2-2.2 2.8-5.22 2.8-8.32 0-.66-.07-1.35-.2-2.02h-11.1z"
    />
  </svg>
);

export default function Auth() {
  const { t } = useLanguage();
  const [userType, setUserType] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setIsSignUp(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", { userType, isSignUp, email, password });
    alert(`${t(isSignUp ? 'auth.simulatingSignUp' : 'auth.simulatingSignIn')} ${userType}. ${t('auth.redirectingProfile')}`);
    navigate(createPageUrl('Profile'), { state: { userType: userType } });
  };

  const handleGoogleSignIn = () => {
    alert(t('auth.googleSignInComingSoon'));
  };
  
  const renderUserTypeSelection = () => (
    <Card className="w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95">
      <CardHeader className="text-center">
        <Link to={createPageUrl("Home")} className="mx-auto mb-4 inline-block transition-transform hover:scale-105">
          <img 
            src="https://gslyudiisdmzpsxesyor.supabase.co/storage/v1/object/public/interpreter-files/last%20logo%20booklingo.png" 
            alt="BookLingo"
            className="h-16 w-auto mx-auto"
          />
        </Link>
        <CardTitle className="text-3xl font-bold text-blue-900">{t('auth.welcome')}</CardTitle>
        <CardDescription className="text-blue-700">{t('auth.selectRole')}</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 gap-6">
          <Button
            onClick={() => handleUserTypeSelect("client")}
            className="h-24 text-xl bg-white text-blue-800 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
          >
            <Users className="mr-4 h-8 w-8" />
            {t('auth.continueClient')}
          </Button>
          <Button
            onClick={() => handleUserTypeSelect("interpreter")}
            className="h-24 text-xl bg-white text-blue-800 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
          >
            <Briefcase className="mr-4 h-8 w-8" />
            {t('auth.continueInterpreter')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderAuthForm = () => (
    <Card className="w-full max-w-md shadow-2xl animate-in fade-in-0 zoom-in-95">
       <CardHeader className="relative">
        <Button variant="ghost" size="icon" className="absolute top-4 left-4 text-gray-500 hover:bg-gray-100" onClick={() => setUserType(null)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-center pt-8">
            <div className={`mx-auto w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3`}>
                {userType === 'client' ? <Users className="h-7 w-7 text-blue-600"/> : <Briefcase className="h-7 w-7 text-blue-600"/>}
            </div>
            <CardTitle className="text-2xl font-bold text-blue-900">
                {isSignUp 
                  ? t(userType === 'client' ? 'auth.createClientAccount' : 'auth.createInterpreterAccount')
                  : t(userType === 'client' ? 'auth.clientSignIn' : 'auth.interpreterSignIn')
                }
            </CardTitle>
            <CardDescription className="text-blue-700">
                {isSignUp ? t('auth.toStartBooking') : t('auth.toAccessDashboard')}
            </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-800">{t('auth.email')}</Label>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                <Input
                id="email"
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
                />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-blue-800">{t('auth.password')}</Label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                <Input
                id="password"
                type="password"
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10"
                />
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-lg h-12">
            {t(isSignUp ? 'auth.signUp' : 'auth.signIn')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-blue-700 hover:text-blue-900 hover:underline">
            {t(isSignUp ? 'auth.alreadyHaveAccount' : 'auth.needAccount')}
          </button>
        </div>

        <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">{t('auth.or')}</span>
        </div>

        <Button variant="outline" className="w-full h-12 text-base border-gray-300" onClick={handleGoogleSignIn}>
            <GoogleIcon className="mr-2 h-5 w-5"/>
            {t('auth.signInWithGoogle')}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-100 p-4">
      {userType ? renderAuthForm() : renderUserTypeSelection()}
    </div>
  );
}