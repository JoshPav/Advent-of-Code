package solutions.day16;

import java.util.List;

public class OperatorBitPacket extends BitPacket {

    private final List<BitPacket> subPackets;

    public OperatorBitPacket(int packetVersion, PacketType packetType, List<BitPacket> subPackets) {
        super(packetVersion, packetType);
        this.subPackets = subPackets;
    }

    @Override
    public long getValue() {
        return subPackets.stream().map(BitPacket::getValue).reduce(getPacketType().getReducer()).orElseThrow();
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
