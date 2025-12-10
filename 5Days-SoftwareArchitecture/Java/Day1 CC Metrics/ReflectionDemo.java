import java.lang.reflect.Method;

// Base class
class Student {
    public void study() {
        System.out.println("Student studies general subjects");
    }
}

// Science student
class ScienceStudent extends Student {
    @Override
    public void study() {
        System.out.println("Science student studies Physics and Chemistry");
    }
}

// Arts student
class ArtsStudent extends Student {
    @Override
    public void study() {
        System.out.println("Arts student studies History and Literature");
    }
}

public class ReflectionDemo {
    public static void main(String[] args) throws Exception {
        Student s1 = new ScienceStudent();
        Student s2 = new ArtsStudent();

        System.out.println("--- Normal Virtual Call ---");
        // Always use ScienceStudent for normal call
        Student s = s1;
        s.study();  // virtual method call, may be optimized by JVM

        System.out.println("\n--- Reflection Call ---");
        // Reflection forces runtime lookup, still keep randomness
        s = Math.random() > 0.5 ? s1 : s2;
        Method m = s.getClass().getMethod("study"); // find method at runtime
        m.invoke(s);  // runtime method lookup, cannot optimize
    }
}
