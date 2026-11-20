window.WineCatalog = [
    { id: "midnight-red", name: "Midnight Red 1968", type: "Red", price: 3670, stock: 18, image: "red.png", notes: "Bold, velvety notes with a smooth finish." },
    { id: "after-dark", name: "After Dark Reserve 1933", type: "Red", price: 6185, stock: 8, image: "dark.png", notes: "A deep reserve blend for slow evenings." },
    { id: "moonlit-rose", name: "Moonlit Rosé 1936", type: "Rosé", price: 4420, stock: 12, image: "rose.png", notes: "Bright fruit and a delicate floral finish." }
];

window.WineStore = {
    readInventory() {
        try {
            return JSON.parse(localStorage.getItem("midnightRoastInventory")) || window.WineCatalog;
        } catch {
            return window.WineCatalog;
        }
    },
    saveInventory(inventory) {
        localStorage.setItem("midnightRoastInventory", JSON.stringify(inventory));
    },
    readCart() {
        try {
            return JSON.parse(localStorage.getItem("midnightRoastCart")) || [];
        } catch {
            return [];
        }
    },
    saveCart(cart) {
        localStorage.setItem("midnightRoastCart", JSON.stringify(cart));
    },
    money(amount) {
        return `₱ ${Number(amount).toLocaleString("en-PH")}`;
    }
};
