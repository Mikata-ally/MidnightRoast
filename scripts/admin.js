const inventoryBody = document.getElementById("inventory-body");
if (inventoryBody && window.WineStore) {
    let inventory = WineStore.readInventory();

    function renderInventory() {
        document.getElementById("admin-product-count").textContent = inventory.length;
        document.getElementById("admin-stock-count").textContent = inventory.reduce((sum, wine) => sum + Number(wine.stock), 0);
        inventoryBody.innerHTML = inventory.map((wine) => `
            <tr data-inventory-row="${wine.id}">
                <td><strong>${wine.name}</strong><small>${wine.type}</small></td>
                <td><input type="number" min="0" step="1" value="${wine.price}" aria-label="Price for ${wine.name}" data-price></td>
                <td><input type="number" min="0" step="1" value="${wine.stock}" aria-label="Stock for ${wine.name}" data-stock></td>
                <td><button class="shop-button shop-button--small" type="button" data-save-wine="${wine.id}">Save</button></td>
            </tr>`).join("");
    }

    inventoryBody.addEventListener("click", (event) => {
        const button = event.target.closest("[data-save-wine]");
        if (!button) return;
        const row = button.closest("tr");
        const wine = inventory.find((item) => item.id === button.dataset.saveWine);
        wine.price = Number(row.querySelector("[data-price]").value);
        wine.stock = Number(row.querySelector("[data-stock]").value);
        WineStore.saveInventory(inventory);
        renderInventory();
    });

    renderInventory();
}
