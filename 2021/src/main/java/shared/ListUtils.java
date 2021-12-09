package shared;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ListUtils {

    public static <T> T first(List<T> list) {
        return list.get(0);
    }

    public static <T> T last(List<T> list) {
        return list.get(list.size() - 1);
    }

    public static List<Integer> parseDigits(final String number) {
        return number.chars().mapToObj(Character::getNumericValue).toList();
    }

    public static List<String> parseList(String toParse) {
        return parseList(toParse, "\\s+");
    }

    public static <T> List<T> parseList(String toParse, Function<String, T> mapper) {
        return parseList(toParse, "\\s+", mapper);
    }

    public static List<String> parseList(String toParse, String regex) {
        return parseList(toParse, regex, s -> s);
    }

    public static <T> List<T> parseList(String toParse, String regex, final Function<String, T> mapper) {
        return Arrays.stream(toParse.split(regex)).map(mapper).toList();
    }

}
