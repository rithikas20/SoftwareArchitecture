class AuthService {
    checkCredentials(user: string): boolean { return true; }
}
class Database {
    connect() { console.log("[DB] connect"); }
    save(payload: string) { console.log("[DB] save:", payload); }
    close() { console.log("[DB] close"); }
}
class EmailService {
    sendReceipt(to: string, body: string) { console.log("[Email] to=", to); }
}
class Logger {
    info(m: string) { console.log("[Log]", m); }
    error(m: string) { console.log("[Log-Err]", m); }
}
type Order = { id: string; amount: number; };

class OrderProcessor {
    private auth = new AuthService();
    private db = new Database();
    private email = new EmailService();
    private logger = new Logger();

    process(o: Order, user: string) {
        this.logger.info("Start " + JSON.stringify(o));
        if (!this.auth.checkCredentials(user)) { this.logger.error("auth fail"); return; }
        this.db.connect();
        this.db.save(JSON.stringify(o));
        this.email.sendReceipt(user, "Thanks " + o.id);
        this.logger.info("Done " + JSON.stringify(o));
        this.db.close();
    }

    static illustrativeRFC(): number {
        const M = 1;
        const R = 6;
        return M + R;
    }
}

class TransactionFacade {
    constructor(private auth: AuthService, private db: Database, private email: EmailService, private logger: Logger) {}
    handleTransaction(o: Order, user: string): boolean {
        this.logger.info("Facade start " + JSON.stringify(o));
        if (!this.auth.checkCredentials(user)) { this.logger.error("auth fail"); return false; }
        this.db.connect();
        this.db.save(JSON.stringify(o));
        this.email.sendReceipt(user, "Thanks " + o.id);
        this.logger.info("Facade done " + JSON.stringify(o));
        this.db.close();
        return true;
    }
}

class CleanProcessor {
    constructor(private facade: TransactionFacade) {}
    process(o: Order, user: string) { this.facade.handleTransaction(o, user); }
    static illustrativeRFC(): number { return 1 + 1; }
}

console.log("=== POOR: High RFC (chatty) ===");
const poor = new OrderProcessor();
poor.process({ id: "o-11", amount: 9.99 }, "alice@x.com");
console.log("OrderProcessor RFC (illustrative) =", OrderProcessor.illustrativeRFC());

console.log("\n=== GOOD: Low RFC (facade) ===");
const facade = new TransactionFacade(new AuthService(), new Database(), new EmailService(), new Logger());
const clean = new CleanProcessor(facade);
clean.process({ id: "o-22", amount: 29.99 }, "bob@y.com");
console.log("CleanProcessor RFC (illustrative) =", CleanProcessor.illustrativeRFC());

console.log("\n=== Creative: batch run ===");
for (let i=0;i<3;i++){
    const o = { id: `batch-${i}`, amount: Math.random()*300 };
    if (Math.random() > 0.5) poor.process(o, "u@x");
    else clean.process(o, "u@y");
}
