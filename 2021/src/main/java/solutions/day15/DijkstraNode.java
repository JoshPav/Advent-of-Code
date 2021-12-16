package solutions.day15;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public abstract class DijkstraNode implements Comparable<DijkstraNode> {

    private final int distance;

    private boolean visited = false;
    private int tentativeDistance = Integer.MAX_VALUE;

    public void compareCurrentNode(DijkstraNode current) {
        int combinedDistance = distance + current.tentativeDistance;
        if (combinedDistance < tentativeDistance) {
            this.tentativeDistance = combinedDistance;
        }
    }

    public void setVisited() {
        visited = true;
    }

    public void setAsStartNode() {
        this.tentativeDistance = 0;
    }

    public abstract List<? extends DijkstraNode> getNeighbours();

    @Override
    public int compareTo(DijkstraNode o) {
        return Integer.compare(tentativeDistance, o.tentativeDistance);
    }
}
