const STRIPE_KEY = 'sk_test_51HnQGREdOXN3xAkoxRarjsnsKfWBCJ19vC2IRsBgOa2ZRa0QOBoM9XWTQ2Weqn6mbpnFYtypRt6kVaRqq4jO46m300L5pv67h2';
const configureStripe = require('stripe');
const stripe = configureStripe(STRIPE_KEY);

module.exports = async function(context, req) {
    context.log('Getting down');
    if(
        req.body &&
        req.body.stripeEmail &&
        req.body.stripeToken &&
        req.body.stripeAmt
    ) {
        stripe.customers
            .create({
                email: req.body.stripeEmail,
                source: req.body.stripeToken
            })
            .then(customer => {
                context.log('starting the stripe charges');
                stripe.charges.create({
                    amount: req.body.stripeAmt,
                    description: 'Sample Charge',
                    currency: 'usd',
                    customer: customer.id
                });
            })
            .then(charge => {
                context.log('finished the stripe charges');
                context.res = {
                    // status: 200
                    body: 'This has been completed'
                };
                context.done();
            })
            .catch(err => {
                context.log(err);
                context.done();
            });
    } else {
        context.log(req.body);
        context.res = {
            status: 400,
            body: "We're missing something"
        };
        context.done();
    }
};