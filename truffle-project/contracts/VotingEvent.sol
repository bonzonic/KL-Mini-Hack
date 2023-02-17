// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CandidateManager.sol";
import "./ParticipantManager.sol";

contract VotingEvent {
    CandidateManager private candidateManager;
    ParticipantManager private participantManager;
    address private host;
    bool private isCurrentlyVoting;

    constructor(address _host, IHasher _hasher) {
        candidateManager = new CandidateManager();
        participantManager = new ParticipantManager(candidateManager, _hasher);
        host = _host;
        isCurrentlyVoting = false;
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

    function getIsCurrentlyVoting() public view returns (bool) {
        return isCurrentlyVoting;
    }

    function setIsCurrentlyVoting(bool _isCurrentlyVoting) public {
        isCurrentlyVoting = _isCurrentlyVoting;
    }
}