package solutions.day12;

import lombok.Value;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.function.Predicate.not;

@Value
public class Cave {

    String name;
    List<Cave> connectedTo = new ArrayList<>();

    public void addConnectedTo(final Cave c) {
        this.connectedTo.add(c);
    }

    private boolean isSmall() {
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
        return getAllPathsToEnd(List.of(this.name));
    }

    private Stream<Cave> getValidCaves(final List<String> path) {
        return connectedTo.stream().filter(
                not(Cave::isStart)
                        .and(
                                not(Cave::isSmall)
                                .or(((Predicate<Cave>) Cave::isSmall).and(not(haveAlreadyVisitedCave(path))))
                        )
        );
    }

    private List<List<String>> getAllPathsToEnd(List<String> path) {
        if (this.isEnd()) {
            return Collections.emptyList();
        }

        return getValidCaves(path).flatMap(cave -> {
            List<List<String>> allPaths = new ArrayList<>();
            final List<String> pathCopy = cave.addThis(path);
            allPaths.add(pathCopy);
            allPaths.addAll(cave.getAllPathsToEnd(pathCopy));
            return allPaths.stream();
        }).toList();
    }

    private List<String> addThis(final List<String> existingPath) {
        var copy = new ArrayList<>(existingPath);
        copy.add(name);
        return copy;
    }

    private Predicate<Cave> haveAlreadyVisitedCave(final List<String> path) {
        return cave -> path.contains(cave.name);
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
                            || (c.isSmall() && !path.contains(c.name)) || (c.isSmall() && !hasSmallCaveTwice(path)))) {
                final List<String> pathCopy = new ArrayList<>(path);
                pathCopy.add(c.name);
                allPaths.add(pathCopy);

                allPaths.addAll(c.getAllPathsToEndRec2(pathCopy));
            }
        }

        return allPaths;
    }

    private boolean hasSmallCaveTwice(List<String> list) {
        return list.stream().filter(str -> str.equals(str.toLowerCase())).collect(Collectors.groupingBy(a -> a))
                .values().stream().map(List::size)
                .anyMatch(size -> size > 1);
    }
}
