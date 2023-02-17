// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Candidate {
    string name;
    uint256 votes;
}

contract CandidateManager {
    mapping(string => Candidate) private candidates;
    string[] private candidateKeys;

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory output = new Candidate[](candidateKeys.length);

        for (uint256 i = 0; i < candidateKeys.length; i++) {
            output[i] = candidates[candidateKeys[i]];
        }

        return output;
    }

    function isCandidateExist(string memory _name) public view returns (bool) {
        return keccak256(abi.encodePacked(candidates[_name].name)) != keccak256(abi.encodePacked("")) || candidates[_name].votes != 0;
    }

    function addCandidate(string memory _name) public {
        Candidate memory candidate = candidates[_name];

        require(keccak256(abi.encodePacked(_name)) != keccak256(abi.encodePacked("")), "Name cannot be blank");
        require(keccak256(abi.encodePacked(candidate.name)) == keccak256(abi.encodePacked("")) && candidate.votes == 0, "Name already exist");

        candidateKeys.push(_name);
        candidates[_name].name = _name;
        candidates[_name].votes = 0;
    }

    function removeCandidate(string memory _name) public {
        candidates[_name].name = "";
        candidates[_name].votes = 0;

        for (uint256 i = 0; i < candidateKeys.length; i++) {
            if (keccak256(abi.encodePacked(candidateKeys[i])) == keccak256(abi.encodePacked(_name))) {
                candidateKeys[i] = candidateKeys[candidateKeys.length - 1];
                candidateKeys.pop();
                break;
            }
        }
    }

    function clearCandidates() public {
        for (uint256 i = 0; i < candidateKeys.length; i++) {
            candidates[candidateKeys[i]].name = "";
            candidates[candidateKeys[i]].votes = 0;
        }

        delete candidateKeys;
    }

    function addVote(string memory _name) public {
        require(keccak256(abi.encodePacked(candidates[_name].name)) != keccak256(abi.encodePacked("")), "Invalid Candidate");
        candidates[_name].votes += 1;
    }
}