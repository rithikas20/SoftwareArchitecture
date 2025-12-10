var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal() {
        this.name = "";
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () { console.log("Woof"); };
    return Dog;
}(Animal));
function main() {
    // TypeScript arrays are covariant.
    var dogs = [new Dog()];
    // Assignment allowed because Array<Dog> is assignable to Array<Animal>
    var animals = dogs;
    // Unsafe mutation!
    // We push a generic Animal into the array. The array is technically 'dogs'.
    animals.push(new Animal());
    // Runtime Error potential:
    // The second element is an Animal, but 'dogs' thinks it contains only Dogs.
    // dogs[1].bark(); // Error: bark is undefined on the generic Animal.
    console.log("Unsafe mutation complete. accessing dogs[1].bark() would crash.");
}
main();
