package solutions.day15;

import lombok.Getter;
import lombok.Setter;
import shared.TwoDimensionalArray;

import java.util.Collections;
import java.util.List;
import java.util.function.Supplier;

public class Chiton extends DijkstraNode {

    private final int row;
    private final int col;

    @Setter @Getter
    private Supplier<TwoDimensionalArray<Chiton>> map;

    public Chiton(int row, int col, int distance) {
        super(distance);
        this.row = row;
        this.col = col;
    }

    @Override
    public String toString() {
        return String.valueOf(getDistance());
    }

    @Override
    public List<? extends DijkstraNode> getNeighbours() {
        return map == null ? Collections.emptyList() : map.get().getHorizontalAdjacent(row, col);
    }

}
