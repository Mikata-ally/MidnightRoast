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

        const hideProduct = () => {
            circleText.classList.remove("show");
        };

        image.addEventListener("mouseenter", showProduct);
        image.addEventListener("focus", showProduct);
        image.addEventListener("mouseleave", hideProduct);
        image.addEventListener("blur", hideProduct);
    });
}
