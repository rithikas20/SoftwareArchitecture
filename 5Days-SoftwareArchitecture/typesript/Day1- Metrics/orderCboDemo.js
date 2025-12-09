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
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.log = function (msg) { console.log("[Logger] " + msg); };
    return Logger;
}());
var SqlDatabase = /** @class */ (function () {
    function SqlDatabase() {
    }
    SqlDatabase.prototype.save = function (payload) { console.log("[SqlDatabase] saved: " + payload); };
    return SqlDatabase;
}());
var LegacyDb = /** @class */ (function () {
    function LegacyDb() {
    }
    LegacyDb.prototype.persist = function (payload) { console.log("[LegacyDb] persisted: " + payload); };
    return LegacyDb;
}());
var LegacyDbAdapter = /** @class */ (function (_super) {
    __extends(LegacyDbAdapter, _super);
    function LegacyDbAdapter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legacy = new LegacyDb();
        return _this;
    }
    LegacyDbAdapter.prototype.save = function (payload) { this.legacy.persist(payload); };
    return LegacyDbAdapter;
}(SqlDatabase));
var OrderService = /** @class */ (function () {
    function OrderService() {
    }
    OrderService.prototype.checkout = function (o) {
        var logger = new Logger();
        var db = new SqlDatabase();
        logger.log("Processing " + JSON.stringify(o));
        db.save(JSON.stringify(o));
        logger.log("Completed " + JSON.stringify(o));
    };
    return OrderService;
}());
var CleanOrderService = /** @class */ (function () {
    function CleanOrderService(logger, db) {
        this.logger = logger;
        this.db = db;
    }
    CleanOrderService.prototype.checkout = function (o) {
        this.logger.log("Processing " + JSON.stringify(o));
        this.db.save(JSON.stringify(o));
        this.logger.log("Completed " + JSON.stringify(o));
    };
    return CleanOrderService;
}());
var MockLogger = /** @class */ (function () {
    function MockLogger() {
    }
    MockLogger.prototype.log = function (msg) { console.log("[MockLogger] " + msg); };
    return MockLogger;
}());
var MockDatabase = /** @class */ (function () {
    function MockDatabase() {
    }
    MockDatabase.prototype.save = function (payload) { console.log("[MockDatabase] saved: " + payload); };
    return MockDatabase;
}());
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.listeners = [];
    }
    EventBus.prototype.subscribe = function (fn) { this.listeners.push(fn); };
    EventBus.prototype.publish = function (e) { this.listeners.forEach(function (fn) { return fn(e); }); };
    return EventBus;
}());
var EventOrderService = /** @class */ (function () {
    function EventOrderService(bus) {
        this.bus = bus;
    }
    EventOrderService.prototype.checkout = function (o) { this.bus.publish(o); };
    return EventOrderService;
}());
function orderHandlerFactory(logger, db) {
    return function (e) {
        if (!e || !e.id)
            return;
        logger.log("Event handling " + JSON.stringify(e));
        db.save(JSON.stringify(e));
    };
}
console.log("=== POOR: High CBO (tight coupling) ===");
new OrderService().checkout({ id: "o-1", amount: 99.9 });
console.log("\n=== GOOD: Low CBO (DI via interfaces) ===");
new CleanOrderService(new MockLogger(), new MockDatabase()).checkout({ id: "o-2", amount: 199.9 });
console.log("\n=== GOOD: Adapter for legacy DB ===");
new CleanOrderService(new Logger(), new LegacyDbAdapter()).checkout({ id: "o-3", amount: 299.9 });
console.log("\n=== GOOD: Event-driven decoupling ===");
var bus = new EventBus();
bus.subscribe(orderHandlerFactory(new Logger(), new MockDatabase()));
var evt = new EventOrderService(bus);
evt.checkout({ id: "o-4", amount: 49.9 });
