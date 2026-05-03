import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rutapuma.app',
  appName: 'RUTA PUMA',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
