let product_card = document.querySelector("#product-div");
let table = document.querySelector(".product-table");
function renderproduct() {
  products.forEach((product) => {
    product_card.innerHTML += `
          <div class="col-12 col-lg-6 mb-4">
            <div class="card">
              <div class="card-body">
                <img src="${product.src}" class="w-100" />
                <hr />
                <p class="fs-5 fw-bold">${product.name}</p>
                <p>
                  Price - <span class="text-primary fs-5 fw-bold">$ ${product.price}</span>
                </p>
                <div class="btn btn-primary w-100 cart-btn fs-6 fw-bold" onclick="addToCart(${product.id})">
                  Add to cart
                </div>
              </div>
            </div>
          </div>
        `;
  });
}
renderproduct();

let carts =JSON.parse(localStorage.getItem('products')) || [];
// let carts = [];

function addToCart(id) {
  if (carts.some((curt) => curt.id == id)) {
    changeQuantity('plus', id)
  } else {
    let cart = products.find((product) => product.id === id);
    carts.push({
      ...cart,
      quantity: 1,
    });
  }
  renderProductCart();
  renderNumber();
  updateCart();
}
function renderProductCart() {
  table.innerHTML = "";
  carts.forEach((cart) => {
    table.innerHTML += `<tr>
        <th>
          <img src="${cart.src}" id="img-cart" title="Macbook 1" />
        </th>
        <td><p class="fs-5 pt-2">$ ${cart.price}</p></td>
        <td>
          <i
            class="fa-solid fa-circle-minus fs-5 text-primary pt-3" onclick="changeQuantity('minus',${cart.id})"
          ></i
          ><span class="mx-2 fs-5 pt-3">${cart.quantity}</span
          ><i
            class="fa-solid fa-circle-plus fs-5 text-primary pt-3" onclick="changeQuantity('plus',${cart.id})"
          ></i>
        </td>
        <td>
          <i
            class="fa-solid fa-trash text-danger fs-5 pt-3" onclick="removeCart(${cart.id})";
            title="Remove"
          ></i>
        </td>
      </tr>`;
  });
}

function changeQuantity(condition, id) {
  carts = carts.map((cart) => {
    let quantity = cart.quantity;
    if (cart.id == id) {
      if (condition == "plus") {
        quantity++;
      } else if (condition == "minus" && quantity > 1) {
        quantity--;
      }
    }
    return{
      ...cart,
      quantity,
    }
  });
  renderProductCart();
  renderNumber();
}

function renderNumber(){
  let totalprice = 0, totalcart = 0;
  carts.forEach((cart)=>{
    totalprice += cart.price * cart.quantity;
    console.log(totalprice);
    totalcart += cart.quantity;
    document.querySelector('#price').innerText = totalprice;
    document.querySelector('#card').innerText = totalcart;
  })
}

function removeCart(id){
  carts = carts.filter((cart)=> cart.id !== id);
  updateCart();
}

function updateCart(){
  renderProductCart();
  renderNumber();
  // localStorage.setItem("products", JSON.stringify(carts));
  localStorage.setItem('products', JSON.stringify(carts));
}
updateCart();
