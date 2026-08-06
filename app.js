/* ============================================================
GEM-BUTTON LOADING OVERLAY

Any element with the .product-price class is treated as a gem
button. Clicking one displays the full-screen loading overlay for
the number of milliseconds stored in body[data-loading-duration].
The default HTML value is 5000, which means five seconds.
============================================================ */
(() => {
    const body = document.body;
    const overlay = document.querySelector(".loading-overlay");
    const gemButtons = document.querySelectorAll(".product-price");

    /* Stop safely if a page intentionally omits the loading overlay. */
    if (!overlay || gemButtons.length === 0) {
        return;
    }

    const requestedDuration = Number(body.dataset.loadingDuration);
    const loadingDuration = Number.isFinite(requestedDuration)
        ? requestedDuration
        : 5000;

    let loadingTimer = null;

    const hideLoadingOverlay = () => {
        overlay.classList.remove("is-active");
        overlay.setAttribute("aria-hidden", "true");
        body.classList.remove("is-loading");
        loadingTimer = null;
    };

    const showLoadingOverlay = () => {
        /* Ignore repeated clicks while an existing wait is active. */
        if (loadingTimer !== null) {
            return;
        }

        overlay.classList.add("is-active");
        overlay.setAttribute("aria-hidden", "false");
        body.classList.add("is-loading");

        loadingTimer = window.setTimeout(
            hideLoadingOverlay,
            loadingDuration
        );
    };

    gemButtons.forEach((button) => {
        button.addEventListener("click", showLoadingOverlay);
    });
})();
