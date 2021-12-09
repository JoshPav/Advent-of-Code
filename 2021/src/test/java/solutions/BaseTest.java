package solutions;

import shared.PuzzleDayFactory;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public abstract class BaseTest {

    private static final Pattern DAY_NUMBER_REGEX = Pattern.compile("([0-9]+)");

    protected PuzzleDay getDayInstance(final List<String> input) {
        return PuzzleDayFactory.createPuzzleDay(getDayNumber(), input);
    }

    protected short getDayNumber() {
        return Short.parseShort(getFirstMatch(DAY_NUMBER_REGEX, getClass().getSimpleName()));
    }

    private String getFirstMatch(final Pattern pattern, final String toMatch) {
        Matcher m = pattern.matcher(toMatch);
        if (m.find())
            return m.group(1);
        throw new RuntimeException("Could not find match for string: " + toMatch);
    }

}
