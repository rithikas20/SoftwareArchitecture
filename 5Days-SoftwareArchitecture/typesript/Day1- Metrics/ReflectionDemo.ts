class Student {
    study(): void {
        console.log("Student studies general subjects");
    }
}

class ScienceStudent extends Student {
    study(): void {
        console.log("Science student studies Physics and Chemistry");
    }
}

class ArtsStudent extends Student {
    study(): void {
        console.log("Arts student studies History and Literature");
    }
}

const s1: Student = new ScienceStudent();
const s2: Student = new ArtsStudent();

console.log("--- Normal Virtual Call ---");
let s: Student = s1;
s.study();

console.log("\n--- Reflection Call ---");
// Simulate runtime lookup using dynamic method call
s = Math.random() > 0.5 ? s1 : s2;
(s as any)["study"]();  // TypeScript dynamic call, like reflection
