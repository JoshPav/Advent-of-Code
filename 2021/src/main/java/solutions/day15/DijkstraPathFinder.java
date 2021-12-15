package solutions.day15;

import java.util.Collection;
import java.util.PriorityQueue;


public class DijkstraPathFinder {

    public static int getTotalDistance(final DijkstraNode startNode, DijkstraNode goalNode) {

        // Instead of looking at all unvisited, only look at the unvisited ones we have updated.
        Collection<DijkstraNode> unvisitedUpdated = new PriorityQueue<>();

        // Set initial node
        var current = startNode;
        current.setAsStartNode();

        do {
            current.setVisited();

            for (DijkstraNode neighbour : current.getNeighbours()) {
                if (!neighbour.isVisited()) {
                    // Update neighbouring nodes
                    neighbour.compareCurrentNode(current);
                    // Add as an unvisited node
                    unvisitedUpdated.remove(neighbour);
                    unvisitedUpdated.add(neighbour);
                }
            }

            // Remove current node
            unvisitedUpdated.remove(current);

            if (unvisitedUpdated.isEmpty()) {
                break;
            }

            // Update next node
            current = unvisitedUpdated.iterator().next();
        } while (!goalNode.isVisited());

        return goalNode.getTentativeDistance();
    }

}
