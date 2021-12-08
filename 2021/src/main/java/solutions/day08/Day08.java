package solutions.day08;

import solutions.BaseDay;
import utils.ListUtils;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

import static java.util.function.Predicate.not;
import static solutions.day08.DisplayDigit.*;
import static utils.ListUtils.parseList;

public class Day08 extends BaseDay {

    public Day08(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return String.valueOf(
            getInputAsStream()
                    .map(line -> line.split("\\|")[1].trim())
                    .map(ListUtils::parseList)
                    .flatMap(Collection::stream)
                    .filter(str -> List.of(2, 3, 4, 7).contains(str.length()))
                    .count()
        );
    }

    @Override
    public String solvePartTwo() {
        return getInputAsList().stream()
                .map(inputLine -> inputLine.split("\\s+\\|\\s+"))
                .map(splitLine -> getTotal(computeDigitConnections(splitLine[0]), splitLine[1]))
                .reduce(Integer::sum)
                .map(String::valueOf)
                .orElseThrow();
    }

    private Map<String, DisplayDigit> computeDigitConnections(final String signalPatternLine) {
        final List<String> signalPatterns = parseList(signalPatternLine, this::sortAlphabetical);

        // Determine 1
        final String one = getNumberForPredicate(signalPatterns, getStringOfLength(2));

        // Determine 4
        final String four = getNumberForPredicate(signalPatterns, getStringOfLength(4));

        // Determine 7
        final String seven = getNumberForPredicate(signalPatterns, getStringOfLength(3));

        // Determine 8
        final String eight = getNumberForPredicate(signalPatterns, getStringOfLength(7));

        // Using the unique numbers we can determine the 6-digit numbers 0, 6 and 9

        // Nine has all parts of four inside
        final String nine = getNumberForPredicate(signalPatterns, getStringOfLength(6).and(containsAllChars(four)));

        // Zero has seven inside and is not nine
        final String zero = getNumberForPredicate(signalPatterns, getStringOfLength(6).and(containsAllChars(seven).and(not(nine::equals))));

        // Six is the remaining 6-digit number
        final String six = getNumberForPredicate(signalPatterns, getStringOfLength(6).and(not(zero::equals)).and(not(nine::equals)));

        // Next, lets determine the 5-digit numbers 2, 3 & 5

        // Three has both parts of one inside
        final String three = getNumberForPredicate(signalPatterns, getStringOfLength(5).and(containsAllChars(one)));

        // The letter that nine is missing will not be in five but will be in two
        final String missingLetters = String.valueOf(lettersMissing(nine, eight).get(0));
        final String two = getNumberForPredicate(signalPatterns, getStringOfLength(5).and(containsAllChars(missingLetters)));

        // Five is the remaining 5-digit number
        final String five = getNumberForPredicate(signalPatterns, getStringOfLength(5).and(not(three::equals)).and(not(two::equals)));

        return Map.of(
                zero, ZERO,
                one, ONE,
                two, TWO,
                three, THREE,
                four, FOUR,
                five, FIVE,
                six, SIX,
                seven, SEVEN,
                eight, EIGHT,
                nine, NINE
        );
    }

    private int getTotal(final Map<String, DisplayDigit> digitMap, String entryOutputValues) {
        return parseList(entryOutputValues, this::sortAlphabetical)
                .stream()
                .map(s -> digitMap.get(s).getDigit())
                .reduce((s, s2) -> s + s2)
                .map(Integer::parseInt).orElseThrow();
    }

    private String sortAlphabetical(final String string) {
        char[] chars = string.toCharArray();
        Arrays.sort(chars);
        return new String(chars);
    }

    private List<Character> lettersMissing(final String toLookIn, final String toLookFor) {
        return toLookFor.chars()
                .mapToObj(i -> (char) i)
                .filter(c -> !toLookIn.contains(String.valueOf(c)))
                .toList();
    }

    private String getNumberForPredicate(final List<String> digits, Predicate<String> predicate) {
        return digits.stream().filter(predicate).findFirst().orElseThrow();
    }

    private Predicate<String> containsAllChars(String toCheck) {
        return str -> toCheck.chars().allMatch(i -> str.contains(String.valueOf((char) i)));
    }

    private Predicate<String> getStringOfLength(int length) {
        return str -> str.length() == length;
    }

}
