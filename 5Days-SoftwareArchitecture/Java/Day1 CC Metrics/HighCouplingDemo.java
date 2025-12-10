class B {
    void work() {
        System.out.println("Working inside class B");
    }
}

class A {
    B obj = new B();  // direct dependency

    void doTask() {
        obj.work();
    }
}

public class HighCouplingDemo {
    public static void main(String[] args) {
        A a = new A();
        a.doTask();
    }
}
