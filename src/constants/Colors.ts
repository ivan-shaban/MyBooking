import { Tab } from './Tab'

const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

export default {
    light: {
        text: '#000',
        background: '#fff',
        tint: tintColorLight,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: '#fff',
        background: '#000',
        tint: tintColorDark,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorDark,
    },
}

export const colorByTab = {
    [Tab.Masters]: '#348888',
    [Tab.Locations]: '#22BABB',
    [Tab.Favourite]: '#F24405',
    [Tab.Profile]: '#FA7F08',
}
