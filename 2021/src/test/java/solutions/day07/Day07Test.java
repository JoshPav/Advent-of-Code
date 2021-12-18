package solutions.day07;

import org.junit.jupiter.api.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static shared.FileUtils.getInput;

public class Day07Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("37", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("341534", getDayInstance(getInput(7)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("168", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("93397632", getDayInstance(getInput(7)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of(
            "16,1,2,0,4,2,7,1,2,14"
        );
    }

}