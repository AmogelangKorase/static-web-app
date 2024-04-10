const cars = require('./cars.json');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.method === "GET") {
        // Handling GET request for /cars endpoint
        if (req.url.endsWith("/cars")) {
            context.res = {
                body: cars
            };
        } else {
            context.res = {
                status: 404,
                body: "Endpoint not found"
            };
        }
    } else if (req.method === "POST") {
        // Handling POST request for /cars endpoint
        if (req.url.endsWith("/cars")) {
            const newCar = req.body;
            cars.push(newCar);
            context.res = {
                body: newCar
            };
        } else {
            context.res = {
                status: 404,
                body: "Endpoint not found"
            };
        }
    } else if (req.method === "DELETE") {
        // Handling DELETE request for /cars endpoint
        if (req.url.endsWith("/cars")) {
            cars.length = 0; // Clear the cars array
            context.res = {
                body: { message: "All cars deleted" }
            };
        } else {
            context.res = {
                status: 404,
                body: "Endpoint not found"
            };
        }
    } else {
        context.res = {
            status: 400,
            body: "Please send a GET, POST, or DELETE request"
        };
    }
};

