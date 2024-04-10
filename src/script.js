document.addEventListener('DOMContentLoaded', () => {
    const loadCarsBtn = document.getElementById('loadCarsBtn');
    const carList = document.getElementById('carList');

    // Function to fetch and display cars
    async function loadCars() {
        try {
            const response = await fetch('/cars');
            const data = await response.json();
            carList.innerHTML = ''; // Clear existing content
            data.forEach((car, index) => {
                const carCard = document.createElement('div');
                carCard.classList.add('car-card');
                carCard.innerHTML = `
                    <h2>${car.make} ${car.model}</h2>
                    <p><strong>Year:</strong> ${car.year}</p>
                    <p><strong>Price:</strong> $${car.price}</p>
                    <button class="btn btn-remove" data-index="${index}">Remove</button>
                `;
                carList.appendChild(carCard);
            });
        } catch (error) {
            console.error('Error loading cars:', error);
        }
    }

    // Load cars on button click
    loadCarsBtn.addEventListener('click', loadCars);

    // Function to add a new car
    async function addCar(newCar) {
        try {
            const response = await fetch('/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCar)
            });
            if (response.ok) {
                loadCars(); // Reload cars after addition
            } else {
                console.error('Failed to add car:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding car:', error);
        }
    }

    // Handle form submission to add a new car
    const carForm = document.getElementById('carForm');
    carForm.addEventListener('submit', event => {
        event.preventDefault();
        const make = document.getElementById('make').value;
        const model = document.getElementById('model').value;
        const year = parseInt(document.getElementById('year').value);
        const price = parseFloat(document.getElementById('price').value);
        if (make && model && year && price) {
            addCar({ make, model, year, price });
            carForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Function to remove a car
    async function removeCar(index) {
        try {
            const response = await fetch(`/cars/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                loadCars(); // Reload cars after removal
            } else {
                console.error('Failed to remove car:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing car:', error);
        }
    }

    // Event delegation for remove buttons
    carList.addEventListener('click', event => {
        if (event.target.classList.contains('btn-remove')) {
            const index = parseInt(event.target.dataset.index);
            if (!isNaN(index)) {
                removeCar(index);
            } else {
                console.error('Invalid index:', index);
            }
        }
    });

    // Load cars initially on page load
    loadCars();
});


carForm.addEventListener('submit', event => {
    event.preventDefault();
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;
    addCar({ make, model, year, price });
    carForm.reset();
});

// Function to remove a car
function removeCar(index) {
    const carId = cars[index].id;
    fetch(`http://localhost:3001/cars/${carId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            //reload cars
            // const loadCarsBtn = document.getElementById('loadCarsBtn');
            loadCarsBtn.click();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// Event delegation for remove buttons
carList.addEventListener('click', event => {
    if (event.target.classList.contains('btn-remove')) {
        const index = event.target.dataset.index;
        removeCar(index);
    }
});