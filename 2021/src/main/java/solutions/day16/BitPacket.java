package solutions.day16;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public abstract class BitPacket {

    private final int packetVersion;
    private final int packetTypeId;

    public abstract long getValue();

}
