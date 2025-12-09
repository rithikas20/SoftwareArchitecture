var Logic = /** @class */ (function () {
    function Logic() {
    }
    Logic.prototype.checkNested = function (x) {
        if (x > 0) {
            if (x < 100) {
                if (x % 2 === 0) {
                    console.log("Even Positive Small");
                }
            }
        }
    };
    return Logic;
}());
var logic = new Logic();
logic.checkNested(10);
