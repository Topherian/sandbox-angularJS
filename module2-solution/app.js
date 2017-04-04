(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {

  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {

  var alreadyBoughtList = this;

  alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  //Array of object literals
  var shoppingList = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Brownies",
      quantity: "10"
    },
    {
      name: "Cake",
      quantity: "50"
    },
    {
      name: "Chocolate",
      quantity: "5"
    }
  ];

  // List of 'to buy' shopping items
  var toBuyItems = shoppingList;

  // List of 'bought' shopping items
  var boughtItems = [];

  service.getToBuyItems = function () {
    console.log("Getting to buy items ..");
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    console.log("Getting bought items ..");
    return boughtItems;
  };

  service.buyItem = function (itemIndex) {

    //get Item from 'to buy' array
    var itemBought = toBuyItems[itemIndex];

    //add Items to the 'bought' array
    boughtItems.push(itemBought);

    //remove Item from 'to buy' array
    toBuyItems.splice(itemIndex, 1);

  };
}

})();
