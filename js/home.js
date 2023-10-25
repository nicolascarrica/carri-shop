const productContainers = document.querySelectorAll('.product-container');
const nxtBtn = document.querySelectorAll('.nxt-btn');
const preBtn = document.querySelectorAll('.pre-btn');

let productsInCart = JSON.parse(localStorage.getItem('products-in-cart')) || [];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth;
  });
});

function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');

  const productImage = document.createElement('div');
  productImage.classList.add('product-image');

  const discountTag = document.createElement('span');
  discountTag.classList.add('discount-tag');
  discountTag.textContent = '50% off';

  const productThumbnail = document.createElement('img');
  productThumbnail.classList.add('product-thumb');
  productThumbnail.src = product.image;

  const sizesContainer = document.createElement('div');
  sizesContainer.classList.add('size-container');

  let selectedSize = null;

  product.size.forEach(size => {
    const sizeButton = document.createElement('spam');
    sizeButton.classList.add('size-button');
    sizeButton.textContent = size;

    sizeButton.addEventListener('click', () => {
      if (selectedSize) {
        selectedSize.classList.remove('selected');
      }
      sizeButton.classList.add('selected');
      selectedSize = sizeButton;
    });

    sizesContainer.appendChild(sizeButton);
  });

  const cardButton = document.createElement('button');
  cardButton.classList.add('card-btn');
  cardButton.id = product.id;
  cardButton.textContent = 'add to cart';

  cardButton.addEventListener('click', () => {
    if (selectedSize) {
      addToCart(product);
    } else {
      showToast("Select a product size.");
    }
  });

  productImage.appendChild(productThumbnail);
  productImage.appendChild(cardButton);

  const productInfo = document.createElement('div');
  productInfo.classList.add('product-info');

  const productName = document.createElement('p');
  productName.classList.add('product-short-des');
  productName.textContent = product.title;

  const price = document.createElement('span');
  price.classList.add('price');
  price.textContent = `$${product.price}`;

  const actualPrice = document.createElement('span');
  actualPrice.classList.add('actual-price');
  actualPrice.textContent = `$${product.price}`;

  productInfo.appendChild(productName);
  productInfo.appendChild(price);

  if (product.sale === true) {
    productInfo.appendChild(actualPrice);
    productImage.appendChild(discountTag);
    price.textContent = `$${product.price / 2}`;
    actualPrice.classList.add('price');
  }

  productCard.appendChild(productImage);
  productCard.appendChild(sizesContainer);
  productCard.appendChild(productInfo);

  return productCard;
}

function addToCart(product) {
  const id = product.id;
  const selectedSize = document.querySelector('.size-button.selected');

  if (!selectedSize) {
    showToast("Select a product size.");
    return;
  }

  const existingProduct = productsInCart.find(item => item.id === id && item.selectedSize === selectedSize.textContent);

  if (existingProduct) {
    showToast("Product already added.");
  } else {
    const productCopy = { ...product };

    productCopy.selectedSize = selectedSize.textContent;
    productCopy.quantity = 1;

    if (product.sale) {
      productCopy.price = product.price / 2;
    }

    productsInCart.push(productCopy);
    updateCartNumber();
    updateLocalStorage();
    showToast("Product added to cart!");
  }
}

function updateCartNumber() {
  const cartNumber = document.querySelector('.cart-number');
  let updatedNumber = productsInCart.reduce((acc, product) => acc + product.quantity, 0);
  cartNumber.textContent = updatedNumber;
}

function showToast(message) {
  Toastify({
    text: message,
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
  }).showToast();
}

function updateLocalStorage() {
  localStorage.setItem('products-in-cart', JSON.stringify(productsInCart));
}

let products;

fetch('./js/products.json')
  .then(response => response.json())
  .then(productsData => {
    products = productsData;
    products.forEach(product => {
      const productCard = createProductCard(product);
      let containerId = '';
      if (product.category.id === 'clothes') {
        containerId = 'clothes-container';
      } else if (product.category.id === 'shoes') {
        containerId = 'shoes-container';
      } else if (product.category.id === 'accessories') {
        containerId = 'accessories-container';
      }
      if (product.sale === true) {
        containerId = 'sales-container';
      }
      const container = document.querySelector(`#${containerId}`);
      if (container) {
        container.appendChild(productCard);
      }
    });
    updateCartNumber();
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });
