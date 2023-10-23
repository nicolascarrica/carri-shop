const productsInCart = JSON.parse(localStorage.getItem('products-in-cart')) || [];

const productContainer = document.querySelector('.product-container');
const cartEmpty = document.querySelector('.cart-empty');
const cartAction = document.querySelector('.cart-action');
const cartBuy = document.querySelector('.cart-buy');
let deleteButton = document.querySelectorAll('.remove-product');
const cleanCartButton = document.querySelector('.clean-cart-button');
const totalContainer = document.querySelector('.total-amount');
const checkoutButton = document.querySelector('.checkout-button');



function createCartItem(){
    if(productsInCart && productsInCart.length > 0){
        
        cartEmpty.classList.add("disabled");
        productContainer.classList.remove("disabled");
        cartAction.classList.remove("disabled");
        cartBuy.classList.add("disabled");


        productContainer.innerHTML = '';

        productsInCart.forEach(product => {
            const productCart = document.createElement('div');
            productCart.classList.add('product-cart');
            productCart.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.title}">
            <div class="product-details">
                <h4>${product.title}</h4>
                <small>Size: ${product.selectedSize}</small>
            </div>
            <div class="product-quantity">
                <small>Quantity</small>
                <p>${product.quantity}</p>
            </div>
            <div class="product-price">
                <small>Price</small>
                <p>${product.price}</p>
            </div>
            <div class="product-total">
                <small>Total</small>
                <p>${product.price * product.quantity}</p>
            </div>
            <button class="remove-product" id="product-id"><i class="bi bi-trash3-fill"></i></button>
            </div>
            `;
            productContainer.appendChild(productCart);

        })
        updateDeleteButtons();
        updateTotal();
    } else {
        cartEmpty.classList.remove('disabled');
        productContainer.classList.add('disabled');
        cartAction.classList.add('disabled');
        cartBuy.classList.add('disabled');
    }
}

createCartItem();

function updateDeleteButtons(){
    deleteButton = document.querySelectorAll('.remove-product');
    deleteButton.forEach(button => {
        button.addEventListener('click', removeProduct);
    })
}

function removeProduct(e){
    Toastify({
        text: 'Product removed',
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem",
        },
        offset: {
          x: '1.5rem',
          y: '1.5rem'
        },
        onclick: function(){}
    }).showToast();

    const idButton = e.target.id;
    const productIndex = productsInCart.findIndex(product => product.id === idButton);

    productsInCart.splice(productIndex, 1);
    createCartItem();

    localStorage.setItem('products-in-cart', JSON.stringify(productsInCart));
}

cleanCartButton.addEventListener('click', cleanCart);

function cleanCart(){
    Swal.fire({
        title: 'Are you sure?',
        icon: 'question',
        html:`${productsInCart.reduce((acc, product) => acc + product.quantity, 0)} products will be removed`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if(result.isConfirmed){
            productsInCart.length = 0;
            createCartItem();
            localStorage.setItem('products-in-cart', JSON.stringify(productsInCart));
            Swal.fire({
                title: 'Cart cleaned',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }
    })
}

function updateTotal() {
    const total = productsInCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    total.innerText = `$${total.toFixed(2)}`;
}

checkoutButton.addEventListener('click', checkout);

function checkout(){
    productsInCart.length = 0;
    localStorage.setItem('products-in-cart', JSON.stringify(productsInCart));

    cartEmpty.classList.add('disabled');
    productContainer.classList.add('disabled');
    cartAction.classList.add('disabled');
    cartBuy.classList.remove('disabled');

}