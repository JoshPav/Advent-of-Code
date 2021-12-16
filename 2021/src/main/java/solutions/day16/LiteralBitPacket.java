package solutions.day16;

import lombok.Getter;

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
}
