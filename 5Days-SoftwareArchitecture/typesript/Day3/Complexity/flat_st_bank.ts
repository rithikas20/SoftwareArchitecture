
class BankServiceFlat {
  withdraw(
    balance: number,
    amount: number,
    otpVerified: boolean,
    isHoliday: boolean,
    accountType: string
  ): void {
    //  flat and easy to read
    if (balance <= 0) return;
    if (amount > balance) return;
    if (!otpVerified) return;
    if (isHoliday) return;

    switch (accountType) {
      case "SAVINGS":
        console.log("Withdraw Successful from Savings");
        break;
      case "CURRENT":
        console.log("Withdraw Successful from Current");
        break;
      default:
        console.log("Invalid Account");
    }
  }
}


const svcFlat = new BankServiceFlat();
svcFlat.withdraw(1000, 100, true, false, "CURRENT");
