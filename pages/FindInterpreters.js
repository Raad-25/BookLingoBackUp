import React, { useState, useEffect } from 'react';
import { InterpreterProfile } from '@/entities/InterpreterProfile';
import { User } from '@/entities/User';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import InterpreterCard from '../components/interpreters/InterpreterCard';
import BookingModal from '../components/interpreters/BookingModal';
import { Search, Filter, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from '../components/providers/LanguageContext';

export default function FindInterpreters() {
    const { t } = useLanguage();
    const [interpreters, setInterpreters] = useState([]);
    const [filteredInterpreters, setFilteredInterpreters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedInterpreter, setSelectedInterpreter] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    useEffect(() => {
        const fetchInterpreters = async () => {
            try {
                setLoading(true);
                const profiles = await InterpreterProfile.list();
                console.log('Fetched profiles:', profiles);

                const interpreterpromises = profiles.map(async (profile) => {
                    try {
                        const users = await User.filter({ id: profile.user_id });
                        const user = users.length > 0 ? users[0] : { 
                            id: profile.user_id, 
                            full_name: 'Unknown User', 
                            email: 'unknown@example.com' 
                        };
                        return { user, profile };
                    } catch (error) {
                        console.error('Error fetching user for profile:', profile.user_id, error);
                        return { 
                            user: { 
                                id: profile.user_id, 
                                full_name: 'Unknown User', 
                                email: 'unknown@example.com' 
                            }, 
                            profile 
                        };
                    }
                });

                const interpreterData = await Promise.all(interpreterpromises);
                console.log('Fetched interpreter data:', interpreterData);
                setInterpreters(interpreterData);
                setFilteredInterpreters(interpreterData);
            } catch (error) {
                console.error('Error fetching interpreters:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInterpreters();
    }, []);

    useEffect(() => {
        let filtered = interpreters;

        if (searchQuery) {
            filtered = filtered.filter(interpreter => 
                interpreter.user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (interpreter.profile.languages || []).some(lang => 
                    lang.toLowerCase().includes(searchQuery.toLowerCase())
                ) ||
                (interpreter.profile.specialties || []).some(specialty => 
                    specialty.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        if (selectedLanguage) {
            filtered = filtered.filter(interpreter => 
                (interpreter.profile.languages || []).includes(selectedLanguage)
            );
        }

        if (selectedSpecialty) {
            filtered = filtered.filter(interpreter => 
                (interpreter.profile.specialties || []).includes(selectedSpecialty)
            );
        }

        setFilteredInterpreters(filtered);
    }, [interpreters, searchQuery, selectedLanguage, selectedSpecialty]);

    const handleSelectInterpreter = (interpreter) => {
        setSelectedInterpreter(interpreter);
        setIsBookingModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsBookingModalOpen(false);
        setSelectedInterpreter(null);
    };

    const allLanguages = [...new Set(interpreters.flatMap(i => i.profile.languages || []))];
    const allSpecialties = [...new Set(interpreters.flatMap(i => i.profile.specialties || []))];

    if (loading) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">{t('findInterpreters.loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to={createPageUrl("Dashboard")} className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t('findInterpreters.backToDashboard')}
                    </Link>
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-blue-900">{t('findInterpreters.title')}</h1>
                            <p className="text-blue-700 mt-2">{t('findInterpreters.subtitle')}</p>
                        </div>
                        <div className="flex items-center text-blue-600">
                            <Users className="w-5 h-5 mr-2" />
                            <span className="text-lg font-medium">{filteredInterpreters.length} {t('findInterpreters.available')}</span>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder={t('findInterpreters.searchPlaceholder')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('findInterpreters.filterLanguage')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={null}>{t('findInterpreters.allLanguages')}</SelectItem>
                                {allLanguages.map(lang => (
                                    <SelectItem key={lang} value={lang}>
                                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('findInterpreters.filterSpecialty')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={null}>{t('findInterpreters.allSpecialties')}</SelectItem>
                                {allSpecialties.map(specialty => (
                                    <SelectItem key={specialty} value={specialty}>
                                        {specialty}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                    {(searchQuery || selectedLanguage || selectedSpecialty) && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {searchQuery && (
                                <Badge variant="secondary">
                                    {t('findInterpreters.searchLabel')} {searchQuery}
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="ml-2 text-gray-500 hover:text-gray-700"
                                    >×</button>
                                </Badge>
                            )}
                            {selectedLanguage && (
                                <Badge variant="secondary">
                                    {t('findInterpreters.languageLabel')} {selectedLanguage}
                                    <button 
                                        onClick={() => setSelectedLanguage('')}
                                        className="ml-2 text-gray-500 hover:text-gray-700"
                                    >×</button>
                                </Badge>
                            )}
                            {selectedSpecialty && (
                                <Badge variant="secondary">
                                    {t('findInterpreters.specialtyLabel')} {selectedSpecialty}
                                    <button 
                                        onClick={() => setSelectedSpecialty('')}
                                        className="ml-2 text-gray-500 hover:text-gray-700"
                                    >×</button>
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* Interpreters Grid */}
                {filteredInterpreters.length === 0 ? (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('findInterpreters.noInterpretersTitle')}</h3>
                        <p className="text-gray-600">{t('findInterpreters.noInterpretersDesc')}</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredInterpreters.map((interpreter, index) => (
                            <InterpreterCard
                                key={interpreter.profile.id || index}
                                interpreter={interpreter}
                                onSelect={handleSelectInterpreter}
                            />
                        ))}
                    </div>
                )}

                {/* Booking Modal */}
                <BookingModal
                    isOpen={isBookingModalOpen}
                    onClose={handleCloseModal}
                    interpreter={selectedInterpreter}
                />
            </div>
        </div>
    );
}