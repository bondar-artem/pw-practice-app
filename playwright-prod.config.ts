import { defineConfig, devices } from '@playwright/test';
import type { testoptions } from './test-options';

const dotenv = require('dotenv')
 dotenv.config();
 
export default defineConfig<testoptions>({



  use: {
     baseURL: 'http://localhost:4200/',
     globalQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    },

  projects: [
    {
      name: 'chromium',
      timeout: 60000,
    },
    ]
})