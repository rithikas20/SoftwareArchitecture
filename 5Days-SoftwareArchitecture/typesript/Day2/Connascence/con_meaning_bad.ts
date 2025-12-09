class AccountServiceBad {
    withdraw(amount: number): number {   // -1,0,1 magic numbers
        return -1;
    }
}

class ClientMeaningBad {
    private svc = new AccountServiceBad();

    attempt() {
        const result = this.svc.withdraw(500);
        if (result === -1) console.log("Insufficient funds (magic -1)");
    }
}

new ClientMeaningBad().attempt();
