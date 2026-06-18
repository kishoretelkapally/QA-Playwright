import { defineConfig, devices } from '@playwright/test';



const config = ({
  testDir: './tests',
  timeout : 50 *1000,
  reporter: 'html',
  except :{

    timeout : 30 *1000,
  },
  
   use: {

    browsername: 'chromium',
    headless: false
  }
});

module.exports = config
 