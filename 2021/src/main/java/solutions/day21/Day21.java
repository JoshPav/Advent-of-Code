package solutions.day21;

import solutions.BaseDay;

import java.util.List;

import static java.lang.Math.max;
import static java.lang.Math.min;

public class Day21 extends BaseDay {

    public Day21(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        DeterministicDice dice = new DeterministicDice();

        DiracDicePlayer player1 = new DiracDicePlayer(getStartPosition(getInputAsList().get(0)));
        DiracDicePlayer player2 = new DiracDicePlayer(getStartPosition(getInputAsList().get(1)));

        DiracDicePlayer currentPlayer = player1;

        while (!player1.hasWon() && !player2.hasWon()) {
            currentPlayer.playTurn(dice);
            currentPlayer = currentPlayer == player1 ? player2 : player1;
        }

        DiracDicePlayer loser = player1.compareTo(player2) < 0 ? player1 : player2;

        return String.valueOf(dice.getTimesRolled() * loser.getScore());
    }

    private int getStartPosition(String inputLine) {
        return Integer.parseInt(inputLine.split(":")[1].trim());
    }

    @Override
    public String solvePartTwo() {
        return null;
    }
}
