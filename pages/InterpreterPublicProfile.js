import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User } from '@/entities/User';
import { InterpreterProfile as InterpreterProfileEntity } from '@/entities/InterpreterProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useLanguage } from '../components/providers/LanguageContext';
import { Calendar as CalendarIcon, User as UserIcon, Briefcase, Languages, Star, Phone, Mail, FileText, ImageIcon, Check, MapPin, Banknote, Clock } from 'lucide-react';

export default function InterpreterPublicProfile() {
    const { t, language } = useLanguage();
    const [searchParams] = useSearchParams();
    const interpreterId = searchParams.get('id');

    const [interpreter, setInterpreter] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [bookingDetails, setBookingDetails] = useState({
        clientName: '',
        mobile: '',
        email: '',
        type: '',
        date: null,
        notes: ''
    });

    useEffect(() => {
        if (!interpreterId) {
            setError('No interpreter ID provided.');
            setLoading(false);
            return;
        }

        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const userData = await User.get(interpreterId);
                const profileData = await InterpreterProfileEntity.filter({ user_id: interpreterId });
                
                if (!userData || !profileData || profileData.length === 0) {
                    throw new Error('Interpreter profile not found.');
                }

                setInterpreter(userData);
                setProfile(profileData[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [interpreterId]);
    
    const handleBookingChange = (field, value) => {
        setBookingDetails(prev => ({...prev, [field]: value}));
    };

    const handleWhatsAppBooking = () => {
        if (!interpreter || !interpreter.phone_number) {
            alert('This interpreter has not provided a contact number.');
            return;
        }

        const { clientName, type, date, notes } = bookingDetails;
        const formattedDate = date ? format(date, "PPP") : 'Not specified';
        
        const message = `
New Booking Request for ${interpreter.full_name}:
-----------------------------
Client: ${clientName}
Service: ${type}
Date: ${formattedDate}
Details: ${notes}
        `.trim();

        const whatsappUrl = `https://wa.me/${interpreter.phone_number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) return <div className="flex justify-center items-center h-screen bg-gray-100">{t('Loading...')}</div>;
    if (error) return <div className="flex justify-center items-center h-screen bg-gray-100 text-red-500">{error}</div>;
    if (!interpreter || !profile) return null;

    const languageMap = {
        en: t('profile.lang.en'),
        ar: t('profile.lang.ar'),
        ku_sorani: t('profile.lang.ku_sorani'),
        ku_bahdini: t('profile.lang.ku_bahdini'),
        tr: t('profile.lang.tr'),
        fr: t('profile.lang.fr'),
        it: t('profile.lang.it'),
        other: t('profile.lang.other')
    };

    return (
        <div className="bg-blue-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="container mx-auto p-4 md:p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Booking Form */}
                    <div className="lg:col-span-1">
                        <Card className="shadow-lg sticky top-8">
                            <CardHeader>
                                <CardTitle className="text-2xl">{t('interpreterProfile.bookTitle')}</CardTitle>
                                <CardDescription>{t('interpreterProfile.bookSubtitle')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InputField id="clientName" label={t('interpreterProfile.clientName')} placeholder={t('interpreterProfile.clientNamePlaceholder')} value={bookingDetails.clientName} onChange={(e) => handleBookingChange('clientName', e.target.value)} />
                                <InputField id="mobile" label={t('interpreterProfile.mobile')} placeholder={t('interpreterProfile.mobilePlaceholder')} value={bookingDetails.mobile} onChange={(e) => handleBookingChange('mobile', e.target.value)} />
                                <InputField id="email" label={t('interpreterProfile.email')} type="email" placeholder={t('interpreterProfile.emailPlaceholder')} value={bookingDetails.email} onChange={(e) => handleBookingChange('email', e.target.value)} />
                                
                                <div>
                                    <Label htmlFor="type">{t('interpreterProfile.type')}</Label>
                                    <Select onValueChange={(value) => handleBookingChange('type', value)}>
                                        <SelectTrigger><SelectValue placeholder={t('interpreterProfile.type')} /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Simultaneous - IQD 300,000/hour">{t('interpreterProfile.simultaneousOption')}</SelectItem>
                                            <SelectItem value="Consecutive - IQD 250,000/hour">{t('interpreterProfile.consecutiveOption')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {bookingDetails.date ? format(bookingDetails.date, "PPP") : <span>{t('interpreterProfile.datePlaceholder')}</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={bookingDetails.date} onSelect={(d) => handleBookingChange('date', d)} initialFocus /></PopoverContent>
                                </Popover>

                                <div>
                                    <Label htmlFor="notes">{t('interpreterProfile.notes')}</Label>
                                    <Textarea id="notes" placeholder={t('interpreterProfile.notesPlaceholder')} value={bookingDetails.notes} onChange={(e) => handleBookingChange('notes', e.target.value)} />
                                </div>
                                
                                <Button onClick={handleWhatsAppBooking} className="w-full bg-green-500 hover:bg-green-600">
                                    <Phone className="mr-2 h-4 w-4" />
                                    {t('interpreterProfile.bookButton')}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Profile Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Header */}
                        <Card className="shadow-lg">
                            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                                <img src={`https://ui-avatars.com/api/?name=${interpreter.full_name.replace(' ', '+')}&background=0D89EC&color=fff&size=128`} alt={interpreter.full_name} className="w-24 h-24 rounded-full border-4 border-white shadow-md"/>
                                <div className="text-center md:text-left">
                                    <h1 className="text-3xl font-bold text-blue-900">{interpreter.full_name}</h1>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mt-2 text-gray-600">
                                        <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-blue-500" />{profile.interpretation_types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}</div>
                                        <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-blue-500" />{profile.years_of_experience} {t('interpreterProfile.experience')}</div>
                                    </div>
                                    {profile.is_sworn_translator && <div className="mt-2 inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold"><Check className="w-4 h-4" />{t('profile.credentials.sworn')}</div>}
                                </div>
                                <div className="md:ml-auto">
                                    <Button variant="outline"><FileText className="mr-2 h-4 w-4"/> {t('interpreterProfile.viewCv')}</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* About Section */}
                        <InfoSection title={t('interpreterProfile.aboutTitle')}>
                            <p className="text-gray-700 whitespace-pre-wrap">{profile.about}</p>
                        </InfoSection>

                        {/* Languages Section */}
                        <InfoSection title={t('profile.languages.title')}>
                           <div className="flex flex-wrap gap-2">
                                {profile.languages.map(lang => (
                                    <div key={lang} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{languageMap[lang] || lang}</div>
                                ))}
                                {profile.other_language && <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">{profile.other_language}</div>}
                           </div>
                        </InfoSection>
                        
                        {/* Work Gallery */}
                        <InfoSection title={t('interpreterProfile.galleryTitle')}>
                            <p className="text-gray-500 italic">Gallery coming soon.</p>
                        </InfoSection>

                        {/* Recommendations */}
                        <InfoSection title={t('interpreterProfile.recommendationsTitle')}>
                            <p className="text-gray-500 italic">Recommendations coming soon.</p>
                        </InfoSection>
                        
                        {/* Payment Information */}
                        <InfoSection title={t('interpreterProfile.paymentTitle')}>
                            <p className="text-gray-700">{t('interpreterProfile.paymentDesc')}</p>
                        </InfoSection>
                    </div>
                </div>
            </div>
        </div>
    );
}

const InputField = ({ id, label, ...props }) => (
    <div>
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} {...props} />
    </div>
);

const InfoSection = ({ title, children }) => (
    <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);