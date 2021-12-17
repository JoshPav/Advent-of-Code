package solutions.day16;

import lombok.Getter;

import java.util.Collections;
import java.util.List;

public class LiteralBitPacket extends BitPacket {

    @Getter
    private final long literalValue;

    public LiteralBitPacket(int packetVersion, long literalValue) {
        super(packetVersion, 4);
        this.literalValue = literalValue;
    }

    @Override
    public long getValue() {
        return literalValue;
    }

    @Override
    public List<BitPacket> getPackets() {
        return Collections.singletonList(this);
    }

    @Override
    public long getVersionSum() {
        return getPacketVersion();
    }
}
