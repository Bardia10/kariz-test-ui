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


/* ============================================================
TRADE-HISTORY PAGINATION

Rows remain ordinary HTML for easy future replacement with real data.
This script shows one page at a time and creates numbered page buttons.
============================================================ */
(() => {
    const table = document.querySelector("[data-paginated-table]");

    if (!table) {
        return;
    }

    const rows = Array.from(table.querySelectorAll("[data-history-row]"));
    const pageSize = Number(table.dataset.pageSize) || 6;
    const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
    const previousButton = document.querySelector("[data-pagination-prev]");
    const nextButton = document.querySelector("[data-pagination-next]");
    const pagesContainer = document.querySelector("[data-pagination-pages]");
    let currentPage = 1;

    const render = () => {
        const firstVisibleIndex = (currentPage - 1) * pageSize;
        const lastVisibleIndex = firstVisibleIndex + pageSize;

        rows.forEach((row, index) => {
            row.hidden = index < firstVisibleIndex || index >= lastVisibleIndex;
        });

        previousButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === pageCount;

        pagesContainer.querySelectorAll("button").forEach((button, index) => {
            const pageNumber = index + 1;
            if (pageNumber === currentPage) {
                button.setAttribute("aria-current", "page");
            } else {
                button.removeAttribute("aria-current");
            }
        });
    };

    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = String(pageNumber);
        button.setAttribute("aria-label", `Go to page ${pageNumber}`);
        button.addEventListener("click", () => {
            currentPage = pageNumber;
            render();
        });
        pagesContainer.append(button);
    }

    previousButton.addEventListener("click", () => {
        currentPage = Math.max(1, currentPage - 1);
        render();
    });

    nextButton.addEventListener("click", () => {
        currentPage = Math.min(pageCount, currentPage + 1);
        render();
    });

    render();
})();


/* ============================================================
HOME ACCOUNT CHANGE REQUEST

The demo updates the visible values locally and confirms submission.
Replace the submit body with a real API request when a backend exists.
============================================================ */
(() => {
    const view = document.querySelector("[data-account-view]");
    const form = document.querySelector("[data-account-form]");

    if (!view || !form) {
        return;
    }

    const editButton = document.querySelector("[data-account-edit]");
    const cancelButton = document.querySelector("[data-account-cancel]");
    const message = document.querySelector("[data-account-status-message]");

    const setEditing = (isEditing) => {
        view.hidden = isEditing;
        form.hidden = !isEditing;
        if (isEditing) {
            form.querySelector("input, select")?.focus();
        }
    };

    editButton.addEventListener("click", () => {
        message.textContent = "";
        setEditing(true);
    });

    cancelButton.addEventListener("click", () => {
        form.reset();
        message.textContent = "";
        setEditing(false);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const statusValue = String(data.get("status"));
        const statusLabel = statusValue.charAt(0).toUpperCase() + statusValue.slice(1);

        document.querySelector('[data-account-value="username"]').textContent = data.get("username");
        document.querySelector('[data-account-value="userId"]').textContent = data.get("userId");
        document.querySelector('[data-account-value="memberSince"]').textContent = data.get("memberSince");

        const status = document.querySelector('[data-account-value="status"]');
        status.textContent = statusLabel;
        status.className = `account-status account-status--${statusValue}`;
        status.dataset.accountValue = "status";

        message.textContent = "Change request submitted.";
        setEditing(false);
    });
})();

/* ============================================================
DYNAMIC GEM PRICE TEXT FITTING

Each price starts at --gem-price-max-font-size and shrinks by the
configured step until it fits, stopping at --gem-price-min-font-size.
============================================================ */
(() => {
    const buttons = Array.from(
        document.querySelectorAll(".product-price:not(.info-card-sell)")
    );

    if (buttons.length === 0) {
        return;
    }

    const rootStyle = getComputedStyle(document.documentElement);
    const minimum = parseFloat(rootStyle.getPropertyValue("--gem-price-min-font-size")) || 12;
    const maximum = parseFloat(rootStyle.getPropertyValue("--gem-price-max-font-size")) || 21;
    const step = parseFloat(rootStyle.getPropertyValue("--gem-price-fit-step")) || 0.5;

    const fitButton = (button) => {
        let size = maximum;
        button.style.fontSize = `${size}px`;

        while (button.scrollWidth > button.clientWidth + 1 && size > minimum) {
            size = Math.max(minimum, size - step);
            button.style.fontSize = `${size}px`;
        }
    };

    const fitAll = () => buttons.forEach(fitButton);
    const observer = new ResizeObserver(fitAll);
    buttons.forEach((button) => observer.observe(button));
    document.fonts?.ready.then(fitAll);
    fitAll();
})();
