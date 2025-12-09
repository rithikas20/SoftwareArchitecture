var Vehicle = /** @class */ (function () {
    function Vehicle() {
    }
    Vehicle.prototype.drive = function (speed) {
        console.log("Driving at ".concat(speed));
    };
    return Vehicle;
}());
var Car = /** @class */ (function () {
    function Car(vehicle) {
        this.vehicle = vehicle;
    }
    Car.prototype.drive = function (speed) {
        this.vehicle.drive(speed); // safe
        console.log("Car is moving");
    };
    return Car;
}());
var car = new Car(new Vehicle());
car.drive(50); // works, Vehicle can change without breaking Car
