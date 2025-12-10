import java.util.function.Consumer;

public class Contra_example {
    public static void handleObject(Object o) {
        System.out.println("Handled object: " + o);
    }

    public static void main(String[] args) {
        Consumer<String> stringHandler;

        // Assignment works: method taking Object can handle String (contravariance)
        stringHandler = Contra_example::handleObject;

        stringHandler.accept("Hello");
    }
}
