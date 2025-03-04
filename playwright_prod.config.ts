import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test_options';


require('dotenv').config();
export default defineConfig<TestOptions>({
  
  use: {
    baseURL: 'http://localhost:4200/',
    globalsQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
