package shared;

import java.util.Iterator;
import java.util.List;
import java.util.Spliterator;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public record TwoDimensionalArray<T>(List<List<T>> data) implements Iterable<T> {

    private List<T> getAllData() {
        return data.stream().flatMap(List::stream).collect(Collectors.toList());
    }

    public List<T> getRow(final int index) {
        return data.get(index);
    }

    public List<T> getColumn(final int index) {
        return data.stream().map(row -> row.get(index)).collect(Collectors.toList());
    }

    @Override
    public Iterator<T> iterator() {
        return getAllData().iterator();
    }

    @Override
    public void forEach(Consumer<? super T> action) {
        getAllData().forEach(action);
    }

    @Override
    public Spliterator<T> spliterator() {
        return getAllData().spliterator();
    }
}
