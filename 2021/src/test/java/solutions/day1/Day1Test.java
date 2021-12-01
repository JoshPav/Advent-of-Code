package solutions.day1;

import org.junit.Test;

import java.util.List;
import java.util.stream.Stream;

import static org.junit.Assert.assertEquals;
import static utils.FileUtils.getInputAsStream;

public class Day1Test {

    @Test
    public void testPartOne() {

        // Given
        final List<String> input = List.of("199",
                "200",
                "208",
                "210",
                "200",
                "207",
                "240",
                "269",
                "260",
                "263");

        // Then
        assertEquals("7", new Day1(input.stream()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("1696", new Day1(getInputAsStream(1)).solvePartOne());
    }

}
