// A classic script works for both file:// previews and pages served over HTTP.
window.SiteComponents?.render();

if (document.body.classList.contains("home-page")) {
    initializeHomePage();
} else if (document.body.classList.contains("our-story-page")) {
    initializeStoryPage();
}
initializeCartPrompt();
initializeDemoAccounts();
initializeAccountAccess();

function readDemoSession() {
    try {
        return JSON.parse(localStorage.getItem("midnightRoastSession"));
    } catch {
        return null;
    }
}

function initializeCartPrompt() {
    const modal = document.querySelector(".auth-modal");
    if (!modal) return;

    const openModal = () => {
        const status = modal.querySelector(".auth-modal__status");
        if (status) status.textContent = "";
        if (!modal.open) modal.showModal();
    };

    document.querySelectorAll(".cart-link, .auth-open, .auth-modal-trigger").forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            if (trigger.matches("a")) event.preventDefault();
            if (trigger.matches(".cart-link") && readDemoSession()?.role === "customer") {
                window.location.href = `${document.body.dataset.root || ""}pages/customer.html#cart`;
                return;
            }
            openModal();
        });
    });

    modal.querySelector(".auth-modal__close")?.addEventListener("click", () => modal.close());
    modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.close();
    });

}

function initializeDemoAccounts() {
    const modal = document.querySelector(".auth-modal");
    const form = modal?.querySelector(".auth-modal__email-form");
    if (!form) return;

    const demoAccounts = [
        { email: "customer@midnightroast.test", password: "roast123", role: "customer" },
        { email: "admin@midnightroast.test", password: "cellar123", role: "admin" }
    ];

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = form.elements.email.value.trim().toLowerCase();
        const password = form.elements.password.value;
        const account = demoAccounts.find((item) => item.email === email && item.password === password);
        const status = modal.querySelector(".auth-modal__status");
        if (!account) {
            status.textContent = "Email or password did not match a demo account.";
            return;
        }

        try {
            localStorage.setItem("midnightRoastSession", JSON.stringify({ email: account.email, role: account.role }));
        } catch {
            status.textContent = "Sign-in storage is unavailable in this browser. Open the site through a local server.";
            return;
        }
        window.location.href = `${document.body.dataset.root || ""}pages/${account.role}.html`;
    });

    modal.querySelector(".auth-modal__button--google")?.addEventListener("click", () => {
        modal.querySelector(".auth-modal__status").textContent = "Google sign-in is not connected in this demo. Use the demo email accounts below.";
    });
}

function initializeAccountAccess() {
    const requiredRole = document.body.classList.contains("admin-page") ? "admin" :
        document.body.classList.contains("customer-page") ? "customer" : null;
    const session = readDemoSession();

    if (requiredRole && session?.role !== requiredRole) {
        const modal = document.querySelector(".auth-modal");
        if (modal && !modal.open) modal.showModal();
        const status = modal?.querySelector(".auth-modal__status");
        if (status) status.textContent = `Sign in with a ${requiredRole} demo account to view this page.`;
    } else if (requiredRole) {
        document.body.classList.add("account-authorized");
    }

    const email = document.getElementById("customer-email");
    if (email && session?.email) email.textContent = session.email;

    document.getElementById("sign-out")?.addEventListener("click", () => {
        localStorage.removeItem("midnightRoastSession");
        window.location.href = "../index.html";
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
