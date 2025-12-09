var LcomCalculator = /** @class */ (function () {
    function LcomCalculator() {
    }
    LcomCalculator.lcom4 = function (methods) {
        var n = methods.length;
        var adj = [];
        for (var i = 0; i < n; i++) {
            adj[i] = [];
            for (var j = 0; j < n; j++)
                adj[i][j] = false;
        }
        for (var i = 0; i < n; i++) {
            for (var j = i + 1; j < n; j++) {
                var aFields = methods[i].fields;
                var bFields = methods[j].fields;
                var intersect = false;
                for (var ia = 0; ia < aFields.length; ia++) {
                    var f = aFields[ia];
                    for (var jb = 0; jb < bFields.length; jb++) {
                        if (bFields[jb] === f) {
                            intersect = true;
                            break;
                        }
                    }
                    if (intersect)
                        break;
                }
                adj[i][j] = adj[j][i] = intersect;
            }
        }
        var seen = [];
        for (var i = 0; i < n; i++)
            seen[i] = false;
        var components = 0;
        for (var i = 0; i < n; i++) {
            if (!seen[i]) {
                components++;
                var stack = [i];
                seen[i] = true;
                while (stack.length) {
                    var u = stack.pop();
                    for (var v = 0; v < n; v++) {
                        if (!seen[v] && adj[u][v]) {
                            seen[v] = true;
                            stack.push(v);
                        }
                    }
                }
            }
        }
        return components;
    };
    return LcomCalculator;
}());
var PoorUserManager = /** @class */ (function () {
    function PoorUserManager() {
        this.name = "rithika";
        this.email = "rith@gmail";
        this.dbConfig = "db";
        this.auditLog = "log";
    }
    PoorUserManager.prototype.printName = function () { console.log(this.name); };
    PoorUserManager.prototype.sendWelcomeEmail = function () { console.log("email->", this.email); };
    PoorUserManager.prototype.connect = function () { console.log("db->", this.dbConfig); };
    PoorUserManager.prototype.persistUser = function () { console.log("persist", this.name); };
    PoorUserManager.prototype.writeAudit = function () { console.log("audit", this.auditLog); };
    return PoorUserManager;
}());
var User = /** @class */ (function () {
    function User() {
        this.name = "rithika";
    }
    User.prototype.printName = function () { console.log(this.name); };
    return User;
}());
var DbConnector = /** @class */ (function () {
    function DbConnector() {
        this.dbConfig = "db";
    }
    DbConnector.prototype.connect = function () { console.log("db->", this.dbConfig); };
    DbConnector.prototype.persistUser = function (name) { console.log("persist", name); };
    return DbConnector;
}());
var Notifier = /** @class */ (function () {
    function Notifier() {
        this.email = "rith@gmail";
    }
    Notifier.prototype.sendWelcomeEmail = function (to) { console.log("email->", to); };
    return Notifier;
}());
var Auditor = /** @class */ (function () {
    function Auditor() {
        this.auditLog = "log";
    }
    Auditor.prototype.writeAudit = function (entry) { console.log("audit", entry); };
    return Auditor;
}());
var poorMethods = [
    { name: "printName", fields: ["name"] },
    { name: "sendWelcomeEmail", fields: ["email"] },
    { name: "connect", fields: ["dbConfig"] },
    { name: "persistUser", fields: ["dbConfig", "name"] },
    { name: "writeAudit", fields: ["auditLog"] }
];
console.log("POOR class methods components (LCOM4) =", LcomCalculator.lcom4(poorMethods));
var userMethods = [{ name: "printName", fields: ["name"] }];
var dbMethods = [
    { name: "connect", fields: ["dbConfig"] },
    { name: "persistUser", fields: ["dbConfig", "name"] }
];
var notifierMethods = [{ name: "sendWelcomeEmail", fields: ["email"] }];
var auditorMethods = [{ name: "writeAudit", fields: ["auditLog"] }];
console.log("GOOD class User LCOM4 =", LcomCalculator.lcom4(userMethods));
console.log("GOOD class DbConnector LCOM4 =", LcomCalculator.lcom4(dbMethods));
console.log("GOOD class Notifier LCOM4 =", LcomCalculator.lcom4(notifierMethods));
console.log("GOOD class Auditor LCOM4 =", LcomCalculator.lcom4(auditorMethods));
console.log("\nRefactored run:");
var u = new User();
u.name = "rithika";
u.printName();
var db = new DbConnector();
db.dbConfig = "db://x";
db.connect();
db.persistUser("rithika");
var n = new Notifier();
n.email = "rith@gmail";
n.sendWelcomeEmail("rith@gmail");
var a = new Auditor();
a.auditLog = "log01";
a.writeAudit("created user rithika");
