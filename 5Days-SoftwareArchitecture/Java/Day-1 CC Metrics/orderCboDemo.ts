class Logger {
    log(msg: string) { console.log("[Logger] " + msg); }
}
class SqlDatabase {
    save(payload: string) { console.log("[SqlDatabase] saved: " + payload); }
}
class LegacyDb {
    persist(payload: string) { console.log("[LegacyDb] persisted: " + payload); }
}
class LegacyDbAdapter extends SqlDatabase {
    private legacy = new LegacyDb();
    save(payload: string) { this.legacy.persist(payload); }
}
type Order = { id: string, amount: number };

class OrderService {
    checkout(o: Order) {
        const logger = new Logger();
        const db = new SqlDatabase();
        logger.log("Processing " + JSON.stringify(o));
        db.save(JSON.stringify(o));
        logger.log("Completed " + JSON.stringify(o));
    }
}

interface ILogger { log(msg: string): void; }
interface IDatabase { save(payload: string): void; }

class CleanOrderService {
    constructor(private logger: ILogger, private db: IDatabase) {}
    checkout(o: Order) {
        this.logger.log("Processing " + JSON.stringify(o));
        this.db.save(JSON.stringify(o));
        this.logger.log("Completed " + JSON.stringify(o));
    }
}

class MockLogger implements ILogger { log(msg: string) { console.log("[MockLogger] " + msg); } }
class MockDatabase implements IDatabase { save(payload: string) { console.log("[MockDatabase] saved: " + payload); } }

class EventBus {
    private listeners: Array<(e: any) => void> = [];
    subscribe(fn: (e: any) => void) { this.listeners.push(fn); }
    publish(e: any) { this.listeners.forEach(fn => fn(e)); }
}
class EventOrderService {
    constructor(private bus: EventBus) {}
    checkout(o: Order) { this.bus.publish(o); }
}

function orderHandlerFactory(logger: ILogger, db: IDatabase) {
    return (e: any) => {
        if (!e || !e.id) return;
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
const bus = new EventBus();
bus.subscribe(orderHandlerFactory(new Logger(), new MockDatabase()));
const evt = new EventOrderService(bus);
evt.checkout({ id: "o-4", amount: 49.9 });
