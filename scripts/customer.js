const customerGrid = document.getElementById("customer-wine-grid");
const customerCart = document.getElementById("customer-cart");

if (customerGrid && customerCart && window.WineStore) {
    const inventory = WineStore.readInventory();
    try {
        const pendingWineId = localStorage.getItem("midnightRoastPendingWine");
        if (pendingWineId && inventory.some((wine) => wine.id === pendingWineId)) {
            const cart = WineStore.readCart();
            const pendingItem = cart.find((item) => item.id === pendingWineId);
            if (pendingItem) pendingItem.quantity += 1;
            else cart.push({ id: pendingWineId, quantity: 1 });
            WineStore.saveCart(cart);
            localStorage.removeItem("midnightRoastPendingWine");
        }
    } catch { /* continue with an empty or saved cart when storage is disabled */ }
    customerGrid.innerHTML = inventory.map((wine) => `
        <article class="wine-card wine-card--compact">
            <a class="wine-card__image" href="wines.html" aria-label="View ${wine.name}"><img src="../img/${wine.image}" alt="${wine.name}"></a>
            <div class="wine-card__details"><p class="wine-card__type">${wine.type}</p><h3>${wine.name}</h3><strong>${WineStore.money(wine.price)}</strong>
            <button class="shop-button" type="button" data-add-wine="${wine.id}" ${wine.stock < 1 ? "disabled" : ""}>Add to cart</button></div>
        </article>`).join("");

    function renderCart() {
        const cart = WineStore.readCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cart-count").textContent = count;
        if (!cart.length) {
            customerCart.innerHTML = '<p class="empty-cart">Your cart is empty. Add a bottle from the collection above.</p>';
            return;
        }
        customerCart.innerHTML = cart.map((item) => {
            const wine = inventory.find((product) => product.id === item.id);
            if (!wine) return "";
            return `<article class="cart-row"><img src="../img/${wine.image}" alt=""><div><strong>${wine.name}</strong><span>${item.quantity} × ${WineStore.money(wine.price)}</span></div><button type="button" data-remove-wine="${wine.id}" aria-label="Remove ${wine.name}">Remove</button></article>`;
        }).join("");
    }

    customerGrid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-add-wine]");
        if (!button) return;
        const cart = WineStore.readCart();
        const item = cart.find((entry) => entry.id === button.dataset.addWine);
        if (item) item.quantity += 1;
        else cart.push({ id: button.dataset.addWine, quantity: 1 });
        WineStore.saveCart(cart);
        renderCart();
    });

    customerCart.addEventListener("click", (event) => {
        const button = event.target.closest("[data-remove-wine]");
        if (!button) return;
        WineStore.saveCart(WineStore.readCart().filter((item) => item.id !== button.dataset.removeWine));
        renderCart();
    });
    renderCart();
}
