package shared;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Spliterator;
import java.util.function.Consumer;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class TwoDimensionalArray<T> implements Iterable<T> {

    private final T[][] arr;

    public TwoDimensionalArray(final Class<T> clazz, int width, int height) {
        this.arr = createArray(clazz, width, height);
    }

    public TwoDimensionalArray(int width, int height, final T initialValue) {
        this((Class<T>) initialValue.getClass(), width, height);
        fill(initialValue);
    }

    public void fill(final T value) {
        IntStream.range(0, arr.length).forEach(row -> fillRow(row, value));
    }

    public void fillRow(final int row, final T value) {
        Arrays.fill(arr[row], value);
    }

    public int rowCount() {
        return arr.length;
    }

    public int columnCount() {
        return arr.length > 0 ? arr[0].length : 0;
    }

    public void fillColumn(final int column, final T value) {
        IntStream.range(0, arr.length).forEach(row -> set(row, column, value));
    }

    public boolean exists(int row, int col) {
        return exists(arr, row) && exists(arr[row], col);
    }

    private boolean exists(Object[] arr, int index) {
        return index > 0 && index < arr.length;
    }

    public void set(int row, int column, T value) {
        arr[row][column] = value;
    }

    public T get(final int row, final int column) {
        return arr[row][column];
    }

    public Optional<T> maybeGet(final int row, final int column) {
        return exists(row, column) ? Optional.ofNullable(get(row, column)) : Optional.empty();
    }

    public List<T> getAllData() {
        return Arrays.stream(arr).flatMap(Arrays::stream).toList();
    }

    public T[] getRow(final int row) {
        return arr[row].clone();
    }

    public List<T> getRowAsList(final int row) {
        return List.of(getRow(row));
    }

    public T[] rows() {
        return toArray(Arrays.stream(arr).map(row -> row.clone()));
    }

    public T[] getColumn(final int column) {
        return toArray(getColumnAsList(column));
    }

    public List<T> getColumnAsList(final int column) {
        return Arrays.stream(arr).map(row -> row[column]).toList();
    }

    public T[] columns() {
        return toArray(IntStream.range(0, arr[0].length).mapToObj(this::getColumn));
    }

    @SuppressWarnings("unchecked")
    private T[][] createArray(Class<T> clazz, int width, int height) {
        T[][] y = (T[][]) new Object[height][];
        for (int i = 0; i < height; i++) {
            y[i] = (T[]) Array.newInstance(clazz, width);
        }
        return y;
    }

    @SuppressWarnings("unchecked")
    private T[] toArray(final Stream<T[]> stream) {
        return (T[]) stream.toArray();
    }

    @SuppressWarnings("unchecked")
    private T[] toArray(final List<T> list) {
        return (T[]) list.toArray();
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
