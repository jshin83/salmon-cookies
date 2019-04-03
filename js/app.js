'use strict';

// array to hold all locations
var allStores = [];
var storeHours = [];
var hourlySums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var tbdy;

// create location object - constructor
function Store(locationName, minimum, maximum, averageCookies) {
  this.location = locationName;
  this.minimum = minimum;
  this.maximum = maximum;
  this.averageCookies = averageCookies;
  this.customersPerHour = [];
  this.cookiesSoldHourly = [];
  this.totalCookies = 0;
  allStores.push(this);
}

// create location instances
new Store('1st and Pike', 23, 65, 6.3);
new Store ('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 2.3);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 6.3);

// populate store hours array
for (let i = 6; i <= 20; i ++) {
  storeHours.push(processTime(i));
}

// populate customersPerHour and cookiesSoldHourly arrays
for (let storeIndex = 0; storeIndex < allStores.length; storeIndex++) {
  for (let i = 0; i < 15; i ++) {
    addCustomersAndCookies(allStores[storeIndex], i);
  }
}

Store.prototype.render = function() {
  // make table row
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  // create, content, append - store name
  tdElement.textContent = this.location;
  trElement.appendChild(tdElement);
  // store properties td and append to tr
  for(let cookiesIndex = 0 ; cookiesIndex < this.cookiesSoldHourly.length; cookiesIndex++) {
    tdElement = document.createElement('td');
    tdElement.textContent = this.cookiesSoldHourly[cookiesIndex];
    trElement.appendChild(tdElement);
    hourlySums[cookiesIndex] = hourlySums[cookiesIndex] + this.cookiesSoldHourly[cookiesIndex];
  }
  // append tr to tbdy
  tbdy.appendChild(trElement);
};

// wrapper function
displayData();

function displayData() {
  createTable();

  // call render on all stores
  for(let i = 0; i < allStores.length; i++) {
    allStores[i].render();
  }
  // create row of totals and display onto Table
  createTotalsRow();
}

// create table element, assign table body
function createTable() {
  var div = document.getElementById('hidden');
  // make a table
  var table = document.createElement('table');
  // make table body
  tbdy = document.createElement('tbody');
  // create table headers
  createTh();
  table.appendChild(tbdy);
  div.appendChild(table);
}

// helper function to create table headers
function createTh() {
  var thElement = document.createElement('th');
  let tdEl = document.createElement('td');
  tdEl.textContent = '';
  tbdy.appendChild(thElement.appendChild(tdEl));
  for (let i = 0; i < storeHours.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = storeHours[i];
    tbdy.appendChild(thElement.appendChild(tdEl));
  }
}

// helper function to create totals table tr
function createTotalsRow() {
  createTd('Totals');
  let trElement = document.createElement('tr');
  for (let i = 0; i < hourlySums.length; i++) {
    let tdEl = document.createElement('td');
    tdEl.textContent = hourlySums[i];
    tbdy.appendChild(trElement.appendChild(tdEl));
  }
}

// helper function that creates blank td
function createTd(content) {
  var thElement = document.createElement('th');
  let tdEl = document.createElement('td');
  tdEl.textContent = content;
  tbdy.appendChild(thElement.appendChild(tdEl));
}

// helper function to add number of customers to array, calls function to add to cookies per hour array
function addCustomersAndCookies (location, i) {
  var number = location.customersPerHour[i] = getRandomIntInclusive(location.minimum, location.maximum);
  totalCookiesPerHour(location, i, number);
}

// helper function that calculates number of cookies sold per location - dependent on number of customers that hour
function totalCookiesPerHour(location, i, number) {
  location.cookiesSoldHourly[i] = Math.ceil(number * location.averageCookies);
  // console.log("cookies at " + location.location + " at hour " + i + " = " + cookies); // testing
}

// source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random - generates random number, min and max inclusive
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// helper function to display time in correct way, with am and pm
function processTime(time) {
  if (time > 11 && time !== 12) {
    return (time - 12) + ':00pm';
  } else if (time === 12) {
    return time + ':00pm';
  } else {
    return time + ':00am';
  }
}
