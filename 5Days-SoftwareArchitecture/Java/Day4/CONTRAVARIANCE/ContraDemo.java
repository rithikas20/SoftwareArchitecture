import java.util.*;
import java.util.function.Consumer;

class Account { 
    String id; 
    Account(String id){this.id=id;} 
    void show(){ System.out.println("Account " + id); } 
    }
class SavingsAccount extends Account {
     SavingsAccount(String id){ super(id);} 
     void applyInterest(){ } 
     }

public class ContraDemo{
    public static void main(String[] args) {
        List<Account> accounts = new ArrayList<>();
        List<? super SavingsAccount> contr = accounts; // can hold SavingsAccount or supertypes

        // We can add SavingsAccount (safe)
        contr.add(new SavingsAccount("S1"));

        // But reading gives Object (need cast)
        Object o = contr.get(0);
        System.out.println("CONTRAVARIANCE: Added SavingsAccount into List<? super SavingsAccount>; reading yields Object: " + o.getClass().getSimpleName());

        // Function-style contravariance using Consumer
        Consumer<Account> accountHandler = a -> a.show();
        Consumer<? super SavingsAccount> handler = accountHandler; 
        handler.accept(new SavingsAccount("S2")); 
    }
}
