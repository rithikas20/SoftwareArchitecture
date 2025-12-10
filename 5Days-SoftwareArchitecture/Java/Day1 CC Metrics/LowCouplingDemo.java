interface Work {
    void work();
}

class B implements Work {
    public void work() {
        System.out.println("Working inside class B");
    }
}

class C implements Work {
    public void work() {
        System.out.println("Working inside class C");
    }
}

class A {
    Work obj;  // depends on interface, not concrete class

    A(Work obj) {
        this.obj = obj;
    }

    void doTask() {
        obj.work();
    }
}

public class LowCouplingDemo {
    public static void main(String[] args) {
        A a1 = new A(new B()); // using B
        a1.doTask();

        A a2 = new A(new C()); // using C without changing A
        a2.doTask();
    }
}
