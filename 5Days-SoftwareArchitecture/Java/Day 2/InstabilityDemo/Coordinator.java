// Coordinator.java
public class Coordinator {
    public void doWork() {
        AuthSystem a = new AuthSystem(); // Ce += 1
        Database b   = new Database();   // Ce += 1
        Emailer c    = new Emailer();    // Ce += 1
        System.out.println("Coordinator working...");
    }
}