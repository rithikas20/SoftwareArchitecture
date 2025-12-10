class Animal { name: string = ""; }
class Dog extends Animal { bark() { console.log("Woof"); } }
function main() {
    // TypeScript arrays are covariant.
    const dogs: Dog[] = [new Dog()];
    // Assignment allowed because Array<Dog> is assignable to Array<Animal>
    const animals: Animal[] = dogs;
    // Unsafe mutation!
    // We push a generic Animal into the array. The array is technically 'dogs'.
    animals.push(new Animal()); 
    // Runtime Error potential:
    // The second element is an Animal, but 'dogs' thinks it contains only Dogs.
    // dogs[1].bark(); // Error: bark is undefined on the generic Animal.
    console.log("Unsafe mutation complete. accessing dogs[1].bark() would crash.");
}
main();