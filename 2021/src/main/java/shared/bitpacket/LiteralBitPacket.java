package shared.bitpacket;

import java.util.Collections;
import java.util.List;

public class LiteralBitPacket extends BitPacket {

    private final long literalValue;

    public LiteralBitPacket(int packetVersion, long literalValue) {
        super(packetVersion, PacketType.LITERAL);
        this.literalValue = literalValue;
    }

    @Override
    public long getValue() {
        return literalValue;
    }

    @Override
    List<BitPacket> getSubPackets() {
        return Collections.emptyList();
    }

}
