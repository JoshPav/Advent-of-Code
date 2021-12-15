package solutions.day15;

import shared.TwoDimensionalArray;

import java.util.Collections;
import java.util.List;
import java.util.function.Supplier;

public class Chiton extends DijkstraNode {

    private final Supplier<List<Chiton>> neighboursGetter;

    public Chiton(int distance, Supplier<List<Chiton>> neighboursGetter) {
        super(distance);
        this.neighboursGetter = neighboursGetter;
    }

    @Override
    public String toString() {
        return String.valueOf(getDistance());
    }

    @Override
    public List<? extends DijkstraNode> getNeighbours() {
        return neighboursGetter == null ? Collections.emptyList() : neighboursGetter.get();
    }

}
