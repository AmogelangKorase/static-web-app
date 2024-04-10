const cars = require('./cars.json');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const response = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE'
        }
    };

    try {
        if (req.method === "GET") {
            if (req.url.endsWith("/cars")) {
                response.body = cars;
            } else {
                response.status = 404;
                response.body = "Endpoint not found";
            }
        } else if (req.method === "POST") {
            if (req.url.endsWith("/cars")) {
                const newCar = req.body;
                cars.push(newCar);
                response.status = 201; // Created
                response.body = newCar;
            } else {
                response.status = 404;
                response.body = "Endpoint not found";
            }
        } else if (req.method === "DELETE") {
            if (req.url.endsWith("/cars")) {
                cars.length = 0; // Clear the cars array
                response.status = 204; // No Content
            } else {
                response.status = 404;
                response.body = "Endpoint not found";
            }
        } else {
            response.status = 400;
            response.body = "Please send a GET, POST, or DELETE request";
        }
    } catch (error) {
        response.status = 500;
        response.body = "Internal Server Error";
        context.log.error(error);
    }

    context.res = response;
};


