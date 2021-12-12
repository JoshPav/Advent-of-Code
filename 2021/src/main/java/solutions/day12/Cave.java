package solutions.day12;

import lombok.Value;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Value
public class Cave {

    String name;
    List<Cave> connectedTo = new ArrayList<>();

    public void addConnectedTo(final Cave c) {
        this.connectedTo.add(c);
    }

    public boolean isSmall() {
        return name.toLowerCase().equals(name);
    }

    public boolean isStart() {
        return name.equals("start");
    }

    public boolean isEnd() {
        return name.equals("end");
    }

    @Override
    public String toString() {
        return Stream.of(name, connectedTo.stream().map(Cave::getName).collect(Collectors.joining(", ")))
                .filter(str -> !str.isEmpty())
                .collect(Collectors.joining(" --- "));
    }

    public List<List<String>> getAllPathsToEnd() {

        final List<List<String>> paths = new ArrayList<>();
        for (Cave c : connectedTo) {
            final List<String> path = new ArrayList<>();
            path.add(this.name);
            path.add(c.name);
            paths.addAll(c.getAllPathsToEndRec(path));
        }

        return paths;

    }

    private List<List<String>> getAllPathsToEndRec(List<String> path) {

        List<List<String>> allPaths = new ArrayList<>();

        for (Cave c : connectedTo) {
            if (!this.isEnd() && !c.isStart() && (!c.isSmall() || (c.isSmall() && !path.contains(c.name)))) {
                final List<String> pathCopy = new ArrayList<>(path);
                pathCopy.add(c.name);
                allPaths.add(pathCopy);

                var x = c.getAllPathsToEndRec(pathCopy);
                allPaths.addAll(x);
            }
        }

        return allPaths;
    }
}
