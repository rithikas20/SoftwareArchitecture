class Logic {
    checkNested(x: number): void {
        if (x > 0) {
            if (x < 100) {
                if (x % 2 === 0) {
                    console.log("Even Positive Small");
                }
            }
        }
    }
}

const logic = new Logic();
logic.checkNested(10);
