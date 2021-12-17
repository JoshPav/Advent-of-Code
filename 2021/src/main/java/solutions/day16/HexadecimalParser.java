package solutions.day16;

import com.google.common.base.Strings;

public class HexadecimalParser {

    public static String toBinaryString(final String hexadecimal, final int binaryLength) {
        return hexadecimal.chars()
                .mapToObj(num -> toBinary((char) num, binaryLength))
                .reduce(String::concat)
                .orElseThrow();
    }

    public static int toInt(final char hexChar) {
        return Character.digit(hexChar, 16);
    }

    public static String toBinary(final char hexChar) {
        return Integer.toBinaryString(toInt(hexChar));
    }

    public static String toBinary(final char hexChar, final int length) {
        return Strings.padStart(toBinary(hexChar), length, '0');
    }

}
