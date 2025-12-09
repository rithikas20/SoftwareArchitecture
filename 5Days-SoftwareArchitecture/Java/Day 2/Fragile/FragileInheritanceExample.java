import java.util.Arrays;
import java.util.List;

class ListManager {

    // FRAGILITY SOURCE:
    // Calls the virtual method add() inside a loop.
    // If we later change this implementation (e.g., optimize with addAllInternal),
    // subclasses depending on the old behavior will break.
    public void addRange(List<String> items) {
        for (String item : items) {
            add(item); // virtual call
        }
    }

    public void add(String item) {
        // base add logic
        // (simulated empty for demo)
    }
}

class CountedList extends ListManager {

    public int count = 0;

    // We rely on the base implementation calling add() once per item
    @Override
    public void add(String item) {
        count++;                  // Counting how many items were added
        super.add(item);          // Still call base logic
    }
}

public class FragileInheritanceExample {
    public static void main(String[] args) {
        CountedList list = new CountedList();
        list.addRange(Arrays.asList("a", "b"));

        System.out.println("Count = " + list.count);
    }
}
