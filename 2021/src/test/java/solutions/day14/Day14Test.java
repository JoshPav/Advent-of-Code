package solutions.day14;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static shared.FileUtils.getInput;

public class Day14Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("1588", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("2947", getDayInstance(getInput(14)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("2188189693529", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("3232426226464", getDayInstance(getInput(14)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of(
                    "NNCB",
                "",
                "CH -> B",
                "HH -> N",
                "CB -> H",
                "NH -> C",
                "HB -> C",
                "HC -> B",
                "HN -> C",
                "NN -> C",
                "BH -> H",
                "NC -> B",
                "NB -> B",
                "BN -> B",
                "BB -> N",
                "BC -> B",
                "CC -> N",
                "CN -> C"
        );
    }

}