package utils;

import exceptions.NoSuchPuzzleInputException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class FileUtils {

    public static List<String> getInput(final Number number) {
        try {
            return Files.lines(getFilePath(number)).collect(Collectors.toList());
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
        return String.format("Day%02d.txt", number.intValue());
    }

}
