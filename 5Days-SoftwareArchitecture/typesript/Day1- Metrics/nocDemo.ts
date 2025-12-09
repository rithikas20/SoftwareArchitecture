// POOR: Concrete base class
class BaseShape {
    draw() { console.log("[BaseShape] set color = RED  (shared impl)"); }
}

class Circle extends BaseShape {
    draw() { super.draw(); console.log("Circle draws as a circle"); }
}

class Square extends BaseShape {
    draw() { super.draw(); console.log("Square draws as a square"); }
}

// GOOD: Interface-style + registry
interface IShape { draw(): void; }

class GoodCircle implements IShape {
    draw() { console.log("GoodCircle draws; color handled externally"); }
}

class GoodSquare implements IShape {
    draw() { console.log("GoodSquare draws; color handled externally"); }
}

class ColoredShapeDecorator implements IShape {
    constructor(private inner: IShape, private color: string) {}
    draw() {
        console.log(`[Decorator] set color = ${this.color}`);
        this.inner.draw();
    }
}

// Registry for runtime NOC counting / plugin demo
class ShapeRegistry {
    private static impls: Array<new () => IShape> = [];
    static register(impl: new () => IShape) { this.impls.push(impl); }
    static noc(): number { return this.impls.length; }
    static createAll(): IShape[] { return this.impls.map(C => new C()); }
}

console.log("=== POOR: High NOC on CONCRETE base class ===");
const poorShapes = [new Circle(), new Square()];
poorShapes.forEach(s => s.draw());

console.log("\nSimulate change in BaseShape: change color default to BLUE (ripple)");
console.log("[BaseShape changed] set color = BLUE  (breaking change)");
poorShapes.forEach(s => {
    if (s instanceof Circle) console.log("Circle draws as a circle (color now BLUE)");
    if (s instanceof Square) console.log("Square draws as a square (color now BLUE)");
});

console.log("\n=== GOOD: High NOC on INTERFACE (register implementations) ===");
ShapeRegistry.register(GoodCircle);
ShapeRegistry.register(GoodSquare);
console.log("NOC for IShape (registered implementations):", ShapeRegistry.noc());
const goodShapes = ShapeRegistry.createAll();
goodShapes.forEach(s => new ColoredShapeDecorator(s, "GREEN").draw());

console.log("\nAdd a new implementation at runtime (plugin style) without changing interface:");
class GoodTriangle implements IShape { draw() { console.log("GoodTriangle draws; color handled externally"); } }
ShapeRegistry.register(GoodTriangle);
console.log("NOC for IShape now:", ShapeRegistry.noc());
ShapeRegistry.createAll().forEach(s => new ColoredShapeDecorator(s, "PURPLE").draw());
