interface IList<T> {
    add(item: T): void;
}

// COMPOSITION FIX
class CountedListWrapper implements IList<string> {
    private inner: string[] = [];

    // Robust: No inheritance dependency
    add(item: string): void {
        this.inner.push(item);
        console.log(`Item added: ${item}, Current Count = ${this.inner.length}`);
    }
}

// Usage
const list = new CountedListWrapper();
list.add("test");
list.add("Rithika");
list.add("Bank System");
