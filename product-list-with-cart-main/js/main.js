async function loadProducts() {
  try {
    const response = await fetch("./data.json");
    const products = await response.json();

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
            <img src=${cartIcon} alt="icon" class="cart-icon">
            Add to Cart</button>
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
