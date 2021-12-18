package shared.bitpacket;

import com.google.common.collect.Lists;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import java.util.List;

@Getter
@RequiredArgsConstructor
public abstract class BitPacket {

    private final int packetVersion;
    private final PacketType packetType;

    public abstract long getValue();

    abstract List<BitPacket> getSubPackets();

    public List<BitPacket> getAllPackets() {
        return Lists.asList(this, getSubPackets().stream().flatMap(packet -> packet.getAllPackets().stream()).toArray(BitPacket[]::new));
    }

}
