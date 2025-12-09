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
var ListManager = /** @class */ (function () {
    function ListManager() {
        this.items = [];
    }
    ListManager.prototype.add = function (item) { this.items.push(item); };
    // Fragile Method: Relies on internal call to 'add'
    ListManager.prototype.addRange = function (items) {
        var _this = this;
        items.forEach(function (i) { return _this.add(i); });
    };
    return ListManager;
}());
var CountedList = /** @class */ (function (_super) {
    __extends(CountedList, _super);
    function CountedList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 0;
        return _this;
    }
    CountedList.prototype.add = function (item) {
        this.count++;
        _super.prototype.add.call(this, item);
    };
    return CountedList;
}(ListManager));
// Usage
var list = new CountedList();
list.addRange(["a", "b"]);
console.log(list.count);
