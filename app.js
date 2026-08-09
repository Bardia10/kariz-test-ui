/* ============================================================
GEM-BUTTON LOADING OVERLAY

Only elements with data-show-loading-overlay use this legacy layer.
Gem buttons now open the transaction confirmation modal. Clicking one displays the full-screen loading overlay for
the number of milliseconds stored in body[data-loading-duration].
The default HTML value is 5000, which means five seconds.
============================================================ */
(() => {
    const body = document.body;
    const overlay = document.querySelector(".loading-overlay");
    const gemButtons = document.querySelectorAll("[data-show-loading-overlay]");

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
        button.textContent = pageNumber.toLocaleString("fa-IR");
        button.setAttribute("aria-label", `رفتن به صفحه ${pageNumber.toLocaleString("fa-IR")}`);
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
PER-PRODUCT RESPONSIVE TEXT AND LAYOUT

Each product is measured independently. Its title and prices shrink only
to their inline thresholds. If any one still cannot fit, only that product
switches to a two-row layout: title above, Sell and Buy below.
============================================================ */
(() => {
    const products = Array.from(document.querySelectorAll(".product"));

    if (products.length === 0) {
        return;
    }

    const readNumber = (name, fallback) => {
        const value = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(name)
        );
        return Number.isFinite(value) ? value : fallback;
    };

    const fitText = (element, maximum, minimum, step) => {
        let size = maximum;
        element.style.fontSize = `${size}px`;
        while (element.scrollWidth > element.clientWidth + 1 && size > minimum) {
            size = Math.max(minimum, size - step);
            element.style.fontSize = `${size}px`;
        }
        return element.scrollWidth <= element.clientWidth + 1;
    };

    const layoutProduct = (product) => {
        const title = product.querySelector(".product-name");
        const prices = Array.from(product.querySelectorAll(".product-price"));
        const titleMaximum = readNumber("--product-title-max-font-size", 18);
        const titleInlineMinimum = readNumber("--product-title-inline-min-font-size", 12);
        const priceMaximum = readNumber("--gem-price-max-font-size", 21);
        const priceInlineMinimum = readNumber("--product-price-inline-min-font-size", 12);
        const stackedMinimum = readNumber("--product-stacked-min-font-size", 10);
        const step = readNumber("--product-text-fit-step", 0.5);

        product.classList.remove("product--stacked");
        const titleFitsInline = fitText(title, titleMaximum, titleInlineMinimum, step);
        const pricesFitInline = prices.every((price) =>
            fitText(price, priceMaximum, priceInlineMinimum, step)
        );

        if (!titleFitsInline || !pricesFitInline) {
            product.classList.add("product--stacked");
            fitText(title, titleMaximum, stackedMinimum, step);
            prices.forEach((price) =>
                fitText(price, priceMaximum, stackedMinimum, step)
            );
        }
    };

    let frame = null;
    const layoutAll = () => {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            products.forEach(layoutProduct);
            frame = null;
        });
    };

    const observer = new ResizeObserver(layoutAll);
    products.forEach((product) => observer.observe(product));

    /* Re-run when live product names or prices are replaced by API data. */
    const contentObserver = new MutationObserver(layoutAll);
    products.forEach((product) => contentObserver.observe(product, {
        childList: true,
        characterData: true,
        subtree: true
    }));

    document.fonts?.ready.then(layoutAll);
    window.addEventListener("orientationchange", layoutAll);
    layoutAll();
})();


/* ============================================================
HOME MY INFO CHANGE REQUEST
============================================================ */
(() => {
    const view = document.querySelector("[data-user-info-view]");
    const form = document.querySelector("[data-user-info-form]");

    if (!view || !form) {
        return;
    }

    const editButton = document.querySelector("[data-user-info-edit]");
    const cancelButton = document.querySelector("[data-user-info-cancel]");
    const message = document.querySelector("[data-user-info-message]");
    const fields = [
        "firstName", "lastName", "phone", "email",
        "nationalId", "city", "address", "postalCode"
    ];

    const setEditing = (editing) => {
        view.hidden = editing;
        form.hidden = !editing;
        if (editing) {
            form.querySelector("input")?.focus();
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
        fields.forEach((field) => {
            const target = document.querySelector(`[data-user-value="${field}"]`);
            target.textContent = String(data.get(field));
        });
        message.textContent = "درخواست تغییر اطلاعات ثبت شد.";
        setEditing(false);
    });
})();

