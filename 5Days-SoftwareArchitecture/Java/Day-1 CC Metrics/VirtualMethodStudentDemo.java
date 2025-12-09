// Base class
class Student {
    void study() {
        System.out.println("Student is studying general subjects");
    }
}

// Subclass ScienceStudent
class ScienceStudent extends Student {
    @Override
    void study() {
        System.out.println("Science student is studying Physics and Chemistry");
    }
}

// Subclass ArtsStudent
class ArtsStudent extends Student {
    @Override
    void study() {
        System.out.println("Arts student is studying History and Literature");
    }
}

public class VirtualMethodStudentDemo {

    // Helper method to demonstrate dynamic dispatch
    static void startStudy(Student s) {
        s.study(); // Which method runs? Depends on actual object
    }

    public static void main(String[] args) {
        // 1️⃣ Reference is Student, object is ScienceStudent
        Student s1 = new ScienceStudent();
        s1.study(); // Output: Science student is studying Physics and Chemistry

        // 2️⃣ Reference is Student, object is ArtsStudent
        Student s2 = new ArtsStudent();
        s2.study(); // Output: Arts student is studying History and Literature

        // 3️⃣ Reference is ScienceStudent, object is ScienceStudent
        ScienceStudent sc = new ScienceStudent();
        sc.study(); // Output: Science student is studying Physics and Chemistry

        // 4️⃣ Reference is ArtsStudent, object is ArtsStudent
        ArtsStudent ar = new ArtsStudent();
        ar.study(); // Output: Arts student is studying History and Literature

        System.out.println("\n--- Using method with Student reference ---");
        // Using method to show polymorphism
        startStudy(s1); // Output: Science student is studying Physics and Chemistry
        startStudy(s2); // Output: Arts student is studying History and Literature

        System.out.println("\n--- Randomized student example ---");
        // 5️⃣ Randomized object to force runtime decision
        Student s3;
        if (Math.random() > 0.5) {
            s3 = new ScienceStudent();
        } else {
            s3 = new ArtsStudent();
        }
        s3.study(); // Could be Science or Arts depending on runtime
    }
}
