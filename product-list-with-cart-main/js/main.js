const emptyCart = document.querySelector(".empty-cart");
const cartItems = document.querySelector(".cart-items");
const cartQuantity = document.querySelector(".cart-quantity");
const plusIcon = document.querySelector(".plus-icon");
const minusIcon = document.querySelector(".minus-icon");
const itemName = document.querySelector(".item-name");
const totalPrice = document.querySelector(".total-amount-price");
const confirmBtn = document.querySelector(".confirm-btn");
// const hoverText = document.querySelector(".hover-text");

async function loadProducts() {
  try {
    const response = await fetch("./data.json");
    const products = await response.json();

    // const incrementIcon = "../assets/images/icon-increment-quantity.svg";
    const productList = document.querySelector(".product-list");
    console.log(products);
    const cartIcon = "../assets/images/icon-add-to-cart.svg";

    products.forEach((product) => {
      const productCard = `
            <div class="product-card" >
            <div class="product-image-container">
            <img src="${product.image.desktop}" alt="${
        product.name
      }" class="product-image"/>
            <button class="add-to-cart-btn">
            <span class="plus-icon">+</span>
          
           
           
            <span class="btn-text">Add to Cart</span>
            <span class="hover-text">0</span>
           
            <span class="minus-icon">-</span>
            </button>
            </div>



            <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>



            

            </div>

            `;

      productList.innerHTML += productCard;
    });
  } catch (error) {
    console.log("Error loading products:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);
document.addEventListener("DOMContentLoaded", () => {
  let totalQuantity = 0;
  let cartTotalPrice = 0;
  const productQuantities = {};
  cartQuantity.textContent = totalQuantity;

  // Function to update total price display
  function updateTotalPrice() {
    totalPrice.textContent = `$${cartTotalPrice.toFixed(2)}`;
  }

  // Add this function to create cart item HTML
  function createCartItemHTML(productName, quantity, price) {
    return `
      <div class="cart-item" data-product="${productName}">
        <p class="item-name">${productName}</p>
        <div class="cart-item-info">
          <div class="item-details">
            <p class="item-quantity">x<span>${quantity}</span></p>
            <p class="item-price">
              <span style="font-size: 12px">@</span> $${price.toFixed(2)}
            </p>
            <p class="item-total">$${(price * quantity).toFixed(2)}</p>
          </div>
          <button class="delete-btn">
            <img src="assets/images/icon-remove-item.svg" alt="" />
          </button>
        </div>
      </div>
    `;
  }

  document.addEventListener("click", (e) => {
    // Add delete button handler
    if (e.target.closest(".delete-btn")) {
      const cartItem = e.target.closest(".cart-item");
      const productName = cartItem.getAttribute("data-product");

      // Update total quantity and price
      totalQuantity -= productQuantities[productName];
      cartTotalPrice -=
        productQuantities[productName] *
        parseFloat(
          cartItem.querySelector(".item-price").textContent.replace("@ $", "")
        );

      // Update displays
      cartQuantity.textContent = totalQuantity;
      updateTotalPrice();

      // Reset product quantity
      productQuantities[productName] = 0;

      // Hide the cart item instead of removing it
      cartItem.style.display = "none";

      // Show empty cart if no items left
      if (totalQuantity === 0) {
        emptyCart.style.display = "block";
        cartItems.style.display = "none";
      }

      return;
    }

    const productCard = e.target.closest(".product-card");
    if (!productCard) return;

    const productName = productCard.querySelector(".product-name").textContent;
    const productPrice = parseFloat(
      productCard.querySelector(".product-price").textContent.replace("$", "")
    );
    const hoverText = productCard.querySelector(".hover-text");

    if (!productQuantities[productName]) {
      productQuantities[productName] = 0;
    }

    if (e.target.classList.contains("plus-icon")) {
      productQuantities[productName]++;
      totalQuantity++;
      cartTotalPrice += productPrice;
      updateTotalPrice();

      // Update displays
      hoverText.textContent = productQuantities[productName];
      cartQuantity.textContent = totalQuantity;

      // Update or add cart item
      const existingCartItem = cartItems.querySelector(
        `[data-product="${productName}"]`
      );
      if (existingCartItem) {
        existingCartItem.querySelector(".item-quantity span").textContent =
          productQuantities[productName];
        existingCartItem.querySelector(".item-total").textContent = `$${(
          productPrice * productQuantities[productName]
        ).toFixed(2)}`;
      } else {
        const cartItemsContainer = cartItems.querySelector(".total-amount");
        cartItemsContainer.insertAdjacentHTML(
          "beforebegin",
          createCartItemHTML(
            productName,
            productQuantities[productName],
            productPrice
          )
        );
      }

      // Show cart items
      if (totalQuantity > 0) {
        emptyCart.style.display = "none";
        cartItems.style.display = "block";
      }
    }

    if (e.target.classList.contains("minus-icon")) {
      if (productQuantities[productName] > 0) {
        productQuantities[productName]--;
        totalQuantity--;
        cartTotalPrice -= productPrice;
        updateTotalPrice();

        // Update displays
        hoverText.textContent = productQuantities[productName];
        cartQuantity.textContent = totalQuantity;

        // Update or remove cart item
        const existingCartItem = cartItems.querySelector(
          `[data-product="${productName}"]`
        );
        if (existingCartItem) {
          if (productQuantities[productName] === 0) {
            existingCartItem.remove();
          } else {
            existingCartItem.querySelector(".item-quantity span").textContent =
              productQuantities[productName];
            existingCartItem.querySelector(".item-total").textContent = `$${(
              productPrice * productQuantities[productName]
            ).toFixed(2)}`;
          }
        }

        // Show empty cart if no products
        if (totalQuantity === 0) {
          emptyCart.style.display = "block";
          cartItems.style.display = "none";
        }
      }
    }
  });
});

confirmBtn.addEventListener("click", () => {
  document.querySelector(".confirmation-overlay").style.display = "block";

  const visibleCartItems = document.querySelectorAll(
    '.cart-item:not([style*="display: none;"])'
  );

  const selectedItems = Array.from(visibleCartItems).map((item) => {
    const productName = item.querySelector(".item-name").textContent;
    const productCards = document.querySelectorAll(".product-card");
    const productCard = Array.from(productCards).find(
      (card) => card.querySelector(".product-name").textContent === productName
    );
    const productImage = productCard
      ? productCard.querySelector(".product-image").src
      : "";

    return {
      itemsName: productName,
      itemsImage: productImage,
      itemsQuantity: parseInt(
        item.querySelector(".item-quantity").textContent.split("x")[1].trim()
      ),
      itemsPrice: parseFloat(
        item.querySelector(".item-price").textContent.replace("@ $", "")
      ),
      itemsTotal: parseFloat(
        item.querySelector(".item-total").textContent.replace("$", "")
      ),
    };
  });

  // Generate HTML for selected items
  const selectedItemsHTML = selectedItems
    .map(
      (item) => `
    <div class="selected-item">
      <div class="selected-img">
        <img src="${item.itemsImage}" alt="${item.itemsName}" />
        <div class="selected-name">
        <p>${item.itemsName}</p>
        <div class="item-details">
        <p>x${item.itemsQuantity}</p>
        <p>$${item.itemsPrice.toFixed(2)}</p>
        </div>
        </div>
        </div>
      <div class="item-details">
        <p>$${item.itemsTotal.toFixed(2)}</p>
      </div>
    </div>
  `
    )
    .join("");

  // Insert into confirmation card
  const confirmationCard = document.querySelector(".confirmation-card");
  const selectedItemsContainer = document.createElement("div");
  selectedItemsContainer.className = "selected-items";
  selectedItemsContainer.innerHTML = selectedItemsHTML;

  // Add order total
  const orderTotal = document.querySelector(".total-amount-price").textContent;
  selectedItemsContainer.innerHTML += `
    <div class="order-total">
      <p>Order total</p>
      <p>${orderTotal}</p>
    </div>
  `;

  // Clear previous items if any
  const existingItems = confirmationCard.querySelector(".selected-items");
  if (existingItems) {
    existingItems.remove();
  }

  // Insert after the confirmation message
  confirmationCard.querySelector("p").after(selectedItemsContainer);
});
