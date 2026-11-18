// Shared site shell templates. Set data-root on <body> to "../" on nested pages.
window.SiteComponents = {
    render() {
        const root = document.body.dataset.root || "";
        const activePage = document.body.dataset.activePage || "";
        const header = document.querySelector("[data-component='header']");
        const footer = document.querySelector("[data-component='footer']");
        const modal = document.querySelector("[data-component='auth-modal']");

        if (header) {
            header.outerHTML = `
                <header>
                    <div class="Logo"><a href="${root}index.html"><img src="${root}img/logo.png" alt="Midnight Roast home"></a></div>
                    <nav id="header" aria-label="Main navigation">
                        <ul class="menu">
                            <li><a id="${activePage === "home" ? "home" : ""}" href="${root}index.html" ${activePage === "home" ? 'aria-current="page"' : ""}>HOME</a></li>
                            <li><a id="${activePage === "our-story" ? "ourStory" : ""}" href="${root}pages/our-story.html" ${activePage === "our-story" ? 'aria-current="page"' : ""}>OUR STORY</a></li>
                            <li><a id="${activePage === "store" ? "Store" : ""}" href="${root}pages/store.html" ${activePage === "store" ? 'aria-current="page"' : ""}>STORE</a></li>
                            <li><a id="${activePage === "contact" ? "contact" : ""}" href="${root}pages/contact-us.html" ${activePage === "contact" ? 'aria-current="page"' : ""}>CONTACT US</a></li>
                            <li><a class="cart-link" href="#" aria-label="Shopping cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a></li>
                        </ul>
                    </nav>
                </header>`;
        }

        if (footer) {
            footer.outerHTML = `
                <footer>
                    <nav aria-label="Footer">
                        © 2026 <a href="${root}index.html">MidnightRoast</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Refund Policy</a>
                        <a href="#">Shipping Policy</a>
                    </nav>
                </footer>`;
        }

        if (modal) {
            modal.outerHTML = `
                <dialog class="auth-modal" aria-labelledby="auth-modal-title" aria-describedby="auth-modal-description">
                    <button class="auth-modal__close" type="button" aria-label="Close sign-in dialog">&times;</button>
                    <p class="auth-modal__eyebrow">MIDNIGHT ROAST</p>
                    <h2 id="auth-modal-title">Your cart is waiting</h2>
                    <p id="auth-modal-description">Sign in or create an account to continue to your cart.</p>
                    <div class="auth-modal__actions">
                        <a class="auth-modal__button auth-modal__button--primary" href="${root}pages/sign-in.html">Sign in</a>
                        <a class="auth-modal__button auth-modal__button--secondary" href="${root}pages/sign-up.html">Sign up</a>
                    </div>
                </dialog>`;
        }
    }
};
