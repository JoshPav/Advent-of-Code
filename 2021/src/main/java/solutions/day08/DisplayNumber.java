package solutions.day08;

import java.util.List;
import java.util.stream.Collectors;

public class DisplayNumber {

    private final List<Character> activeWires;

    public DisplayNumber(String activeWires) {
        this.activeWires = activeWires.chars().mapToObj(i -> (char) i).collect(Collectors.toList());
    }

    public boolean isMatch(final String activeWires) {
        return activeWires.chars().allMatch(i -> this.activeWires.contains((char) i));
    }

}
