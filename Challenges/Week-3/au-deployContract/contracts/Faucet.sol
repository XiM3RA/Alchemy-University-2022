//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract Faucet {

    function withdraw(uint _amount) public {
        require(_amount <= 10000000000000000);
        payable(msg.sender).transfer(_amount);
    }

    receive() external payable {}
}
