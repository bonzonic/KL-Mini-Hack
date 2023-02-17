#!/bin/bash
truffle migrate 
curl -X POST -d @contractAddr.json http://localhost:8080/zk/votingAddr
