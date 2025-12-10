// REQUIREMENT: Ensure "strictFunctionTypes": true in tsconfig.json
// Without this, TypeScript allows unsafe Bivariance.
class Animal { name: string = "Animal"; }
class Dog extends Animal { bark() { console.log("Woof"); } }
type DogHandler = (d: Dog) => void;
function main() {
    // Contravariance: We use a handler that accepts a WIDER type (Animal)
    // to satisfy a requirement for a NARROWER type (Dog).
    const handleAnimal = (a: Animal) => {
        console.log(`Handling ${a.name}`);
    };
    // Safe assignment:
    // DogHandler expects a function that can take a Dog.
    // handleAnimal takes any Animal. Since Dog IS-A Animal, this is safe.
    const specificHandler: DogHandler = handleAnimal;
    specificHandler(new Dog());
}
main();