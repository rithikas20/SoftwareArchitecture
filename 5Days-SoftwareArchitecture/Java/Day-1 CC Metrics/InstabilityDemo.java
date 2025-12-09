// Coordinator.java
 class Coordinator {
    public void doWork() {
        AuthSystem a = new AuthSystem(); // Ce += 1
        Database b   = new Database();   // Ce += 1
        Emailer c    = new Emailer();    // Ce += 1
    }
}

// Program.java
public class InstabilityDemo {
    public static void main(String[] args) {
        new Coordinator().doWork();
    }
}
