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
// POOR: Concrete base class
var BaseShape = /** @class */ (function () {
    function BaseShape() {
    }
    BaseShape.prototype.draw = function () { console.log("[BaseShape] set color = RED  (shared impl)"); };
    return BaseShape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype.draw = function () { _super.prototype.draw.call(this); console.log("Circle draws as a circle"); };
    return Circle;
}(BaseShape));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Square.prototype.draw = function () { _super.prototype.draw.call(this); console.log("Square draws as a square"); };
    return Square;
}(BaseShape));
var GoodCircle = /** @class */ (function () {
    function GoodCircle() {
    }
    GoodCircle.prototype.draw = function () { console.log("GoodCircle draws; color handled externally"); };
    return GoodCircle;
}());
var GoodSquare = /** @class */ (function () {
    function GoodSquare() {
    }
    GoodSquare.prototype.draw = function () { console.log("GoodSquare draws; color handled externally"); };
    return GoodSquare;
}());
var ColoredShapeDecorator = /** @class */ (function () {
    function ColoredShapeDecorator(inner, color) {
        this.inner = inner;
        this.color = color;
    }
    ColoredShapeDecorator.prototype.draw = function () {
        console.log("[Decorator] set color = ".concat(this.color));
        this.inner.draw();
    };
    return ColoredShapeDecorator;
}());
// Registry for runtime NOC counting / plugin demo
var ShapeRegistry = /** @class */ (function () {
    function ShapeRegistry() {
    }
    ShapeRegistry.register = function (impl) { this.impls.push(impl); };
    ShapeRegistry.noc = function () { return this.impls.length; };
    ShapeRegistry.createAll = function () { return this.impls.map(function (C) { return new C(); }); };
    ShapeRegistry.impls = [];
    return ShapeRegistry;
}());
console.log("=== POOR: High NOC on CONCRETE base class ===");
var poorShapes = [new Circle(), new Square()];
poorShapes.forEach(function (s) { return s.draw(); });
console.log("\nSimulate change in BaseShape: change color default to BLUE (ripple)");
console.log("[BaseShape changed] set color = BLUE  (breaking change)");
poorShapes.forEach(function (s) {
    if (s instanceof Circle)
        console.log("Circle draws as a circle (color now BLUE)");
    if (s instanceof Square)
        console.log("Square draws as a square (color now BLUE)");
});
console.log("\n=== GOOD: High NOC on INTERFACE (register implementations) ===");
ShapeRegistry.register(GoodCircle);
ShapeRegistry.register(GoodSquare);
console.log("NOC for IShape (registered implementations):", ShapeRegistry.noc());
var goodShapes = ShapeRegistry.createAll();
goodShapes.forEach(function (s) { return new ColoredShapeDecorator(s, "GREEN").draw(); });
console.log("\nAdd a new implementation at runtime (plugin style) without changing interface:");
var GoodTriangle = /** @class */ (function () {
    function GoodTriangle() {
    }
    GoodTriangle.prototype.draw = function () { console.log("GoodTriangle draws; color handled externally"); };
    return GoodTriangle;
}());
ShapeRegistry.register(GoodTriangle);
console.log("NOC for IShape now:", ShapeRegistry.noc());
ShapeRegistry.createAll().forEach(function (s) { return new ColoredShapeDecorator(s, "PURPLE").draw(); });
