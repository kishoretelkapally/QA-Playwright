const {test, expect, request} = require('@playwright/test');
const  loginPayLoad  = {userEmail:"tkishor@gmail.com",userPassword:"Tell@555"};


test.beforeAll( async() =>
     {
        const apiContext = await request.newContext();
         const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: loginPayLoad
        });
         const loginResponseJson = await loginResponse.json();
        const token= loginResponseJson.token;
        console.log("token is" , token);
    });

test('@apitest', async({page}) =>
{
    console.log("in test");
}

);