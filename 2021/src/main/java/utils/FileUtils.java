package utils;

import exceptions.NoSuchPuzzleInputException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.stream.Stream;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class FileUtils {

    public static Stream<String> getInputAsStream(final Number number) {
        try {
            return Files.lines(getFilePath(number));
        } catch (IOException e) {
            throw new NoSuchPuzzleInputException(number);
        }
    }

    private static Path getFilePath(final Number number) {
        return Optional.ofNullable(FileUtils.class.getClassLoader().getResource(getInputFileName(number)))
                .map(url -> Path.of(url.getPath()))
                .orElseThrow(() -> new NoSuchPuzzleInputException(number));
    }

    private static String getInputFileName(final Number number) {
        return "Day" + number + ".txt";
    }

}
