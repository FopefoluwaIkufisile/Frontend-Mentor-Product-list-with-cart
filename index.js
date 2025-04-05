const data = [
  {
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

const defaultCart = document.querySelector(".default-div");

const productContainer = document.querySelector(".products-container");

const cartitems = document.querySelector(".items-in-cart-div");

const cartquantity = document.querySelector("#cart-quantity");

const totalInCart = document.querySelector(".total-deets");

const confirm = document.querySelector(".confirm");
const modal = document.querySelector(".modal-background");
const start = document.querySelector(".start");

start.addEventListener("click", () => {
  modal.style.display = "none";
});

const renderProducts = (data) => {
  productContainer.innerHTML = data
    .map(({ image, name, category, price }, index) => {
      return `
              <div class="product">
        <div class="product-image-container" tabindex="${index + 1}">
          <img src="${image.desktop}" alt="an image">
          <button class="add-to-cart" id="${category}"> <img src="./assets/images/icon-add-to-cart.svg" alt="" >Add to Cart</button>
          </div>
          <div class="product-details">
            <h2 class="product-category">${category}</h2>
            <p class="product-name">${name}</p>
            <p class="product-price">$${price}${
        price.toString().includes(".5") ? "0" : ".00"
      }</p>
          </div>
      </div>
        `;
    })
    .join("");
};
const cart = [];

 if (cart.length === 0){
 cartquantity.textContent = "0"
 }

const generateCart = () => {
  if (cart.length === 0) {
    defaultCart.style.display = "flex";
    cartitems.style.display = "none";
    totalInCart.style.display = "none";
     cartquantity.textContent = "0"
  } else {
    defaultCart.style.display = "none";
    cartquantity.textContent = cart.length;
    cartitems.style.display = "flex";
    totalInCart.style.display = "flex";

    const totalPrice = cart.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0
    );
    const orderTotalPrice = document.querySelectorAll(".order-total-price");

    orderTotalPrice.forEach(one=>one.textContent = `$${totalPrice.toFixed(2)}`);

    cartitems.innerHTML = cart
      .map(({ name, price, quantity }) => {
        return `
            <div class="item-in-cart">
              <div class="items-in-cart-details">
                <div class="item-name">${name}</div>
                <div class="rate-price-details">
                  <p class="rate">${quantity}x</p> <!-- Show quantity -->
                  <p class="at">@$${price.toFixed(2)}</p>
                  <p class="rate-price">$${(price * quantity).toFixed(2)}</p>
                </div>
              </div>
              <div class="close-img-container">
                <img src="./assets/images/icon-remove-item.svg" alt="remove" class="remove" id="${name}"/>
              </div>
            </div>
            <div class="line"></div>`;
      })
      .join("");
  }
  deleteFromCart();
};

const handleAddToCart = (item) => {
  const existingItem = cart.find((cartItem) => cartItem.name === item.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  generateCart();
};

confirm.addEventListener("click", () => {
  modal.style.display = "flex";

  const orderContent = document.querySelector(".order-content-container");

  orderContent.innerHTML = cart
    .map(({ image, name, quantity, price }) => {
      return `<div class="order-content">
            <div class="order-item">
              <div class="order-item-pic-container">
                <img src="${image.thumbnail}" alt="" />
              </div>
              <div class="order-item-text">
                <p id="order-item-name">${name}</p>
                <div class="quantity-div">
                  <p id="order-item-quantity">${quantity}x</p>
                  <p id="order-item-rate">@$${price.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div class="order-price">
              <p class="order-item-total-price">$${(price * quantity).toFixed(
                2
              )}</p>
            </div>
          </div>`;
    })
    .join("");
});

const deleteFromCart = () => {
  document.querySelectorAll(".remove").forEach((remove) => {
    remove.addEventListener("click", (e) => {
      const itemName = e.target.id;
      const index = cart.findIndex((item) => item.name === itemName);
      if (index !== -1) {
        cart.splice(index, 1);
      }
      generateCart();
    });
  });
};
renderProducts(data);

const addToCartBtn = document.querySelectorAll(".add-to-cart");
addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const item = data.find(({ category }) => category === e.target.id);
    handleAddToCart(item);
    console.log(cart);
  });
});


 
