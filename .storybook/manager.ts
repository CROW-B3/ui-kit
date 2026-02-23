import { addons } from 'storybook/manager-api';

import theme from './theme';

// Set custom title on load
window.addEventListener('load', () => {
  document.title = 'CROW-B3 UI Kit';
});

// Custom styles
const style = document.createElement('style');
style.textContent = `
  button[aria-label="Expand all"],
  button[aria-label="Collapse all"] { display: none !important; }
  #storybook-checklist-widget { display: none !important; }
  button[aria-label="Settings"],
  a[aria-label="Settings"] { display: none !important; }
  .sidebar-header a[title] img { max-height: 60px !important; }
`;
document.head.appendChild(style);

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: false },
  },
});
