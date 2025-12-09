var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.checkCredentials = function (user) { return true; };
    return AuthService;
}());
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.connect = function () { console.log("[DB] connect"); };
    Database.prototype.save = function (payload) { console.log("[DB] save:", payload); };
    Database.prototype.close = function () { console.log("[DB] close"); };
    return Database;
}());
var EmailService = /** @class */ (function () {
    function EmailService() {
    }
    EmailService.prototype.sendReceipt = function (to, body) { console.log("[Email] to=", to); };
    return EmailService;
}());
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.info = function (m) { console.log("[Log]", m); };
    Logger.prototype.error = function (m) { console.log("[Log-Err]", m); };
    return Logger;
}());
var OrderProcessor = /** @class */ (function () {
    function OrderProcessor() {
        this.auth = new AuthService();
        this.db = new Database();
        this.email = new EmailService();
        this.logger = new Logger();
    }
    OrderProcessor.prototype.process = function (o, user) {
        this.logger.info("Start " + JSON.stringify(o));
        if (!this.auth.checkCredentials(user)) {
            this.logger.error("auth fail");
            return;
        }
        this.db.connect();
        this.db.save(JSON.stringify(o));
        this.email.sendReceipt(user, "Thanks " + o.id);
        this.logger.info("Done " + JSON.stringify(o));
        this.db.close();
    };
    OrderProcessor.illustrativeRFC = function () {
        var M = 1;
        var R = 6;
        return M + R;
    };
    return OrderProcessor;
}());
var TransactionFacade = /** @class */ (function () {
    function TransactionFacade(auth, db, email, logger) {
        this.auth = auth;
        this.db = db;
        this.email = email;
        this.logger = logger;
    }
    TransactionFacade.prototype.handleTransaction = function (o, user) {
        this.logger.info("Facade start " + JSON.stringify(o));
        if (!this.auth.checkCredentials(user)) {
            this.logger.error("auth fail");
            return false;
        }
        this.db.connect();
        this.db.save(JSON.stringify(o));
        this.email.sendReceipt(user, "Thanks " + o.id);
        this.logger.info("Facade done " + JSON.stringify(o));
        this.db.close();
        return true;
    };
    return TransactionFacade;
}());
var CleanProcessor = /** @class */ (function () {
    function CleanProcessor(facade) {
        this.facade = facade;
    }
    CleanProcessor.prototype.process = function (o, user) { this.facade.handleTransaction(o, user); };
    CleanProcessor.illustrativeRFC = function () { return 1 + 1; };
    return CleanProcessor;
}());
console.log("=== POOR: High RFC (chatty) ===");
var poor = new OrderProcessor();
poor.process({ id: "o-11", amount: 9.99 }, "alice@x.com");
console.log("OrderProcessor RFC (illustrative) =", OrderProcessor.illustrativeRFC());
console.log("\n=== GOOD: Low RFC (facade) ===");
var facade = new TransactionFacade(new AuthService(), new Database(), new EmailService(), new Logger());
var clean = new CleanProcessor(facade);
clean.process({ id: "o-22", amount: 29.99 }, "bob@y.com");
console.log("CleanProcessor RFC (illustrative) =", CleanProcessor.illustrativeRFC());
console.log("\n=== Creative: batch run ===");
for (var i = 0; i < 3; i++) {
    var o = { id: "batch-".concat(i), amount: Math.random() * 300 };
    if (Math.random() > 0.5)
        poor.process(o, "u@x");
    else
        clean.process(o, "u@y");
}
