pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Cop.sol";

contract TestAdoption {
  // The address of the adoption contract to be tested
  Cop cop= Cop(DeployedAddresses.Cop());

  // The id of the pet that will be used for testing
  uint expectedCopId = 8;

  //The expected owner of adopted pet is this contract
  address expectedCopp = address(this);

// Testing the adopt() function
function testUserCanCop() public {
  uint returnedId =cop.cop(expectedCopId);

  Assert.equal(returnedId, expectedCopId, "Adoption of the expected pet should match what is returned.");
}

// Testing retrieval of all pet owners
function testGetCopAddressByPetIdInArray() public {
  // Store adopters in memory rather than contract's storage
  address[16] memory adopters = adoption.getAdopters();

  Assert.equal(adopters[expectedPetId], expectedAdopter, "Owner of the expected pet should be this contract");
}
}