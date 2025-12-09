import java.util.Random;

class AuthService {
    boolean checkCredentials(String user) { return true; }
}

class Database {
    void connect() { System.out.println("[DB] connect"); }
    void save(String payload) { System.out.println("[DB] save: " + payload); }
    void close() { System.out.println("[DB] close"); }
}

class EmailService {
    void sendReceipt(String to, String body) { System.out.println("[Email] to=" + to); }
}

class Logger {
    void info(String m) { System.out.println("[Log] " + m); }
    void error(String m) { System.out.println("[Log-Err] " + m); }
}

class Order {
    final String id; final double amount;
    Order(String id, double amount){ this.id = id; this.amount = amount; }
    public String toString(){ return id + ":" + amount; }
}

class OrderProcessor { // POOR: chatty object (high RFC)
    private final AuthService auth = new AuthService();
    private final Database db = new Database();
    private final EmailService email = new EmailService();
    private final Logger logger = new Logger();

    void process(Order o, String user) {
        logger.info("Start " + o);
        if (!auth.checkCredentials(user)) { logger.error("auth fail"); return; }
        db.connect();
        db.save(o.toString());
        email.sendReceipt(user, "Thanks for order " + o.id);
        logger.info("Done " + o);
        db.close();
    }

    // illustrative RFC count (not computed via analysis) 
    static int illustrativeRFC() {
        int M = 1; // methods owned (process)
        int R = 6; // external methods called: auth.checkCredentials, db.connect, db.save, email.sendReceipt, logger.info, db.close
        return M + R;
    }
}

class TransactionFacade { // Facade that groups many calls
    private final AuthService auth;
    private final Database db;
    private final EmailService email;
    private final Logger logger;

    TransactionFacade(AuthService auth, Database db, EmailService email, Logger logger) {
        this.auth = auth; this.db = db; this.email = email; this.logger = logger;
    }

    boolean handleTransaction(Order o, String user) {
        logger.info("Facade start " + o);
        if (!auth.checkCredentials(user)) { logger.error("auth fail"); return false; }
        db.connect();
        db.save(o.toString());
        email.sendReceipt(user, "Thanks for order " + o.id);
        logger.info("Facade done " + o);
        db.close();
        return true;
    }
}

class CleanProcessor { // GOOD: low RFC because it delegates to a single facade call
    private final TransactionFacade facade;
    CleanProcessor(TransactionFacade facade){ this.facade = facade; }

    void process(Order o, String user){
        facade.handleTransaction(o, user);
    }

    static int illustrativeRFC(){
        int M = 1; // process
        int R = 1; // facade.handleTransaction
        return M + R;
    }
}

public class RfcDemo {
    public static void main(String[] args){
        Order o1 = new Order("o-101", 49.99);
        Order o2 = new Order("o-202", 149.50);

        System.out.println("=== POOR: High RFC (chatty) ===");
        OrderProcessor p = new OrderProcessor();
        p.process(o1, "alice@example.com");
        System.out.println("OrderProcessor RFC (illustrative) = " + OrderProcessor.illustrativeRFC());

        System.out.println("\n=== GOOD: Low RFC (facade) ===");
        TransactionFacade facade = new TransactionFacade(new AuthService(), new Database(), new EmailService(), new Logger());
        CleanProcessor cp = new CleanProcessor(facade);
        cp.process(o2, "bob@example.com");
        System.out.println("CleanProcessor RFC (illustrative) = " + CleanProcessor.illustrativeRFC());

        System.out.println("\n=== Creative: Run many mixed processors to show behavior ===");
        Random rnd = new Random();
        for (int i=0;i<3;i++){
            Order o = new Order("batch-"+i, rnd.nextDouble()*200);
            if (rnd.nextBoolean()) p.process(o, "user@x");
            else cp.process(o, "user@y");
        }
    }
}
