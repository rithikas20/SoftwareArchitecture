var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Deep inheritance (POOR)
var Widget = /** @class */ (function () {
    function Widget() {
        this.enabled = true;
    }
    Widget.prototype.render = function () { console.log("Widget render (enabled=".concat(this.enabled, ")")); };
    return Widget;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () { console.log("Button render (enabled=".concat(this.enabled, ")")); };
    return Button;
}(Widget));
var ActionButton = /** @class */ (function (_super) {
    __extends(ActionButton, _super);
    function ActionButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionButton.prototype.render = function () { console.log("ActionButton render (enabled=".concat(this.enabled, ")")); };
    ActionButton.prototype.act = function () { console.log("ActionButton.act()"); };
    return ActionButton;
}(Button));
var SaveButton = /** @class */ (function (_super) {
    __extends(SaveButton, _super);
    function SaveButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SaveButton.prototype.render = function () {
        if (!this.enabled)
            console.log("SaveButton disabled");
        else
            console.log("SaveButton render (saving enabled)");
    };
    return SaveButton;
}(ActionButton));
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    Renderer.prototype.render = function (what, enabled) {
        if (!enabled)
            console.log("".concat(what, " render: Disabled"));
        else
            console.log("".concat(what, " render: OK"));
    };
    return Renderer;
}());
var PaymentHandler = /** @class */ (function () {
    function PaymentHandler() {
    }
    PaymentHandler.prototype.handlePayment = function (amount) { console.log("Handling payment: ".concat(amount)); };
    return PaymentHandler;
}());
var ComposeButton = /** @class */ (function () {
    function ComposeButton(renderer, paymentHandler) {
        this.renderer = renderer;
        this.paymentHandler = paymentHandler;
        this.enabled = true;
    }
    ComposeButton.prototype.click = function () {
        if (!this.enabled) {
            console.log("ComposeButton: Disabled");
            return;
        }
        this.renderer.render("ComposeButton", this.enabled);
        this.paymentHandler.handlePayment(99.99);
    };
    ComposeButton.prototype.setEnabled = function (e) { this.enabled = e; };
    return ComposeButton;
}());
// Demo
console.log("=== DEEP INHERITANCE (POOR) ===");
var save = new SaveButton();
console.log("Initial call:");
save.render();
// Simulate changing base-class state (fragile effect).
// In JS/TS we can mutate the inherited property directly on the instance.
save.enabled = false;
console.log("After changing base 'enabled' to false (simulated base change):");
save.render();
console.log("\n=== COMPOSITION (GOOD) ===");
var renderer = new Renderer();
var payment = new PaymentHandler();
var cb = new ComposeButton(renderer, payment);
console.log("ComposeButton click (enabled true):");
cb.click();
cb.setEnabled(false);
console.log("ComposeButton click (enabled false):");
cb.click();
