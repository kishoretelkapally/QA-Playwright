const{EnterLoginPage} = require('../pageobjects/EnterLoginPage');
const { AddOrder } = require('../pageobjects/AddOrder');
const { PlaceOrder } = require('../pageobjects/PlaceOrder');
const { ThanksPage } = require('../pageobjects/ThanksPage');


class POManagerTest{


    constructor (page)
    {
        this.page = page;
        this.enterLoginpage = new EnterLoginPage(this.page);
        this.addorderpage = new AddOrder(this.page);
        this.checkoutorder = new PlaceOrder(this.page);
        this.assertorderid = new ThanksPage(this.page);

    }
    getLoginPage()
{
    return this.enterLoginpage;
}

getDashboardPage()
{
    return this.addorderpage;
}

 getplaceorderPage(){
        return this.checkoutorder;

    }

getthanksPage(){
        return this.assertorderid;

    }

}
module.exports ={POManagerTest};