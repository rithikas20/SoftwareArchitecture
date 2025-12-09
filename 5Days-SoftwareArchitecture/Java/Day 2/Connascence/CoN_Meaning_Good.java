enum TxStatus { SUCCESS, INSUFFICIENT_FUNDS, ERROR }

class AccountServiceGood {
    TxStatus withdraw(double amount) {
        return TxStatus.INSUFFICIENT_FUNDS;
    }
}

class ClientMeaningGood {
    private AccountServiceGood service = new AccountServiceGood();

    void attempt() {
        TxStatus status = service.withdraw(500);
        if (status == TxStatus.INSUFFICIENT_FUNDS) {
            System.out.println("Insufficient funds (explicit enum)");
        }
    }
}

public class CoN_Meaning_Good {
    public static void main(String[] args) {
        new ClientMeaningGood().attempt();
    }
}
