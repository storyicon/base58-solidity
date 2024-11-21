// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Base58.sol";

contract Base58Helper {

    function encodeToString(bytes memory data_)
        public
        pure
        returns (string memory)
    {
        return Base58.encodeToString(data_);
    }


    function decodeFromString(string memory data_)
        public
        pure
        returns (bytes memory)
    {
        return Base58.decodeFromString(data_);
    }
}