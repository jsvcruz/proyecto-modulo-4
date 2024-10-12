pragma solidity ^0.8.0; 
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// learn more: https://docs.openzeppelin.com/contracts/4.x/erc20

contract Token is ERC20 {
  constructor() ERC20("Gold", "GLD") {
    //_mint( ~~~YOUR FRONTEND ADDRESS HERE~~~~ , 1000 * 10 ** 18);
     _mint(msg.sender, 1000 * 10 ** 18 );
  }
}
