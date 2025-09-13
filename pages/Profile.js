
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User as UserEntity } from "@/entities/User";
import { InterpreterProfile } from "@/entities/InterpreterProfile";
import { UploadPrivateFile } from "@/integrations/Core";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "../components/providers/LanguageContext";
import { User, Phone, Mail, Upload, Save, Languages, Briefcase, Info, FileText, BadgeCheck, Star, Banknote, Building, UserSquare, Hash } from 'lucide-react';

const languageOptions = ['en', 'ar', 'ku_sorani', 'ku_bahdini', 'tr', 'fr', 'it', 'other'];
const interpTypes = ['simultaneous', 'consecutive', 'remote'];

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    about: '', years_of_experience: '', languages: [], other_language: '', interpretation_types: [],
    is_sworn_translator: false, sworn_id_uri: '', is_accredited: false, accreditation_cert_uri: '',
    rate: '', currency: 'USD', payment_terms: '', bank_name: '', account_holder_name: '', iban: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState({ sworn: false, accredited: false });

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        console.log('Fetching current user...'); // Debug log
        const currentUser = await UserEntity.me();
        console.log('Current user fetched:', currentUser); // Debug log
        setUser(currentUser);
        
        console.log('Fetching profile for user:', currentUser.id); // Debug log
        const existingProfiles = await InterpreterProfile.filter({ user_id: currentUser.id });
        console.log('Existing profiles found:', existingProfiles); // Debug log
        
        if (existingProfiles && existingProfiles.length > 0) {
          setProfile(existingProfiles[0]);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchUserAndProfile();
  }, []);
  
  const handleFileUpload = async (file, type) => {
    if (!file) return;
    setIsUploading(prev => ({ ...prev, [type]: true }));
    try {
      const { file_uri } = await UploadPrivateFile({ file });
      if (type === 'sworn') {
        setProfile(p => ({ ...p, sworn_id_uri: file_uri, is_sworn_translator: true }));
      } else if (type === 'accredited') {
        setProfile(p => ({ ...p, accreditation_cert_uri: file_uri, is_accredited: true }));
      }
    } catch (error) {
      console.error("File upload failed:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setIsUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleCheckboxChange = (field, value) => {
    setProfile(p => {
      const currentValues = p[field] || [];
      if (currentValues.includes(value)) {
        return { ...p, [field]: currentValues.filter(item => item !== value) };
      } else {
        return { ...p, [field]: [...currentValues, value] };
      }
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      console.log('Saving profile for user:', user.id); // Debug log
      const profileData = { 
        ...profile, 
        user_id: user.id 
      };

      // Ensure numeric fields are numbers or null, not empty strings
      profileData.years_of_experience = profileData.years_of_experience === '' || profileData.years_of_experience === null ? null : Number(profileData.years_of_experience);
      profileData.rate = profileData.rate === '' || profileData.rate === null ? null : Number(profileData.rate);
      
      console.log('Profile data to save:', profileData); // Debug log
      
      if (profile.id) {
        await InterpreterProfile.update(profile.id, profileData);
        console.log('Profile updated successfully'); // Debug log
      } else {
        const newProfile = await InterpreterProfile.create(profileData);
        console.log('Profile created successfully:', newProfile); // Debug log
      }
      alert(t('profile.saveSuccess'));
      navigate(createPageUrl('Dashboard'));
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
          <p className="text-sm text-gray-500">User ID: {user?.id || 'Not loaded yet'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSave} className="max-w-4xl mx-auto">
        <Card className="shadow-2xl animate-in fade-in zoom-in-95">
          <CardHeader className="text-center bg-gray-50 p-8 rounded-t-lg">
            <User className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <CardTitle className="text-3xl font-bold text-blue-900">{t('profile.title')}</CardTitle>
            <CardDescription className="text-blue-700">{t('profile.subtitle')}</CardDescription>
            <p className="text-xs text-gray-500 mt-2">Editing profile for: {user.full_name || user.email} (ID: {user.id})</p>
          </CardHeader>
          <CardContent className="p-8 space-y-10">
            {/* Personal Info */}
            <Section title={user.full_name || 'User Profile'}>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoField icon={Phone} label={t('profile.phone')} value={user.phone_number || t('profile.phonePlaceholder')} />
                <InfoField icon={Mail} label={t('profile.email')} value={user.email} />
              </div>
            </Section>
            
            {/* About Section */}
            <Section title={t('profile.about.title')} icon={Info}>
                <Textarea placeholder={t('profile.about.placeholder')} value={profile.about} onChange={e => setProfile({...profile, about: e.target.value})} className="h-32" />
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <InputField icon={Briefcase} label={t('profile.interpretationTypes')} id="types">
                    <div className="flex flex-wrap gap-4 pt-2">
                    {interpTypes.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`type-${type}`} checked={profile.interpretation_types?.includes(type)} onCheckedChange={() => handleCheckboxChange('interpretation_types', type)} />
                        <Label htmlFor={`type-${type}`} className="capitalize">{t(`profile.type.${type}`)}</Label>
                      </div>
                    ))}
                    </div>
                  </InputField>
                  <InputField icon={Star} label={t('profile.experience')} id="experience">
                    <Input type="number" placeholder={t('profile.experiencePlaceholder')} value={profile.years_of_experience} onChange={e => setProfile({...profile, years_of_experience: e.target.value})} />
                  </InputField>
                </div>
            </Section>

            {/* Languages Section */}
            <Section title={t('profile.languages.title')} icon={Languages}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {languageOptions.map(lang => (
                        <div key={lang} className="flex items-center space-x-2">
                            <Checkbox id={`lang-${lang}`} checked={profile.languages?.includes(lang)} onCheckedChange={() => handleCheckboxChange('languages', lang)} />
                            <Label htmlFor={`lang-${lang}`}>{t(`profile.lang.${lang}`)}</Label>
                        </div>
                    ))}
                </div>
                {profile.languages?.includes('other') && (
                    <Input className="mt-4" placeholder={t('profile.lang.otherPlaceholder')} value={profile.other_language} onChange={e => setProfile({...profile, other_language: e.target.value})} />
                )}
            </Section>

            {/* Credentials Section */}
            <Section title={t('profile.credentials.title')} icon={BadgeCheck}>
              <div className="grid md:grid-cols-2 gap-8">
                <FileUploadField type="sworn" profile={profile} isUploading={isUploading.sworn} handleFileUpload={handleFileUpload} t={t} />
                <FileUploadField type="accredited" profile={profile} isUploading={isUploading.accredited} handleFileUpload={handleFileUpload} t={t} />
              </div>
            </Section>

            {/* Rates & Payment Section */}
            <Section title={t('profile.rates.title')} icon={Banknote}>
                <div className="grid md:grid-cols-3 gap-6">
                    <InputField label={t('profile.rates.rate')} id="rate">
                        <Input type="number" placeholder={t('profile.rates.ratePlaceholder')} value={profile.rate} onChange={e => setProfile({...profile, rate: e.target.value})} />
                    </InputField>
                    <InputField label={t('profile.rates.currency')} id="currency">
                        <Select value={profile.currency} onValueChange={value => setProfile({...profile, currency: value})}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="USD">USD</SelectItem><SelectItem value="IQD">IQD</SelectItem></SelectContent>
                        </Select>
                    </InputField>
                </div>
                <div className="mt-6">
                    <Label htmlFor="payment_terms">{t('profile.rates.paymentTerms')}</Label>
                    <Textarea id="payment_terms" placeholder={t('profile.rates.paymentTermsPlaceholder')} value={profile.payment_terms} onChange={e => setProfile({...profile, payment_terms: e.target.value})} />
                </div>
                <div className="mt-6 border-t pt-6">
                    <h4 className="font-medium text-gray-700 mb-4">{t('profile.rates.bankInfo')}</h4>
                    <div className="grid md:grid-cols-3 gap-6">
                        <InputField icon={UserSquare} label={t('profile.rates.accountHolder')} id="acc_holder">
                            <Input value={profile.account_holder_name} onChange={e => setProfile({...profile, account_holder_name: e.target.value})} />
                        </InputField>
                        <InputField icon={Building} label={t('profile.rates.bankName')} id="bank_name">
                            <Input value={profile.bank_name} onChange={e => setProfile({...profile, bank_name: e.target.value})} />
                        </InputField>
                        <InputField icon={Hash} label={t('profile.rates.iban')} id="iban">
                            <Input value={profile.iban} onChange={e => setProfile({...profile, iban: e.target.value})} />
                        </InputField>
                    </div>
                </div>
            </Section>
          </CardContent>
          <CardFooter className="bg-gray-50 p-6 rounded-b-lg">
            <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-lg h-12" disabled={isSaving}>
              <Save className="w-5 h-5 me-2" />
              {isSaving ? t('profile.saving') : t('profile.save')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

const Section = ({ title, icon: Icon, children }) => (
  <div className="space-y-4 border-t pt-6">
    <h3 className="text-xl font-semibold text-blue-800 flex items-center gap-3">{Icon && <Icon className="w-6 h-6 text-blue-500"/>} {title}</h3>
    <div className="pl-9">{children}</div>
  </div>
);

const InfoField = ({ icon: Icon, label, value }) => (
    <div>
        <Label className="text-sm text-gray-500 flex items-center gap-2"><Icon className="w-4 h-4" /> {label}</Label>
        <p className="text-lg font-medium text-gray-800">{value}</p>
    </div>
);

const InputField = ({ icon: Icon, label, id, children }) => (
    <div className="space-y-1">
        <Label htmlFor={id} className="flex items-center gap-2">{Icon && <Icon className="w-4 h-4 text-gray-500"/>} {label}</Label>
        {children}
    </div>
);

const FileUploadField = ({ type, profile, isUploading, handleFileUpload, t }) => {
  const fileInputRef = React.useRef(null);
  const isChecked = type === 'sworn' ? profile.is_sworn_translator : profile.is_accredited;
  const uri = type === 'sworn' ? profile.sworn_id_uri : profile.accreditation_cert_uri;
  const checkboxLabel = type === 'sworn' ? t('profile.credentials.sworn') : t('profile.credentials.accredited');
  const uploadLabel = type === 'sworn' ? t('profile.credentials.swornId') : t('profile.credentials.accreditationCert');
  
  return (
    <div className="space-y-3">
        <div className="flex items-center space-x-2">
            <Checkbox id={`${type}-checkbox`} checked={isChecked} disabled={!uri} />
            <Label htmlFor={`${type}-checkbox`} className="font-medium">{checkboxLabel}</Label>
        </div>
        <Label htmlFor={`${type}-upload`} className="text-sm text-gray-600">{uploadLabel}</Label>
        <Input 
            id={`${type}-upload`} 
            type="file" 
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files[0], type)} 
            className="hidden" 
        />
        <Button type="button" variant="outline" onClick={() => fileInputRef.current.click()} disabled={isUploading} className="w-full">
            <Upload className="w-4 h-4 me-2"/>
            {isUploading ? t('profile.credentials.uploading') : (uri ? t('profile.credentials.uploaded') + (uri.split('/').pop().substring(0, 20) + '...') : t('profile.credentials.uploadPlaceholder'))}
        </Button>
    </div>
  );
};
