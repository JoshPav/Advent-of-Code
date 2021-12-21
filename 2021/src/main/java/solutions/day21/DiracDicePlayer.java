package solutions.day21;

import lombok.Getter;

class DiracDicePlayer implements Comparable<DiracDicePlayer> {

    private static final int SPACES_ON_BOARD = 10;

    private int position;
    @Getter
    private int score = 0;

    public DiracDicePlayer(int position) {
        this.position = position;
    }

    public void playTurn(DeterministicDice dice) {
        position += dice.roll(3) % SPACES_ON_BOARD;
        if (position > SPACES_ON_BOARD) {
            position = position % SPACES_ON_BOARD;
        }
        score += position;
    }

    public boolean hasWon() {
        return score >= 1000;
    }

    @Override
    public int compareTo(DiracDicePlayer o) {
        return Integer.compare(score, o.score);
    }
}
