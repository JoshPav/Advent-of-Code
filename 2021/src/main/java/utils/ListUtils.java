package utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ListUtils {

    public static <T> T first(List<T> list) {
        return list.get(0);
    }

    public static <T> T last(List<T> list) {
        return list.get(list.size() - 1);
    }

    public static List<String> parseList(String toParse) {
        return parseList(toParse, "\\s+");
    }

    public static List<String> parseList(String toParse, String regex) {
        return Arrays.stream(toParse.split(regex)).toList();
    }

}