/* ============================================================
TRADE CONFIRMATION MODAL

Buy/sell buttons construct a sentence from operation + input + item,
calculate the final price, wait five seconds after confirmation, then
show the success state. Replace the timeout with a real API call later.
============================================================ */
(() => {
    const modal = document.querySelector("[data-trade-modal]");
    const triggers = document.querySelectorAll("[data-trade-operation]");

    if (!modal || triggers.length === 0) {
        return;
    }

    const body = document.body;
    const loadingOverlay = document.querySelector(".loading-overlay");
    const requestedPreModalDelay = Number(body.dataset.tradeModalLoadingDuration);
    const preModalDelay = Number.isFinite(requestedPreModalDelay)
        ? requestedPreModalDelay
        : 3000;
    let preModalTimer = null;
    const formState = modal.querySelector("[data-trade-modal-form]");
    const waitingState = modal.querySelector("[data-trade-modal-waiting]");
    const successState = modal.querySelector("[data-trade-modal-success]");
    const title = modal.querySelector("[data-trade-modal-title]");
    const input = modal.querySelector("[data-trade-input]");
    const inputLabel = modal.querySelector("[data-trade-input-label]");
    const unitPriceText = modal.querySelector("[data-trade-unit-price]");
    const totalText = modal.querySelector("[data-trade-total]");
    const confirmButton = modal.querySelector("[data-trade-confirm]");
    const confirmation = modal.querySelector("[data-trade-confirmation]");
    const closeButtons = modal.querySelectorAll("[data-trade-modal-close], [data-trade-modal-finish]");
    const requestedDelay = Number(body.dataset.tradeConfirmDuration);
    const confirmDelay = Number.isFinite(requestedDelay) ? requestedDelay : 5000;
    let current = null;
    let waitingTimer = null;

    const formatPrice = (value) => Math.round(value).toLocaleString("fa-IR");

    const setState = (state) => {
        formState.hidden = state !== "form";
        waitingState.hidden = state !== "waiting";
        successState.hidden = state !== "success";
    };

    const updateCalculation = () => {
        if (!current) return;
        const value = Math.max(0, Number(input.value) || 0);
        const operationWord = current.operation === "buy" ? "خرید" : "فروش";
        const direction = current.operation === "buy" ? "از ما" : "به ما";
        const localizedValue = value.toLocaleString("fa-IR");
        const amountText = current.mode === "amount"
            ? `${localizedValue} گرم ${current.item}`
            : `${localizedValue} × ${current.item}`;
        title.textContent = `${operationWord} ${amountText} ${direction}`;
        totalText.textContent = formatPrice(value * current.unitPrice);
        confirmButton.textContent = `تأیید ${operationWord}`;
    };

    const openModal = (button) => {
        current = {
            operation: button.dataset.tradeOperation,
            item: button.dataset.tradeItem,
            unitPrice: Number(button.dataset.tradeUnitPrice),
            mode: button.dataset.tradeInputMode
        };
        modal.dataset.tradeOperation = current.operation;
        input.value = "1";
        input.step = current.mode === "amount" ? "0.01" : "1";
        input.min = current.mode === "amount" ? "0.01" : "1";
        inputLabel.textContent = current.mode === "amount" ? "مقدار (گرم)" : "تعداد";
        unitPriceText.textContent = formatPrice(current.unitPrice);
        setState("form");
        updateCalculation();
        modal.hidden = false;
        body.classList.add("trade-modal-open");
        input.focus();
    };

    const closeModal = () => {
        if (!waitingState.hidden) return;
        modal.hidden = true;
        body.classList.remove("trade-modal-open");
        delete modal.dataset.tradeOperation;
        current = null;
    };

    const openModalAfterLoading = (button) => {
        if (preModalTimer !== null) return;

        loadingOverlay?.classList.add("is-active");
        loadingOverlay?.setAttribute("aria-hidden", "false");
        body.classList.add("is-loading");

        preModalTimer = window.setTimeout(() => {
            loadingOverlay?.classList.remove("is-active");
            loadingOverlay?.setAttribute("aria-hidden", "true");
            body.classList.remove("is-loading");
            preModalTimer = null;
            openModal(button);
        }, preModalDelay);
    };

    triggers.forEach((button) => {
        button.addEventListener("click", () => openModalAfterLoading(button));
    });
    input.addEventListener("input", updateCalculation);

    confirmButton.addEventListener("click", () => {
        const value = Math.max(0, Number(input.value) || 0);
        if (!current || value <= 0) {
            input.focus();
            return;
        }
        setState("waiting");
        waitingTimer = window.setTimeout(() => {
            const operationWord = current.operation === "buy" ? "خرید" : "فروش";
            confirmation.textContent = `${operationWord} ${current.item} برای شما تأیید شد.`;
            setState("success");
            waitingTimer = null;
        }, confirmDelay);
    });

    closeButtons.forEach((button) => button.addEventListener("click", closeModal));
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) closeModal();
    });
})();
