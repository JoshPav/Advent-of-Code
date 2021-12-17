package solutions.day16;

import shared.math.MathUtils;

import java.util.List;
import java.util.Objects;
import java.util.function.BinaryOperator;

public class OperatorBitPacket extends BitPacket {

    private final List<BitPacket> subPackets;

    public OperatorBitPacket(int packetVersion, int packetTypeId, List<BitPacket> subPackets) {
        super(packetVersion, packetTypeId);
        this.subPackets = subPackets;
    }

    private BinaryOperator<Long> packetTypeReducer(int packetTypeId) {
        return switch (packetTypeId) {
            case 0 -> Long::sum;
            case 1 -> MathUtils::product;
            case 2 -> Long::min;
            case 3 -> Long::max;
            case 5 -> (a, b) -> a > b ? 1L : 0L;
            case 6 -> (a, b) -> a < b ? 1L : 0L;
            case 7 -> (a, b) -> Objects.equals(a, b) ? 1L : 0L;
            default -> throw new IllegalStateException("Unexpected value: " + packetTypeId);
        };
    }

    @Override
    public long getValue() {
        return subPackets.stream().map(BitPacket::getValue).reduce(packetTypeReducer(getPacketTypeId())).orElseThrow();
    }

    @Override
    public List<BitPacket> getPackets() {
        return subPackets;
    }

    @Override
    public long getVersionSum() {
        return getPacketVersion() + getPackets().stream().map(BitPacket::getVersionSum).reduce(Long::sum).orElseThrow();
    }
}
