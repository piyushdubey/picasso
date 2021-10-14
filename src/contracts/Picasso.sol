// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Picasso is ERC721Enumerable {
    using Strings for uint256;
    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenCounter;

    mapping(string => bool) _imageExists;
    uint256[] public mintedTokenIds;

    constructor() ERC721("Picasso", "PICASSO") {

    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    
    function mintNFT(address recipient, string memory URI)
    public
    returns (uint256)
    {
        // Make sure the tokenURI has not been minted
        require(!_imageExists[URI]);
        
        // Increament id
        _tokenCounter.increment();
        uint256 newItemId = _tokenCounter.current();

        // Mint
        _mint(recipient, newItemId);
        mintedTokenIds.push(newItemId);
        _setTokenURI(newItemId, URI);

        // Track minted tokenURI
        _imageExists[URI] = true;

        return newItemId;
    }

    function totalMinted() public view returns (uint256) {
        return mintedTokenIds.length;
    }
}