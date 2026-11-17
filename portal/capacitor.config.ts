import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.languagefarm.app',
  appName: 'Language Farm',
  webDir: 'dist/language-farm-portal/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
