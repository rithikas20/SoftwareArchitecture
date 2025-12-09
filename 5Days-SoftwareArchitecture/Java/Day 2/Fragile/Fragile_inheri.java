// Parent class
class Vehicle {
    void drive(int speed) {
        System.out.println("Driving at " + speed);
    }
}

// Child class inherits from Vehicle
class Car extends Vehicle {
    @Override
    void drive(int speed) {
        super.drive(speed); // calls Vehicle's drive
        System.out.println("Car is moving");
    }
}

// Main method
public class Fragile_inheri {
    public static void main(String[] args) {
        Car car = new Car();
        car.drive(50); // works
    }
}
