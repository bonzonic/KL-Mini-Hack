// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CandidateManager.sol";
import "./ParticipantManager.sol";

contract VotingEvent {
    CandidateManager private candidateManager;
    ParticipantManager private participantManager;
    address private host;

    constructor(address _host) {
        candidateManager = new CandidateManager();
        participantManager = new ParticipantManager();
        host = _host;
    }

    function getCandidateManager() public view returns (CandidateManager) {
        return candidateManager;
    }

    function getParticipantManager() public view returns (ParticipantManager) {
        return participantManager;
    }

    function getHost() public view returns (address) {
        return host;
    }
}