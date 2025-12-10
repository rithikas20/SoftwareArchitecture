// TypeCouplingDemo.java
class Calculator {
    // expects double
    double add(double a, double b) {
        return a + b;
    }
}

class ClientType {
    private Calculator calc = new Calculator();

    void doCalc() {
        double r = calc.add(2.5, 3.5); // must pass numbers (double)
        System.out.println("Result: " + r);
    }
}

public class TypeCouplingDemo {
    public static void main(String[] args) {
        new ClientType().doCalc();
    }
}
