async function loadProducts() {
  try {
    const response = await fetch("./data.json");
    const products = await response.json();

    const productList = document.querySelector(".product-list");
    console.log(products);

    products.forEach((product) => {
      const productCard = `
            <div class="product-card" >
            <img src="${product.image.thumbnail}" alt="${
        product.name
      }" class="product-image"/>
            <button class="add-to-cart-btn">Add to Cart</button>
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
