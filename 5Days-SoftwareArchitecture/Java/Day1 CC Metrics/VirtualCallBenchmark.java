import java.util.Random;

class Student {
    void study() {
        // simple method
        int x = 0;
        x++; // trivial work to avoid empty method elimination
    }
}

class ScienceStudent extends Student {
    @Override
    void study() {
        int x = 1;
        x++;
    }
}

class ArtsStudent extends Student {
    @Override
    void study() {
        int x = 2;
        x++;
    }
}

public class VirtualCallBenchmark {
    public static void main(String[] args) {
        final int iterations = 10_000_000;
        Random random = new Random();

        // 1️⃣ Optimized virtual call (same type every time)
        Student s1 = new ScienceStudent();
        long start1 = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            s1.study();
        }
        long end1 = System.nanoTime();
        System.out.println("Optimized virtual call (same type): " + (end1 - start1) + " ns");

        // 2️⃣ Forced virtual call (randomized type)
        long start2 = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            Student s;
            if (random.nextBoolean()) {
                s = new ScienceStudent();
            } else {
                s = new ArtsStudent();
            }
            s.study(); // runtime type unknown → true VTable lookup
        }
        long end2 = System.nanoTime();
        System.out.println("Forced virtual call (random type): " + (end2 - start2) + " ns");
    }
}
