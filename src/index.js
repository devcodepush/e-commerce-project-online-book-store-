// Get the HTML element with ID "shop"
let shop = document.getElementById("shop");

// Get the data from local storage, if any, and parse it into a JavaScript object
let basket = JSON.parse(localStorage.getItem("data")) || [];

// A function to generate the shop items and display them on the page
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, img } = x;

      // Find the selected item in the basket, if it exists
      let search = basket.find((x) => x.id === id) || [];
      // Generate the HTML for the item and return it
      return `<div class="item">
    <img src=${img} alt="bookCover" >
    <div class="details">
        <h3>${name}</h3>
        <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
        </div>
    </div>
</div>`;
    })
    .join(""));
};
// Call the generateShop function to display the items on the page
generateShop();

// A function to increment the quantity of an item in the basket
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
  // Save the updated basket data to local storage
  localStorage.setItem("data", JSON.stringify(basket));
  // Call the update function to display the updated quantity on the page
  update(selectedItem.id);
};

// A function to decrement the quantity of an item in the basket
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) retuen;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  // Call the update function to display the updated quantity on the page
  update(selectedItem.id);
  // Remove any items with quantity 0 from the basket
  basket = basket.filter((x) => x.item !== 0);
  // Save the updated basket data to local storage
  localStorage.setItem("data", JSON.stringify(basket));
};

// A function to update the quantity of an item on the page
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

// A function to calculate and display the total number of items in the basket
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

// Call the calculation function to display the initial number of items in the basket
calculation();
