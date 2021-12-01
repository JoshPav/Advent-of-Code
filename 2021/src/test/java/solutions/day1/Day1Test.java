package solutions.day1;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;

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

}
