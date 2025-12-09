class Student {
    study(): void {
        let x = 0;
        x++;
    }
}

class ScienceStudent extends Student {
    study(): void {
        let x = 1;
        x++;
    }
}

class ArtsStudent extends Student {
    study(): void {
        let x = 2;
        x++;
    }
}

const iterations = 10_000_000;

console.log("--- Optimized virtual call (same type) ---");
let s1: Student = new ScienceStudent();
let start1 = performance.now();
for (let i = 0; i < iterations; i++) {
    s1.study();
}
let end1 = performance.now();
console.log(`Time: ${end1 - start1} ms`);

console.log("\n--- Forced virtual call (randomized type) ---");
let random = () => Math.random() > 0.5;
let start2 = performance.now();
for (let i = 0; i < iterations; i++) {
    let s: Student = random() ? new ScienceStudent() : new ArtsStudent();
    s.study();
}
let end2 = performance.now();
console.log(`Time: ${end2 - start2} ms`);
