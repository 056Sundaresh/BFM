
// ========================================
// DOM Helpers
// ========================================

const $ = (selector, context = document) =>
    context.querySelector(selector);

const $$ = (selector, context = document) =>
    [...context.querySelectorAll(selector)];


// ========================================
// Main Elements
// ========================================

const nav = $(".nav");
const progress = $(".progress i");
const toTop = $(".to-top");
const menu = $(".mobile-menu");
const toggle = $(".menu-toggle");


// ========================================
// Scroll Handling
// ========================================

function onScroll() {
    const y = scrollY;

    const max =
        document.documentElement.scrollHeight - innerHeight;

    // Scroll progress
    if (progress) {
        progress.style.width = `${max ? (y / max) * 100 : 0}%`;
    }

    // Navbar scroll effect
    if (nav) {
        nav.classList.toggle("scrolled", y > 24);
    }

    // Back-to-top button
    if (toTop) {
        toTop.classList.toggle("visible", y > 500);
    }

    // Active navigation link
    let current = "home";

    $$("main section[id]").forEach((section) => {
        if (y >= section.offsetTop - 140) {
            current = section.id;
        }
    });

    $$(".nav nav a").forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
}

addEventListener("scroll", onScroll, {
    passive: true
});

onScroll();


// ========================================
// Mobile Menu
// ========================================

if (toggle && menu) {
    toggle.addEventListener("click", () => {
        const open = menu.classList.toggle("open");

        toggle.classList.toggle("open", open);

        toggle.setAttribute(
            "aria-expanded",
            open
        );
    });
}


// Close mobile menu after clicking a link

$$(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        if (menu) {
            menu.classList.remove("open");
        }

        if (toggle) {
            toggle.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
});


// ========================================
// Back To Top
// ========================================

if (toTop) {
    toTop.addEventListener("click", () => {
        scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ========================================
// Scroll Reveal Animation
// ========================================

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");

                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

$$(".reveal").forEach((element) => {
    observer.observe(element);
});


// ========================================
// Modal Elements
// ========================================

const modal = $(".modal");
const programModal = $(".program-modal");
const form = $("form");

if (modal?.classList.contains("open")) {
    document.body.style.overflow = "hidden";

    if (form && !$(".success.show", modal)) {
        setTimeout(() => {
            $('[aria-invalid="true"]', form)?.focus();
        }, 50);
    }
}


// ========================================
// Close Modal Function
// ========================================

function closeModal(modalElement) {
    if (!modalElement) return;

    modalElement.classList.remove("open");

    modalElement.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}


// ========================================
// Open Registration Modal
// ========================================

function openModal(program) {
    if (!modal) return;

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

    // Select program automatically
    if (program) {
        const select = $(
            '[name="program"]',
            modal
        );

        if (select) {
            const optionExists = [
                ...select.options
            ].some(
                (option) =>
                    option.value === program
            );

            if (optionExists) {
                select.value = program;
            }
        }
    }

    // Focus and reveal the first form field
    setTimeout(() => {
        const firstField = form?.querySelector("input[required], select[required]");

        firstField?.focus();
        firstField?.scrollIntoView({ block: "center" });
    }, 50);
}


// ========================================
// Registration Modal Buttons
// ========================================

$$("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => {
        closeModal(programModal);

        openModal(button.dataset.program);
    });
});


// ========================================
// Close Buttons
// ========================================

$$(".close").forEach((button) => {
    button.addEventListener("click", () => {
        closeModal(
            button.closest(".modal")
        );
    });
});


// ========================================
// Close Modal When Clicking Outside
// ========================================

$$(".modal").forEach((modalElement) => {
    modalElement.addEventListener("click", (event) => {
        if (event.target === modalElement) {
            closeModal(modalElement);
        }
    });
});


// ========================================
// Escape Key
// ========================================

addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        $$(".modal.open").forEach(
            closeModal
        );
    }
});


// ========================================
// Program Information
// ========================================

const info = {
    AI: [
        "Artificial Intelligence",
        "A practical introduction to AI, Generative AI, prompt engineering and responsible creation."
    ],

    "Digital Marketing": [
        "Digital Marketing",
        "A practical foundation in digital strategy, content, search, social media and analytics."
    ],

    "Robotics & Automation": [
        "Robotics & Automation",
        "Explore physical computing, sensors, Arduino and automation through hands-on projects."
    ],

    "IT & Agile Skills": [
        "IT & Agile Skills",
        "Build confidence with modern IT foundations, agile thinking and team workflows."
    ]
};


// ========================================
// Program Information Modal
// ========================================

$$("[data-program]").forEach((button) => {
    button.addEventListener("click", () => {

        // Ignore buttons that open registration modal
        if (button.hasAttribute("data-modal")) {
            return;
        }

        const [title, copy] =
            info[button.dataset.program] ||
            info.AI;

        const titleElement =
            $(".program-title");

        const infoElement =
            $(".program-info");

        if (titleElement) {
            titleElement.textContent = title;
        }

        if (infoElement) {
            infoElement.textContent = copy;
        }

        if (programModal) {
            programModal.classList.add("open");

            programModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";
        }
    });
});


// ========================================
// Form Validation
// ========================================

function validate(input) {
    const bad = !input.checkValidity();

    input.classList.toggle("invalid", bad);
    input.setAttribute("aria-invalid", String(bad));

    const errorBox = input.closest("label")?.querySelector(".error-message");

    if (errorBox) {
        const customMessage = input.dataset.errorMessage || "Please fill out this field.";

        errorBox.hidden = !bad;
        const messageNode = errorBox.querySelector("span:last-child");

        if (messageNode) {
            messageNode.textContent = customMessage;
        }
    }

    return !bad;
}

if (form) {
    const requiredFields = $$('input[required], select[required]', form);

    requiredFields.forEach((field) => {
        if (field.getAttribute("aria-invalid") === "true") {
            field.classList.add("invalid");
        }

        field.addEventListener("input", () => validate(field));
        field.addEventListener("blur", () => validate(field));
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const valid = requiredFields.map(validate).every(Boolean);

        if (!valid) {
            const firstInvalid = $("input.invalid, select.invalid", form);
            firstInvalid?.focus();
            return;
        }

        form.submit();
    });
}


// ========================================
// Close Success Message
// ========================================

const closeSuccess = $(".close-success");

if (closeSuccess) {
    closeSuccess.addEventListener("click", () => {

        closeModal(modal);

        setTimeout(() => {

            // Reset form
            form?.reset();

            if (form) {
                form.style.display = "";
            }

            // Hide success message
            $(".success", modal)?.classList.remove(
                "show"
            );

        }, 300);
    });
}

