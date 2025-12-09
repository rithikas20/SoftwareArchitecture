// COMPOSITION FIX
var CountedListWrapper = /** @class */ (function () {
    function CountedListWrapper() {
        this.inner = [];
    }
    // Robust: No inheritance dependency
    CountedListWrapper.prototype.add = function (item) {
        this.inner.push(item);
        console.log("Item added: ".concat(item, ", Current Count = ").concat(this.inner.length));
    };
    return CountedListWrapper;
}());
// Usage
var list = new CountedListWrapper();
list.add("test");
list.add("Rithika");
list.add("Bank System");
