// A classic script works for both file:// previews and pages served over HTTP.
window.SiteComponents?.render();

if (document.body.classList.contains("home-page")) {
    initializeHomePage();
} else if (document.body.classList.contains("our-story-page")) {
    initializeStoryPage();
}
initializeCartPrompt();

function initializeCartPrompt() {
    const cartLink = document.querySelector(".cart-link");
    const modal = document.querySelector(".auth-modal");
    if (!cartLink || !modal) return;

    const openModal = () => {
        if (!modal.open) modal.showModal();
    };

    cartLink.addEventListener("click", (event) => {
        event.preventDefault();
        openModal();
    });

    modal.querySelector(".auth-modal__close")?.addEventListener("click", () => modal.close());
    modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.close();
    });
}

function initializeHomePage() {
    const circleText = document.getElementById("circleText");
    const wave2 = document.querySelector(".wave2");
    if (!circleText || !wave2) return;

    document.querySelectorAll(".sec3 .box[data-color]").forEach((box) => {
        const image = box.querySelector("img");
        if (!image) return;

        const showProduct = () => {
            wave2.style.background = box.dataset.color;
            circleText.textContent = box.dataset.text ?? "";
            circleText.classList.add("show");
        };
        const hideProduct = () => circleText.classList.remove("show");

        image.addEventListener("mouseenter", showProduct);
        image.addEventListener("focus", showProduct);
        image.addEventListener("mouseleave", hideProduct);
        image.addEventListener("blur", hideProduct);
    });
}

function initializeStoryPage() {
    const timelineEntries = document.querySelectorAll(".sec2 .container");
    if (!timelineEntries.length) return;

    const revealVisibleEntries = () => {
        timelineEntries.forEach((entry) => {
            const bounds = entry.getBoundingClientRect();
            if (bounds.top < window.innerHeight && bounds.bottom > 0) {
                entry.classList.add("show");
            }
        });
    };

    document.addEventListener("scroll", revealVisibleEntries, { passive: true });
    revealVisibleEntries();
}
