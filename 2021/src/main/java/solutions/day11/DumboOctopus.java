package solutions.day11;

import lombok.Setter;

import java.util.List;

public class DumboOctopus {

    private short energyLevel;
    private boolean hasFlashed;

    @Setter
    private List<DumboOctopus> neighbours;

    public DumboOctopus(short energyLevel) {
        this.energyLevel = energyLevel;
        this.hasFlashed = false;
    }

    public int incrementEnergyLevel() {
        int totalFlashes = 0;
        energyLevel++;
        if (energyLevel > 9 && !hasFlashed) {
            hasFlashed = true;
            totalFlashes += 1;

            for (var neighbour : neighbours) {
                totalFlashes += neighbour.incrementEnergyLevel();
            }

        }
        return totalFlashes;
    }

    public void resetHasFlashed() {
        if (energyLevel > 9) {
            energyLevel = 0;
            hasFlashed = false;
        }
    }

    @Override
    public String toString() {
        return String.valueOf(energyLevel);
    }
}
