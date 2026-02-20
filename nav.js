(() => {
  const NAV_ITEMS = [
    { emoji: "🗾", label: "Itinerary", href: "index.html" },
    { emoji: "🏨", label: "Hotels", href: "hotels.html" },
    { emoji: "🚄", label: "Transport", href: "transport.html" }
  ];

  const STYLE_ID = "japan-shared-nav-styles";

  const NAV_STYLES = `
    #japan-nav {
      position: relative;
      z-index: 60;
    }

    .japan-nav-shell {
      border-bottom: 1px solid rgba(16, 24, 40, 0.1);
      background: rgba(251, 248, 245, 0.88);
      backdrop-filter: blur(8px);
    }

    .japan-nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding-top: 10px;
      padding-bottom: 10px;
      flex-wrap: wrap;
    }

    .japan-nav-brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: inherit;
    }

    .japan-nav-seal {
      width: 36px;
      height: 36px;
      border-radius: 12px;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0) 55%), linear-gradient(135deg, var(--sakura, #f6c1d1), var(--zen, #2f7a6d));
      box-shadow: 0 10px 18px rgba(16, 24, 40, 0.12);
      display: grid;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, 0.55);
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      color: #fff;
      font-weight: 800;
      letter-spacing: 0.4px;
    }

    .japan-nav-brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }

    .japan-nav-brand-text strong {
      font-family: Fraunces, serif;
      font-weight: 700;
      font-size: 14px;
    }

    .japan-nav-brand-text small {
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      color: var(--muted, #667085);
      font-size: 12px;
    }

    .japan-nav-links ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .japan-nav-link,
    .japan-nav-soon {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      font-size: 13px;
      font-weight: 600;
      border-radius: 999px;
      padding: 8px 12px;
      border: 1px solid rgba(16, 24, 40, 0.1);
      background: rgba(255, 255, 255, 0.72);
      color: inherit;
      white-space: nowrap;
    }

    .japan-nav-link:hover {
      transform: translateY(-1px);
      border-color: rgba(16, 24, 40, 0.18);
      background: #fff;
    }

    .japan-nav-link.active {
      background: rgba(47, 122, 109, 0.14);
      border-color: rgba(47, 122, 109, 0.35);
      color: var(--zen, #2f7a6d);
    }

    .japan-nav-soon {
      color: var(--muted, #667085);
      background: rgba(255, 255, 255, 0.5);
      border-style: dashed;
    }

    .japan-nav-soon-badge {
      font-size: 11px;
      padding: 3px 7px;
      border-radius: 999px;
      border: 1px solid rgba(16, 24, 40, 0.12);
      background: rgba(246, 193, 209, 0.2);
      color: var(--indigo, #1e2a4a);
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    @media (max-width: 760px) {
      .japan-nav-inner {
        align-items: flex-start;
      }

      .japan-nav-links ul {
        justify-content: flex-start;
      }
    }
  `;

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = NAV_STYLES;
    document.head.appendChild(style);
  }

  function currentPageName() {
    const path = window.location.pathname.split("/").pop();
    return path && path.length ? path.toLowerCase() : "index.html";
  }

  async function resolveAvailability(items) {
    const checks = items.map(async (item) => {
      try {
        const response = await fetch(item.href, { method: "HEAD", cache: "no-store" });
        return { ...item, available: response.ok };
      } catch (_err) {
        return { ...item, available: false };
      }
    });

    return Promise.all(checks);
  }

  function navItemMarkup(item, currentPage) {
    const isActive = item.href.toLowerCase() === currentPage;
    const label = `${item.emoji} ${item.label}`;

    if (!item.available && !isActive) {
      return `
        <span class="japan-nav-soon" role="listitem" aria-disabled="true" title="${item.label} page coming soon">
          <span>${label}</span>
          <span class="japan-nav-soon-badge">Coming soon</span>
        </span>
      `;
    }

    return `
      <a class="japan-nav-link${isActive ? " active" : ""}" role="listitem" href="${item.href}"${isActive ? " aria-current=\"page\"" : ""}>${label}</a>
    `;
  }

  async function injectNav() {
    const mount = document.getElementById("japan-nav");
    if (!mount) return;

    ensureStyles();

    let template = "";
    try {
      const response = await fetch("nav.html", { cache: "no-store" });
      if (response.ok) template = await response.text();
    } catch (_err) {
      template = "";
    }

    if (!template.trim()) {
      template = `
        <header class="japan-nav-shell" role="navigation" aria-label="Trip pages">
          <div class="container japan-nav-inner">
            <a class="japan-nav-brand" href="index.html">
              <span class="japan-nav-seal" aria-hidden="true">JP</span>
              <span class="japan-nav-brand-text"><strong>Japan Family Adventure</strong><small>Family travel hub</small></span>
            </a>
            <nav class="japan-nav-links" aria-label="Site pages"><ul data-nav-list></ul></nav>
          </div>
        </header>
      `;
    }

    mount.innerHTML = template;

    const list = mount.querySelector("[data-nav-list]");
    if (!list) return;

    const currentPage = currentPageName();
    const items = await resolveAvailability(NAV_ITEMS);
    list.innerHTML = items.map((item) => `<li>${navItemMarkup(item, currentPage)}</li>`).join("");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectNav);
  } else {
    injectNav();
  }
})();
