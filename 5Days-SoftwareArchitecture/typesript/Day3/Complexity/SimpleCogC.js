var SimpleCogC = /** @class */ (function () {
    function SimpleCogC() {
    }
    SimpleCogC.prototype.sumPositive = function (numbers) {
        var sum = 0; // CCog = 0
        for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) { // +1 (loop)
            var num = numbers_1[_i];
            if (num > 0) { // +1 (if) +1 (nested inside loop) = 2
                sum += num; // 0
            }
        }
        return sum; // 0
    };
    return SimpleCogC;
}());
// Usage
var example = new SimpleCogC();
var numbers = [-5, 0, 2, 3, -1];
var result = example.sumPositive(numbers);
console.log("Sum of positive numbers:", result);
console.log("Cognitive Complexity: Loop(1) + if(2) = 3");
