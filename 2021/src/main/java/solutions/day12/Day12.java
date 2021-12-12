package solutions.day12;

import solutions.BaseDay;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Day12 extends BaseDay {

    public Day12(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        Map<String, Cave> caves = new HashMap<>();

        for (String line : getInputAsList()) {
            String[] split = line.split("-");
            caves.computeIfAbsent(split[0], Cave::new).addConnectedTo(caves.computeIfAbsent(split[1], Cave::new));
            caves.get(split[1]).addConnectedTo(caves.get(split[0]));
        }

        List<List<String>> pathsThroughCave = caves.get("start").getAllPathsToEnd();
        List<String> paths = pathsThroughCave.stream()
                .filter(path -> path.contains("end"))
                .map(path -> String.join(",", path))
                .collect(Collectors.toList());

//        paths.forEach(System.out::println);


        return String.valueOf(paths.size());
    }

    @Override
    public String solvePartTwo() {
        return null;
    }
}
