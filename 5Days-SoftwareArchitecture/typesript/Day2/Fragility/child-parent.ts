// Parent class
class Parent {
    greet() {
        console.log("Hello");
    }
}

// Child class
class Child extends Parent {
    greet() {
        super.greet(); // depends on Parent's greet
        console.log("Hi from Child");
    }
}

const c = new Child();
c.greet();
