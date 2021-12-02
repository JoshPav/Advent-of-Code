package solutions.day2;


public class SubmarinePosition {

    int depth = 0;
    int horizontalPosition = 0;
    int aim = 0;

    public int computeProduct() {
        return depth * horizontalPosition;
    }
}
