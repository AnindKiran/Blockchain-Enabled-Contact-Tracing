pragma solidity ^0.5.16;

contract tracing {
    bytes32[] public listofIDs;
    uint length = 0;

    function insertToBlockchain(bytes32[] memory infectedID) public {
        length += infectedID.length;
        for(uint i = 0; i < infectedID.length; ++i){
            listofIDs.push(infectedID[i]);
        }
    }



    function checkIDs(bytes32[] memory exchangedIDs, uint index) public view returns (bool, uint) {
        uint l = exchangedIDs.length;
        bool found = false;
        for(uint i = index; i < length; ++i){
            for(uint j = 0; j < l; ++j){
                if(listofIDs[i] == exchangedIDs[j]){
                    found = true;
                    i = length;
                    break;
                }
            }
        }
        return (found, length);
    }

    function readFromBlockchain() public view returns(bytes32[] memory){
        return listofIDs;
    }
}