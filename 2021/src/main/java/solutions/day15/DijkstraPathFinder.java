package solutions.day15;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static shared.ListUtils.first;

public class DijkstraPathFinder {

    public static int getTotalDistance(final List<? extends DijkstraNode> allNodes, DijkstraNode goalNode) {

        // Instead of looking at all unvisited, only look at the unvisited ones we have updated.
        Set<DijkstraNode> unvisitedUpdated = new HashSet<>();

        // Set initial node
        var current = first(allNodes);
        current.setAsStartNode();

        do {
            current.setVisited();

            for (DijkstraNode neighbour : current.getNeighbours()) {
                if (!neighbour.isVisited()) {
                    // Update neighbouring nodes
                    neighbour.compareCurrentNode(current);
                    // Add as an unvisited node
                    unvisitedUpdated.add(neighbour);
                }
            }

            // Remove current node
            unvisitedUpdated.remove(current);

            if (unvisitedUpdated.isEmpty()) {
                break;
            }

            // Update next node
            current = Collections.min(unvisitedUpdated);
        } while (!goalNode.isVisited());

        return goalNode.getTentativeDistance();
    }

}
