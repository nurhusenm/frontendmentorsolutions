const emptyCart = document.querySelector(".empty-cart");
const cartItems = document.querySelector(".cart-items");
const cartQuantity = document.querySelector(".cart-quantity");
const plusIcon = document.querySelector(".plus-icon");
const minusIcon = document.querySelector(".minus-icon");
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
            <span class="hover-text">1</span>
           
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
  const productQuantities = {}; // Store quantities for each product

  document.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product-card");
    if (!productCard) return; // Exit if click wasn't on a product card

    const productName = productCard.querySelector(".product-name").textContent;
    const hoverText = productCard.querySelector(".hover-text");

    // Initialize product quantity if it doesn't exist
    if (!productQuantities[productName]) {
      productQuantities[productName] = 0;
    }

    if (e.target.classList.contains("plus-icon")) {
      productQuantities[productName]++;
      totalQuantity++;

      // Update displays
      hoverText.textContent = productQuantities[productName];
      cartQuantity.textContent = totalQuantity;

      // Show cart items if there are products
      if (totalQuantity > 0) {
        emptyCart.style.display = "none";
        cartItems.style.display = "block";
      }
    }

    if (e.target.classList.contains("minus-icon")) {
      if (productQuantities[productName] > 0) {
        productQuantities[productName]--;
        totalQuantity--;

        // Update displays
        hoverText.textContent = productQuantities[productName];
        cartQuantity.textContent = totalQuantity;

        // Show empty cart if no products
        if (totalQuantity === 0) {
          emptyCart.style.display = "block";
          cartItems.style.display = "none";
        }
      }
    }
  });
});
