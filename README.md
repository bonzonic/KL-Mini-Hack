# ZK Anonymous Voting System

## About This Project
The election is a big event held every few years in many different countries, where the citizens will gather and select the best fitting leader in the form of a vote. A vote is an expression of opinion in the form of selecting an option. For many years, this process is usually carried out by having citizens filling up a piece of paper indicating the person whom they think is the best fitting leader. Throughout these years, there are always rumors and suspicions of vote manipulation from the citizens. Due to the craftiness of the people, the leaders who indeed manipulated the vote would often get away with it. Is there a system that would prevent such issue from occuring? Is it even posssible? 

The answer is yes. It is to use a blockchain. A blockchain is an immutable decentralized database shared to everyone in the network. Due to its immutability and publicly open properties, it makes it nearly impossible for anyone to be able to manipulate the votes. In addition, the blockchain stores every changes being made which makes it very easy to tracked down the person manipulating the votes. With its publicy open nature introduces privacy concerns as well, the problem can be tackled using zero knowledge proof which is a method for verifying a statement without revealing anything beyond what is already known. 

The anonymous voting system in this project uses blockchain to maintain the immutability of the data and uses a zero knowlege merkle tree to maintain the anonymity of the votes. A step by step process of this voting system is listed down below:

1. A secret and a nullifier will be generated for a user
2. Using the secret and nullifier, a commitment hash and a nullifier hash is generated
3. When a user wants to participate in a voting event, the commitment hash is submitted to the blockchain
4. After a user voted, the nullifer hash would be submitted to the blockchain as well
5. With the commitment and nullifier hash in place, it prevents the user from being able to vote multiple times

**Note:** The commitment and nullifier hash that are submitted into the blockchain does not have a link with each other but rather it is proven using a zero knowledge proof

User privacy and manipulations are a big concern but it is not the only problems that are occuring during an election. In an election, there are also problems where some people have zero incentives to vote for a person, which creates problems including under-representation, issue addressing failures etc. Although some people truly do not have a opinion, there are also many that has an opinion but no incentive to vote. To incentivize more people to vote, some amount of money can be given to the people who voted through the form of cryptocurrency. 

# Benefit Advantages
But what is the Benefit of our platform? We reward voters by minting and distributing to their wallets a cabbage coin.

Has an entire Login system for tracking past voting history, and cabbage coin wallet

## Installation (Front-End)
1. From the main directory, run `cd client`
2. To install the necessary dependencies, run `npm install`
3. To run the frontend application, run `npm run dev`

## Installation (Back-End)
1. From the main directory, run `cd server`
2. To install the necessary dependencies, run `npm install`
3. To run the backend server, run `npm run dev`

## Installation (Blockchain)
1. From the main directory, run `cd truffle-project` 
2. To install the necessary dependencies, run `npm install`
3. The dependencies will be installed except truffle, which would need to be installed globally. To do that, run `npm install -g truffle`
4. Ensure that truffle is installed by running `truffle` 
5. Open a new terminal, run `truffle develop`, to run a local blockchain
6. Ensure that you are seeing random accounts and private keys being generated
7. Type `migrate` which will run the migrations and deploy the smart contract onto the local blockchain
8. To use this local blockchain, **DO NOT** close this terminal
