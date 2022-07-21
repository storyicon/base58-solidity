# Base58 Solidity

![Base58-Solidity](https://github.com/storyicon/base58-solidity/raw/master/docs/images/base58-solidity.png)


The first complete implementation of Base58 encode/decode in Solidity.

**Github**: [https://github.com/storyicon/base58-solidity](https://github.com/storyicon/base58-solidity)

## Installation

```bash
npm install --save-dev base58-solidity
```

## API

```solidity
library Base58 {
    /**
    * @notice encode is used to encode the given bytes in base58 standard.
    * @param data_ raw data, passed in as bytes.
    * @return base58 encoded data_, returned as bytes.
    */
    function encode(bytes memory data_) public pure returns (bytes memory);
    /**
    * @notice decode is used to decode the given string in base58 standard.
    * @param data_ data encoded with base58, passed in as bytes.
    * @return raw data, returned as bytes.
    */
    function decode(bytes memory data_) public pure returns (bytes memory)
    /**
    * @notice encodeToString is used to encode the given byte in base58 standard.
    * @param data_ raw data, passed in as bytes.
    * @return base58 encoded data_, returned as a string.
    */
    function encodeToString(bytes memory data_) public pure returns (string memory)
    /**
    * @notice encodeFromString is used to encode the given string in base58 standard.
    * @param data_ raw data, passed in as a string.
    * @return base58 encoded data_, returned as bytes.
    */
    function encodeFromString(string memory data_) public pure returns (bytes memory)
    /**
    * @notice decode is used to decode the given string in base58 standard.
    * @param data_ data encoded with base58, passed in as string.
    * @return raw data, returned as bytes.
    */
    function decodeFromString(string memory data_) public pure returns (bytes memory)
}
```

## Examples



```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "base58-solidity/contracts/Base58.sol";

contract TestContract {
    // input: hello
    // output: Cn8eVZg
    function encode(string memory data_) public pure returns (string memory) {
        return string(Base58.encodeFromString(data_));
    }
    // input: Cn8eVZg
    // output: hello
    function decode(string memory data_) public pure returns (string memory) {
        return string(Base58.decodeFromString(data_));
    }
}
```



## Contribution

Thank you for considering to help out with the source code! Welcome contributions
from anyone on the internet, and are grateful for even the smallest of fixes!

If you'd like to contribute to this project, please fork, fix, commit and send a pull request
for me to review and merge into the main code base.

## License

This project is released under the MIT License.