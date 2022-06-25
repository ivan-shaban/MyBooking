import { Tab } from './Tab'

// we need full color code to add alpha channel
const tintColorLight = '#ffffff'
const tintColorDark = '#2f95dc'

export default {
    light: {
        text: '#000000',
        background: '#ffffff',
        tint: tintColorLight,
        tabIconDefault: '#cccccc',
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: '#ffffff',
        background: '#000000',
        tint: tintColorDark,
        tabIconDefault: '#cccccc',
        tabIconSelected: tintColorDark,
    },
}

export const colorByTab = {
    [Tab.Masters]: '#348888',
    [Tab.Locations]: '#22BABB',
    [Tab.Favourite]: '#F24405',
    [Tab.Profile]: '#FA7F08',
}
