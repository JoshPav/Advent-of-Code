import solutions.PuzzleDay;
import shared.PuzzleDayFactory;

import static shared.FileUtils.getInput;

public class AdventOfCode {

    private static final short DAY_NUMBER = 5;
    private static final short DAYS_COMPLETE = 0;

    public static void main(String[] args) {
        System.out.println("""
                          ,---.     ,--.                          ,--.              ,---.     ,-----.          ,--.            ,---.   ,--.  ,---.  ,--.\s
                         /  O  \\  ,-|  |,--.  ,--.,---. ,--,--, ,-'  '-.     ,---. /  .-'    '  .--./ ,---.  ,-|  | ,---.     '.-.  \\ /    \\'.-.  \\/   |\s
                        |  .-.  |' .-. | \\  `'  /| .-. :|      \\'-.  .-'    | .-. ||  `-,    |  |    | .-. |' .-. || .-. :     .-' .'|  ()  |.-' .'`|  |\s
                        |  | |  |\\ `-' |  \\    / \\   --.|  ||  |  |  |      ' '-' '|  .-'    '  '--'\\' '-' '\\ `-' |\\   --.    /   '-. \\    /|   '-. |  |\s
                        `--' `ß--' `---'    `--'   `----'`--''--'  `--'       `---' `--'       `-----' `---'  `---'  `----'    '-----'  `--' '-----' `--'\s
                """);

        solveDay(DAY_NUMBER);
    }

    private static void solveDay(final short dayNumber) {
        final PuzzleDay currentDay = PuzzleDayFactory.createPuzzleDay(dayNumber, getInput(dayNumber));

        System.out.println("============== Day " + currentDay.getDayNumber() + " ==============");
        System.out.println("Part one: " + currentDay.solvePartOne());
        System.out.println("Part two: " + currentDay.solvePartTwo());
    }

    private static void solveAllPuzzles() {
        for (short i = 0; i <= DAYS_COMPLETE; i++) {
            solveDay(i);
        }
    }



}
