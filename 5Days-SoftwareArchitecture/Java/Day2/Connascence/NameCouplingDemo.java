// NameCouplingDemo.java
class Printer {
    void print(String msg) {
        System.out.println("Printer: " + msg);
    }
}

class ClientName {
    private Printer printer = new Printer();

    void doWork() {
        // Depends on method name `print`
        printer.print("Hello by NameCouplingDemo");
    }
}

public class NameCouplingDemo {
    public static void main(String[] args) {
        new ClientName().doWork();
    }
}
