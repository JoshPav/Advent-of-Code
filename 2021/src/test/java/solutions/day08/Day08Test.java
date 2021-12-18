package solutions.day08;

import org.junit.jupiter.api.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static shared.FileUtils.getInput;

public class Day08Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("26", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("272", getDayInstance(getInput(8)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("61229", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("1007675", getDayInstance(getInput(8)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of(
                "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
                "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
                "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
                "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
                "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
                "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
                "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
                "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
                "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
                "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce"
        );
    }

}