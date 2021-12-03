package solutions.day03;

import solutions.BaseDay;

import java.util.List;

public class Day03 extends BaseDay {

    public Day03(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        final List<String> input = getInputAsList();

        final int[] ints = new int[input.get(0).length()];

        for (String s : input) {
            char[] chars = s.toCharArray();
            for (int i = 0; i < chars.length; i++) {
                if (chars[i] == '1')
                    ints[i]++;
            }
        }

        StringBuilder gammaRateBytes = new StringBuilder();

        final int listSize = input.size();

        for (int i : ints) {
            gammaRateBytes.append(i > listSize / 2 ? "1" : "0");
        }

        final int gammaRate = Integer.parseInt(gammaRateBytes.toString(), 2);

        int mask = (1 << ints.length) - 1;
        final int epsilonRate = gammaRate ^ mask;


        return String.valueOf(gammaRate * epsilonRate);
    }

    @Override
    public String solvePartTwo() {
        return null;
    }
}
