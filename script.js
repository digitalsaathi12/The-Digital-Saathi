const API_BASE_URL = "https://the-digital-saathi-backend.onrender.com";

(() => {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const saved = localStorage.getItem("ds-theme");
    if (saved) root.setAttribute("data-theme", saved);
    const updateThemeIcon = () => {
        if (!toggle) return;
        const dark = root.getAttribute("data-theme") === "dark";
        toggle.innerHTML = dark
            ? '<i class="bi bi-sun"></i>'
            : '<i class="bi bi-moon-stars"></i>';
        toggle.setAttribute(
            "aria-label",
            dark ? "Switch to light mode" : "Switch to dark mode",
        );
        toggle.setAttribute(
            "title",
            dark ? "Switch to light mode" : "Switch to dark mode",
        );
    };
    updateThemeIcon();
    toggle?.addEventListener("click", () => {
        const dark = root.getAttribute("data-theme") !== "dark";
        root.setAttribute("data-theme", dark ? "dark" : "light");
        localStorage.setItem("ds-theme", dark ? "dark" : "light");
        updateThemeIcon();
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const back = document.getElementById("backToTop");
    if (back) {
        window.addEventListener(
            "scroll",
            () => back.classList.toggle("show", window.scrollY > 600),
            { passive: true },
        );
        back.addEventListener("click", () =>
            window.scrollTo({ top: 0, behavior: "smooth" }),
        );
    }

    document
        .querySelectorAll("#mainNav .nav-link, #mainNav .dropdown-item")
        .forEach((link) =>
            link.addEventListener("click", () => {
                const nav = document.getElementById("mainNav");
                if (nav?.classList.contains("show"))
                    bootstrap.Collapse.getOrCreateInstance(nav).hide();
            }),
        );
})();

document.querySelectorAll(".dropdown-menu .dropdown-item").forEach((link) => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});

// ===============================
// BLOG API
// ===============================

// ===============================
// BLOG API
// ===============================

const blogsContainer = document.getElementById("blogsContainer");

if (blogsContainer) {
    const API_URL = "http://127.0.0.1:8000/api/blogs/";

    async function loadBlogs() {
        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const blogs = await response.json();

            console.log("Blogs received:", blogs);

            blogsContainer.innerHTML = "";

            if (!blogs.length) {
                blogsContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <p>No blogs published yet.</p>
                    </div>
                `;
                return;
            }

            blogs.forEach((blog, index) => {
                const imageUrl = blog.featured_image || "";

                const cleanContent = blog.content
                    ? blog.content.replace(/<[^>]*>/g, "")
                    : "";

                const excerpt =
                    cleanContent.length > 150
                        ? cleanContent.substring(0, 150) + "..."
                        : cleanContent;

                const publishedDate = blog.published_at
                    ? new Date(blog.published_at).getFullYear()
                    : "";

                blogsContainer.innerHTML += `
                    <div class="col-md-6 col-lg-4">

                        <article class="blog-card">

                            <div class="blog-cover">
    ${
        imageUrl
            ? `
                <img
                    src="${imageUrl}"
                    alt="${blog.title}"
                    class="blog-image"
                >
            `
            : `<span>BLOG</span>`
    }
</div>

                            <div class="blog-body">

                                <div class="blog-meta mb-3">
                                    Digital Growth · ${publishedDate}
                                </div>

                                <h3>
                                    ${blog.title}
                                </h3>

                                <p>
                                    ${excerpt}
                                </p>

                                <a
                                    class="fw-bold"
                                    href="blog-detail.html?slug=${encodeURIComponent(blog.slug)}"
                                >
                                    Read article
                                    <i class="bi bi-arrow-up-right ms-1"></i>
                                </a>

                            </div>

                        </article>

                    </div>
                `;
            });
        } catch (error) {
            console.error("Blog API Error:", error);

            blogsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p>Unable to load blogs right now.</p>
                </div>
            `;
        }
    }

    loadBlogs();
}

/* ================================= HOME PAGE ====================================== */

(() => {
    const ecosystem = document.querySelector("[data-ds-parallax]");
    if (
        ecosystem &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        ecosystem.addEventListener("pointermove", (event) => {
            const bounds = ecosystem.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            ecosystem.style.setProperty("--ds-pointer-x", `${x * 5}deg`);
            ecosystem.style.setProperty("--ds-pointer-y", `${-y * 5}deg`);
        });
        ecosystem.addEventListener("pointerleave", () => {
            ecosystem.style.setProperty("--ds-pointer-x", "0deg");
            ecosystem.style.setProperty("--ds-pointer-y", "0deg");
        });
    }
})();



/* ================================= ABOUT PAGE ====================================== */

(() => {
    const sculpture = document.querySelector("[data-ds-sculpture]");
    const sculptureMark = sculpture?.querySelector(".ds-sculpture-mark");
    if (
        sculpture &&
        sculptureMark &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        sculpture.addEventListener("pointermove", (event) => {
            const bounds = sculpture.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            sculptureMark.style.setProperty("--ds-sculpture-x", `${x * 7}deg`);
            sculptureMark.style.setProperty("--ds-sculpture-y", `${-y * 6}deg`);
        });
        sculpture.addEventListener("pointerleave", () => {
            sculptureMark.style.setProperty("--ds-sculpture-x", "0deg");
            sculptureMark.style.setProperty("--ds-sculpture-y", "0deg");
        });
    }
})();


/* ================================= ABOUT PAGE ====================================== */
(() => {
    const commandCenter = document.querySelector("#dsConceptCommand");
    if (commandCenter) {
        const line = commandCenter.querySelector("[data-ds-command-line]");
        const area = commandCenter.querySelector("[data-ds-command-area]");
        const ranges = {
            "7D": "M0 145 C55 152 72 116 130 125 S205 84 260 100 S334 54 390 73 S470 48 520 39 S565 28 600 14",
            "30D": "M0 150 C60 140 70 120 130 128 S210 92 260 105 S340 72 390 82 S470 34 520 49 S565 27 600 14",
            "90D": "M0 160 C56 148 78 137 130 142 S205 111 260 116 S337 93 390 95 S466 63 520 65 S565 36 600 14",
        };
        commandCenter.querySelectorAll("[data-ds-range]").forEach((button) => {
            button.addEventListener("click", () => {
                const range = button.dataset.dsRange;
                commandCenter
                    .querySelectorAll("[data-ds-range]")
                    .forEach((item) =>
                        item.setAttribute(
                            "aria-pressed",
                            String(item === button),
                        ),
                    );
                line.setAttribute("d", ranges[range]);
                area.setAttribute("d", `${ranges[range]} V180 H0Z`);
                line.style.animation = "none";
                void line.getBoundingClientRect();
                line.style.animation = "";
            });
        });
    }
})();
