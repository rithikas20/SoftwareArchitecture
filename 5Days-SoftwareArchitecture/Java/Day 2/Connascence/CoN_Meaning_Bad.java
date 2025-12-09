class AccountServiceBad {
    // return codes:
    // -1 = insufficient funds, 0 = success, 1 = error
    int withdraw(double amount) {
        return -1;
    }
}

class ClientMeaningBad {
    private AccountServiceBad service = new AccountServiceBad();

    void attempt() {
        int code = service.withdraw(500);
        if (code == -1) {
            System.out.println("Insufficient funds (magic -1)");
        }
    }
}

public class CoN_Meaning_Bad {
    public static void main(String[] args) {
        new ClientMeaningBad().attempt();
    }
}
