// ========================================
//  Constants 
// ========================================
const API_URL = "https://dc-coffeerun.herokuapp.com/api/coffeeOrders"
//  Dom Selections
// ========================================'



// ========================================
//  Dom Selections
// ========================================
const orderForm = document.querySelector("[data-form]");
const notificationArea = document.querySelector("[data-notification]");
const resetButton = document.querySelector("[data-reset-button ]");
const orderListingArea = document.querySelector("[data-order-area]");
const orderListingButton = document.querySelector("[data-load-orders]");

// ========================================
// Helper Functions
// ========================================
function handelSubmit(event) {
  event.preventDefault();
  console.log("You get a coffee, you get a coffee, and you get a coffee");

  console.log(event.target);

  // AJAX
  // Call fetch()
  // pass it the url
  // and an object with a method and body
  const url = API_URL
  const method = event.target.method;
  const elements = event.target.elements;
  const data = {
    strength: elements.strength.value,
    flavor: elements.flavor.value,
    size: elements.size.value,
    coffee: elements.coffee.value,
    emailAddress: elements.emailAddress.value
  };

  fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(orderInfo => {
      // check the order info for errors
      // && is a "faulty hunter"
      if (orderInfo.name && orderInfo.name === "ValidationError") {
        notifyUser("please fill out correctly");
      } else {
        notifyUser("Coffee is on the way"); //gotta wrap it in an anonymous function
      }
    });
}

function notifyUser(notificationText) {
  // create a div
  const notificationBox = document.createElement("div");
  // add text to div
  notificationBox.textContent = notificationText;

  notificationArea.innerHTML = "";

  // append to something
  notificationArea.appendChild(notificationBox);
}

function confirmReset(e) {
  let doesWantToReset = confirm("Really?");
  if (!doesWantToReset) {
    e.preventDefault();
  }
}

function ConvertOrderToElement(orderInfo) {
  const orderElement = document.createElement('p')

  const orderText = `
  ${orderInfo.size} ${orderInfo.flavor} ${orderInfo.coffee} ${orderInfo.size} 
  for ${orderInfo.emailAddress}
  <br>
  (${orderInfo.strength})
  `;
  orderElement.innerHTML = orderText; 

  return orderElement;
}

function ConvertArrayOfOrdersToElements(giantOrderObject) {
  let orderArray = Object.values(giantOrderObject);
  let elementsArray = orderArray.map(ConvertOrderToElement);
  return elementsArray;
}




function getAndShowOrders(event) {
  console.log('hey a click')
  // console.log(event);
  fetch(API_URL)
    .then(response => response.json())
    .then(ConvertArrayOfOrdersToElements)
    .then(elementsArray => {
      elementsArray.forEach(e => orderListingArea.appendChild(e))
        
    })
    
}


// ========================================
// Main Event Listeners
// ========================================
console.log("about to add event listener!");
orderForm.addEventListener("submit", handelSubmit);
resetButton.addEventListener("click", confirmReset);
orderListingButton.addEventListener('click', getAndShowOrders);