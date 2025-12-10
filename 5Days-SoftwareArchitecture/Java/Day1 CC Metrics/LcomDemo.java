import java.util.*;

class LcomCalculator {
    static int lcom4(List<MethodAccess> methods) {
        int n = methods.size();
        boolean[][] adj = new boolean[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = i+1; j < n; j++) {
                Set<String> a = methods.get(i).fields;
                Set<String> b = methods.get(j).fields;
                boolean intersect = false;
                for (String f : a) {
                    if (b.contains(f)) { intersect = true; break; }
                }
                adj[i][j] = adj[j][i] = intersect;
            }
        }
        boolean[] seen = new boolean[n];
        int components = 0;
        for (int i = 0; i < n; i++) {
            if (!seen[i]) {
                components++;
                Deque<Integer> stack = new ArrayDeque<>();
                stack.push(i);
                seen[i] = true;
                while (!stack.isEmpty()) {
                    int u = stack.pop();
                    for (int v = 0; v < n; v++) {
                        if (!seen[v] && adj[u][v]) {
                            seen[v] = true;
                            stack.push(v);
                        }
                    }
                }
            }
        }
        return components;
    }

    static class MethodAccess {
        final String name;
        final Set<String> fields;
        MethodAccess(String name, String... fields) {
            this.name = name;
            this.fields = new HashSet<>(Arrays.asList(fields));
        }
    }
}

class PoorUserManager {
    String name = "rithika";
    String email = "rith@gmail";
    String dbConfig = "db";
    String auditLog = "log";
    void printName() { System.out.println(name); }
    void sendWelcomeEmail() { System.out.println("email->" + email); }
    void connect() { System.out.println("db->" + dbConfig); }
    void persistUser() { System.out.println("persisting " + name); }
    void writeAudit() { System.out.println("audit:" + auditLog); }
}

class User {
    String name = "rithika";
    void printName() { System.out.println(name); }
}

class DbConnector {
    String dbConfig = "db";
    void connect() { System.out.println("db->" + dbConfig); }
    void persistUser(String name) { System.out.println("persisting " + name); }
}

class Notifier {
    String email = "rith@gmail";
    void sendWelcomeEmail(String to) { System.out.println("email->" + to); }
}

class Auditor {
    String auditLog = "log";
    void writeAudit(String entry) { System.out.println("audit:" + entry); }
}

public class LcomDemo {
    public static void main(String[] args) {
        List<LcomCalculator.MethodAccess> poorMethods = Arrays.asList(
            new LcomCalculator.MethodAccess("printName", "name"),
            new LcomCalculator.MethodAccess("sendWelcomeEmail", "email"),
            new LcomCalculator.MethodAccess("connect", "dbConfig"),
            new LcomCalculator.MethodAccess("persistUser", "dbConfig","name"),
            new LcomCalculator.MethodAccess("writeAudit", "auditLog")
        );

        int poorLcom = LcomCalculator.lcom4(poorMethods);
        System.out.println("POOR class methods components (LCOM4) = " + poorLcom);

        List<LcomCalculator.MethodAccess> userMethods = Arrays.asList(
            new LcomCalculator.MethodAccess("printName", "name")
        );
        List<LcomCalculator.MethodAccess> dbMethods = Arrays.asList(
            new LcomCalculator.MethodAccess("connect", "dbConfig"),
            new LcomCalculator.MethodAccess("persistUser", "dbConfig","name")
        );
        List<LcomCalculator.MethodAccess> notifierMethods = Arrays.asList(
            new LcomCalculator.MethodAccess("sendWelcomeEmail", "email")
        );
        List<LcomCalculator.MethodAccess> auditorMethods = Arrays.asList(
            new LcomCalculator.MethodAccess("writeAudit", "auditLog")
        );

        System.out.println("GOOD class User LCOM4 = " + LcomCalculator.lcom4(userMethods));
        System.out.println("GOOD class DbConnector LCOM4 = " + LcomCalculator.lcom4(dbMethods));
        System.out.println("GOOD class Notifier LCOM4 = " + LcomCalculator.lcom4(notifierMethods));
        System.out.println("GOOD class Auditor LCOM4 = " + LcomCalculator.lcom4(auditorMethods));

        System.out.println("\nRefactored run:");
        User u = new User(); u.name = "rithika"; u.printName();
        DbConnector db = new DbConnector(); db.dbConfig = "db://x"; db.connect(); db.persistUser("rithika");
        Notifier n = new Notifier(); n.email = "rith@gmail"; n.sendWelcomeEmail("rith@gmail");
        Auditor a = new Auditor(); a.auditLog = "log01"; a.writeAudit("created user rithika");
    }
}
