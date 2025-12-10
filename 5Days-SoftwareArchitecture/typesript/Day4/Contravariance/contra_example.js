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
// REQUIREMENT: Ensure "strictFunctionTypes": true in tsconfig.json
// Without this, TypeScript allows unsafe Bivariance.
var Animal = /** @class */ (function () {
    function Animal() {
        this.name = "Animal";
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
    // Contravariance: We use a handler that accepts a WIDER type (Animal)
    // to satisfy a requirement for a NARROWER type (Dog).
    var handleAnimal = function (a) {
        console.log("Handling ".concat(a.name));
    };
    // Safe assignment:
    // DogHandler expects a function that can take a Dog.
    // handleAnimal takes any Animal. Since Dog IS-A Animal, this is safe.
    var specificHandler = handleAnimal;
    specificHandler(new Dog());
}
main();
