package shared.bitpacket;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import shared.math.MathUtils;

import java.util.Arrays;
import java.util.function.BinaryOperator;

@RequiredArgsConstructor
public enum PacketType {

    SUM(0, Long::sum),
    PRODUCT(1, MathUtils::product),
    MINIMUM(2, Long::min),
    MAXIMUM(3, Long::max),
    LITERAL(4, (a, b) -> { throw new RuntimeException("Literal packets represent a single number as such they have no reducer"); }),
    GREATER_THAN(5, (a, b) -> a.compareTo(b) > 0 ? 1L : 0L),
    LESS_THAN(6, (a, b) -> a.compareTo(b) < 0 ? 1L : 0L),
    EQUAL_TO(7, (a, b) -> a.compareTo(b) == 0 ? 1L : 0L);

    private final int id;
    @Getter
    private final BinaryOperator<Long> reducer;

    public static PacketType parse(int packetTypeId) {
        return Arrays.stream(values()).filter(type -> type.id == packetTypeId).findFirst().orElseThrow();
    }

}