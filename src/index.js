// src/utils/index.js
export const createPageUrl = (page) => {
  // Convert page name to URL-friendly format
  // Examples: "FindInterpreters" -> "/find-interpreters", "Auth" -> "/auth"
  return `/${page.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
};

export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}min`;
  } else if (remainingMinutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${remainingMinutes}min`;
  }
};

export const getLanguageName = (code) => {
  const languageNames = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    zh: 'Mandarin Chinese',
    ar: 'Arabic',
    ru: 'Russian',
    pt: 'Portuguese',
    ja: 'Japanese',
    ko: 'Korean',
    it: 'Italian',
    hi: 'Hindi',
    tr: 'Turkish',
    nl: 'Dutch',
    sv: 'Swedish',
    da: 'Danish',
    no: 'Norwegian',
    pl: 'Polish',
    // Add more languages as needed
  };
  
  return languageNames[code] || code;
};

export const generateBookingId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `BK-${timestamp}-${randomStr}`.toUpperCase();
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date));
};

export const calculateBookingCost = (baseRate, duration, languagePremium = 0, emergencySurcharge = 0) => {
  const hourlyRate = baseRate + languagePremium;
  const total = (hourlyRate * (duration / 60)) + emergencySurcharge;
  return Math.max(total, baseRate); // Ensure minimum charge is base rate
};

export const getTimeZoneOffset = () => {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.abs(Math.floor(offset / 60));
  const minutes = Math.abs(offset % 60);
  const sign = offset <= 0 ? '+' : '-';
  return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Local storage utilities
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Export everything
export default {
  createPageUrl,
  formatPrice,
  formatDuration,
  getLanguageName,
  generateBookingId,
  validateEmail,
  validatePhone,
  debounce,
  formatDate,
  calculateBookingCost,
  getTimeZoneOffset,
  storage
};