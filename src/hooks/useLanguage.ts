import { useState, useEffect, useCallback } from 'react';
import { i18n } from '../utils/i18n';

export type Language = 'pt-BR' | 'en-US' | 'es-ES';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>('pt-BR');
  const [availableLanguages, setAvailableLanguages] = useState<{ code: Language; name: string; flag: string }[]>([]);

  // Carregar idioma e idiomas disponíveis
  const loadLanguage = useCallback(() => {
    const currentLanguage = i18n.getLanguage();
    const languages = i18n.getAvailableLanguages();
    
    setLanguageState(currentLanguage);
    setAvailableLanguages(languages);
  }, []);

  // Carregar idioma na inicialização
  useEffect(() => {
    loadLanguage();
  }, [loadLanguage]);

  // Atualizar idioma
  const setLanguage = useCallback((newLanguage: Language) => {
    try {
      i18n.setLanguage(newLanguage);
      setLanguageState(newLanguage);
      
      // Disparar evento para notificar mudança
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLanguage }));
    } catch (err) {
      console.error('Error setting language:', err);
    }
  }, []);

  return {
    language,
    availableLanguages,
    setLanguage,
    reload: loadLanguage
  };
} 