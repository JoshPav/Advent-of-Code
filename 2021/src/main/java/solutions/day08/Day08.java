package solutions.day08;

import solutions.BaseDay;
import utils.ListUtils;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

import static java.util.function.Predicate.not;
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

        int total = 0;

        for (String line : getInputAsList()) {
            final String[] split = line.split("\\|");

            final List<String> digits = parseList(split[0]);

            // Determine 1
            final String one = getNumberForPredicate(digits, getStringOfLength(2));

            // Determine 4
            final String four = getNumberForPredicate(digits, getStringOfLength(4));

            // Determine 7
            final String seven = getNumberForPredicate(digits, getStringOfLength(3));

            // Determine 8
            final String eight = getNumberForPredicate(digits, getStringOfLength(7));

            // Using the unique numbers we can determine the 6-digit numbers 0, 6 and 9

            // Nine has all parts of four inside
            final String nine = getNumberForPredicate(digits, getStringOfLength(6).and(containsAllChars(four)));

            // Zero has seven inside and is not nine
            final String zero = getNumberForPredicate(digits, getStringOfLength(6).and(containsAllChars(seven).and(not(nine::equals))));

            // Six is the remaining 6-digit number
            final String six = getNumberForPredicate(digits, getStringOfLength(6).and(not(zero::equals)).and(not(nine::equals)));

            // Next, lets determine the 5-digit numbers 2, 3 & 5

            // Three has both parts of one inside
            final String three = getNumberForPredicate(digits, getStringOfLength(5).and(containsAllChars(one)));

            // The letter that nine is missing will not be in five but will be in two
            final String missingLetters = String.valueOf(lettersMissing(nine, eight).get(0));
            final String two = getNumberForPredicate(digits, getStringOfLength(5).and(containsAllChars(missingLetters)));

            // Five is the remaining 5-digit number
            final String five = getNumberForPredicate(digits, getStringOfLength(5).and(not(three::equals)).and(not(two::equals)));

            final Map<String, String> digitMap = Map.of(
                    zero, "0",
                    one, "1",
                    two, "2",
                    three, "3",
                    four, "4",
                    five, "5",
                    six, "6",
                    seven, "7",
                    eight, "8",
                    nine, "9"
            );

            final List<String> outputDigits = parseList(split[1]);

            StringBuilder output = new StringBuilder();

            for (String outputDigit: outputDigits) {
                output.append(digitMap.get(
                        digitMap.keySet().stream()
                                .filter(getStringOfLength(outputDigit.length()).and(containsAllChars(outputDigit)))
                                .findFirst()
                                .orElseThrow()
                ));
            }

            total += Integer.parseInt(output.toString());

        }

        return String.valueOf(total);
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
