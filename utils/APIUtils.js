class APIUtils {

    constructor(apiContext,testPayload){

        this.apiContext = apiContext;
        this.testPayload = testPayload;




    }

    async gettoken()
  {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.testPayload
        }); // 200, 201
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload){

       let response = {};
        response.token = await this.gettoken();
        console.log(response.token)
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson); 
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
       
        return response;

    }
    
};
module.exports = {APIUtils}