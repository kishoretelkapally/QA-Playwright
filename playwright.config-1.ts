import { defineConfig, devices } from '@playwright/test';



const config = ({
  testDir: './tests',
  retries :1,
  workers :3,
  timeout : 50 *1000,
  reporter: 'html',
  except :{

    timeout : 30 *1000,
  },

  projects : [
      {
          name : "safariTest",
             use: {
                    browsername: 'webkit',
                    headless: true,
                   // ...devices['iPhone 11']
                }
     },
     {
        name : "chrome",
              use: {

                browsername: 'chromium',
                headless: false,
                screenshot : 'only-on-failure',
                trace : 'on',
               // ignoreHttpsErrors : true ,
               // permissions :['geolocation'],
                //video : 'retain-on-failure',
                //viewport : {width :720, height :720}

                  }

     }
  ]
  

});

module.exports = config
 