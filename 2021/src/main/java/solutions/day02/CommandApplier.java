package solutions.day02;

@FunctionalInterface
public interface CommandApplier {

    void applyCommand(SubmarinePosition position, SubmarineCommand command);

}
