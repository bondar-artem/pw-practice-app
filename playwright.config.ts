import { defineConfig, devices } from '@playwright/test';
import type { testoptions } from './test-options';

const dotenv = require('dotenv')
dotenv.config();
 
export default defineConfig<testoptions>({
  timeout: 40000,
  globalTimeout: 60000,
  expect: {
    timeout: 2000
  },

  retries: 1,
  reporter: 'html',
  //reporter: 'list',
  //reporter: 'json',
  //reporter: [['json', {outputFile: 'test-result/jsonReport.json'}]],
  //reporter: [['junit', {outputFile: 'test-result/jsonReport.xml'}]],
  use: {
     baseURL: 'http://localhost:4200/',
     globalQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/',

    trace: 'on-first-retry',
    actionTimeout: 5000,
    navigationTimeout: 30000,
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    }
  },

  projects: [
     {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4200'
       },
    },

    {
      name: 'chromium',
      //timeout: 60000,
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox' ,
       video: {
      mode: 'on',
      size: {width: 1920, height: 1080}
    }
    }
  },
  
    {
      name: 'pageObjectsFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: {width: 1920, height: 1080}
      }
  },
  {
    name: 'mobile', 
    testMatch: 'testMobile.spec.ts',
    use: {
      ...devices['iPhone 11 Pro Max'],
      //viewport: {width: 414, height: 800}
      
    }
  },


  ]})