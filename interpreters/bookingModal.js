import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Star, Languages, Award, MessageSquare } from "lucide-react";
import { useLanguage } from '../providers/LanguageContext';

export default function BookingModal({ isOpen, onClose, interpreter }) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        clientName: '',
        email: '',
        mobile: '',
        serviceType: '',
        notes: '',
        selectedDates: []
    });

    if (!interpreter) return null;

    const { user, profile } = interpreter;

    const services = [
        { 
            id: 'simultaneous', 
            name: t('bookingModal.simultaneousService'), 
            price: 'IQD 300,000' 
        },
        { 
            id: 'consecutive', 
            name: t('bookingModal.consecutiveService'), 
            price: 'IQD 250,000' 
        },
        { 
            id: 'online', 
            name: t('bookingModal.onlineService'), 
            price: 'IQD 200,000' 
        }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
            />
        ));
    };

    const handleDateSelect = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        setFormData(prev => ({
            ...prev,
            selectedDates: prev.selectedDates.includes(dateStr) 
                ? prev.selectedDates.filter(d => d !== dateStr)
                : [...prev.selectedDates, dateStr]
        }));
    };

    const handleBooking = () => {
        if (!formData.clientName || !formData.email || !formData.mobile || !formData.serviceType || formData.selectedDates.length === 0) {
            alert(t('bookingModal.validationError'));
            return;
        }

        const selectedService = services.find(s => s.id === formData.serviceType);
        const notesText = formData.notes ? t('bookingModal.additionalNotes', { notes: formData.notes }) : '';
        
        const message = t('bookingModal.whatsappMessage', {
            interpreterName: user.full_name,
            serviceName: selectedService.name,
            servicePrice: selectedService.price,
            selectedDates: formData.selectedDates.join(', '),
            clientName: formData.clientName,
            mobile: formData.mobile,
            email: formData.email,
            notes: notesText
        });

        const whatsappNumber = profile.public_whatsapp_number || '9647504486008';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{t('bookingModal.title')}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                    {/* Interpreter Header */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                        <img 
                            src={profile.photo_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'} 
                            alt={user.full_name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-xl font-bold text-blue-900">{user.full_name}</h3>
                                {profile.is_sworn_translator && (
                                    <Badge className="bg-green-600 text-white">
                                        <Award className="w-3 h-3 mr-1" />
                                        {t('bookingModal.sworn')}
                                    </Badge>
                                )}
                            </div>
                            
                            <div className="flex items-center mb-2">
                                <span className="text-sm font-medium mr-2">{t('bookingModal.rating')}</span>
                                <div className="flex items-center">
                                    {renderStars(profile.rating || 4.8)}
                                </div>
                                <span className="ml-2 text-sm text-gray-600">({profile.rating || 4.8})</span>
                            </div>

                            <div className="flex items-center mb-2">
                                <Languages className="h-4 w-4 mr-2 text-blue-600" />
                                <span className="text-sm">
                                    <strong>{t('bookingModal.languages')}</strong> {(profile.languages || ['Arabic', 'English', 'Kurdish']).join(', ')}
                                </span>
                            </div>

                            {profile.specialties && profile.specialties.length > 0 && (
                                <div className="flex items-start">
                                    <span className="text-sm mr-2"><strong>{t('bookingModal.specialties')}</strong></span>
                                    <div className="flex flex-wrap gap-1">
                                        {profile.specialties.map((specialty, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {specialty}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Client Information Form */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-blue-900">{t('bookingModal.clientInfoTitle')}</h4>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="clientName">
                                    {t('bookingModal.clientName')} {t('bookingModal.required')}
                                </Label>
                                <Input
                                    id="clientName"
                                    value={formData.clientName}
                                    onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                                    placeholder={t('bookingModal.clientNamePlaceholder')}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">
                                    {t('bookingModal.email')} {t('bookingModal.required')}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder={t('bookingModal.emailPlaceholder')}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <Label htmlFor="mobile">
                                {t('bookingModal.mobile')} {t('bookingModal.required')}
                            </Label>
                            <Input
                                id="mobile"
                                type="tel"
                                value={formData.mobile}
                                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                placeholder={t('bookingModal.mobilePlaceholder')}
                                dir="ltr"
                            />
                        </div>
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-blue-900">{t('bookingModal.serviceSelectionTitle')}</h4>
                        
                        <div>
                            <Label htmlFor="serviceType">
                                {t('bookingModal.serviceType')} {t('bookingModal.required')}
                            </Label>
                            <Select value={formData.serviceType} onValueChange={(value) => setFormData({...formData, serviceType: value})}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('bookingModal.serviceTypePlaceholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {services.map((service) => (
                                        <SelectItem key={service.id} value={service.id}>
                                            <div className="flex justify-between w-full">
                                                <span>{service.name}</span>
                                                <span className="font-bold text-green-600 ml-4">{service.price}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div>
                            <Label htmlFor="notes">{t('bookingModal.notesLabel')}</Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                placeholder={t('bookingModal.notesPlaceholder')}
                                className="h-24"
                            />
                        </div>
                    </div>

                    {/* Calendar Section */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-blue-900">{t('bookingModal.calendarTitle')}</h4>
                        
                        <div className="border rounded-lg p-4">
                            <Calendar
                                mode="single"
                                onSelect={handleDateSelect}
                                disabled={(date) => {
                                    const bookedDates = ['2025-01-15', '2025-01-22', '2025-01-29'];
                                    const dateStr = date.toISOString().split('T')[0];
                                    return bookedDates.includes(dateStr) || date < new Date();
                                }}
                                className="w-full"
                            />
                            
                            {formData.selectedDates.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium mb-2">{t('bookingModal.selectedDates')}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.selectedDates.map((date, index) => (
                                            <Badge key={index} className="bg-blue-600 text-white">
                                                {new Date(date).toLocaleDateString()}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex items-center justify-between mt-4 text-sm">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
                                        <span>{t('bookingModal.calendarLegend.selected')}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                                        <span>{t('bookingModal.calendarLegend.booked')}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-gray-200 rounded mr-2"></div>
                                        <span>{t('bookingModal.calendarLegend.available')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Action */}
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <Button variant="outline" onClick={onClose}>
                            {t('bookingModal.cancel')}
                        </Button>
                        <Button onClick={handleBooking} className="bg-green-600 hover:bg-green-700 text-white">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {t('bookingModal.bookViaWhatsApp')}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}