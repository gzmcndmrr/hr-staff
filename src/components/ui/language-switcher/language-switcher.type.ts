import { LANGUAGE_FLAGS, LANGUAGE_CODES } from "@/utils/common";

export type LanguageCode = 'tr' | 'en';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  flag: string;
}

export type LanguageNames = Record<LanguageCode, string>;

export const LANGUAGE_NAMES: LanguageNames = {
  'tr': 'Türkçe',
  'en': 'English'
};

export const LANGUAGES: Record<LanguageCode, LanguageInfo> = {
  'tr': {
    code: 'tr',
    name: 'Türkçe',
    flag: LANGUAGE_FLAGS[LANGUAGE_CODES.TR]
  },
  'en': {
    code: 'en',
    name: 'English',
    flag: LANGUAGE_FLAGS[LANGUAGE_CODES.EN]
  }
};
