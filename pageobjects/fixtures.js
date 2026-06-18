const base = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');

exports.test = base.test.extend({

    loginPage: async ( {page} , use ) => {

        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    authenticatedPage: async ({ page, request }, use) => {
        // 1. Fire a direct API POST request to the application's login endpoint
        const loginResponse = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login',
             {
                data: {
                    userEmail: 'tkishor@gmail.com',
                    userPassword: 'Tell@555'
                }
            });

        const responseJson = await loginResponse.json();
        const token = responseJson.token;

        await page.addInitScript((authToken) => 
            {
                  window.localStorage.setItem('token', authToken);
            }, token);

        await page.goto('https://rahulshettyacademy.com/client');
        await use(page);
    }


    });   

exports.expect = base.expect;













exports.expect = base.expect;