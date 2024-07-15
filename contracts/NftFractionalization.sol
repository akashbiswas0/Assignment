//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract LicenseFractions is ERC1155URIStorage, ERC1155Holder {

    address owner;

    constructor() ERC1155("") {
        owner = msg.sender;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Holder) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    address burnAccess;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier rapidNode {
        require(msg.sender == burnAccess);
        _;
    }

    uint public licenseId;

    mapping (uint => uint) licenseBatchPrice;
    mapping (uint => uint) idToQuantityPurchased;
    mapping (uint => uint) idToRemaining;

    mapping (address => mapping (uint => bool)) canMint;

    function createLicense(uint _batchTotalPrice, uint _noOfBatches) public {
        licenseId++;
        licenseBatchPrice[licenseId] =  _batchTotalPrice;
        idToRemaining[licenseId] = 10 * _noOfBatches;
    }

    function buyLicenseFractions(uint _licenseId, uint _quantity) public payable {
        require(idToRemaining[_licenseId] - _quantity >= 0);
        uint txValue = getFractionBuyPrice(_licenseId, _quantity);
        require(msg.value ==  txValue, "not enough price");
        canMint[msg.sender][_licenseId] = true;
        idToQuantityPurchased[_licenseId] = _quantity;
        idToRemaining[_licenseId] - _quantity;
    }

    function mintLicenseFractions(uint _licenseId) public {
        require(canMint[msg.sender][_licenseId] == true, "not eligible, purchase first!");
        _mint(msg.sender, _licenseId, idToQuantityPurchased[_licenseId], "");
    }

    function grantBurnAccess(address _rapidNode) public onlyOwner {
        burnAccess = _rapidNode;
    }

    function burn(address _from, uint256 _id, uint256 _value) public rapidNode {
        _burn(_from, _id, _value);
    }

    function getFractionBuyPrice(uint _licenseId, uint _quantity) public view returns(uint) {
        uint platformFee = 200000000000000000;
        uint txValue = (licenseBatchPrice[_licenseId]/10 + platformFee) * _quantity;
        return txValue;
    }
    
    error NothingToWithdraw();
    error FailedToWithdrawEth(address owner, address target, uint256 value);

    function withdraw(address _beneficiary) public {
        uint256 amount = address(this).balance;
        if (amount == 0) revert NothingToWithdraw();
        (bool sent, ) = _beneficiary.call{value: amount}("");
        if (!sent) revert FailedToWithdrawEth(msg.sender, _beneficiary, amount);
    }
}