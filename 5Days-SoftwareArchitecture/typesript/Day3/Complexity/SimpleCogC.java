class SimpleCogC {

    sumPositive(numbers: number[]): number {
        let sum = 0; // CCog = 0

        for (let num of numbers) { // +1 (loop)
            if (num > 0) {          // +1 (if) +1 (nested inside loop) = 2
                sum += num;         // 0
            }
        }

        return sum; // 0
    }
}

// Usage
const example = new SimpleCogC();
const numbers = [-5, 0, 2, 3, -1];
const result = example.sumPositive(numbers);

console.log("Sum of positive numbers:", result);
console.log("Cognitive Complexity: Loop(1) + if(2) = 3");
