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
