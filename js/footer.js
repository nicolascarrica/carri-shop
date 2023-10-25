const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-content">
            <img src="img/Carri-logo-dark.png" class="logo" alt="">
        </div>
        <p class="footer-title">about company</p>
        <p class="info">At CarriShop, we're passionate about fashion. We're dedicated to bringing you the latest trends, high-quality clothing, and outstanding customer service. Our mission is to help you look and feel your best. Thank you for choosing us as your go-to fashion destination.</p>
        <p class="info">support emails - help@carrishop.com, customersupport@carrishop.com</p>
        <p class="info">telephone - 180 00 00 001, 180 00 00 002</p>

        <div class="footer-contact">
            <p class="footer-title">contact us</p>
            <form id="contact-form">
                <div class="form-messages"></div>
                <div class="form-group">
                    <input type="text" id="name" name="name" placeholder="Your Name">
                </div>
                <div class="form-group">
                    <input type="text" id="lastname" name="lastname" placeholder="Your Last Name" required>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder="Your Email" required>
                </div>
                <div class="form-group">
                    <textarea id="message" name="message" placeholder="Your Message" required></textarea>
                </div>
                <div class="form-group">
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>

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

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById('contact-form');
    const formMessages = document.querySelector('.form-messages');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateForm()) {
            formMessages.innerHTML = '<p class="success-message">Form submitted successfully!</p>';
            form.reset();
        } else {
            formMessages.innerHTML = '<p class="error-message">Please fill out all the required fields.</p>';
        }
    });

    function validateForm() {
        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name.trim() === '' || lastname.trim() === '' || email.trim() === '' || message.trim() === '') {
            return false;
        }

        return true;
    }
});