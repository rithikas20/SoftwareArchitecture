import java.lang.reflect.Field;

// Deep inheritance (POOR)
class Widget {
    // toggling this field (default) is what can break subclasses unexpectedly
    protected boolean enabled = true;

    public void render() {
        System.out.println("Widget render (enabled=" + enabled + ")");
    }
}

class Button extends Widget {
    @Override
    public void render() {
        System.out.println("Button render (enabled=" + enabled + ")");
    }
}

class ActionButton extends Button {
    @Override
    public void render() {
        System.out.println("ActionButton render (enabled=" + enabled + ")");
    }

    public void act() {
        System.out.println("ActionButton.act()");
    }
}

class SaveButton extends ActionButton {
    @Override
    public void render() {
        // save button behavior depends on inherited 'enabled' state
        if (!enabled) System.out.println("SaveButton disabled");
        else System.out.println("SaveButton render (saving enabled)");
    }
}

// Composition-based (GOOD)
interface Clickable {
    void click();
}

class Renderer {
    void render(String what, boolean enabled) {
        if (!enabled) System.out.println(what + " render: Disabled");
        else System.out.println(what + " render: OK");
    }
}

class PaymentHandler {
    void handlePayment(double amount) {
        System.out.println("Handling payment: " + amount);
    }
}

class ComposeButton implements Clickable {
    private final Renderer renderer;
    private final PaymentHandler paymentHandler;
    private boolean enabled = true;

    ComposeButton(Renderer r, PaymentHandler p) {
        this.renderer = r;
        this.paymentHandler = p;
    }

    @Override
    public void click() {
        if (!enabled) { System.out.println("ComposeButton: Disabled"); return; }
        renderer.render("ComposeButton", enabled);
        paymentHandler.handlePayment(42.0);
    }

    public void setEnabled(boolean e) { this.enabled = e; }
}

public class DitFragileDemo {
    public static void main(String[] args) throws Exception {
        System.out.println("=== DEEP INHERITANCE (POOR) ===");
        SaveButton save = new SaveButton();
        System.out.println("Initial call:");
        save.render();

        // Simulate a change in the base class (like changing default behavior).
        // We simulate the fragile-base change by flipping the inherited field on the instance.
        // This demonstrates how a change/bug in parent-state affects descendant behavior.
        Field f = Widget.class.getDeclaredField("enabled");
        f.setAccessible(true);
        f.setBoolean(save, false); // mutate inherited field for this instance

        System.out.println("After changing base 'enabled' to false (simulated base change):");
        save.render();

        System.out.println("\n=== COMPOSITION (GOOD) ===");
        Renderer r = new Renderer();
        PaymentHandler p = new PaymentHandler();
        ComposeButton cb = new ComposeButton(r, p);
        System.out.println("ComposeButton click (enabled true):");
        cb.click();
        cb.setEnabled(false);
        System.out.println("ComposeButton click (enabled false):");
        cb.click();
    }
}
