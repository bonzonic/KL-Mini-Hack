// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ZKTree.sol";
import "./Verifier.sol";
import "./CandidateManager.sol";

contract DefaultVerifier is IVerifier {

    Verifier private verifier;

    constructor() {
        verifier = new Verifier();
    }

    function verifyProof(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) external view returns (bool r) {
        return verifier.verifyProof(a, b, c, input);
    }
}

contract ParticipantManager is ZKTree {

    mapping(uint256 => bool) uniqueHashes;
    CandidateManager candidateManager;
    
    constructor(CandidateManager _candidateManager, IHasher _hasher) ZKTree(20, _hasher, new DefaultVerifier()) {
        candidateManager = _candidateManager;
    }

    function registerCommitment(uint256 _uniqueHash, uint256 _commitment) external {
        require(!uniqueHashes[_uniqueHash], "Hash has already been used");

        _commit(bytes32(_commitment));
        uniqueHashes[_uniqueHash] = true;
    }

    function vote(string memory _candidate, uint256 _nullifier, uint256 _root, uint[2] memory _proof_a, uint[2][2] memory _proof_b, uint[2] memory _proof_c) external {
        require(candidateManager.isCandidateExist(_candidate), "Candidate does not exist");

        _nullify(bytes32(_nullifier), bytes32(_root), _proof_a, _proof_b, _proof_c);
        candidateManager.addVote(_candidate);
    }
}