import { withInstall } from '/@/utils';

import appLogo from './src/AppLogo.vue';
import appProvider from './src/AppProvider.vue';
// import appSearch from './src/search/AppSearch.vue';
// import appLocalePicker from './src/AppLocalePicker.vue';
// import appDarkModeToggle from './src/AppDarkModeToggle.vue';
import darkModeContainer from './src/DarkModeContainer.vue';
import hoverContainer from './src/HoverContainer.vue';
import darkModeSwitch from './src/DarkModeSwitch.vue';

export const AppLogo = withInstall(appLogo);
export const AppProvider = withInstall(appProvider);
// export const AppSearch = withInstall(appSearch);
// export const AppLocalePicker = withInstall(appLocalePicker);
// export const AppDarkModeToggle = withInstall(appDarkModeToggle);

export const DarkModeContainer = withInstall(darkModeContainer);
export const HoverContainer = withInstall(hoverContainer);
export const DarkModeSwitch = withInstall(darkModeSwitch);
