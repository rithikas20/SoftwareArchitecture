class Vehicle {
    drive(speed: number) {
        console.log(`Driving at ${speed}`);
    }
}

class Car {
    constructor(private vehicle: Vehicle) {}

    drive(speed: number) {
        this.vehicle.drive(speed); // safe
        console.log("Car is moving");
    }
}

const car = new Car(new Vehicle());
car.drive(50); // works, Vehicle can change without breaking Car
