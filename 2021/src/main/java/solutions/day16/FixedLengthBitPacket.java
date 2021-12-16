package solutions.day16;

import java.util.Collections;
import java.util.List;

public class FixedLengthBitPacket extends BitPacket {

    private final String subPackets;

    public FixedLengthBitPacket(int packetVersion, String subPackets) {
        super(packetVersion, 0);
        this.subPackets = subPackets;
    }

    public List<BitPacket> getPackets() {
        return Collections.emptyList();
    }

}
