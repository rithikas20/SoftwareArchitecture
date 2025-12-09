// Deep inheritance (POOR)
class Widget {
    protected enabled: boolean = true;
    render() { console.log(`Widget render (enabled=${this.enabled})`); }
}

class Button extends Widget {
    render() { console.log(`Button render (enabled=${this.enabled})`); }
}

class ActionButton extends Button {
    render() { console.log(`ActionButton render (enabled=${this.enabled})`); }
    act() { console.log("ActionButton.act()"); }
}

class SaveButton extends ActionButton {
    render() {
        if (!this.enabled) console.log("SaveButton disabled");
        else console.log("SaveButton render (saving enabled)");
    }
}

// Composition-based (GOOD)
interface IClickable { click(): void; }

class Renderer {
    render(what: string, enabled: boolean) {
        if (!enabled) console.log(`${what} render: Disabled`);
        else console.log(`${what} render: OK`);
    }
}

class PaymentHandler {
    handlePayment(amount: number) { console.log(`Handling payment: ${amount}`); }
}

class ComposeButton implements IClickable {
    private enabled = true;
    constructor(private renderer: Renderer, private paymentHandler: PaymentHandler) {}
    click(): void {
        if (!this.enabled) { console.log("ComposeButton: Disabled"); return; }
        this.renderer.render("ComposeButton", this.enabled);
        this.paymentHandler.handlePayment(99.99);
    }
    setEnabled(e: boolean) { this.enabled = e; }
}

// Demo
console.log("=== DEEP INHERITANCE (POOR) ===");
const save = new SaveButton();
console.log("Initial call:");
save.render();

// Simulate changing base-class state (fragile effect).
// In JS/TS we can mutate the inherited property directly on the instance.
(save as any).enabled = false;

console.log("After changing base 'enabled' to false (simulated base change):");
save.render();

console.log("\n=== COMPOSITION (GOOD) ===");
const renderer = new Renderer();
const payment = new PaymentHandler();
const cb = new ComposeButton(renderer, payment);
console.log("ComposeButton click (enabled true):");
cb.click();
cb.setEnabled(false);
console.log("ComposeButton click (enabled false):");
cb.click();
