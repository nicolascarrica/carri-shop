const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-content">
            <img src="img/light-logo.png" class="logo" alt="">
        </div>
        <p class="footer-title">about company</p>
        <p class="info">At CarriShop, we're passionate about fashion. We're dedicated to bringing you the latest trends, high-quality clothing, and outstanding customer service. Our mission is to help you look and feel your best. Thank you for choosing us as your go-to fashion destination.</p>
        <p class="info">support emails - help@carrishop.com, customersupport@carrishop.com</p>
        <p class="info">telephone - 180 00 00 001, 180 00 00 002</p>
        <div class="footer-social-container">
            <div>
                <a href="#" class="social-link">terms & services</a>
                <a href="#" class="social-link">privacy page</a>
            </div>
            <div>
                <a href="#" class="social-link">instagram</a>
                <a href="#" class="social-link">facebook</a>
                <a href="#" class="social-link">twitter</a>
            </div>
        </div>
        <p class="footer-credit">CarriShop, Best apparels online store</p>
    `;
}

createFooter();