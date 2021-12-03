package solutions.day03;

import solutions.BaseDay;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Day03 extends BaseDay {

    public Day03(List<String> input) {
        super(input);
    }

    private List<DiagnosticReading> inputAsDiagnosticReadings() {
        return getInputAsList().stream().map(DiagnosticReading::new).collect(Collectors.toList());
    }

    @Override
    public String solvePartOne() {
        final DiagnosticReading gammaRate = getGammaRateForReadings(inputAsDiagnosticReadings());
        return String.valueOf(gammaRate.asInt() * gammaRate.getEpsilonRate().asInt());
    }

    @Override
    public String solvePartTwo() {
        final List<DiagnosticReading> readings = inputAsDiagnosticReadings();
        return String.valueOf(getOxygenGeneratorRating(readings) * getCo2ScrubberRating(readings));
    }

    private int getOxygenGeneratorRating(final List<DiagnosticReading> readings) {
        return getRatingForBitCriteria(readings, this::getGammaRateForReadings);
    }

    private DiagnosticReading getGammaRateForReadings(final List<DiagnosticReading> readings) {
        return readings.stream().reduce(DiagnosticReading::add).orElseThrow().getGammaRate();
    }

    private int getCo2ScrubberRating(final List<DiagnosticReading> readings) {
        return getRatingForBitCriteria(readings, this::getEpsilonRateForReadings);
    }

    private DiagnosticReading getEpsilonRateForReadings(final List<DiagnosticReading> readings) {
        return getGammaRateForReadings(readings).getEpsilonRate();
    }

    private int getRatingForBitCriteria(final List<DiagnosticReading> readings,
                                        final Function<List<DiagnosticReading>, DiagnosticReading> criteria) {

        List<DiagnosticReading> oxygenGeneratorRatings = new ArrayList<>(readings);

        for (int i = 0; i < oxygenGeneratorRatings.get(0).bitCount() && !oxygenGeneratorRatings.isEmpty(); i++) {
            oxygenGeneratorRatings = filterByIndexWithExpected(oxygenGeneratorRatings, i, criteria.apply(oxygenGeneratorRatings).bitAt(i));
        }

        return oxygenGeneratorRatings.get(0).asInt();
    }

    private List<DiagnosticReading> filterByIndexWithExpected(List<DiagnosticReading> readings, int index, int expectedBit) {
        return readings.stream()
                .filter(rating -> rating.bitAt(index) == expectedBit)
                .collect(Collectors.toList());
    }

}
