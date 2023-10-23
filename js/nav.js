const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
        <div class="nav">
            <a href="index.html"><img src="img/dark-logo.png" class="brand-logo" alt=""></a>
            <div class="nav-items">
                <div class="search">
                    <input type="text" class="search-box" placeholder="search brand, product">
                    <button class="search-btn">search</button>
                </div>
                <a href="#"><img src="img/user.png" alt=""></a>
                <a href="cart.html"><img src="img/cart.png" alt="">
                    <span id="cart-number" class="cart-number">0</span>
                </a>
            </div>
        </div>
        <ul class="links-container">
            <li class="link-item"><a href="index.html" class="link">home</a></li>
            <li class="link-item"><a href="#sale" class="link">sales</a></li>
            <li class="link-item"><a href="#clothes" class="link">clothes</a></li>
            <li class="link-item"><a href="#shoes" class="link">shoes</a></li>
            <li class="link-item"><a href="#accessories" class="link">accessories</a></li>
            <li class="link-item"><a href="#footer" class="link">about us</a></li>
        </ul>
    `;
}

createNav();