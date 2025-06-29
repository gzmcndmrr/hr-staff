import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export interface I18nConfig {
  defaultLanguage: string;
  supportedLanguages: string[];
  fallbackLanguage: string;
}

export const i18nConfig: I18nConfig = {
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'tr'],
  fallbackLanguage: 'en'
};

export const initI18n = async (): Promise<void> => {
  await i18n
    .use(Backend)
    .use(LanguageDetector)
    .init({
      lng: i18nConfig.defaultLanguage,
      fallbackLng: i18nConfig.fallbackLanguage,
      supportedLngs: i18nConfig.supportedLanguages,
      
      backend: {
        loadPath: (lngs: string[], namespaces: string[]) => {
          const isDev = import.meta.env?.DEV ?? window.location.hostname === 'localhost';
          const basePath = isDev ? '/src/assets/locale' : '/assets/locale';
          return `${basePath}/${lngs[0]}/${namespaces[0]}.json`;
        },
        addPath: (lng: string, namespace: string) => {
          const isDev = import.meta.env?.DEV ?? window.location.hostname === 'localhost';
          const basePath = isDev ? '/src/assets/locale' : '/assets/locale';
          return `${basePath}/${lng}/${namespace}.json`;
        },
      },
      
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        lookupLocalStorage: 'i18nextLng',
        caches: ['localStorage'],
      },
      
      defaultNS: 'Common',
      ns: ['Common', 'Employee'],
      
      interpolation: {
        escapeValue: false,
        format: (value, format) => {
          if (format === 'uppercase') return value.toUpperCase();
          if (format === 'lowercase') return value.toLowerCase();
          return value;
        }
      },
      
      debug: import.meta.env?.DEV ?? window.location.hostname === 'localhost',
      
      returnEmptyString: false,
      returnNull: false,
      
      keySeparator: '.',
      nsSeparator: ':',
      
      pluralSeparator: '_',
      contextSeparator: '_',
    });
};

export const t = (key: string, options?: any, namespace?: string): string => {
  const fullKey = namespace ? `${namespace}:${key}` : key;
  return i18n.t(fullKey, options) as string;
};

export const getCurrentLanguage = (): string => {
  return i18n.language || i18nConfig.defaultLanguage;
};

export const changeLanguage = async (lng: string): Promise<void> => {
  await i18n.changeLanguage(lng);
};

export const getAvailableLanguages = (): string[] => {
  return i18nConfig.supportedLanguages;
};

export const isRTL = (lng?: string): boolean => {
  const language = lng || getCurrentLanguage();
  return ['ar', 'he', 'fa'].includes(language);
};

export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const locale = getCurrentLanguage();
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(dateObj);
};

export const formatNumber = (number: number, options?: Intl.NumberFormatOptions): string => {
  const locale = getCurrentLanguage();
  return new Intl.NumberFormat(locale, options).format(number);
};

export const formatCurrency = (amount: number, currency: string = 'TRY'): string => {
  const locale = getCurrentLanguage();
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const translateWithPath = (filePath: string, key: string, options?: any): string => {
  const pathParts = filePath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  if (!fileName) return i18n.t(key, options) as string;
  
  const namespace = fileName.replace(/\.(ts|js|tsx|jsx)$/, '');
  
  const namespacedKey = `${namespace}:${key}`;
  const translation = i18n.t(namespacedKey, { ...options, defaultValue: undefined }) as string;
  
  if (translation === namespacedKey) {
    return i18n.t(key, options) as string;
  }
  
  return translation;
};

export const getTranslation = (keys: string[], options?: any): string => {
  for (const key of keys) {
    const translation = i18n.t(key, { ...options, defaultValue: undefined }) as string;
    if (translation !== key) {
      return translation;
    }
  }
  return keys[0] || '';
};

export const loadNamespace = async (namespace: string): Promise<void> => {
  await i18n.loadNamespaces(namespace);
};

export const getNamespaceTranslations = (namespace: string): Record<string, any> => {
  return i18n.getResourceBundle(getCurrentLanguage(), namespace) || {};
};

export default i18n; 