import solutions.PuzzleDay;

import java.util.stream.Stream;

import static utils.FileUtils.getInputAsStream;

public class AdventOfCode {

    private static final int DAY_NUMBER = 1;
    private static final int DAYS_COMPLETE = 0;

    public static void main(String[] args) {
        System.out.println("""
                          ,---.     ,--.                          ,--.              ,---.     ,-----.          ,--.            ,---.   ,--.  ,---.  ,--.\s
                         /  O  \\  ,-|  |,--.  ,--.,---. ,--,--, ,-'  '-.     ,---. /  .-'    '  .--./ ,---.  ,-|  | ,---.     '.-.  \\ /    \\'.-.  \\/   |\s
                        |  .-.  |' .-. | \\  `'  /| .-. :|      \\'-.  .-'    | .-. ||  `-,    |  |    | .-. |' .-. || .-. :     .-' .'|  ()  |.-' .'`|  |\s
                        |  | |  |\\ `-' |  \\    / \\   --.|  ||  |  |  |      ' '-' '|  .-'    '  '--'\\' '-' '\\ `-' |\\   --.    /   '-. \\    /|   '-. |  |\s
                        `--' `--' `---'    `--'   `----'`--''--'  `--'       `---' `--'       `-----' `---'  `---'  `----'    '-----'  `--' '-----' `--'\s
                """);

        solveDay(DAY_NUMBER);
    }

    private static void solveDay(final Number dayNumber) {
        final PuzzleDay currentDay = instantiateDay(dayNumber);

        System.out.println("============== Day " + currentDay.getDayNumber() + " ==============");
        System.out.println("Part one: " + currentDay.solvePartOne());
        System.out.println("Part two: " + currentDay.solvePartTwo());
    }

    private static void solveAllPuzzles() {
        for (int i = 0; i <= DAYS_COMPLETE; i++) {
            solveDay(i);
        }
    }

    private static PuzzleDay instantiateDay(final Number dayNumber) {
        try {
            return (PuzzleDay) getClassForDay(dayNumber.toString())
                    .getDeclaredConstructor(Stream.class)
                    .newInstance(getInputAsStream(dayNumber));
        } catch (Exception e) {
            throw new RuntimeException("Could not instantiate class for Day: " + dayNumber);
        }
    }

    private static Class<?> getClassForDay(final String dayNumber) {
        try {
            final String day = "Day" + dayNumber;
            return Class.forName(String.format("solutions.%s.%s", day.toLowerCase(), day));
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Could find class for Day: " + dayNumber);
        }
    }

}
