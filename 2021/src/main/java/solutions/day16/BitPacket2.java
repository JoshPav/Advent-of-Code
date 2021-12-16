package solutions.day16;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class BitPacket2 {

    private final int packetVersion;
    private final int packetType;

    private final Long value;
    private final List<BitPacket2> subPackets;

    public BitPacket2(int packetVersion, int packetType, List<BitPacket2> subPackets) {
        this.packetVersion = packetVersion;
        this.packetType = packetType;
        this.subPackets = subPackets;
        this.value = null;
    }

    public BitPacket2(int packetVersion, int packetType, long value) {
        this.packetVersion = packetVersion;
        this.packetType = packetType;
        this.value = value;
        this.subPackets = null;
    }

}
