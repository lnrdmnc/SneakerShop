pragma solidity >=0.5.0;

contract Cop{

address[16] public sneakers;
// cop a sneakers
function cop(uint snkrsId) public returns (uint) {
  require(snkrsId >= 0 && snkrsId <= 15);

  sneakers[snkrsId] = msg.sender;

  return snkrsId;
}

// Recupera tutte le sneakers
function getSneakers() public view returns (address[16] memory) {
  return sneakers;
}


}