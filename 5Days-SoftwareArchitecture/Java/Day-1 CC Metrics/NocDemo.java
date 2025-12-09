import java.util.ArrayList;
import java.util.List;

// POOR: Concrete base class with shared implementation
class BaseShape {
    public void draw() {
        System.out.println("[BaseShape] set color = RED  (shared impl)");
    }
}

class Circle extends BaseShape {
    public void draw() {
        super.draw();
        System.out.println("Circle draws as a circle");
    }
}

class Square extends BaseShape {
    public void draw() {
        super.draw();
        System.out.println("Square draws as a square");
    }
}

// GOOD: Interface-based design + registry (high NOC on interface is healthy)
interface IShape {
    void draw();
}

class GoodCircle implements IShape {
    public void draw() { System.out.println("GoodCircle draws; color handled externally"); }
}

class GoodSquare implements IShape {
    public void draw() { System.out.println("GoodSquare draws; color handled externally"); }
}

class ColoredShapeDecorator implements IShape {
    private final IShape inner;
    private final String color;
    ColoredShapeDecorator(IShape inner, String color) { this.inner = inner; this.color = color; }
    public void draw() {
        System.out.println("[Decorator] set color = " + color);
        inner.draw();
    }
}

// Registry to simulate NOC measurement at runtime
class ShapeRegistry {
    private static final List<Class<? extends IShape>> implementations = new ArrayList<>();
    static void register(Class<? extends IShape> impl) { implementations.add(impl); }
    static int noc() { return implementations.size(); }
    static List<IShape> createAll() {
        List<IShape> list = new ArrayList<>();
        for (Class<? extends IShape> c : implementations) {
            try { list.add(c.getDeclaredConstructor().newInstance()); }
            catch (Exception e) { /* ignore for demo */ }
        }
        return list;
    }
}

public class NocDemo {
    public static void main(String[] args) throws Exception {
        System.out.println("=== POOR: High NOC on CONCRETE base class ===");
        List<BaseShape> poorShapes = List.of(new Circle(), new Square());
        poorShapes.forEach(BaseShape::draw);

        System.out.println("\nSimulate change in BaseShape: change color default to BLUE (ripple)");
        // simulate: we edit BaseShape.draw() to set color BLUE instead of RED
        // (we demonstrate by temporarily calling a different method)
        System.out.println("[BaseShape changed] set color = BLUE  (breaking change)");
        poorShapes.forEach(s -> {
            // pretend the base implementation changed - children now behave differently
            if (s instanceof Circle) System.out.println("Circle draws as a circle (color now BLUE)");
            if (s instanceof Square) System.out.println("Square draws as a square (color now BLUE)");
        });

        System.out.println("\n=== GOOD: High NOC on INTERFACE (register implementations) ===");
        ShapeRegistry.register(GoodCircle.class);
        ShapeRegistry.register(GoodSquare.class);
        System.out.println("NOC for IShape (registered implementations): " + ShapeRegistry.noc());
        List<IShape> goodShapes = ShapeRegistry.createAll();
        // wrap all shapes with a decorator at runtime (composition)
        for (IShape s : goodShapes) {
            IShape decorated = new ColoredShapeDecorator(s, "GREEN");
            decorated.draw();
        }

        System.out.println("\nAdd a new implementation at runtime (plugin style) without changing interface:");
        class GoodTriangle implements IShape {
            public void draw() { System.out.println("GoodTriangle draws; color handled externally"); }
        }
        ShapeRegistry.register(GoodTriangle.class);
        System.out.println("NOC for IShape now: " + ShapeRegistry.noc());
        ShapeRegistry.createAll().forEach(s -> new ColoredShapeDecorator(s, "PURPLE").draw());
    }
}
