class ListManager {
    private items: string[] = [];
    add(item: string) { this.items.push(item); }
    // Fragile Method: Relies on internal call to 'add'
    addRange(items: string[]) { items.forEach(i => this.add(i)); }
}
class CountedList extends ListManager {
    count = 0;
    override add(item: string) {
        this.count++;
        super.add(item);
    }
}
// Usage
const list = new CountedList();
list.addRange(["a", "b"]);
console.log(list.count);