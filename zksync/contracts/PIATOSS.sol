// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PIATOSS is ERC721 {
    error PIATOSS__UserHasAlreadyMinted();

    uint256 private _tokenIdTracker;
    string private _baseTokenURI;

    mapping(address => bool) private _hasMinted;

    constructor(string memory baseTokenURI) ERC721("PIATOSS", "PIT") {
        _baseTokenURI = baseTokenURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function mint(address to) external {
        if (hasMinted(to)) {
            revert PIATOSS__UserHasAlreadyMinted();
        }

        uint256 tokenId = _tokenIdTracker++;
        _mint(to, tokenId);
    }

    function hasMinted(address user) public view returns (bool) {
        return _hasMinted[user];
    }
}
