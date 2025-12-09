var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Student = /** @class */ (function () {
    function Student() {
    }
    Student.prototype.study = function () {
        var x = 0;
        x++;
    };
    return Student;
}());
var ScienceStudent = /** @class */ (function (_super) {
    __extends(ScienceStudent, _super);
    function ScienceStudent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScienceStudent.prototype.study = function () {
        var x = 1;
        x++;
    };
    return ScienceStudent;
}(Student));
var ArtsStudent = /** @class */ (function (_super) {
    __extends(ArtsStudent, _super);
    function ArtsStudent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArtsStudent.prototype.study = function () {
        var x = 2;
        x++;
    };
    return ArtsStudent;
}(Student));
var iterations = 10000000;
console.log("--- Optimized virtual call (same type) ---");
var s1 = new ScienceStudent();
var start1 = performance.now();
for (var i = 0; i < iterations; i++) {
    s1.study();
}
var end1 = performance.now();
console.log("Time: ".concat(end1 - start1, " ms"));
console.log("\n--- Forced virtual call (randomized type) ---");
var random = function () { return Math.random() > 0.5; };
var start2 = performance.now();
for (var i = 0; i < iterations; i++) {
    var s = random() ? new ScienceStudent() : new ArtsStudent();
    s.study();
}
var end2 = performance.now();
console.log("Time: ".concat(end2 - start2, " ms"));
