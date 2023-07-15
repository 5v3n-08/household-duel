import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'de.ourprojects.app',
  appName: 'OurProjects',
  webDir: '.output/public',
  server: {
    androidScheme: 'https'
  }
}

export default config
