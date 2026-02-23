import { create } from 'storybook/theming';

export default create({
  base: 'dark',

  // Brand
  brandTitle: 'CROW-B3 UI Kit',
  brandUrl: 'https://github.com/CROW-B3/ui-kit',
  brandImage: './favicon.webp',
  brandTarget: '_blank',

  // Colors
  colorPrimary: '#3b82f6',
  colorSecondary: '#6366f1',

  // UI
  appBg: '#0a0a0a',
  appContentBg: '#0f0f0f',
  appBorderColor: '#27272a',
  appBorderRadius: 8,

  // Text
  textColor: '#fafafa',
  textInverseColor: '#0a0a0a',
  textMutedColor: '#a1a1aa',

  // Toolbar
  barTextColor: '#a1a1aa',
  barSelectedColor: '#fafafa',
  barHoverColor: '#fafafa',
  barBg: '#0f0f0f',

  // Form
  inputBg: '#18181b',
  inputBorder: '#27272a',
  inputTextColor: '#fafafa',
  inputBorderRadius: 6,

  // Buttons
  buttonBg: '#27272a',
  buttonBorder: '#3f3f46',
});
