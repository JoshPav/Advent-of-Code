package solutions.day16;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum PacketType {
    BIT_LENGTH(0),
    PACKET_LENGTH(1),
    LITERAL(4);

    @Getter
    private final int id;

    public boolean equals(int typeId) {
        return id == typeId;
    }
}