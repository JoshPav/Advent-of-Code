package shared.bitpacket;

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

    List<BitPacket> getSubPackets() {
        return subPackets;
    }

}
