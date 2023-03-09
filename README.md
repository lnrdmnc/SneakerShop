# SneakerShop
This box has all you need to get started with our Pet Shop tutorial.

Installation
Install Truffle globally.

npm install -g truffle
Download the box. This also takes care of installing the necessary dependencies.

truffle unbox pet-shop
Run the development console.

truffle develop
Compile and migrate the smart contracts. Note inside the development console we don't preface commands with truffle.

compile
migrate
Run the liteserver development server (outside the development console) for front-end hot reloading. Smart contract changes must be manually recompiled and migrated.

// Serves the front-end on http://localhost:3000
npm run dev
NOTE: This box is not a complete dapp, but the starting point for the Pet Shop tutorial. You'll need to complete that for this to function.

FAQ
How do I use this with the EthereumJS TestRPC?

It's as easy as modifying the config file! Check out our documentation on adding network configurations. Depending on the port you're using, you'll also need to update line 16 of src/js/app.js.
