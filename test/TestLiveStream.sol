pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/LiveStream.sol";

contract TestLiveStream {
    LiveStream liveStream = LiveStream(DeployedAddresses.LiveStream());

    function testSubscribe() public {
        bytes32 userId = "test";
        address expected = this;
        liveStream.subscribe(userId);
        address mySubscription = liveStream.getMySubscription(userId);
        Assert.equal(mySubscription, expected, "Subscriber of User ID should be recorded.");
    }

}


