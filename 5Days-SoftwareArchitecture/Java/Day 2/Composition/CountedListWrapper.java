import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

public class CountedListWrapper implements Iterable<String> {

    private final List<String> inner = new ArrayList<>();

    // Explicit implementation — no dependency on parent class internals
    public void add(String item) {
        inner.add(item);
    }

    public int getCount() {
        return inner.size();
    }

    // Optional extra wrapper methods
    public void addAll(Collection<String> items) {
        inner.addAll(items);
    }

    public String get(int index) {
        return inner.get(index);
    }

    @Override
    public Iterator<String> iterator() {
        return inner.iterator();
    }
}
