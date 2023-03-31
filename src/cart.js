// This JavaScript file is for an e-commerce website's shopping cart functionality.

// Gets the label and shoppingCart elements from the DOM.
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

// Retrieves cart items from local storage if it exists, or sets it to an empty array.
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Function to update the cart icon with the number of items in the cart.
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

// Calls the calculation function to update the cart icon.
calculation();

// A function to generate the cart items and display them in the shopping cart
let generateCartItems = () => {
  // Generate cart items by mapping through the basket and shopItemsData arrays
  // Return the HTML code for each cart item as a string
  // Join all the strings into a single HTML string
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let { img, name, price } = search;
        return `
        <div class="cart-item">
        <img src=${img} alt=""></img>

        <div class="details">

        <div class="title-price-x">
        <h4 class="title-price">
            <p>${name}</p>
            <p class="cart-item-price">$ ${price}</p>
        </h4>
        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
        </div>

        <div class="buttons">
          <i onclick="decrement(${id})" class="bi bi-dash"></i>
          <div id=${id} class="quantity">
          ${item}
          </div>
          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        </div>


        <h3>$ ${item * search.price}</h3>        
        </div>

        </div>
        `;
      })
      .join(""));
  } else {
    // If the basket is empty, display a message and a button to go back to the home page
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to Home</button>
        </a>
        `;
  }
};

// Call the generateCartItems function
generateCartItems();

// A function to increment the quantity of an item in the cart
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
};

// A function to decrement the quantity of an item in the cart
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) retuen;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);

  // Remove items with quantity 0 from the basket
  basket = basket.filter((x) => x.item !== 0);

  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

/* This function takes an ID as input and finds the corresponding item in the
 */
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

/* This function takes an ID as input and removes the corresponding item from
 */
let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

// This function empties the basket array and calls the generateCartItems
const clearCart = (id) => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

// This function generates a list of cart items and updates the localStorage with the new basket array.
let checkout = (id) => {
  basket = basket.generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

// This function calculates the total cost of all items in the basket array and displays it on the shopping cart display.
// It also includes buttons for clearing the cart and checking out.
let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

totalAmount();





