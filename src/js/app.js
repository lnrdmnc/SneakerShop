App = {
    web3Provider: null,
    contracts: {},

    init: async function () {
        // Load pets.
        $.getJSON('../pets.json', function (data) {
            var snkrsRow = $('#petsRow');
            var snkrsTemplate = $('#petTemplate');

            for (i = 0; i < data.length; i++) {
                snkrsTemplate.find('.panel-title').text(data[i].name);
                snkrsTemplate.find('img').attr('src', data[i].picture);
                snkrsTemplate.find('.snkrs-brand').text(data[i].brand);
                snkrsTemplate.find('.pet-size').text(data[i].size);
                snkrsTemplate.find('.snkrs-realese').text(data[i].release);
                snkrsTemplate.find('.btn-buy snkrs-buy').attr('data-id', data[i].id);
                snkrsRow.append(snkrsTemplate.html());
            }
        });

        return await App.initWeb3();
    },


    // fa la connessione con 7545

    initWeb3: async function () {
        // Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {
        $.getJSON('Adoption.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with @truffle/contract
            var BuyArtifact = data;
            App.contracts.Cop = TruffleContract(BuyArtifact);

            // Set the provider for our contract
            App.contracts.Cop.setProvider(App.web3Provider);

            // Use our contract to retrieve and mark the adopted pets
            return App.markAdopted();
        });



        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '.btn-buy snkrs-buy', App.handleAdopt);
    },

    markCop: function () {
        var buyInstance;

        App.contracts.Cop.deployed().then(function (instance) {
            buyInstance = instance;

            return buyInstance.getSneakers.call();
        }).then(function (sneakers) {
            for (i = 0; i < sneakers.length; i++) {
                if (sneakers[i] !== '0x0000000000000000000000000000000000000000') {
                    $('.panel-snkrs').eq(i).find('button').text('Success').attr('disabled', true);
                }
            }
        }).catch(function (err) {
            console.log(err.message);
        });


    },

    handleAdopt: function (event) {
        event.preventDefault();

        var sneakersId = parseInt($(event.target).data('id'));
        var buyInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];

            App.contracts.Cop.deployed().then(function (instance) {
                buyInstance = instance;

                // Execute adopt as a transaction by sending account
                return buyInstance.adopt(snkrsId, { from: account });
            }).then(function (result) {
                return App.markCop();
            }).catch(function (err) {
                console.log(err.message);
            });
        });

    }

};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
