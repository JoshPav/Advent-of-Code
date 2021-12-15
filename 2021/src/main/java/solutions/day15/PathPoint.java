package solutions.day15;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor
public class PathPoint {


    private final int row;
    private final int col;
    private final int risk;

    private int totalRisk = Integer.MAX_VALUE;
    @Setter
    private boolean visited = false;

    public void checkNeighbour(final PathPoint neighbour) {
        var dist = neighbour.getTotalRisk() + risk;
        if (dist < totalRisk) {
            totalRisk = dist;
        }
    }


    public String getTotalRiskStr() {
        return totalRisk == Integer.MAX_VALUE ? "∞" : String.valueOf(totalRisk);
    }

    @Override
    public String toString() {
        return String.valueOf(risk);
    }

    public void isStart() {
        this.totalRisk = 0;
    }
}
