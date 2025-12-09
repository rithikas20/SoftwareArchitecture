var Logic = /** @class */ (function () {
    function Logic() {
    }
    Logic.prototype.checkFlat = function (x) {
        if (x <= 0)
            return;
        if (x >= 100)
            return;
        if (x % 2 !== 0)
            return;
        console.log("Even Positive Small");
    };
    return Logic;
}());
var logic = new Logic();
logic.checkFlat(10);
