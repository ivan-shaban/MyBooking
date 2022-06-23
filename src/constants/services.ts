export enum HairServices {
    /**
     * Мужская стрижка
     */
    haircut_man = 'haircut_man',
    /**
     * Женская стрижка
     */
    haircut_woman = 'haircut_woman',
    /**
     * Детская стрижка
     */
    haircut_child = 'haircut_child',
    /**
     * Окрашивание: мелирование
     */
    coloring_melirovanie = 'coloring_melirovanie',
    /**
     * Окрашивание: шатуш
     */
    coloring_shatush = 'coloring_shatush',
    /**
     * Окрашивание: балаяж
     */
    coloring_balayaj = 'coloring_balayaj',
    /**
     * Окрашивание: аиртач
     */
    coloring_airtouch = 'coloring_airtouch',
    /**
     * Лечение волос: ламинирование
     */
    cure_laminirovanie = 'cure_laminirovanie',
    /**
     * Лечение волос: экранирование
     */
    cure_ekranirovanie = 'cure_ekranirovanie',
    /**
     * Лечение волос: глазирование
     */
    cure_glazirovanie = 'cure_glazirovanie',
    /**
     * Выпрямление
     */
    straightening = 'straightening',
    /**
     * Прическа
     */
    hairstyle = 'hairstyle',
    /**
     * Укладка: торжественная
     */
    styling_ceremonial = 'styling_ceremonial',
    /**
     * Укладка: ежедневная
     */
    styling_daily = 'styling_daily',
}

export type Service = HairServices
