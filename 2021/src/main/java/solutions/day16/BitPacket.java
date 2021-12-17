package solutions.day16;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public abstract class BitPacket {

    private final int packetVersion;
    private final int packetTypeId;

    public abstract long getValue();

    public abstract List<BitPacket> getPackets();

    public abstract long getVersionSum();

}
