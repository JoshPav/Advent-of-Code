package solutions.day03;

import solutions.BaseDay;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Day03 extends BaseDay {

    public Day03(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        final List<String> input = getInputAsList();

        final String gammaRateBytes = getGammaRate(input);

        final int gammaRate = Integer.parseInt(gammaRateBytes, 2);

        int mask = (1 << gammaRateBytes.length()) - 1;
        final int epsilonRate = gammaRate ^ mask;


        return String.valueOf(gammaRate * epsilonRate);
    }

    private int[] getCountOfBytes(final List<String> input) {
        final int[] ints = new int[input.get(0).length()];

        for (String s : input) {
            char[] chars = s.toCharArray();
            for (int i = 0; i < chars.length; i++) {
                if (chars[i] == '1')
                    ints[i]++;
            }
        }
        return ints;
    }

    private String getGammaRate(final List<String> input) {
        final int[] ints = getCountOfBytes(input);

        StringBuilder gammaRateBytes = new StringBuilder();

        final int listSize = input.size();

        for (int i : ints) {
            gammaRateBytes.append(i >= listSize / 2f ? "1" : "0");
        }

        return gammaRateBytes.toString();
    }

    private int getOxygenGeneratorRating(final List<String> input) {

        List<String> oxygenGeneratorRatings = new ArrayList<>(input);
        int index = 0;
        while (oxygenGeneratorRatings.size() != 1) {
            final String gammaRate = getGammaRate(oxygenGeneratorRatings);

            final char mostCommonDigit = gammaRate.charAt(index);
            int finalIndex = index;
            oxygenGeneratorRatings = oxygenGeneratorRatings.stream()
                    .filter(s -> s.charAt(finalIndex) == mostCommonDigit)
                    .collect(Collectors.toList());
            index++;
        }

        return Integer.parseInt(oxygenGeneratorRatings.get(0), 2);

    }

    private int getCo2ScrubberRating(final List<String> input) {

        List<String> oxygenGeneratorRatings = new ArrayList<>(input);
        int index = 0;
        while (oxygenGeneratorRatings.size() != 1) {
            final String gammaRateBytes = getGammaRate(oxygenGeneratorRatings);

            int mask = (1 << gammaRateBytes.length()) - 1;
            final int gammaRate = Integer.parseInt(gammaRateBytes, 2);

            StringBuilder epsilonRate = new StringBuilder(Integer.toBinaryString(gammaRate ^ mask));

            while (epsilonRate.length() < gammaRateBytes.length()) {
                epsilonRate.insert(0, '0');
            }

            final char leastCommonDigit = epsilonRate.charAt(index);
            int finalIndex = index;
            oxygenGeneratorRatings = oxygenGeneratorRatings.stream()
                    .filter(s -> s.charAt(finalIndex) == leastCommonDigit)
                    .collect(Collectors.toList());
            index++;
        }

        return Integer.parseInt(oxygenGeneratorRatings.get(0), 2);
    }

    @Override
    public String solvePartTwo() {

        final List<String> input = getInputAsList();

        final int oxygenGeneratorRating = getOxygenGeneratorRating(input);
        final int co2 = getCo2ScrubberRating(input);

        return String.valueOf(oxygenGeneratorRating * co2);
    }
}
