package solutions.day08;

import shared.math.geometry.Line;
import solutions.BaseDay;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

import static java.util.function.Predicate.not;
import static java.util.stream.Collectors.groupingBy;

public class Day08 extends BaseDay {

    public Day08(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        var uniqueValues = getInputAsStream()
                .map(line -> line.split("\\|")[1])
                .flatMap(output -> Arrays.stream(output.split("\\s+")))
                .collect(groupingBy(String::length));

        return String.valueOf(uniqueValues.get(2).size() + uniqueValues.get(3).size() + uniqueValues.get(4).size() + uniqueValues.get(7).size());
    }

    @Override
    public String solvePartTwo() {

        int total = 0;

        for (String line : getInputAsList()) {
            final String[] split = line.split("\\|");

            final List<String> digits = Arrays.stream(split[0].split("\\s+")).toList();

            // Determine 1
            final String one = getNumberForPredicate(digits, getStringOfLength(2));

            // Determine 4
            final String four = getNumberForPredicate(digits, getStringOfLength(4));

            // Determine 7
            final String seven = getNumberForPredicate(digits, getStringOfLength(3));

            // Determine 8
            final String eight = getNumberForPredicate(digits, getStringOfLength(7));

            // Determine numbers with 6 digits - 0, 6, 9

            // Nine has all parts of four inside
            final String nine = getNumberForPredicate(digits, getStringOfLength(6).and(containsAllChars(four)));

            // Zero has seven inside and is not nine
            final String zero = getNumberForPredicate(digits, getStringOfLength(6).and(containsAllChars(seven).and(str -> !str.equals(nine))));

            // Six is the remaining 6 digit number
            final String six = getNumberForPredicate(digits, getStringOfLength(6).and(str -> !str.equals(zero)).and(str -> !str.equals(nine)));

            // Determine numbers with 5 digits - 2, 3, 5,

            // Three has both parts of one inside
            final String three = getNumberForPredicate(digits, getStringOfLength(5).and(containsAllChars(one)));

            // The letter that nine is missing will not be in five but will be in two
            final String missingLetters = String.valueOf(lettersMissing(nine, eight).get(0));
            final String two = getNumberForPredicate(digits, getStringOfLength(5).and(containsAllChars(missingLetters)));

            // Five is the remaining 5 digit number
            final String five = getNumberForPredicate(digits, getStringOfLength(5).and(str -> !str.equals(three)).and(str -> !str.equals(two)));


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

            final List<String> outputDigits = Arrays.stream(split[1].trim().split("\\s+")).toList();

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
