pragma solidity ^0.4.18;

contract LiveStream {
    mapping(bytes32 => address) mySubscription;

    function getMySubscription(bytes32 userId) public view returns (address) {
        return mySubscription[userId];
    }

    function subscribe(bytes32 userId) public returns (bytes32) {
        mySubscription[userId] = msg.sender;
        return userId;
    }
}