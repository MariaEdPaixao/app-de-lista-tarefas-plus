import React, { createContext, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export default function LanguageProvider({ children }) {

    const { i18n } = useTranslation();
    const [isChecked, setIsChecked] = useState(() => i18n.language === "pt");

    const toggleIsChecked = () => {
        const newLanguage = isChecked ? 'pt' : 'en';
        i18n.changeLanguage(newLanguage);
        setIsChecked(!isChecked);
    }

    return (
        <LanguageContext.Provider value={{ isChecked, toggleIsChecked }}>
            {children}
        </LanguageContext.Provider>
      )
}

export function useLanguage() {
    return useContext(LanguageContext);
}
