// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface EmitChallenge {
    function attempt() external;
}

contract Winner {
    EmitChallenge public challenge;

    constructor(address _challengeAddress) {
        challenge = EmitChallenge(_challengeAddress);
    }

    function win() external {
        challenge.attempt();
    }
}
