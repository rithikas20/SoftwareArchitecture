"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordinator = void 0;
// Coordinator.ts
var Auth_1 = require("./Auth"); // Ce += 1
var DB_1 = require("./DB"); // Ce += 1
var Email_1 = require("./Email"); // Ce += 1
var Coordinator = /** @class */ (function () {
    function Coordinator() {
    }
    Coordinator.prototype.doWork = function () {
        new Auth_1.AuthSystem();
        new DB_1.Database();
        new Email_1.Emailer();
        console.log("Coordinator working...");
    };
    return Coordinator;
}());
exports.Coordinator = Coordinator;
