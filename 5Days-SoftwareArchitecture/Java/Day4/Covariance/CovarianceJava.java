import java.util.*;

class Account { 
    String id; 
    double bal; 
Account(String id,double b){id=id;bal=b;} 

void show(){ System.out.println("Account"); } 
}
class SavingsAccount extends Account { SavingsAccount(String id,double b){ super(id,b);} void applyInterest(){ /*...*/ } }

public class CovarianceJava {
    public static void main(String[] args) {
        List<SavingsAccount> sav = new ArrayList<>();
        sav.add(new SavingsAccount("S1",1000));

        // Covariant read-only view
        List<? extends Account> cov = sav;

        // Reading is allowed:
        Account a = cov.get(0);
        System.out.println("Read allowed: " + a.getClass().getSimpleName());

        // Writing is NOT allowed (compile-time)
        // cov.add(new SavingsAccount("S2",2000)); // compiler error

        System.out.println("COVARIANCE: List<? extends Account> is assignable from List<SavingsAccount> but is read-only.");
    }
}
