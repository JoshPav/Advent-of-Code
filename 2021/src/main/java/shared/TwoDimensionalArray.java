package shared;

import lombok.RequiredArgsConstructor;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Spliterator;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static shared.ListUtils.first;

@RequiredArgsConstructor
public class TwoDimensionalArray<E> implements Iterable<E> {

    private final E[][] arr;

    public TwoDimensionalArray(Class<E> clazz, int rowCount, int columnCount) {
        this.arr = cast2d((Object[][]) Array.newInstance(clazz, rowCount, columnCount));
    }

    @SuppressWarnings("unchecked")
    public TwoDimensionalArray(int rowCount, int columnCount, final E initialValue) {
        this((Class<E>) initialValue.getClass(), rowCount, columnCount);
        fill(initialValue);
    }

    @SuppressWarnings("unchecked")
    public TwoDimensionalArray(List<List<E>> data) {
        this((Class<E>) first(first(data)).getClass(), data.size(), first(data).size());
        setAll(data);
    }

    public void fill(final E value) {
        IntStream.range(0, arr.length).forEach(row -> fillRow(row, value));
    }

    public void fillRow(final int row, final E value) {
        Arrays.fill(arr[row], value);
    }

    public int rowCount() {
        return arr.length;
    }

    public int columnCount() {
        return arr.length > 0 ? arr[0].length : 0;
    }

    public void fillColumn(final int column, final E value) {
        IntStream.range(0, arr.length).forEach(row -> set(row, column, value));
    }

    public boolean exists(int row, int col) {
        return exists(arr, row) && exists(arr[row], col);
    }

    private boolean exists(Object[] arr, int index) {
        return index >= 0 && index < arr.length;
    }

    public void set(int row, int column, E value) {
        arr[row][column] = value;
    }

    public void setAll(List<List<E>> data) {
        if (data.size() == rowCount() || data.get(0).size() == columnCount()) {
            for (int i = 0; i < data.size(); i++) {
                var row = data.get(i);
                for (int j = 0; j < row.size(); j++) {
                    set(i, j, row.get(j));
                }
            }
        } else {
            throw new RuntimeException();
        }

    }

    public E get(final int row, final int column) {
        return arr[row][column];
    }

    public List<E> getHorizontalAdjacent(final int row, final int column) {
        return Stream.of(
                maybeGet(row - 1, column),
                maybeGet(row, column + 1),
                maybeGet(row + 1, column),
                maybeGet(row, column - 1)
        ).filter(Optional::isPresent).map(Optional::get).toList();
    }

    public List<E> getDiagonalAdjacent(final int row, final int column) {
        return Stream.of(
                maybeGet(row - 1, column - 1),
                maybeGet(row - 1 , column + 1),
                maybeGet(row + 1, column - 1),
                maybeGet(row + 1, column + 1)
        ).filter(Optional::isPresent).map(Optional::get).toList();
    }

    public List<E> getAllAdjacent(final int row, final int column) {
        return Stream.concat(getHorizontalAdjacent(row, column).stream(), getDiagonalAdjacent(row, column).stream()).toList();
    }

    public Optional<E> maybeGet(final int row, final int column) {
        return exists(row, column) ? Optional.ofNullable(get(row, column)) : Optional.empty();
    }

    public List<E> getAllData() {
        return Arrays.stream(arr).flatMap(Arrays::stream).toList();
    }

    public E[] getRowAsArray(final int row) {
        return arr[row].clone();
    }

    public List<E> getRow(final int row) {
        return List.of(getRowAsArray(row));
    }

    public List<List<E>> rows() {
        return IntStream.range(0, arr.length).mapToObj(this::getRow).toList();
    }

    public E[] getColumnAsArray(final int column) {
        return cast(getColumn(column).toArray());
    }

    public List<E> getColumn(final int column) {
        return Arrays.stream(arr).map(row -> row[column]).toList();
    }

    public List<List<E>> columns() {
        return IntStream.range(0, arr[0].length).mapToObj(this::getColumn).toList();
    }

    @SuppressWarnings("unchecked")
    private E[] cast(Object[] arr) {
        return (E[]) arr;
    }

    @SuppressWarnings("unchecked")
    private E[][] cast2d(Object[][] arr) {
        return (E[][]) arr;
    }

    public Stream<E> stream() {
        return getAllData().stream();
    }

    @Override
    public Iterator<E> iterator() {
        return getAllData().iterator();
    }

    @Override
    public void forEach(Consumer<? super E> action) {
        getAllData().forEach(action);
    }

    @Override
    public Spliterator<E> spliterator() {
        return getAllData().spliterator();
    }

    @Override
    public String toString() {
        return rows().stream()
                .map(row ->
                        String.format("[%s]", row.stream()
                                .map(Object::toString)
                                .collect(Collectors.joining(", ")))
                ).collect(Collectors.joining(", "));
    }

}
