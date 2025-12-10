var numbers = [1, 2, 3];
numbers.push(4); // ✅ allowed
numbers[0] = 10; // ✅ allowed
numbers.pop(); // ✅ allowed
console.log(numbers); // [10, 2, 3]
