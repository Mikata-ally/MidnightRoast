const wineGrid = document.getElementById("wine-grid");
if (wineGrid && window.WineStore) {
    const wines = window.WineStore.readInventory();
    const session = (() => {
        try { return JSON.parse(localStorage.getItem("midnightRoastSession")); } catch { return null; }
    })();
    wineGrid.innerHTML = wines.map((wine) => `
        <article class="wine-card">
            <a class="wine-card__image" href="store.html" aria-label="Learn about ${wine.name}">
                <img src="../img/${wine.image}" alt="${wine.name}">
            </a>
            <div class="wine-card__details">
                <p class="wine-card__type">${wine.type} · ${wine.stock > 0 ? "In stock" : "Sold out"}</p>
                <h2>${wine.name}</h2>
                <p>${wine.notes}</p>
                <strong>${WineStore.money(wine.price)}</strong>
                <label class="wine-card__quantity">Quantity
                    <input type="number" min="1" max="${Math.max(1, wine.stock)}" value="1" ${wine.stock < 1 ? "disabled" : ""} aria-label="Quantity for ${wine.name}">
                </label>
                <button class="shop-button" type="button" data-add-wine="${wine.id}" ${wine.stock < 1 ? "disabled" : ""}>Add to cart</button>
                <p class="wine-card__status" aria-live="polite"></p>
            </div>
        </article>`).join("");

    wineGrid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-add-wine]");
        if (!button) return;
        const wine = wines.find((item) => item.id === button.dataset.addWine);
        const card = button.closest(".wine-card");
        const quantityInput = card.querySelector(".wine-card__quantity input");
        const status = card.querySelector(".wine-card__status");
        const quantity = Math.max(1, Math.min(wine.stock, Number.parseInt(quantityInput.value, 10) || 1));
        quantityInput.value = quantity;

        if (session?.role !== "customer") {
            try { localStorage.setItem("midnightRoastPendingWine", wine.id); } catch { /* demo storage may be disabled */ }
            document.querySelector(".auth-modal")?.showModal();
            return;
        }

        const cart = WineStore.readCart();
        const existing = cart.find((item) => item.id === wine.id);
        const alreadyInCart = existing?.quantity || 0;
        if (alreadyInCart + quantity > wine.stock) {
            status.textContent = `Only ${Math.max(0, wine.stock - alreadyInCart)} more available.`;
            return;
        }
        if (existing) existing.quantity += quantity;
        else cart.push({ id: wine.id, quantity });
        WineStore.saveCart(cart);
        status.textContent = `${quantity} added to cart.`;
    });
}
