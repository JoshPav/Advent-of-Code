package utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import solutions.PuzzleDay;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class PuzzleDayFactory {

    public static PuzzleDay createPuzzleDay(final short dayNumber, final List<String> input) {
        try {
            return (PuzzleDay) getClassForDay(dayNumber)
                    .getDeclaredConstructor(List.class)
                    .newInstance(input);
        } catch (Exception e) {
            throw new RuntimeException("Could not instantiate class for Day: " + dayNumber);
        }
    }

    private static Class<?> getClassForDay(final short dayNumber) {
        try {
            final String day = String.format("Day%02d", dayNumber);
            return Class.forName(String.format("solutions.%s.%s", day.toLowerCase(), day));
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Could find class for Day: " + dayNumber);
        }
    }

}
