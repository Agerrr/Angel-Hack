/*
  Automatically fills in a form to create a new MCC account.
*/

var casper = require('casper').create();
var ingredient = casper.cli.args[0];

// Fill in the form to create a new MCC account.
casper.start('http://www.mayoclinic.org/search/search-results?q=' + ingredient, function(status) { // Create a standard MCC account.

  this.capture('main.png');
  this.evaluate(function () {
    console.log(document.querySelector('.navlist li a'));
  });
});

casper.then(function() {
  // this.click('.navlist').find('li').find('a')[0]);
  // this.capture('next.png');
  //casper.wait(1000, function() {
    console.log(document.querySelectorAll('a')[0]);
  //});
});

casper.run();