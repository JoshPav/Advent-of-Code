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
                allPaths.addAll(c.getAllPathsToEndRec(pathCopy));
            }
        }

        return allPaths;
    }


    public List<List<String>> getAllPathsToEnd2() {

        final List<List<String>> paths = new ArrayList<>();
        for (Cave c : connectedTo) {
            final List<String> path = new ArrayList<>();
            path.add(this.name);
            path.add(c.name);
            paths.addAll(c.getAllPathsToEndRec2(path));
        }

        return paths;

    }

    private List<List<String>> getAllPathsToEndRec2(List<String> path) {

        List<List<String>> allPaths = new ArrayList<>();

        for (Cave c : connectedTo) {
            if (!this.isEnd() && !c.isStart() &&
                    (!c.isSmall()
                            || (c.isSmall() && !path.contains(c.name))
                            || (c.isSmall() && !hasSmallCaveTwice(path)))) {
                final List<String> pathCopy = new ArrayList<>(path);
                pathCopy.add(c.name);
                allPaths.add(pathCopy);

                var x = c.getAllPathsToEndRec2(pathCopy);
                allPaths.addAll(x);
            }
        }

        return allPaths;
    }

    private long count(List<String> list, String find) {
        return list.stream().filter(find::equals).count();
    }

    private boolean hasSmallCaveTwice(List<String> list) {
        return list.stream().filter(str -> str.equals(str.toLowerCase())).collect(Collectors.groupingBy(a -> a))
                .values().stream().map(List::size)
                .anyMatch(size -> size > 1);
    }
}
