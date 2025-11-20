/* ========== MOBILE NAV MENU ========== */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const menuClose = document.getElementById("menu-close-button");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.add("active");
  });
}

if (menuClose && navMenu) {
  menuClose.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
}

/* ========== CART OPEN/CLOSE ========== */
const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

if (cartIcon && cart) {
  cartIcon.addEventListener("click", () => cart.classList.add("active"));
}

if (cartClose && cart) {
  cartClose.addEventListener("click", () => cart.classList.remove("active"));
}

/* ========== ADD TO CART ========== */
const addCartButtons = document.querySelectorAll(".add-cart");
const cartContent = document.querySelector(".cart-content");

addCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    const menuItem = event.target.closest(".menu-item");

    if (!menuItem) return;

    addToCart(menuItem);

    // Automatically open the cart
    cart.classList.add("active");
  });
});


/* ========== ADD ITEM FUNCTION ========== */
function addToCart(menuItem) {
  const productImgSrc = menuItem.querySelector("img").src;
  const productTitle = menuItem.querySelector(".product-title").textContent;
  const productPrice = menuItem.querySelector(".price").textContent;

  // Prevent duplicate items
  const cartItems = cartContent.querySelectorAll(".cart-product-title");
  for (let item of cartItems) {
    if (item.textContent === productTitle) {
      alert("This item is already in the cart.");
      return;
    }
  }

  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");

  cartBox.innerHTML = `
    <img src="${productImgSrc}" class="cart-img">
    <div class="cart-detail">
      <h3 class="cart-product-title">${productTitle}</h3>
      <span class="cart-price">${productPrice}</span>
      <div class="cart-quantity">
        <button class="decrement">-</button>
        <span class="number">1</span>
        <button class="increment">+</button>
      </div>
    </div>
    <i class="ri-delete-bin-line cart-remove"></i>
  `;

  cartContent.appendChild(cartBox);

  /* --- Remove Item --- */
  cartBox.querySelector(".cart-remove").addEventListener("click", () => {
    cartBox.remove();
    updateCartCount(-1);
    updateTotalPrice();
  });

  /* --- Quantity + --- */
  cartBox.querySelector(".increment").addEventListener("click", () => {
    const qty = cartBox.querySelector(".number");
    qty.textContent = Number(qty.textContent) + 1;
    updateTotalPrice();
  });

  /* --- Quantity - --- */
  cartBox.querySelector(".decrement").addEventListener("click", () => {
    const qty = cartBox.querySelector(".number");
    let value = Number(qty.textContent);
    if (value > 1) {
      qty.textContent = value - 1;
      updateTotalPrice();
    }
  });

  // Update cart count and total
  updateCartCount(1);
  updateTotalPrice();
}


/* ========== TOTAL PRICE CALCULATION ========== */
function updateTotalPrice() {
  const totalPriceElement = document.querySelector(".total-price");
  const cartBoxes = cartContent.querySelectorAll(".cart-box");

  let total = 0;

  cartBoxes.forEach(cartBox => {
    const price = parseFloat(cartBox.querySelector(".cart-price").textContent.replace("₱",""));
    const qty = parseInt(cartBox.querySelector(".number").textContent);

    total += price * qty;
  });

  totalPriceElement.textContent = `₱${total.toFixed(2)}`;
}


/* ========== CART COUNT BADGE ========== */
let cartItemCount = 0;

function updateCartCount(change) {
  const badge = document.querySelector(".cart-item-count");

  cartItemCount += change;

  if (cartItemCount > 0) {
    badge.style.visibility = "visible";
    badge.textContent = cartItemCount;
  } else {
    badge.style.visibility = "hidden";
    badge.textContent = "";
  }
}


/* ========== BUY NOW BUTTON ========== */
const buyNowBtn = document.querySelector(".btn-buy");

if (buyNowBtn) {
  buyNowBtn.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");

    if (cartBoxes.length === 0) {
      alert("Your cart is empty. Please add items first.");
      return;
    }

    // Clear cart
    cartBoxes.forEach(box => box.remove());

    cartItemCount = 0;
    updateCartCount(0);
    updateTotalPrice();

    alert("Thank you for your purchase!");
  });
}
