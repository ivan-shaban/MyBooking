export enum MasterType {
    Hairdresser = 'hairdresser',
    Stylist = 'stylist',
    Masseur = 'masseur',
    Podiatrist = 'podiatrist', // мастер по педикюру-врач или большой стаж
    NailsMaster = 'nailsmaster',
    Beautician = 'beautician', // косметолог-врач
    Cosmetic = 'cosmetic', // без возможности повреждения кожного покрова
}

export const masterTypes = Object.values(MasterType)

export enum MasterLanguage {
    ru = 'ru',
    ka = 'ka', // грузинский
    en = 'en',
    fr = 'fr',
    de = 'de',
    ar = 'ar', // арабский
    tr = 'tr', // турецкий
    ua = 'ua', // украинский
    be = 'be', // беларуский
}

export const masterLanguages = Object.values(MasterLanguage)
