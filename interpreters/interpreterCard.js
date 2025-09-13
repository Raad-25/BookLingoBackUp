import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Languages, Award } from "lucide-react";
import { useLanguage } from '../providers/LanguageContext';

export default function InterpreterCard({ interpreter, onSelect }) {
    const { t } = useLanguage();
    const { user, profile } = interpreter;
    
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
            />
        ));
    };

    return (
        <Card 
            className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-blue-500 cursor-pointer animate-in fade-in-0 zoom-in-95"
            onClick={() => onSelect(interpreter)}
        >
            <div className="h-48 bg-gray-200 relative">
                <img 
                    src={profile.photo_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'} 
                    alt={user.full_name} 
                    className="w-full h-full object-cover" 
                />
                {profile.is_sworn_translator && (
                    <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                        <Award className="w-3 h-3 mr-1" />
                        {t('interpreterCard.sworn')}
                    </Badge>
                )}
            </div>
            <CardContent className="p-4">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{user.full_name}</h3>
                
                <div className="flex items-center mb-2">
                    <div className="flex items-center">
                        {renderStars(profile.rating || 4.5)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({profile.rating || 4.5})</span>
                </div>

                <div className="mb-3">
                    <div className="flex items-center text-blue-600 mb-1">
                        <Languages className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{t('interpreterCard.languages')}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {(profile.languages || ['English', 'Arabic']).slice(0, 3).map((lang, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </Badge>
                        ))}
                        {(profile.languages || []).length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                                {t('interpreterCard.moreLanguages', { count: (profile.languages || []).length - 3 })}
                            </Badge>
                        )}
                    </div>
                </div>

                {profile.specialties && profile.specialties.length > 0 && (
                    <div className="mb-3">
                        <span className="text-sm font-medium text-blue-600">{t('interpreterCard.specialties')}</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {profile.specialties.slice(0, 2).map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    {specialty}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-sm text-gray-600">
                    <span className="font-medium">
                        {t('interpreterCard.yearsExperience', { years: profile.years_of_experience || 5 })}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}