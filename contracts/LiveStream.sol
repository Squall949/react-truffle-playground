pragma solidity ^0.4.18;

contract LiveStream {
    uint budget;
    mapping(bytes32 => address) mySubscription;

    function getBudget() public view returns (uint) {
        return budget;
    }

    function getMySubscription(bytes32 userId) public view returns (address) {
        return mySubscription[userId];
    }

    function subscribe(bytes32 userId) public {
        mySubscription[userId] = msg.sender;
    }
}