import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './test_options';


 import dotenv from 'dotenv';
 import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig<TestOptions>({

  reporter: 'list'
  use: {
     globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
     baseURL: "http://localhost:4200"
  },



  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']
     
      }
      
    },
    {
      name: 'mobile',
      testMatch: 'tests/testMobile.spec.ts',
      use: { ...devices['iPhone 15 Pro Max'] }
    }
  ]
});
