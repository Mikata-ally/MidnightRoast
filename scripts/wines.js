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
                <button class="shop-button" type="button" data-add-wine="${wine.id}" ${wine.stock < 1 ? "disabled" : ""}>Add to cart</button>
            </div>
        </article>`).join("");

    wineGrid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-add-wine]");
        if (!button) return;
        if (session?.role !== "customer") {
            try { localStorage.setItem("midnightRoastPendingWine", button.dataset.addWine); } catch { /* demo storage may be disabled */ }
            document.querySelector(".auth-modal")?.showModal();
            return;
        }
        const cart = WineStore.readCart();
        const existing = cart.find((item) => item.id === button.dataset.addWine);
        if (existing) existing.quantity += 1;
        else cart.push({ id: button.dataset.addWine, quantity: 1 });
        WineStore.saveCart(cart);
        button.textContent = "Added to cart";
        window.setTimeout(() => { button.textContent = "Add to cart"; }, 1200);
    });
}
