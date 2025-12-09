class Logic {
    checkFlat(x: number): void {
        if (x <= 0) return;
        if (x >= 100) return;
        if (x % 2 !== 0) return;

        console.log("Even Positive Small");
    }
}

const logic = new Logic();
logic.checkFlat(10);
