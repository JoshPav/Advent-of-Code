package solutions.day03;

import java.util.Arrays;

public class DiagnosticReading {

    private final int[] bits;
    private int totalReadings = 1;

    public DiagnosticReading(String str) {
        bits = new int[str.length()];

        for (int i = 0; i < str.length(); i++) {
            bits[i] = Character.getNumericValue(str.charAt(i));
        }
    }

    private DiagnosticReading(int[] bits, int totalReadings) {
        this.bits = bits;
        this.totalReadings = totalReadings;
    }

    public int bitAt(int index) {
        return bits[index];
    }

    public int bitCount() {
        return bits.length;
    }

    public DiagnosticReading add(DiagnosticReading str) {
        final int[] newBits = new int[bits.length];
        for (int i = 0; i < bits.length; i++) {
            newBits[i] = bits[i] + str.bits[i];
        }
        return new DiagnosticReading(newBits, totalReadings + str.totalReadings);
    }

    public DiagnosticReading getGammaRate() {
        return new DiagnosticReading(
                Arrays.stream(bits).map(bit -> bit >= (totalReadings / 2f) ? 1 : 0).toArray(),
                1
        );
    }

    public DiagnosticReading getEpsilonRate() {
        final DiagnosticReading gammaRate = getGammaRate();
        gammaRate.flipAllBits();
        return gammaRate;
    }

    public int asInt() {
        return Integer.parseInt(toString(), 2);
    }

    private void flipAllBits() {
        for (int i = 0; i < bits.length; i++) {
            bits[i] = bits[i] == 0 ? 1 : 0;
        }
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        for (int bit : bits) {
            builder.append(bit);
        }
        return builder.toString();
    }

}
