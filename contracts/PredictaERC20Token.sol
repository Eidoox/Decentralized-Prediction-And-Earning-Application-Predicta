// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PredictaToken is ERC20{
    constructor () ERC20 ("Predicta Token" , "PT"){}
    function GetSomePredictaTestTokens (uint256 _amount) public {
        _mint(msg.sender, _amount);

    }
    function GetSomePredictaTestTokensToUser ( address _UserAddress , uint256 _amount) public {
        _mint(_UserAddress, _amount);
    }
}