import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'NBA Rookie',
  webDir: 'www/browser' // ✔️ Así sí funciona con tu estructura actual
};

export default config;
