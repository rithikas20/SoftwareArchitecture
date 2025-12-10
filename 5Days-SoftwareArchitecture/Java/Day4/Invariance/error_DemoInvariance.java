import java.util.*;

class Account { String id; Account(String id){this.id=id;} }
class SavingsAccount extends Account { SavingsAccount(String id){super(id);} }

public class error_DemoInvariance{
    public static void main(String[] args) {
        List<SavingsAccount> savList = new ArrayList<>();
        savList.add(new SavingsAccount("S1"));

       
        List<Account> acctList = savList;

        System.out.println("INVARIANCE: List<SavingsAccount> is NOT assignable to List<Account> (compile-time).");
    }
}
