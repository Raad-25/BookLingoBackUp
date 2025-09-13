import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '@/entities/User';
import { InterpreterProfile } from '@/entities/InterpreterProfile';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../components/providers/LanguageContext';
import { User as UserIcon, Star, Languages, ArrowRight } from 'lucide-react';

export default function InterpretersList() {
    const { t } = useLanguage();
    const [interpreters, setInterpreters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInterpreters = async () => {
            try {
                const profiles = await InterpreterProfile.list();
                const interpretersWithUsers = await Promise.all(
                    profiles.map(async (profile) => {
                        const user = await User.get(profile.user_id);
                        return { ...profile, user };
                    })
                );
                setInterpreters(interpretersWithUsers);
            } catch (error) {
                console.error('Error fetching interpreters:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInterpreters();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading interpreters...</div>;

    return (
        <div className="min-h-screen bg-blue-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-blue-900 mb-4">Available Interpreters</h1>
                    <p className="text-blue-700">Browse and book professional interpreters for your needs.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interpreters.map((interpreter) => (
                        <Card key={interpreter.id} className="shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="text-center">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${interpreter.user.full_name.replace(' ', '+')}&background=0D89EC&color=fff&size=80`}
                                    alt={interpreter.user.full_name}
                                    className="w-20 h-20 rounded-full mx-auto mb-4"
                                />
                                <CardTitle className="text-xl">{interpreter.user.full_name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm">{interpreter.years_of_experience} years experience</span>
                                </div>
                                
                                <div className="flex flex-wrap gap-1 justify-center">
                                    {interpreter.interpretation_types.map(type => (
                                        <Badge key={type} variant="secondary" className="text-xs">
                                            {type}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-1 justify-center">
                                    {interpreter.languages.slice(0, 3).map(lang => (
                                        <Badge key={lang} variant="outline" className="text-xs">
                                            {lang.toUpperCase()}
                                        </Badge>
                                    ))}
                                    {interpreter.languages.length > 3 && (
                                        <Badge variant="outline" className="text-xs">+{interpreter.languages.length - 3}</Badge>
                                    )}
                                </div>

                                <Link to={`${createPageUrl('InterpreterPublicProfile')}?id=${interpreter.user_id}`}>
                                    <Button className="w-full">
                                        View Profile <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}