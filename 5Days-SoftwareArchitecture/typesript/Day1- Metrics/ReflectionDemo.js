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
        console.log("Student studies general subjects");
    };
    return Student;
}());
var ScienceStudent = /** @class */ (function (_super) {
    __extends(ScienceStudent, _super);
    function ScienceStudent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScienceStudent.prototype.study = function () {
        console.log("Science student studies Physics and Chemistry");
    };
    return ScienceStudent;
}(Student));
var ArtsStudent = /** @class */ (function (_super) {
    __extends(ArtsStudent, _super);
    function ArtsStudent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArtsStudent.prototype.study = function () {
        console.log("Arts student studies History and Literature");
    };
    return ArtsStudent;
}(Student));
var s1 = new ScienceStudent();
var s2 = new ArtsStudent();
console.log("--- Normal Virtual Call ---");
var s = s1;
s.study();
console.log("\n--- Reflection Call ---");
// Simulate runtime lookup using dynamic method call
s = Math.random() > 0.5 ? s1 : s2;
s["study"](); // TypeScript dynamic call, like reflection
