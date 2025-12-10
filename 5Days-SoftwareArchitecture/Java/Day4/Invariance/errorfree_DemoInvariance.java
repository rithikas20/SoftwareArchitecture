import java.util.*;

class Account { String id; Account(String id){this.id=id;} }
class SavingsAccount extends Account { SavingsAccount(String id){super(id);} }

public class errorfree_DemoInvariance {
    public static void main(String[] args) {
        List<SavingsAccount> savList = new ArrayList<>();
        savList.add(new SavingsAccount("S1"));

        // Compile-time safety: this line is illegal -> uncomment to see compiler error
        // List<Account> acctList = savList;

        System.out.println("INVARIANCE: List<SavingsAccount> is NOT assignable to List<Account> (compile-time).");
    }
}
