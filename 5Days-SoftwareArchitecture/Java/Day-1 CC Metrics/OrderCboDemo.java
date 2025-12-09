import java.util.ArrayList;
import java.util.List;

class Logger {
    void log(String msg) { System.out.println("[Logger] " + msg); }
}

class SqlDatabase {
    void save(String payload) { System.out.println("[SqlDatabase] saved: " + payload); }
}

class LegacyDb {
    void persist(String payload) { System.out.println("[LegacyDb] persisted: " + payload); }
}

class LegacyDbAdapter extends SqlDatabase {
    private final LegacyDb legacy = new LegacyDb();
    @Override
    void save(String payload) { legacy.persist(payload); }
}

class Order {
    final String id;
    final double amount;
    Order(String id, double amount) { this.id = id; this.amount = amount; }
    public String toString() { return id + ":" + amount; }
}

class OrderService {
    void checkout(Order o) {
        Logger logger = new Logger();
        SqlDatabase db = new SqlDatabase();
        logger.log("Processing " + o);
        db.save(o.toString());
        logger.log("Completed " + o);
    }
}

interface ILogger { void log(String msg); }
interface IDatabase { void save(String payload); }

class CleanOrderService {
    private final ILogger logger;
    private final IDatabase db;
    CleanOrderService(ILogger logger, IDatabase db) { this.logger = logger; this.db = db; }
    void checkout(Order o) {
        logger.log("Processing " + o);
        db.save(o.toString());
        logger.log("Completed " + o);
    }
}

class MockLogger implements ILogger { public void log(String msg) { System.out.println("[MockLogger] " + msg); } }
class MockDatabase implements IDatabase { public void save(String payload) { System.out.println("[MockDatabase] saved: " + payload); } }

interface EventListener { void on(Object event); }

class EventBus {
    private final List<EventListener> listeners = new ArrayList<>();
    void subscribe(EventListener l) { listeners.add(l); }
    void publish(Object e) { for (EventListener l : listeners) l.on(e); }
}

class EventOrderService {
    private final EventBus bus;
    EventOrderService(EventBus bus) { this.bus = bus; }
    void checkout(Order o) { bus.publish(o); }
}

class OrderHandler implements EventListener {
    private final ILogger logger;
    private final IDatabase db;
    OrderHandler(ILogger logger, IDatabase db) { this.logger = logger; this.db = db; }
    public void on(Object event) {
        if (!(event instanceof Order)) return;
        Order o = (Order) event;
        logger.log("Event handling " + o);
        db.save(o.toString());
    }
}

public class OrderCboDemo {
    public static void main(String[] args) {
        System.out.println("=== POOR: High CBO (tight coupling) ===");
        OrderService poor = new OrderService();
        poor.checkout(new Order("o-1", 99.9));

        System.out.println("\n=== GOOD: Low CBO (DI via interfaces) ===");
        CleanOrderService clean = new CleanOrderService(new MockLogger(), new MockDatabase());
        clean.checkout(new Order("o-2", 199.9));

        System.out.println("\n=== GOOD: Adapter for legacy DB (still low CBO) ===");
        CleanOrderService adapted = new CleanOrderService(new Logger()::log, new LegacyDbAdapter()::save);
        adapted.checkout(new Order("o-3", 299.9));

        System.out.println("\n=== GOOD: Event-driven decoupling ===");
        EventBus bus = new EventBus();
        OrderHandler handler = new OrderHandler(new Logger()::log, new MockDatabase());
        bus.subscribe(handler);
        EventOrderService evtService = new EventOrderService(bus);
        evtService.checkout(new Order("o-4", 49.9));
    }
}
