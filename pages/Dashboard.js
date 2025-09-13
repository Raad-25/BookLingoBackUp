import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '@/entities/User';
import { InterpreterProfile } from '@/entities/InterpreterProfile';
import { Booking } from '@/entities/Booking';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useLanguage } from '../components/providers/LanguageContext';
import { User as UserIcon, Calendar as CalendarIcon, Star, Briefcase, Plus, Bell, Settings, LogOut } from 'lucide-react';

export default function Dashboard() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get user type from location state or localStorage
    const userType = location.state?.userType || localStorage.getItem('userType') || 'client';

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                
                // Get current authenticated user
                const user = await User.me();
                console.log('Current user:', user); // Debug log
                setCurrentUser(user);

                // Store user type for future use
                localStorage.setItem('userType', userType);

                if (userType === 'interpreter') {
                    // Fetch interpreter profile
                    const profiles = await InterpreterProfile.filter({ user_id: user.id });
                    console.log('User profiles:', profiles); // Debug log
                    
                    if (profiles && profiles.length > 0) {
                        setUserProfile(profiles[0]);
                    }
                }

                // Fetch bookings for this user
                let userBookings = [];
                if (userType === 'client') {
                    userBookings = await Booking.filter({ client_id: user.id });
                } else {
                    userBookings = await Booking.filter({ interpreter_id: user.id });
                }
                console.log('User bookings:', userBookings); // Debug log
                setBookings(userBookings || []);

            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userType]);

    const handleLogout = async () => {
        try {
            await User.logout();
            localStorage.removeItem('userType');
            navigate(createPageUrl('Home'));
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading your dashboard...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    if (!currentUser) return <div className="flex justify-center items-center h-screen">No user data found</div>;

    const profileCompleteness = userProfile ? 
        Math.round((Object.values(userProfile).filter(v => v && v !== '').length / Object.keys(userProfile).length) * 100) : 0;

    return (
        <div className="min-h-screen bg-blue-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-900">
                            {t(userType === 'client' ? 'dashboard.client.title' : 'dashboard.interpreter.title')}
                        </h1>
                        <p className="text-blue-700 mt-2">
                            {t('dashboard.welcome', { name: currentUser.full_name || currentUser.email })}
                        </p>
                        <p className="text-sm text-gray-600">
                            {t(userType === 'client' ? 'dashboard.client.subtitle' : 'dashboard.interpreter.subtitle')}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate(createPageUrl('Profile'))}>
                            <Settings className="w-4 h-4 mr-2" />
                            Profile
                        </Button>
                        <Button variant="outline" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>

                {userType === 'client' ? (
                    <ClientDashboard currentUser={currentUser} bookings={bookings} t={t} />
                ) : (
                    <InterpreterDashboard 
                        currentUser={currentUser} 
                        userProfile={userProfile} 
                        bookings={bookings} 
                        profileCompleteness={profileCompleteness}
                        t={t} 
                        navigate={navigate}
                    />
                )}
            </div>
        </div>
    );
}

const ClientDashboard = ({ currentUser, bookings, t }) => (
    <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('dashboard.client.bookTitle')}</CardTitle>
                    <CardDescription>{t('dashboard.client.bookSubtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {[
                            { type: 'simultaneous', desc: t('dashboard.client.typeSimultaneousDesc') },
                            { type: 'consecutive', desc: t('dashboard.client.typeConsecutiveDesc') },
                            { type: 'remote', desc: t('dashboard.client.typeRemoteDesc') }
                        ].map(service => (
                            <Card key={service.type} className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4 text-center">
                                    <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                    <h3 className="font-medium">{t(`dashboard.client.type${service.type.charAt(0).toUpperCase() + service.type.slice(1)}`)}</h3>
                                    <p className="text-sm text-gray-600">{service.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Button className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        {t('dashboard.client.newBookingButton')}
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('dashboard.client.recentBookingsTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                    {bookings.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No bookings yet</p>
                    ) : (
                        <div className="space-y-3">
                            {bookings.slice(0, 3).map((booking, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <div>
                                        <p className="font-medium">{booking.interpretation_type}</p>
                                        <p className="text-sm text-gray-600">{new Date(booking.start_date).toLocaleDateString()}</p>
                                    </div>
                                    <Badge>{t(`dashboard.client.bookingStatus.${booking.status}`)}</Badge>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
);

const InterpreterDashboard = ({ currentUser, userProfile, bookings, profileCompleteness, t, navigate }) => (
    <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            {/* Profile Status */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('dashboard.interpreter.profileStatusTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-4">
                        <span>{t('dashboard.interpreter.profileStatusComplete', { percent: profileCompleteness })}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${profileCompleteness}%` }}></div>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-4">{t('dashboard.interpreter.profileStatusDesc')}</p>
                    <Button onClick={() => navigate(createPageUrl('Profile'))}>
                        <UserIcon className="w-4 h-4 mr-2" />
                        {t('dashboard.interpreter.editProfileButton')}
                    </Button>
                </CardContent>
            </Card>

            {/* Bookings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('dashboard.interpreter.bookings.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    {bookings.length === 0 ? (
                        <div className="text-center py-8">
                            <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="font-medium text-gray-900 mb-2">{t('dashboard.interpreter.noBookingsTitle')}</h3>
                            <p className="text-gray-600">{t('dashboard.interpreter.noBookingsDesc')}</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {bookings.map((booking, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <div>
                                        <p className="font-medium">{booking.interpretation_type}</p>
                                        <p className="text-sm text-gray-600">{new Date(booking.start_date).toLocaleDateString()}</p>
                                    </div>
                                    <Badge>{booking.status}</Badge>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Demo Notification */}
            <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                    <CardTitle className="text-amber-800">{t('dashboard.booking.notification.title')}</CardTitle>
                    <CardDescription className="text-amber-700">{t('dashboard.booking.notification.desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button 
                        variant="outline" 
                        className="border-amber-300 text-amber-800 hover:bg-amber-100"
                        onClick={() => alert('Demo: New booking notification would be sent to your WhatsApp!')}
                    >
                        <Bell className="w-4 h-4 mr-2" />
                        {t('dashboard.booking.notification.button')}
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-4">
                {[
                    { label: t('dashboard.interpreter.stats.rating'), value: '4.9', icon: Star },
                    { label: t('dashboard.interpreter.stats.jobs'), value: bookings.filter(b => b.status === 'completed').length.toString(), icon: Briefcase },
                    { label: t('dashboard.interpreter.stats.hours'), value: '0', icon: CalendarIcon }
                ].map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="p-4 flex items-center">
                            <stat.icon className="w-8 h-8 text-blue-600 mr-3" />
                            <div>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Calendar */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('dashboard.interpreter.calendar.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Calendar 
                        mode="single"
                        className="rounded-md border w-full"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Booked dates will be highlighted when you have confirmed bookings.
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
);