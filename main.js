(() => {
  const {
    getMixedFeed,
    photographyCategories,
    photographyWorks,
    siteMeta,
    videoCategories,
    videoWorks,
    writingEntries,
    projectCategories,
    projectWorks
  } = window.SiteData || {};

  if (!window.SiteData) {
    throw new Error("SiteData failed to load before main.js");
  }

  const page = document.body.dataset.page;
  const params = new URLSearchParams(window.location.search);
  const state = {
    activeTab: params.get("tab") || "about",
    activePhotoCategory: params.get("category") || null,
    activeVideoCategory: params.get("category") || null,
    toastTimer: null,
    lightboxCategorySlug: null,
    lightboxIndex: 0,
    lightboxScale: 1
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function getOrCreateToast() {
    let toast = document.querySelector("[data-toast]");
    if (toast) {
      return toast;
    }

    toast = document.createElement("div");
    toast.className = "site-toast";
    toast.dataset.toast = "true";
    toast.hidden = true;
    document.body.appendChild(toast);
    return toast;
  }

  function showToast(message) {
    const toast = getOrCreateToast();
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add("is-visible");
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.hidden = true;
    }, 1500);
  }

  async function copyValue(value, message) {
    try {
      await navigator.clipboard.writeText(value);
      showToast(message);
    } catch {
      showToast(value);
    }
  }

  function iconMarkup(type) {
    const icons = {
      weibo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.7 12.3c1.8-4 5.2-6 9.3-6 4.2 0 7.6 2 9.3 6-1.7 4.1-5.1 6.1-9.3 6.1-4.1 0-7.5-2-9.3-6.1Zm9.3 3.5c2 0 3.6-1.6 3.6-3.5 0-2-1.6-3.6-3.6-3.6s-3.6 1.6-3.6 3.6c0 1.9 1.6 3.5 3.6 3.5Zm0-1.7a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8Z" fill="currentColor"/><path d="M5.5 7.7c.5-.9 1.2-1.7 2.1-2.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M8.6 6.2c.3-.8.8-1.5 1.5-2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
      wechat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.4 4.3c-4 0-7.1 2.6-7.1 6 0 1.9 1 3.5 2.6 4.6l-.8 2.7 2.9-1.4c.8.2 1.5.3 2.4.3 4 0 7.1-2.6 7.1-6s-3.1-6.2-7.1-6.2Zm-2.5 5.1a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Zm5 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" fill="currentColor"/><path d="M17.1 9.7c-3.2 0-5.8 2.1-5.8 4.8 0 2.6 2.6 4.8 5.8 4.8.6 0 1.2-.1 1.8-.2l2.3 1.1-.6-2c1.2-.8 1.9-2.1 1.9-3.7 0-2.7-2.4-4.8-5.4-4.8Zm-1.9 4.1a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Zm3.8 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z" fill="currentColor"/></svg>',
      xiaohongshu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5h9.8c1.5 0 2.7 1.2 2.7 2.7v11c0 .7-.6 1.3-1.3 1.3H8.1c-1.4 0-2.6-1.2-2.6-2.6V4.5Zm2 2v10.2c0 .4.3.8.8.8h7.8V7.3c0-.4-.3-.8-.8-.8H8Zm2.1 2.4h4.2v1.5h-4.2V8.9Zm0 3h4.2v1.5h-4.2v-1.5Zm0 3h2.8v1.5h-2.8v-1.5Z" fill="currentColor"/></svg>',
      phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.8 3.7c.5-.5 1.2-.7 1.9-.5l2 .7c.8.3 1.2 1 1.2 1.8l-.1 2c0 .5-.2 1-.6 1.4l-1.3 1.3a15 15 0 0 0 3.5 3.5l1.3-1.3c.4-.4.9-.6 1.4-.6l2-.1c.8 0 1.5.4 1.8 1.2l.7 2c.2.7 0 1.4-.5 1.9l-1.3 1.3c-.9.9-2.2 1.3-3.5 1.1-3.1-.5-6.3-2.6-9-5.3-2.7-2.7-4.8-5.9-5.3-9-.2-1.3.2-2.6 1.1-3.5l1.3-1.3Z" fill="currentColor"/></svg>',
      mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.2h16a1 1 0 0 1 1 1v9.6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7.2a1 1 0 0 1 1-1Zm8 5.8 7-4.4H5l7 4.4Zm0 1.8-7-4.4v5.8h14v-5.8l-7 4.4Z" fill="currentColor"/></svg>'
    };
    return icons[type] || "";
  }

  function initHeader() {
    const header = document.querySelector("[data-header]");
    if (!header) {
      return;
    }
    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initRevealObserver() {
    const items = document.querySelectorAll(".reveal-on-scroll:not(.is-visible)");
    if (!items.length) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -48px 0px"
      }
    );
    items.forEach((item) => observer.observe(item));
  }

  function renderHeaderActions() {
    const root = document.querySelector("[data-header-actions]");
    if (!root) {
      return;
    }
    root.innerHTML = `
      <a class="header-icon" href="${siteMeta.contact.weibo}" target="_blank" rel="noopener" aria-label="微博" title="微博">${iconMarkup("weibo")}</a>
      <a class="header-icon" href="${siteMeta.contact.xiaohongshu}" target="_blank" rel="noopener" aria-label="小红书" title="小红书">${iconMarkup("xiaohongshu")}</a>
      <button class="header-icon" type="button" data-wechat-trigger aria-label="微信二维码" title="微信">${iconMarkup("wechat")}</button>
      <button class="header-icon" type="button" data-copy-value="${siteMeta.contact.phone}" data-copy-label="电话已复制" aria-label="复制电话" title="电话">${iconMarkup("phone")}</button>
      <button class="header-icon" type="button" data-copy-value="${siteMeta.contact.email}" data-copy-label="邮箱已复制" aria-label="复制邮箱" title="邮箱">${iconMarkup("mail")}</button>
    `;
  }

  function openWechatModal() {
    const modal = document.querySelector("[data-wechat-modal]");
    if (!modal) {
      return;
    }
    modal.hidden = false;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeWechatModal() {
    const modal = document.querySelector("[data-wechat-modal]");
    if (!modal) {
      return;
    }
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modal.hidden = true;
  }

  function initWechatModal() {
    const modal = document.querySelector("[data-wechat-modal]");
    if (!modal) {
      return;
    }
    modal.hidden = true;
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeWechatModal();
      }
    });
    modal.querySelector("[data-modal-close]")?.addEventListener("click", closeWechatModal);
  }

  function initContactActions() {
    document.querySelectorAll("[data-wechat-trigger]").forEach((button) => {
      button.addEventListener("click", openWechatModal);
    });
    document.querySelectorAll("[data-copy-value]").forEach((button) => {
      button.addEventListener("click", () => {
        copyValue(button.dataset.copyValue, button.dataset.copyLabel || "已复制");
      });
    });
  }

  function buildDrawerSection(title, overviewHref, items) {
    return `
      <section class="drawer-section">
        <div class="drawer-section__head">
          <p>${title}</p>
          <a href="${overviewHref}">总览</a>
        </div>
        <div class="drawer-section__links">
          ${items.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
        </div>
      </section>
    `;
  }

  function renderDrawer() {
    const root = document.querySelector("[data-drawer-body]");
    if (!root) {
      return;
    }
    const photographyLinks = photographyCategories.map((item) => ({
      label: item.label,
      href: `./index.html?tab=photography&category=${item.slug}`
    }));
    const videoLinks = videoCategories.map((item) => ({
      label: item.label,
      href: `./index.html?tab=video&category=${item.slug}`
    }));
    const projectLinks = projectCategories.map((item) => ({
      label: item.label,
      href: `./project.html?category=${item.slug}`
    }));
    root.innerHTML = `
      ${buildDrawerSection("关于", "./about.html", [{ label: "合作", href: "./about.html#contact" }])}
      ${buildDrawerSection("项目", "./project.html", projectLinks)}
      ${buildDrawerSection("摄影", "./index.html?tab=photography", photographyLinks)}
      ${buildDrawerSection("视频", "./index.html?tab=video", videoLinks)}
      <section class="drawer-signature">
        <p class="drawer-signature__name">谢琬滢</p>
        <button class="drawer-signature__phone" type="button" data-copy-value="${siteMeta.contact.phone}" data-copy-label="电话已复制">${siteMeta.contact.phone}</button>
      </section>
      <section class="drawer-contacts" aria-label="联系方式">
        <p class="drawer-contacts__label">Contact</p>
        <div class="drawer-contacts__icons">
          <a href="${siteMeta.contact.weibo}" target="_blank" rel="noopener" aria-label="微博" title="微博">${iconMarkup("weibo")}</a>
          <a href="${siteMeta.contact.xiaohongshu}" target="_blank" rel="noopener" aria-label="小红书" title="小红书">${iconMarkup("xiaohongshu")}</a>
          <button type="button" data-wechat-trigger aria-label="微信二维码" title="微信">${iconMarkup("wechat")}</button>
          <button type="button" data-copy-value="${siteMeta.contact.phone}" data-copy-label="电话已复制" aria-label="复制电话" title="电话">${iconMarkup("phone")}</button>
          <button type="button" data-copy-value="${siteMeta.contact.email}" data-copy-label="邮箱已复制" aria-label="复制邮箱" title="邮箱">${iconMarkup("mail")}</button>
        </div>
        <div class="drawer-contacts__row">
          <span class="drawer-contacts__label">邮箱</span>
          <button type="button" data-copy-value="${siteMeta.contact.email}" data-copy-label="邮箱已复制" class="drawer-contacts__value">${siteMeta.contact.email}</button>
        </div>
        <div class="drawer-contacts__row">
          <span class="drawer-contacts__label">微信</span>
          <button type="button" data-wechat-trigger class="drawer-contacts__value">${siteMeta.contact.wechat || "Anniebyblue"}</button>
        </div>
      </section>
    `;
    // 重新绑定抽屉内的事件（抽屉是动态渲染的）
    initContactActions();
  }

  function initDrawer() {
    const drawer = document.querySelector("[data-drawer]");
    if (!drawer) {
      return;
    }
    drawer.hidden = true;
    document.querySelectorAll("[data-drawer-open]").forEach((button) => {
      button.addEventListener("click", () => {
        drawer.hidden = false;
        drawer.classList.add("is-open");
        drawer.setAttribute("aria-hidden", "false");
      });
    });
    document.querySelectorAll("[data-drawer-close]").forEach((button) => {
      button.addEventListener("click", () => {
        drawer.classList.remove("is-open");
        drawer.setAttribute("aria-hidden", "true");
        drawer.hidden = true;
      });
    });
    drawer.addEventListener("click", (event) => {
      if (event.target === drawer) {
        drawer.classList.remove("is-open");
        drawer.setAttribute("aria-hidden", "true");
        drawer.hidden = true;
      }
    });
  }

  function updateTabLinks() {
    document.querySelectorAll("[data-tab-link]").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.tabLink === state.activeTab);
    });
  }

  function getPhotographyWorksByCategory(slug) {
    return photographyWorks.filter((item) => item.categorySlug === slug);
  }

  function getPhotographyImagesByCategory(slug) {
    return getPhotographyCategoryBySlug(slug)?.images || [];
  }

  function getVideoWorksByCategory(slug) {
    return videoWorks.filter((item) => item.categorySlug === slug);
  }

  function getPhotographyCategoryBySlug(slug) {
    return photographyCategories.find((item) => item.slug === slug) || photographyCategories[0];
  }

  function getVideoCategoryBySlug(slug) {
    return videoCategories.find((item) => item.slug === slug) || videoCategories[0];
  }

  function getHeroContent() {
    if (state.activeTab === "photography") {
      return {
        eyebrow: "Photography",
        titleLines: ["让感知变得可见"],
        descriptionLines: ["从人像到空镜，以留白与时间组织图像"],
        image: siteMeta.hero.photography.image,
        mode: "photography"
      };
    }
    if (state.activeTab === "video") {
      return {
        eyebrow: "Films",
        titleLines: ["从生成的世界", "到流动的真实瞬间"],
        descriptionLines: ["不同的生成方式都在同一语法里并置"],
        image: siteMeta.hero.video.image,
        mode: "video"
      };
    }
    return {
      eyebrow: "About",
      titleLines: ["谢琬滢"],
      descriptionLines: ["影像/感知/系统", "在视觉创作与产品思维之间工作"],
      image: siteMeta.hero.about.image,
      mode: "about"
    };
  }

  function renderHomeHero() {
    const root = document.querySelector("[data-home-hero]");
    if (!root) {
      return;
    }
    const hero = getHeroContent();
    root.className = `home-hero home-hero--${hero.mode}`;
    root.innerHTML = `
      <div class="home-hero__media">
        <img src="${hero.image.src}" alt="${escapeHtml(hero.image.alt)}" />
      </div>
      <div class="home-hero__content">
        <p class="eyebrow">${hero.eyebrow}</p>
        <div class="hero-title-stack">
          ${hero.titleLines.map((line) => `<h1 class="hero-title-line">${line}</h1>`).join("")}
        </div>
        <div class="hero-copy-stack hero-copy-stack--${hero.mode}">
          ${hero.descriptionLines.map((line, index) => `<p class="hero-copy-line hero-copy-line--${index + 1}">${line}</p>`).join("")}
        </div>
      </div>
    `;
  }

  function updateFeedHead(meta) {
    const label = document.querySelector("[data-feed-label]");
    const title = document.querySelector("[data-feed-title]");
    const note = document.querySelector("[data-feed-note]");
    if (!label || !title || !note) {
      return;
    }
    label.textContent = meta.label || "";
    label.hidden = !meta.label;
    title.textContent = meta.title;
    note.textContent = meta.note || "";
    note.hidden = !meta.note;
  }

  function recentProjectCardMarkup(item) {
    const href = item.duration ? `./video-work.html?slug=${item.slug}` : `./series.html?slug=${item.slug}`;
    const type = item.duration ? "视频" : "摄影";
    return `
      <a class="project-card reveal-on-scroll" href="${href}">
        <div class="project-card__media">
          <img src="${item.cover.src}" alt="${escapeHtml(item.cover.alt)}" loading="lazy" />
        </div>
        <div class="project-card__body">
          <p class="project-card__meta">${type} / ${item.date}</p>
          <h3>${item.title}</h3>
        </div>
      </a>
    `;
  }

  function renderRecentProjects() {
    const root = document.querySelector("[data-feed-grid]");
    if (!root) {
      return;
    }
    updateFeedHead({
      label: "Recent Projects",
      title: "近期项目",
      note: ""
    });
    root.className = "feed-grid feed-grid--recent content-wide";
    root.innerHTML = getMixedFeed().slice(0, 6).map(recentProjectCardMarkup).join("");
  }

  function renderHomeResume() {
    const root = document.querySelector("[data-feed-grid]");
    if (!root) {
      return;
    }
    updateFeedHead({
      label: "",
      title: "About",
      note: ""
    });
    root.className = "feed-grid feed-grid--resume content-wide";
    root.innerHTML = `
      <section class="resume-block resume-block--intro reveal-on-scroll">
        <div class="resume-block__head"><h3>简介</h3></div>
        <div class="resume-block__body">
          <div class="resume-intro-copy">${siteMeta.about.summary.map((item) => `<p>${item}</p>`).join("")}</div>
        </div>
      </section>
      <section class="resume-block reveal-on-scroll">
        <div class="resume-block__head"><h3>关注领域</h3></div>
        <div class="resume-block__body resume-focus-tags">${siteMeta.about.focusAreas.map((item) => `<span class="focus-tag">${item}</span>`).join("")}</div>
      </section>
      <section class="resume-block reveal-on-scroll">
        <div class="resume-block__head"><h3>工作轨迹</h3></div>
        <div class="resume-block__body resume-experience-list">${siteMeta.about.experience
          .map(
            (item) => `
              <article class="resume-experience-item">
                <div class="resume-experience-item__meta">
                  <p>${item.period}</p>
                  <span>${item.organization}</span>
                </div>
                <div class="resume-experience-item__content">
                  <h4>${item.role}</h4>
                  <div>${item.points.map((point) => point.includes("×") ? `<p class="exp-subhead">${point}</p>` : `<p>${point}</p>`).join("")}</div>
                </div>
              </article>
            `
          )
          .join("")}</div>
      </section>
      <section class="resume-block reveal-on-scroll">
        <div class="resume-block__head"><h3>获奖经历</h3></div>
        <div class="resume-block__body resume-honor-list">${siteMeta.about.honors.map((item) => `<p>${item}</p>`).join("")}</div>
      </section>
      <footer class="resume-contact-row reveal-on-scroll">
        <span>${siteMeta.contact.phone}</span>
        <span>${siteMeta.contact.email}</span>
        <span>微博、小红书：安山阿</span>
      </footer>
    `;
    initContactActions();
  }

  function photographyCategoryCardMarkup(category) {
    const imageCount = getPhotographyImagesByCategory(category.slug).length;
    return `
      <a class="category-band reveal-on-scroll" href="./index.html?tab=photography&category=${category.slug}">
        <div class="category-band__content">
          <p class="category-band__eyebrow">Photography / ${category.label}</p>
          <h3>${category.label}</h3>
          <p>${imageCount} 张图片</p>
        </div>
        <div class="category-band__media">
          <img src="${category.hero}" alt="${escapeHtml(category.label)}" loading="lazy" />
        </div>
      </a>
    `;
  }

  function renderPhotographyLanding() {
    const root = document.querySelector("[data-feed-grid]");
    if (!root) {
      return;
    }
    updateFeedHead({
      label: "Photography",
      title: "分类画廊",
      note: ""
    });
    root.className = "feed-grid feed-grid--category-bands content-wide";
    root.innerHTML = photographyCategories.map(photographyCategoryCardMarkup).join("");
  }

  function flattenCategoryGallery(categorySlug) {
    return getPhotographyWorksByCategory(categorySlug).flatMap((work) =>
      work.gallery.map((image, index) => ({
        ...image,
        workSlug: work.slug,
        workTitle: work.title,
        workDate: work.date,
        workLocation: work.location,
        workCategory: work.category,
        index
      }))
    );
  }

  function photoCategoryNavMarkup(activeSlug) {
    return `
      <div class="category-nav">
        ${photographyCategories
          .map(
            (item) => `<a class="category-nav__link${item.slug === activeSlug ? " is-active" : ""}" href="./index.html?tab=photography&category=${item.slug}">${item.label}</a>`
          )
          .join("")}
      </div>
    `;
  }

  function initLightbox() {
    const modal = document.querySelector("[data-lightbox]");
    if (!modal) {
      return;
    }
    modal.hidden = true;
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeLightbox();
      }
    });
    modal.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
    window.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) {
        return;
      }
      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowRight") {
        shiftLightbox(1);
      }
      if (event.key === "ArrowLeft") {
        shiftLightbox(-1);
      }
    });
  }

  function getLightboxImages(categorySlug) {
    return getPhotographyImagesByCategory(categorySlug);
  }

  function updateLightboxScale(scale) {
    state.lightboxScale = Math.min(3, Math.max(1, scale));
    const image = document.querySelector("[data-lightbox-asset]");
    if (image) {
      image.style.transform = `scale(${state.lightboxScale})`;
    }
  }

  function shiftLightbox(direction) {
    const images = getLightboxImages(state.lightboxCategorySlug);
    if (!images.length) return;
    state.lightboxIndex = (state.lightboxIndex + direction + images.length) % images.length;
    state.lightboxScale = 1;
    refreshLightboxImage();
  }

  function refreshLightboxImage() {
    const images = getLightboxImages(state.lightboxCategorySlug);
    const item = images[state.lightboxIndex];
    if (!item) return;
    const asset = document.querySelector("[data-lightbox-asset]");
    if (asset) {
      asset.src = item;
      asset.style.transform = "scale(1)";
    }
    document.querySelectorAll("[data-lightbox-thumb]").forEach((btn) => {
      btn.classList.toggle("is-active", Number(btn.dataset.lightboxThumb) === state.lightboxIndex);
    });
  }

  function buildLightbox() {
    const modal = document.querySelector("[data-lightbox]");
    const meta = document.querySelector("[data-lightbox-meta]");
    const main = document.querySelector("[data-lightbox-main]");
    const sidebar = document.querySelector("[data-lightbox-sidebar]");
    if (!modal || !meta || !main || !sidebar) return;
    const images = getLightboxImages(state.lightboxCategorySlug);

    if (!meta.querySelector("[data-lightbox-zoom-out]")) {
      meta.innerHTML = `
        <button class="lightbox-action" type="button" data-lightbox-zoom-out>-</button>
        <button class="lightbox-action" type="button" data-lightbox-zoom-in>+</button>
      `;
      meta.querySelector("[data-lightbox-zoom-in]")?.addEventListener("click", () => updateLightboxScale(state.lightboxScale + 0.2));
      meta.querySelector("[data-lightbox-zoom-out]")?.addEventListener("click", () => updateLightboxScale(state.lightboxScale - 0.2));
    }

    if (!main.querySelector("[data-lightbox-prev]")) {
      main.innerHTML = `
        <button class="lightbox-nav lightbox-nav--prev" type="button" aria-label="上一张" data-lightbox-prev>‹</button>
        <div class="lightbox-stage"><img src="" alt="摄影作品预览" data-lightbox-asset /></div>
        <button class="lightbox-nav lightbox-nav--next" type="button" aria-label="下一张" data-lightbox-next>›</button>
      `;
      main.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => shiftLightbox(-1));
      main.querySelector("[data-lightbox-next]")?.addEventListener("click", () => shiftLightbox(1));
      main.querySelector(".lightbox-stage")?.addEventListener(
        "wheel",
        (event) => {
          event.preventDefault();
          updateLightboxScale(state.lightboxScale + (event.deltaY < 0 ? 0.12 : -0.12));
        },
        { passive: false }
      );
      const asset = main.querySelector("[data-lightbox-asset]");
      if (asset) {
        let dragging = false, dragStartX = 0, dragStartY = 0, panX = 0, panY = 0;
        let pinchStartDist = 0, pinchStartScale = 1;
        let touchStartX = 0, touchStartY = 0, touchStartTime = 0;
        const applyPan = () => { asset.style.transform = `scale(${state.lightboxScale}) translate(${panX}px, ${panY}px)`; };

        // ---- Desktop：鼠标拖动平移（仅放大时） ----
        asset.addEventListener("mousedown", (e) => {
          if (state.lightboxScale <= 1) return;
          dragging = true; dragStartX = e.clientX - panX; dragStartY = e.clientY - panY;
          asset.classList.add("is-dragging"); e.preventDefault();
        });
        window.addEventListener("mousemove", (e) => {
          if (!dragging) return;
          panX = e.clientX - dragStartX; panY = e.clientY - dragStartY; applyPan();
        });
        window.addEventListener("mouseup", () => {
          if (dragging) { dragging = false; asset.classList.remove("is-dragging"); }
        });

        // ---- Mobile：触摸滑动 + 双指缩放 + 拖动平移 ----
        const touchDist = (t) => {
          const dx = t[0].clientX - t[1].clientX;
          const dy = t[0].clientY - t[1].clientY;
          return Math.sqrt(dx * dx + dy * dy);
        };

        asset.addEventListener("touchstart", (e) => {
          if (e.touches.length === 2) {
            // 双指：开始 pinch
            pinchStartDist = touchDist(e.touches);
            pinchStartScale = state.lightboxScale;
            dragging = false;
            e.preventDefault();
            return;
          }
          if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
            if (state.lightboxScale > 1) {
              dragging = true;
              dragStartX = e.touches[0].clientX - panX;
              dragStartY = e.touches[0].clientY - panY;
            }
          }
        }, { passive: false });

        asset.addEventListener("touchmove", (e) => {
          if (e.touches.length === 2 && pinchStartDist > 0) {
            // pinch 缩放
            const dist = touchDist(e.touches);
            const nextScale = pinchStartScale * (dist / pinchStartDist);
            updateLightboxScale(nextScale);
            e.preventDefault();
            return;
          }
          if (e.touches.length === 1 && dragging) {
            // 单指拖动平移（放大时）
            panX = e.touches[0].clientX - dragStartX;
            panY = e.touches[0].clientY - dragStartY;
            applyPan();
            e.preventDefault();
          }
        }, { passive: false });

        asset.addEventListener("touchend", (e) => {
          if (pinchStartDist > 0 && e.touches.length < 2) {
            pinchStartDist = 0;
          }
          if (e.touches.length === 0) {
            // 单指松开：判断是滑动还是点击
            const t = e.changedTouches[0];
            const dx = t.clientX - touchStartX;
            const dy = t.clientY - touchStartY;
            const dt = Date.now() - touchStartTime;
            dragging = false;
            if (state.lightboxScale <= 1
                && Math.abs(dx) > 50
                && Math.abs(dx) > Math.abs(dy) * 1.4
                && dt < 600) {
              // 水平滑动 → 切换图片
              if (dx < 0) shiftLightbox(1);
              else shiftLightbox(-1);
            }
          }
        });
      }
    }

    sidebar.innerHTML = images
      .map(
        (image, index) => `
          <button class="lightbox-thumb${index === state.lightboxIndex ? " is-active" : ""}" type="button" data-lightbox-thumb="${index}">
            <img src="${image}" alt="预览缩略图 ${index + 1}" loading="lazy" />
          </button>
        `
      )
      .join("");
    sidebar.querySelectorAll("[data-lightbox-thumb]").forEach((button) => {
      button.addEventListener("click", () => {
        state.lightboxIndex = Number(button.dataset.lightboxThumb);
        state.lightboxScale = 1;
        refreshLightboxImage();
      });
    });

    refreshLightboxImage();
  }

  function openLightbox(categorySlug, imageIndex) {
    const modal = document.querySelector("[data-lightbox]");
    if (!modal) return;
    state.lightboxCategorySlug = categorySlug;
    state.lightboxIndex = imageIndex;
    state.lightboxScale = 1;
    modal.hidden = false;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    buildLightbox();
  }

  function closeLightbox() {
    const modal = document.querySelector("[data-lightbox]");
    if (!modal) {
      return;
    }
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modal.hidden = true;
    document.body.classList.remove("lightbox-open");
  }

  function initLightboxTriggers() {
    document.querySelectorAll("[data-lightbox-open]").forEach((button) => {
      button.addEventListener("click", () => {
        openLightbox(button.dataset.categorySlug, Number(button.dataset.imageIndex));
      });
    });
  }

  function renderPhotographyGallery(categorySlug) {
    const root = document.querySelector("[data-feed-grid]");
    if (!root) {
      return;
    }
    const category = getPhotographyCategoryBySlug(categorySlug);
    const galleryItems = getPhotographyImagesByCategory(category.slug);
    updateFeedHead({
      label: "Photography",
      title: category.label,
      note: ""
    });
    root.className = "feed-grid feed-grid--photo-gallery content-wide";
    root.innerHTML = `
      <div class="gallery-shell">
        ${photoCategoryNavMarkup(category.slug)}
        <div class="photo-gallery-grid">
          ${galleryItems
            .map(
              (item, index) => `
                <button class="gallery-image reveal-on-scroll" type="button" data-lightbox-open data-category-slug="${category.slug}" data-image-index="${index}" aria-label="查看图片 ${index + 1}">
                  <img src="${item}" alt="摄影作品 ${index + 1}" loading="lazy" />
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    `;
    initLightboxTriggers();
  }

  function videoCardMarkup(work) {
    return `
      <a class="video-grid-card reveal-on-scroll" href="./video-work.html?slug=${work.slug}" aria-label="查看 ${escapeHtml(work.title)}">
        <img src="${work.cover.src}" alt="${escapeHtml(work.cover.alt)}" loading="lazy" />
        <div class="video-grid-card__body">
          <h3>${work.title}</h3>
          <p>${work.date}</p>
        </div>
      </a>
    `;
  }

  function travelVideoCardMarkup(work) {
    return `
      <a class="travel-video-card reveal-on-scroll" href="./video-work.html?slug=${work.slug}" aria-label="查看 ${escapeHtml(work.title)}">
        <div class="travel-video-card__media"><img src="${work.cover.src}" alt="${escapeHtml(work.cover.alt)}" loading="lazy" /></div>
        <div class="travel-video-card__body">
          <h3>${work.title}</h3>
          <p>${work.date} / ${work.duration}</p>
        </div>
      </a>
    `;
  }

  function videoCategoryCardMarkup(category) {
    const href = category.slug === "ai-creation"
      ? `./video-work.html?category=${category.slug}`
      : `./video-work.html?slug=${category.targetSlug}`;
    return `
      <a class="video-category-card reveal-on-scroll" href="${href}">
        <div class="video-category-card__media">
          <img src="${category.hero}" alt="${escapeHtml(category.label)}" loading="lazy" />
        </div>
        <div class="video-category-card__body">
          <p class="video-category-card__eyebrow">Films</p>
          <h3>${category.label}</h3>
        </div>
      </a>
    `;
  }

  function renderVideoCategoriesLanding() {
    const root = document.querySelector("[data-feed-grid]");
    if (!root) {
      return;
    }
    updateFeedHead({
      label: "Films",
      title: "分类短片",
      note: ""
    });
    root.className = "feed-grid feed-grid--video-categories content-wide";
    root.innerHTML = `<div class="video-category-grid">${videoCategories.map(videoCategoryCardMarkup).join("")}</div>`;
  }

  function renderVideoGrid(categorySlug) {
    const root = document.querySelector("[data-feed-grid]");
    if (!root) {
      return;
    }
    const category = getVideoCategoryBySlug(categorySlug);
    if (category?.targetSlug) {
      window.location.href = `./video-work.html?slug=${category.targetSlug}`;
    }
  }

  function formatAboutPeriod(period) {
    if (period === "2024.08 - 至今") {
      return "2024 — 至今";
    }
    if (period === "2019.11 - 2024.06") {
      return "2019 — 2024";
    }
    if (period === "2023.05 - 2023.08") {
      return "2023";
    }
    if (period === "2019.04 - 2019.07") {
      return "2019";
    }
    return period;
  }

  function renderAboutPage() {
    const intro = document.querySelector("[data-about-intro]");
    const focus = document.querySelector("[data-about-focus]");
    const experience = document.querySelector("[data-experience-list]");
    const honors = document.querySelector("[data-honor-list]");
    const contact = document.querySelector("[data-contact-panel]");
    if (!intro || !focus || !experience || !honors || !contact) {
      return;
    }
    intro.innerHTML = `<p class="about-intro-copy__line about-intro-copy__line--small">简介</p>${siteMeta.about.summary.map((item) => `<p class="about-intro-copy__line about-intro-copy__line--large">${item}</p>`).join("")}`;
    focus.innerHTML = siteMeta.about.focusAreas.map((item) => `<span class="focus-tag">${item}</span>`).join("");
    experience.innerHTML = siteMeta.about.experience
      .map(
        (item) => `
          <article class="about-timeline__item">
            <div class="about-timeline__time">${formatAboutPeriod(item.period)}</div>
            <div class="about-timeline__content">
              <p>${item.organization}</p>
              <h3>${item.role}</h3>
              <div class="about-timeline__points">${item.points.map((point) => point.includes("×") ? `<p class="exp-subhead">${point}</p>` : `<p>${point}</p>`).join("")}</div>
            </div>
          </article>
        `
      )
      .join("");
    honors.innerHTML = siteMeta.about.honors.map((item) => `<p>${item}</p>`).join("");
    contact.innerHTML = `
      <span>${siteMeta.contact.phone}</span>
      <span>${siteMeta.contact.email}</span>
      <span>微博、小红书：安山阿</span>
    `;
    initContactActions();
    initAboutDualReveal();
  }

  function initAboutDualReveal() {
    const root = document.querySelector("[data-dual-reveal]");
    const switchHotspot = root?.querySelector("[data-dual-reveal-switch]");
    if (!root) {
      return;
    }

    let frame = null;
    let leaveTimer = null;

    const pointer = {
      x: 0.5,
      y: 0.4
    };

    const state = {
      x: 0.5,
      y: 0.4,
      active: false,
      swapped: false
    };

    const clamp01 = (value) => Math.min(1, Math.max(0, value));

    const updateStyle = () => {
      const dx = state.x - 0.5;
      const dy = state.y - 0.5;
      const tiltX = -dy * 9.8;
      const tiltY = dx * 9.8;
      const cardShiftX = dx * 9;
      const cardShiftY = dy * 9;

      root.style.setProperty("--reveal-rx", `${tiltX.toFixed(2)}deg`);
      root.style.setProperty("--reveal-ry", `${tiltY.toFixed(2)}deg`);
      root.style.setProperty("--card-shift-x", `${cardShiftX.toFixed(2)}px`);
      root.style.setProperty("--card-shift-y", `${cardShiftY.toFixed(2)}px`);
      root.classList.toggle("is-active", state.active);
      root.classList.toggle("is-swapped", state.swapped);
    };

    const animate = () => {
      const ease = 0.17;
      state.x += (pointer.x - state.x) * ease;
      state.y += (pointer.y - state.y) * ease;
      updateStyle();

      if (Math.abs(pointer.x - state.x) + Math.abs(pointer.y - state.y) > 0.0016 || state.active) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = null;
      }
    };

    const ensureAnimate = () => {
      if (frame !== null) {
        return;
      }
      frame = window.requestAnimationFrame(animate);
    };

    const setPointerByEvent = (event) => {
      const rect = root.getBoundingClientRect();
      const nextX = clamp01((event.clientX - rect.left) / rect.width);
      const nextY = clamp01((event.clientY - rect.top) / rect.height);
      pointer.x = nextX;
      pointer.y = nextY;
    };

    const activate = () => {
      window.clearTimeout(leaveTimer);
      state.active = true;
      state.x = pointer.x;
      state.y = pointer.y;
      updateStyle();
      ensureAnimate();
    };

    const scheduleReset = () => {
      window.clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(() => {
        state.active = false;
        pointer.x = 0.5;
        pointer.y = 0.4;
        ensureAnimate();
      }, 300);
    };

    root.addEventListener("pointerenter", (event) => {
      setPointerByEvent(event);
      activate();
    });

    root.addEventListener("pointermove", (event) => {
      setPointerByEvent(event);
      activate();
    });

    root.addEventListener("pointerleave", () => {
      scheduleReset();
    });

    root.addEventListener("touchstart", (event) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      setPointerByEvent(touch);
      activate();
    }, { passive: true });

    root.addEventListener("touchmove", (event) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      setPointerByEvent(touch);
      activate();
    }, { passive: true });

    root.addEventListener("touchend", () => {
      scheduleReset();
    }, { passive: true });

    root.addEventListener("pointerdown", (event) => {
      setPointerByEvent(event);
      activate();
    });

    switchHotspot?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.swapped = !state.swapped;
      state.active = true;
      ensureAnimate();
      updateStyle();
    });

    updateStyle();
  }

  function imageBlockMarkup(item) {
    const layout = item.layout || "contained";
    return `<figure class="detail-image detail-image--${layout} reveal-on-scroll"><img src="${item.src}" alt="${escapeHtml(item.alt)}" loading="lazy" /><figcaption>${item.caption || ""}</figcaption></figure>`;
  }

  function seriesGridItemMarkup(item) {
    return `
      <figure class="series-grid__item reveal-on-scroll">
        <img src="${item.src}" alt="${escapeHtml(item.alt)}" loading="lazy" />
      </figure>
    `;
  }

  function renderSeriesPage() {
    const work = photographyWorks.find((item) => item.slug === params.get("slug")) || photographyWorks[0];
    const hero = document.querySelector("[data-series-hero]");
    const content = document.querySelector("[data-series-content]");
    if (!hero || !content) {
      return;
    }
    document.title = `${work.title} - 谢琬滢 Xiewanying`;
    hero.innerHTML = `
      <div class="detail-hero__image"><img src="${work.hero.src}" alt="${escapeHtml(work.hero.alt)}" /></div>
      <div class="detail-hero__caption content-wide reveal-on-scroll">
        <p class="eyebrow">摄影 / ${work.category}</p>
        <h1 class="page-title">${work.title}</h1>
        <p class="detail-meta">${work.date} / ${work.location}</p>
      </div>
    `;
    content.innerHTML = `
      <section class="detail-text-block reveal-on-scroll">${work.description.map((item) => `<p>${item}</p>`).join("")}</section>
      <section class="series-grid">${work.gallery.map(seriesGridItemMarkup).join("")}</section>
    `;
  }

  function initVideoPreview() {
    const videos = document.querySelectorAll(".video-frame video");
    if (!videos.length) {
      return;
    }
    const playSnippet = async (video) => {
      try {
        video.muted = true;
        video.playsInline = true;
        await video.play();
        window.setTimeout(() => {
          video.pause();
          video.currentTime = 0;
        }, 2600);
      } catch {
        return;
      }
    };
    videos.forEach((video) => {
      video.addEventListener("loadeddata", () => playSnippet(video), { once: true });
    });
  }

  function renderVideoMenu(work) {
    if (work.status === "in-progress") {
      return `<aside class="video-side-menu video-side-menu--single"><a class="video-side-menu__thumb" href="#video-detail-main"><img src="${work.menuThumb || work.cover.src}" alt="${escapeHtml(work.title)}" loading="lazy" /></a></aside>`;
    }
    if (work.categorySlug === "social-media") {
      return `<aside class="video-side-menu">${work.travelVideos
        .map(
          (item, index) => `<a class="video-side-menu__thumb" href="#travel-video-${index + 1}"><img src="${item.thumb}" alt="旅行短片 ${index + 1}" loading="lazy" /></a>`
        )
        .join("")}</aside>`;
    }
    return `<aside class="video-side-menu video-side-menu--single"><a class="video-side-menu__thumb" href="#video-detail-main"><img src="${work.menuThumb || work.cover.src}" alt="${escapeHtml(work.title)}" loading="lazy" /></a></aside>`;
  }

  function renderCategoryMenu(works) {
    return `<aside class="video-side-menu">${works
      .map(
        (w) => `<a class="video-side-menu__thumb" href="#work-${w.slug}"><img src="${w.menuThumb || w.cover.src}" alt="${escapeHtml(w.title)}" loading="lazy" /></a>`
      )
      .join("")}</aside>`;
  }

  function renderSingleWorkBlock(work) {
    if (work.status === "in-progress") {
      const images = work.inProgressImages || [];
      const imageListHTML = work.slug === "island-three-sounds" 
        ? images.map(img => `<img src="${img.src}" alt="${escapeHtml(img.alt || work.title)}" class="in-progress-static-img" style="width:100%; display:block; margin-bottom:20px;" />`).join("")
        : `
          <div class="in-progress-gallery" data-in-progress-gallery>
            ${images.length > 1 ? `<button class="in-progress-nav in-progress-nav--prev" type="button" aria-label="上一张" data-ipg-prev>‹</button>` : ""}
            <img src="${images[0]?.src || ""}" alt="${escapeHtml(images[0]?.alt || work.title)}" data-ipg-image />
            ${images.length > 1 ? `<button class="in-progress-nav in-progress-nav--next" type="button" aria-label="下一张" data-ipg-next>›</button>` : ""}
          </div>
        `;

      return `
        <section class="video-work-block reveal-on-scroll" id="work-${work.slug}">
          <p class="eyebrow">视频 / ${work.category}</p>
          <h2 class="section-title">${work.title}</h2>
          <p class="detail-meta">${work.date} / ${work.duration}</p>
          ${work.interactiveSection && work.slug === "island-three-sounds" ? `
            <div class="video-interactive-container" style="margin: 40px 0; border: 1px solid rgba(0,0,0,0.05);">
              ${work.interactiveSection}
            </div>
          ` : ""}
          <div class="in-progress-content">
            ${imageListHTML}
          </div>
          <p class="coming-soon-text">制作中 敬请期待</p>
        </section>
      `;
    }
    const stills = work.categorySlug === "documentary" ? work.stills.slice(0, 3) : work.stills;
    return `
      <section class="video-work-block reveal-on-scroll" id="work-${work.slug}">
        <p class="eyebrow">视频 / ${work.category}</p>
        <h2 class="section-title">${work.title}</h2>
        <p class="detail-meta">${work.date} / ${work.duration}</p>
        <div class="video-frame"><video controls preload="metadata" poster="${work.video.poster}" muted playsinline><source src="${work.video.src}" /></video></div>
        <div class="video-fallback">
          <div class="video-fallback__links">
            ${work.externalUrl ? `<a class="video-watch-link" href="${work.externalUrl}" target="_blank" rel="noopener">${work.externalLabel || "前往观看"}</a>` : ""}
          </div>
        </div>
        ${stills.length ? `<div class="video-stills-row">${stills.map((item) => `<figure class="video-still-thumb"><img src="${item.src}" alt="${escapeHtml(item.alt)}" loading="lazy" /></figure>`).join("")}</div>` : ""}
        ${work.description.length ? `<section class="video-intro-block">${work.description.map((item) => `<p>${item}</p>`).join("")}</section>` : ""}
      </section>
    `;
  }

  function renderVideoCategoryPage(categorySlug, head, player, gallery) {
    const category = getVideoCategoryBySlug(categorySlug);
    const works = getVideoWorksByCategory(categorySlug);
    if (!works.length) return;
    document.title = `${category.label} - 谢琬滢 Xiewanying`;
    head.innerHTML = `
      <p class="eyebrow">视频 / ${category.label}</p>
      <h1 class="page-title">${category.label}</h1>
      <p class="detail-meta">${works.length} 部作品</p>
    `;
    player.innerHTML = `
      <div class="video-detail-layout" id="video-detail-main">
        <div class="video-detail-main">
          <div class="video-works-stack">${works.map(renderSingleWorkBlock).join("")}</div>
        </div>
        ${renderCategoryMenu(works)}
      </div>
    `;
    gallery.innerHTML = "";
    initVideoPreview();
    works.forEach((w) => {
      if (w.status === "in-progress" && w.inProgressImages?.length > 1) {
        const block = player.querySelector(`#work-${w.slug}`);
        if (!block) return;
        let ipgIndex = 0;
        const images = w.inProgressImages;
        const ipgImage = block.querySelector("[data-ipg-image]");
        block.querySelector("[data-ipg-prev]")?.addEventListener("click", () => {
          ipgIndex = (ipgIndex - 1 + images.length) % images.length;
          if (ipgImage) { ipgImage.src = images[ipgIndex].src; ipgImage.alt = images[ipgIndex].alt || ""; }
        });
        block.querySelector("[data-ipg-next]")?.addEventListener("click", () => {
          ipgIndex = (ipgIndex + 1) % images.length;
          if (ipgImage) { ipgImage.src = images[ipgIndex].src; ipgImage.alt = images[ipgIndex].alt || ""; }
        });
      }
    });

    if (works.some(w => w.slug === "island-three-sounds")) {
      requestAnimationFrame(() => initIslandStoryEngine());
    }
  }

  function renderVideoPage() {
    const head = document.querySelector("[data-video-head]");
    const player = document.querySelector("[data-video-player]");
    const gallery = document.querySelector("[data-video-gallery]");
    if (!head || !player || !gallery) return;

    const categorySlug = params.get("category");
    if (categorySlug) {
      renderVideoCategoryPage(categorySlug, head, player, gallery);
      return;
    }

    const work = videoWorks.find((item) => item.slug === params.get("slug")) || videoWorks[0];
    document.title = `${work.title} - 谢琬滢 Xiewanying`;
    head.innerHTML = `
      <p class="eyebrow">视频 / ${work.category}</p>
      <h1 class="page-title">${work.title}</h1>
      <p class="detail-meta">${work.date} / ${work.duration}</p>
    `;
    if (work.status === "in-progress") {
      const images = work.inProgressImages || [];
      const imageListHTML = work.slug === "island-three-sounds" 
        ? images.map(img => `<img src="${img.src}" alt="${escapeHtml(img.alt || work.title)}" class="in-progress-static-img reveal-on-scroll" style="width:100%; display:block; margin-bottom:20px;" />`).join("")
        : `
          <div class="in-progress-gallery reveal-on-scroll" data-in-progress-gallery>
            ${images.length > 1 ? `<button class="in-progress-nav in-progress-nav--prev" type="button" aria-label="上一张" data-ipg-prev>‹</button>` : ""}
            <img src="${images[0]?.src || ""}" alt="${escapeHtml(images[0]?.alt || work.title)}" data-ipg-image />
            ${images.length > 1 ? `<button class="in-progress-nav in-progress-nav--next" type="button" aria-label="下一张" data-ipg-next>›</button>` : ""}
          </div>
        `;

      player.innerHTML = `
        <div class="video-detail-layout" id="video-detail-main">
          <div class="video-detail-main">
            ${work.interactiveSection ? `
              <div class="video-interactive-container reveal-on-scroll" style="margin-bottom:60px">
                ${work.interactiveSection}
              </div>
            ` : ""}
            <div class="in-progress-content">
              ${imageListHTML}
              <p class="coming-soon-text">制作中 敬请期待</p>
            </div>
          </div>
          ${renderVideoMenu(work)}
        </div>
      `;
      gallery.innerHTML = "";
      if (work.slug !== "island-three-sounds" && images.length > 1) {
        let ipgIndex = 0;
        const ipgImage = player.querySelector("[data-ipg-image]");
        player.querySelector("[data-ipg-prev]")?.addEventListener("click", () => {
          ipgIndex = (ipgIndex - 1 + images.length) % images.length;
          if (ipgImage) { ipgImage.src = images[ipgIndex].src; ipgImage.alt = images[ipgIndex].alt || ""; }
        });
        player.querySelector("[data-ipg-next]")?.addEventListener("click", () => {
          ipgIndex = (ipgIndex + 1) % images.length;
          if (ipgImage) { ipgIndex = (ipgIndex + 1) % images.length; ipgImage.src = images[ipgIndex].src; ipgImage.alt = images[ipgIndex].alt || ""; }
        });
      }
      
      if (work.slug === "island-three-sounds") {
        requestAnimationFrame(() => {
          initIslandStoryEngine();
        });
      }
    } else if (work.categorySlug === "social-media") {
      player.innerHTML = `<div class="video-detail-layout" id="video-detail-main"><div class="travel-video-stack">${work.travelVideos
        .map(
          (item, index) => `
            <section class="travel-video-section reveal-on-scroll" id="travel-video-${index + 1}">
              <div class="video-frame"><video controls preload="metadata" poster="${item.poster}" muted playsinline><source src="${item.src}" /></video></div>
            </section>
          `
        )
        .join("")}</div>${renderVideoMenu(work)}</div>`;
      gallery.innerHTML = "";
    } else {
      player.innerHTML = `
        <div class="video-detail-layout" id="video-detail-main">
          <div class="video-detail-main">
            <div class="video-frame"><video controls preload="metadata" poster="${work.video.poster}" muted playsinline><source src="${work.video.src}" /></video></div>
            <div class="video-fallback reveal-on-scroll">
              <div class="video-fallback__links">
                ${work.externalUrl ? `<a class="video-watch-link" href="${work.externalUrl}" target="_blank" rel="noopener">${work.externalLabel || "前往观看"}</a>` : ""}
              </div>
            </div>
          </div>
          ${renderVideoMenu(work)}
        </div>
      `;
      const stills = work.categorySlug === "documentary" ? work.stills.slice(0, 3) : work.stills;
      gallery.innerHTML = `
        <div class="video-stills-row">${stills.map((item) => `<figure class="video-still-thumb reveal-on-scroll"><img src="${item.src}" alt="${escapeHtml(item.alt)}" loading="lazy" /></figure>`).join("")}</div>
        <section class="video-intro-block reveal-on-scroll">${work.description.map((item) => `<p>${item}</p>`).join("")}</section>
      `;
    }
    initVideoPreview();
  }

  function projectCategoryCardMarkup(cat) {
    const lines = cat.subtitleLines || [cat.subtitle];
    const [lead, ...rest] = lines;
    return `
      <a class="project-cat-card project-cat-card--${cat.slug}" data-cat-slide href="./project.html?category=${cat.slug}">
        <div class="project-cat-card__text">
          <h3>${cat.label}</h3>
          <div class="project-cat-card__sub">
            <span class="project-cat-card__lead">${lead}</span>
            ${rest.map((l) => `<span class="project-cat-card__line">${l}</span>`).join("")}
          </div>
          <div class="project-cat-card__tags">${(cat.tags || []).map((t) => `<span>${t}</span>`).join("")}</div>
        </div>
        <p class="project-cat-card__count">${cat.count} 个项目</p>
      </a>
    `;
  }

  function initProjectCategoryCarousel() {
    const root = document.querySelector("[data-cat-carousel]");
    if (!root) return;
    const track = root.querySelector("[data-cat-track]");
    const slides = Array.from(root.querySelectorAll("[data-cat-slide]"));
    const prev = root.querySelector("[data-cat-prev]");
    const next = root.querySelector("[data-cat-next]");
    const dotsWrap = root.querySelector("[data-cat-dots]");
    if (!track || !slides.length) return;

    // 移动端：所有卡片同等显示，点击直接走 <a href> 跳转，不走 carousel 3D 切换
    if (window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    let active = 1;
    const total = slides.length;
    let transitionTimer = null;

    const dots = slides.map((_, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "project-cat-dot";
      btn.setAttribute("aria-label", `切换到第 ${i + 1} 项`);
      btn.addEventListener("click", () => setActive(i));
      dotsWrap?.appendChild(btn);
      return btn;
    });

    function normalize(index) {
      return (index + total) % total;
    }

    function relPos(i) {
      const diff = i - active;
      if (diff > total / 2) return diff - total;
      if (diff < -total / 2) return diff + total;
      return diff;
    }

    function paint() {
      slides.forEach((slide, i) => {
        const rel = relPos(i);
        slide.classList.remove("is-active", "is-left", "is-right", "is-back");
        if (rel === 0) slide.classList.add("is-active");
        else if (rel === -1) slide.classList.add("is-left");
        else if (rel === 1) slide.classList.add("is-right");
        else slide.classList.add("is-back");
      });
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === active));
    }

    function setActive(index) {
      active = normalize(index);
      root.classList.add("is-transitioning");
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => {
        root.classList.remove("is-transitioning");
      }, 430);
      paint();
    }

    prev?.addEventListener("click", () => setActive(active - 1));
    next?.addEventListener("click", () => setActive(active + 1));

    slides.forEach((slide, i) => {
      slide.addEventListener("click", (e) => {
        if (i === active) return;
        e.preventDefault();
        setActive(i);
      });
    });

    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") setActive(active - 1);
      if (e.key === "ArrowRight") setActive(active + 1);
    });

    setActive(active);
    window.setTimeout(() => root.classList.remove("is-transitioning"), 460);
  }

  function renderProjectLanding() {
    const root = document.querySelector("[data-project-main]");
    if (!root) return;
    document.title = "项目 - 谢琬滢 Xiewanying";
    root.innerHTML = `
      <section class="project-hero content-wide reveal-on-scroll">
        <p class="eyebrow">Projects</p>
        <h1 class="page-title">项目</h1>
        <p class="project-hero__desc">做过的一些项目，大多围绕 AI 影像和产品。</p>
      </section>
      <section class="project-cat-carousel content-wide reveal-on-scroll" data-cat-carousel tabindex="0" aria-label="项目分类旋转木马">
        <button class="project-cat-nav project-cat-nav--prev" type="button" data-cat-prev aria-label="上一个分类">←</button>
        <div class="project-cat-track" data-cat-track>
          ${projectCategories.map(projectCategoryCardMarkup).join("")}
        </div>
        <button class="project-cat-nav project-cat-nav--next" type="button" data-cat-next aria-label="下一个分类">→</button>
        <div class="project-cat-dots" data-cat-dots></div>
      </section>
    `;
    initProjectCategoryCarousel();
  }

  function renderProjectList(categorySlug) {
    const root = document.querySelector("[data-project-main]");
    if (!root) return;
    const cat = projectCategories.find((c) => c.slug === categorySlug) || projectCategories[0];
    const works = projectWorks.filter((w) => w.categorySlug === categorySlug);
    document.title = `${cat.label} - 项目 - 谢琬滢 Xiewanying`;
    root.innerHTML = `
      <section class="project-hero content-wide reveal-on-scroll">
        <p class="eyebrow">项目 / ${cat.label}</p>
        <h1 class="page-title">${cat.label}</h1>
        <a class="project-back-link" href="./project.html">← 返回项目</a>
      </section>
      <section class="project-list content-wide">
        ${works.map((w) => `
          <a class="project-list-item reveal-on-scroll" href="./project.html?category=${categorySlug}&slug=${w.slug}">
            <div class="project-list-item__body">
              <h3>${w.title}</h3>
              <p>${w.preview || w.summary}</p>
              <div class="project-list-item__tags">${(w.tags || w.metrics || []).slice(0, 3).map((t) => `<span>${t}</span>`).join("")}</div>
            </div>
            <span class="project-list-item__arrow">→</span>
          </a>
        `).join("")}
      </section>
    `;
  }

  function renderPlatformMockups(m) {
    const laborTotal = m.dashboard.labor.reduce((sum, l) => sum + l.value, 0) || 1;
    const laborMetric = (m.dashboard.metrics || []).find((mt) => String(mt.label).includes("人力"));
    const laborDaysTotal = parseInt(String((laborMetric && laborMetric.value) || "0").replace(/[^0-9]/g, ""), 10) || 1000;
    const riskMax = Math.max(...m.dashboard.risks.map((r) => r.count)) || 1;

    // ---- 拍摄趋势（近30天）: 三平滑曲线 + 打点 + 渐变面积 ----
    const trend = m.dashboard.trend;
    const chartW = 300, chartH = 118, padY = 12;
    const maxVal = Math.max(...trend.map((d) => d.shot)) || 1;
    const n = trend.length;
    const stepX = n > 1 ? chartW / (n - 1) : chartW;
    const scaleY = (v) => chartH - padY - (v / maxVal) * (chartH - padY * 2);
    const baseY = chartH - padY;
    const xAt = (i) => (i * stepX).toFixed(1);

    // Catmull-Rom -> cubic bezier smooth path
    function smoothPath(vals) {
      if (vals.length < 2) return "";
      const pts = vals.map((v, i) => [i * stepX, scaleY(v)]);
      let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
      }
      return d;
    }

    const shotVals = trend.map((d) => d.shot);
    const validVals = trend.map((d) => d.valid);
    let cum = 0;
    const ratioVals = trend.map((d) => { cum += d.valid; return cum / (n); });

    const shotPath = smoothPath(shotVals);
    const validPath = smoothPath(validVals);
    const ratioPath = smoothPath(ratioVals);

    function dots(vals, cls) {
      return vals.map((v, i) => `<circle class="pm-dot ${cls}" cx="${xAt(i)}" cy="${scaleY(v).toFixed(1)}" r="2.4" />`).join("");
    }

    function areaPath(vals) {
      const line = smoothPath(vals);
      return `${line} L ${chartW} ${baseY} L 0 ${baseY} Z`;
    }

    // ---- 人力投入分布: SVG 环形图 + 悬停提示 ----
    const donutR = 44, donutC = 2 * Math.PI * donutR;
    let donutAcc = 0;
    const donutSegs = m.dashboard.labor.map((l) => {
      const dash = (l.value / 100) * donutC;
      const seg = {
        ...l,
        days: Math.round((l.value / 100) * laborDaysTotal),
        dash: `${dash.toFixed(2)} ${(donutC - dash).toFixed(2)}`,
        offset: -donutAcc.toFixed(2)
      };
      donutAcc += dash;
      return seg;
    });

    let keyCounter = 0;

    return `
    <section class="report-section reveal-on-scroll">
      <h2>界面示意</h2>
      <p class="platform-mock__intro">${m.intro}</p>

      <div class="platform-mock">
        <div class="platform-mock__label">${m.projectList.title}<span>${m.projectList.desc}</span></div>
        <div class="platform-mock__window">
          <div class="platform-mock__titlebar"><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><em>数据采集管理平台 · 项目列表</em></div>
          <div class="platform-mock__body pm-projectlist">
            <div class="pm-projectlist__head"><h4>数据采集管理平台</h4><button class="pm-btn" type="button">＋ 新建项目</button></div>
            <div class="pm-projectlist__grid">
              ${m.projectList.cards.map((c) => `
                <div class="pm-card">
                  <div class="pm-card__top"><strong>${c.name}</strong><span class="pm-badge ${c.status === "已结项" ? "is-done" : "is-progress"}">${c.status}</span></div>
                  <div class="pm-progress"><i style="width:${c.percent}%"></i></div>
                  <div class="pm-card__meta"><span>${c.percent}%</span><span>${c.cycle}</span></div>
                  <div class="pm-card__people">
                    <span><i>负责人</i>${c.owner}</span>
                    <span><i>项目经理</i>${c.manager}</span>
                    <span><i>需求方</i>${c.requester}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>

      <div class="platform-mock">
        <div class="platform-mock__label">${m.dashboard.title}<span>${m.dashboard.desc}</span></div>
        <div class="platform-mock__window">
          <div class="platform-mock__titlebar"><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><em>← 返回列表 · ${m.dashboard.projectName}</em></div>
          <div class="platform-mock__body pm-dashboard">
            <div class="pm-dashboard__top">
              <div class="pm-health ${m.dashboard.health.level === "健康" ? "" : "pm-health--warn"}">
                <span class="pm-health__dot"></span>
                <div><strong>AI 健康诊断 · ${m.dashboard.health.level}</strong><p>${m.dashboard.health.note}</p></div>
              </div>
              <div class="pm-metrics">
                ${m.dashboard.metrics.map((mt) => `<div class="pm-metric"><span>${mt.label}</span><strong>${mt.value}</strong></div>`).join("")}
              </div>
            </div>
            <div class="pm-dashboard__charts">
              <div class="pm-chart pm-chart--line">
                <h5><svg class="pm-chart__icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 12.5 5.5 7l3 3 6-7.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="5.5" cy="7" r="1.1"/><circle cx="8.5" cy="10" r="1.1"/><circle cx="14.5" cy="2.5" r="1.1"/></svg>拍摄趋势（近30天）</h5>
                <div class="pm-linechart-wrap">
                  <svg class="pm-linechart" viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="pmg-shot" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="var(--pm-amber)" stop-opacity="0.28" />
                        <stop offset="100%" stop-color="var(--pm-amber)" stop-opacity="0" />
                      </linearGradient>
                      <linearGradient id="pmg-valid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="var(--pm-blue)" stop-opacity="0.22" />
                        <stop offset="100%" stop-color="var(--pm-blue)" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                    <line class="pm-linechart__baseline" x1="0" y1="${baseY}" x2="${chartW}" y2="${baseY}" />
                    <path class="pm-area pm-area--shot" d="${areaPath(shotVals)}" fill="url(#pmg-shot)" />
                    <path class="pm-area pm-area--valid" d="${areaPath(validVals)}" fill="url(#pmg-valid)" />
                    <path class="pm-line pm-line--shot" d="${shotPath}" />
                    <path class="pm-line pm-line--valid" d="${validPath}" />
                    <path class="pm-line pm-line--trend" d="${ratioPath}" />
                    ${dots(shotVals, "pm-dot--shot")}
                    ${dots(validVals, "pm-dot--valid")}
                    ${dots(ratioVals, "pm-dot--trend")}
                  </svg>
                </div>
                <div class="pm-linechart__axis">${trend.map((d) => `<span>${d.day.replace("-", ".")}</span>`).join("")}</div>
                <ul class="pm-legend pm-legend--line">
                  <li><i class="pm-legend__swatch pm-legend__swatch--shot"></i>每日拍摄量</li>
                  <li><i class="pm-legend__swatch pm-legend__swatch--valid"></i>每日有效量</li>
                  <li><i class="pm-legend__swatch pm-legend__swatch--trend"></i>整体趋势</li>
                </ul>
              </div>
              <div class="pm-chart pm-chart--donut">
                <h5><svg class="pm-chart__icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 8 8 1.4A6.6 6.6 0 1 1 1.4 8H8Z"/><path d="M8.5 1.5A6.5 6.5 0 0 1 14.5 7.5H8.5V1.5Z" opacity="0.45"/></svg>人力投入分布</h5>
                <div class="pm-donut" data-donut>
                  <svg viewBox="0 0 120 120" aria-hidden="true">
                    <circle class="pm-donut__track" cx="60" cy="60" r="${donutR}" />
                    <g transform="rotate(-90 60 60)">
                      ${donutSegs.map((s) => `
                      <circle class="pm-donut__seg" cx="60" cy="60" r="${donutR}" stroke="${s.color}" stroke-dasharray="${s.dash}" stroke-dashoffset="${s.offset}" data-donut-seg data-key="${s.label}" data-label="${s.label}" data-days="${s.days}" data-percent="${s.value}" data-color="${s.color}" />
                      `).join("")}
                    </g>
                  </svg>
                  <div class="pm-donut__center">
                    <span class="pm-donut__center-label">累计人天</span>
                    <strong>${laborDaysTotal.toLocaleString("en-US")}</strong>
                  </div>
                  <div class="pm-donut-tooltip" data-donut-tooltip hidden></div>
                </div>
                <ul class="pm-legend pm-legend--donut pm-legend--row">${donutSegs.map((l) => `<li data-legend-key="${l.label}"><i style="background:${l.color}"></i><span>${l.label}</span></li>`).join("")}</ul>
              </div>
            </div>
            <div class="pm-dashboard__bottom">
              <div class="pm-risks">
                <h5>问题 / 风险汇总</h5>
                ${m.dashboard.risks.map((r) => `
                  <div class="pm-risk-row"><span>${r.reason}</span><div class="pm-risk-bar"><i style="width:${(r.count / riskMax) * 100}%"></i></div><em>${r.count}</em></div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="platform-mock">
        <div class="platform-mock__label">${m.timeline.title}<span>${m.timeline.desc}</span></div>
        <div class="platform-mock__window">
          <div class="platform-mock__titlebar"><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><em>项目时间线</em></div>
          <div class="platform-mock__body pm-timeline">
            <div class="pm-timeline-axis">
              <div class="pm-timeline-axis__line">
                ${m.timeline.nodes.map((n) => {
                  let belowClass = "";
                  if (n.key) {
                    belowClass = keyCounter % 2 === 1 ? "is-below" : "";
                    keyCounter++;
                  }
                  return `
                  <div class="pm-timeline-node pm-timeline-node--${n.side} ${n.key ? "is-key" : ""} ${belowClass}">
                    <span class="pm-timeline-node__dot"></span>
                    ${n.key ? `<span class="pm-timeline-node__label">${n.label}</span>` : ""}
                    <span class="pm-timeline-node__date">${n.date}</span>
                  </div>
                `;
                }).join("")}
              </div>
            </div>
            <ul class="pm-timeline-legend">
              ${m.timeline.legend.map((l) => `<li><i style="background:${l.color}"></i>${l.label}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>

      <div class="platform-mock">
        <div class="platform-mock__label">${m.activity.title}<span>${m.activity.desc}</span></div>
        <div class="platform-mock__window">
          <div class="platform-mock__titlebar"><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><em>最新动态</em></div>
          <div class="platform-mock__body pm-activity">
            ${m.activity.items.map((a) => `
              <div class="pm-activity-row ${a.major ? "is-major" : ""}">
                <div class="pm-activity-row__meta"><strong>${a.operator}</strong><span>${a.time}</span></div>
                <p class="pm-activity-row__content">${a.content}</p>
                ${a.major ? `<button class="pm-btn pm-btn--ghost" type="button">↺ 返回该版本</button>` : ""}
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="platform-mock">
        <div class="platform-mock__label">${m.dailyReport.title}<span>${m.dailyReport.desc}</span></div>
        <div class="platform-mock__window">
          <div class="platform-mock__titlebar"><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><em>海外人像采集 / 日进度填报</em></div>
          <div class="platform-mock__body pm-table-wrap">
            <table class="pm-table pm-table--daily">
              <thead><tr><th>日期</th><th>拍摄数</th><th>有效数</th><th>无效数</th><th>有效率</th><th>操作人</th></tr></thead>
              <tbody>
                ${m.dailyReport.rows.map((r) => `
                  <tr class="${r.locked ? "is-locked" : ""}">
                    <td>${r.date}${r.locked ? " 🔒" : ""}</td><td>${r.shot}</td><td>${r.valid}</td><td>${r.invalid}</td>
                    <td><div class="pm-rate ${r.warn ? "is-warn" : "is-ok"}"><i style="width:${r.rate}%"></i><span>${r.rate}%</span></div></td>
                    <td>${r.operator}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="platform-mock">
        <div class="platform-mock__label">${m.retro.title}<span>${m.retro.desc}</span></div>
        <div class="platform-mock__window">
          <div class="platform-mock__titlebar"><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><span class="platform-mock__dot"></span><em>经验复盘 / 详情页</em></div>
          <div class="platform-mock__body pm-retro">
            <div class="pm-retro__head">
              <h4>${m.retro.entryTitle}</h4>
              <div class="pm-retro__tags">${m.retro.tags.map((t) => `<span class="pm-retro__tag">${t}</span>`).join("")}</div>
              <div class="pm-retro__meta"><span>作者 ${m.retro.author}</span><span>${m.retro.date}</span></div>
            </div>
            ${m.retro.sections.map((s) => `
              <div class="pm-retro__section">
                <h5>${s.heading}</h5>
                <p>${s.content}</p>
              </div>
            `).join("")}
            <div class="pm-retro__attachments">
              <span class="pm-retro__attachments-label">关联附件</span>
              ${m.retro.attachments.map((a) => `<span class="pm-retro__file">📎 ${a}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
    `;
  }

  // 人力投入分布：环形图悬停提示 + 图例联动高亮
  function initPlatformDonutTooltip() {
    const donut = document.querySelector("[data-donut]");
    if (!donut) return;
    const tooltip = donut.querySelector("[data-donut-tooltip]");
    if (!tooltip) return;
    const segs = Array.from(donut.querySelectorAll("[data-donut-seg]"));
    const legend = donut.parentElement ? donut.parentElement.querySelector(".pm-legend--donut") : null;
    const legendItems = legend ? Array.from(legend.querySelectorAll("[data-legend-key]")) : [];

    let activeKey = "";

    function paint() {
      segs.forEach((s) => s.classList.toggle("is-active", !!activeKey && s.dataset.key === activeKey));
      segs.forEach((s) => s.classList.toggle("is-dim", !!activeKey && s.dataset.key !== activeKey));
      legendItems.forEach((li) => li.classList.toggle("is-active", !!activeKey && li.dataset.legendKey === activeKey));
      legendItems.forEach((li) => li.classList.toggle("is-dim", !!activeKey && li.dataset.legendKey !== activeKey));
    }

    function show(seg, clientX, clientY) {
      tooltip.innerHTML = `
        <span class="pm-donut-tooltip__dot" style="background:${seg.dataset.color}"></span>
        <span class="pm-donut-tooltip__body"><strong>${seg.dataset.label}</strong><span>${seg.dataset.days} 天 · ${seg.dataset.percent}%</span></span>
      `;
      tooltip.hidden = false;
      requestAnimationFrame(() => tooltip.classList.add("is-visible"));
      const rect = donut.getBoundingClientRect();
      const tRect = tooltip.getBoundingClientRect();
      let left = clientX - rect.left + 14;
      let top = clientY - rect.top - tRect.height / 2;
      if (left + tRect.width > rect.width) left = clientX - rect.left - tRect.width - 14;
      if (top < 6) top = 6;
      if (top + tRect.height > rect.height - 6) top = rect.height - tRect.height - 6;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }

    function hide() {
      tooltip.classList.remove("is-visible");
      tooltip.hidden = true;
    }

    donut.addEventListener("mouseover", (e) => {
      const seg = e.target.closest("[data-donut-seg]");
      if (!seg) return;
      activeKey = seg.dataset.key;
      show(seg, e.clientX, e.clientY);
      paint();
    });
    donut.addEventListener("mousemove", (e) => {
      const seg = e.target.closest("[data-donut-seg]");
      if (seg && !tooltip.hidden) show(seg, e.clientX, e.clientY);
    });
    donut.addEventListener("mouseleave", () => {
      activeKey = "";
      hide();
      paint();
    });

    if (legend) {
      legend.addEventListener("mouseover", (e) => {
        const item = e.target.closest("[data-legend-key]");
        if (!item) return;
        activeKey = item.dataset.legendKey;
        paint();
      });
      legend.addEventListener("mouseleave", () => {
        activeKey = "";
        paint();
      });
    }
  }

  function initIslandStoryEngine() {
    const root = document.getElementById("islandStoryRoot");
    if (!root) return;

    const sections = [
      {
        title: '第一章 · 信',
        text: '“丽萨，我向你保证，他是我遇到过的最浪漫的男人。”\n\n他就像是上天派来的神。\n\n“嘿，罗娜。我找你快要找疯了，感谢上帝你还活着！听你的邻居朱莉夫人说你独自租船航海去了，可一直没有回来，大家都很担心你。你快回来好吗？另外，他是谁？”\n\n“亲爱的丽萨，请别担心我，我很好。确切地说，我还活着，这件事就足够好了。我在航行时遭遇了暴风雨，船翻了，我当时在想我一定死定了，但没想到当我睁开眼的时候，我居然躺在一片沙滩上。这是一座海岛，不大。但足够我们生活。”\n\n“我们？他究竟是谁！”\n\n“一个人，没有身份，没有名字。像高山野林一般绝对自由的人。丽萨，我真的很想将与他的所有故事全部告诉你，可是我真的不知道该如何说起，怕是三天三夜也说不完。总而言之，我认定了他是上天给我的礼物。我真爱他。”\n\n“你坠入爱河了，罗娜，我从没见过你这语无伦次的一面，真想看看是什么样的男人让你如此迷恋。你带他回来吗？”\n\n“什么样的男人？这个问题我也思考过很久，可我找不到任何准确的答案。不高也算不上好看，性格也一般，不爱说话，不过这些都是他的外在，我不在乎。我爱上的是他的所有。他使我感受到了从未有过的平静，即使是坐在沙滩上看一整天的大海，云卷云舒，日出日落，而这一切因为他的存在而变得崭新，在每一秒的开始与结束都是新的轮回。我感受到了一股强大的力量牵制着我，不，是包裹着。这是神的力量吗或者是魔法？我不知道。有关是否会回来，我暂时没有同他讨论过。期待你的来信。”'
      },
      {
        title: '第二章 · 爱',
        text: '“或许他就是神呢。能否再多说一些有关他的事情，我太好奇了！”\n\n“不，丽萨，他是个凡人，一定是的。他会老去，石刃会割伤他的脸颊留下疤痕，太阳会灼伤他的皮肤不会痊愈，只有凡人才如此普通脆弱。正因脆弱敏感才会如此浪漫，诗人只诞生在凡人中间，因为只有凡人才始终仰视星空。夜晚，我倚着他的身边抱着双膝，学着他的样子抬起头。通常，他是沉默的，甚至有些枯燥，可只有在夜晚，星星月亮出现的时候， he 会说上好多话，那些都是他的诗句。夜是星的原野，这是他的说的。他不会像那些装腔作势的男人们，在约会前一晚翻烂雪莱的诗集好在第二天显摆讨上姑娘们的欢心，虚假编织谎言。只有他是最真实的，他说出的每一句话我都愿意听上许多遍，直到深深地烙印在我的骨髓里。”\n\n“那他爱你吗？一个男人如果真的爱你，就会跟你走。”\n\n“亲爱的，为何要他和我走呢，我爱他，我可以为他留下。”\n\n“甚至愿意为他死去？”\n\n“只要他要，他可以拿走我的一切。”\n\n“罗娜，你疯了！他爱你吗？”\n\n“我昨晚问他爱我吗，一开始还害怕着他会认为我是一个特别俗气的女人。可你猜他的回答是什么？他问我，什么是爱。我瞪大了眼睛看着他，我知道他从不会说谎的，他是认真的。我反问他，他整日吟诵的诗中里的爱又是什么，怎么会不懂爱呢。他说，那只是源于心中的本能让他开口，他至始至终还未感受到那种感觉。那一刻，我觉得他真可怜。这样一想，我就更爱他了。”'
      },
      {
        title: '第三章 · 归',
        text: '“丽萨，很久没有收到你的来信了，我感到有一些悲伤，生活在这里与你之间的往来成为了我生命中盼望之一，如果可以，还是希望能继续收到你的信件。”\n\n“丽萨，生命无常，我第一次深切体会到这种残酷性，他的大病让我害怕到比我面临死亡之际还要恐慌。我们通常会在海潮拍打礁石岸的第三声中醒来，我听见的第四声是他的心跳，太阳跃出海面的声音，就那么一瞬我却觉得已经穿越过无数个永恒。问他为什么是三声之后才睁眼，他说第一声是大海对岛屿的私语，不可听，第二声是海中生命吞食黎明的赠礼，不可视，第三声是大海撼动天地的惊鸣，我们睁眼是给与回应。就在前几日，在第一声潮声过后，第二声，第三声…太阳不见了，我的眼前是万丈深渊，世界正在崩塌。我捕捉不到他的心跳。现在要我回忆，我已经完全记不清当时具体发生了些什么。那种感觉，我脑中的“我”正被一丝一毫地抽出，海底里所有庞大野兽都钻进了我的身体，它们的意识，欲望都在我这个小小躯体里。该怎么办？我还能做些什么吗？难道要我这个渺小到大海都不屑一视的人去抵抗那些怪物吗？我想，我真的想，但我做不到。”\n\n“丽萨，停顿了好长时间没给你写信，过得还好吗？或许，我也病了。连拿起笔给你写信的力气都没有，上一封信几乎带走了我所有的力量，只容许我呼吸，苟延残喘地活着。我理解，这是一种惩戒。”\n\n“夜是星的原野，你追随星空的轨迹，永恒映入我的黑色眼睛。这熊熊燃起的火焰，是流淌在我身体里的血液，献给你就成为光明。他向我求婚，用一枚磨得亮的海贝壳套进我的手指里，他说我的方向是他的自由。”\n\n“黑夜里没有星星，灰烬上没有篝火。丽萨，我好冷啊。给我回信好吗，请求你！”\n\n“你去迎接黎明，我要随星星离去，同它们站在一起，在白日的尽头等你。我相信他，他不会说谎的，所以我放心地睡去。”\n\n“海潮的私语，生命的赠礼，撼动的惊鸣..我默数。再是…没有了。石刃划开他的胸膛，忘记了想要寻找什么，像是跪在珍藏了一生记忆的宝箱前翻动着，我扯出一堆又一堆被血液包裹的认不清样子的东西。我掏空了他的身体。过了好久，才想到我只不过是想听一声他的心跳。那么，我又做了些什么。”\n\n“我杀了他。”\n\n\n数年后，一名女性尸骨被发现于一座孤岛上的邮筒旁，岛上并未发现其他生物追踪。'
    }
  ];

  let current = 0;
  const txt = document.getElementById("islandText");
  const page = document.getElementById("islandPageNum");
  const btnP = document.getElementById("islandPrevBtn");
  const btnN = document.getElementById("islandNextBtn");
  const canvas = document.getElementById("islandWaveCanvas");

  if (!txt || !btnP || !btnN || !canvas) return;

  function update(i) {
    txt.style.opacity = "0";
    setTimeout(() => {
      txt.textContent = sections[i].text;
      page.textContent = `${i + 1} / ${sections.length}`;
      txt.style.opacity = "1";
      btnP.disabled = (i === 0);
      btnN.disabled = (i === sections.length - 1);
      
      if (i === sections.length - 1) {
        setTimeout(() => {
          ['sq0','sq1','sq2','sq3','sq4'].forEach((id, idx) => {
            const sqEl = document.getElementById(id);
            if (sqEl && !sqEl.dataset.falling)
              setTimeout(() => initFalling(sqEl), idx * 1800);
          });
        }, 2000);
      }
    }, 560);
  }

  btnP.onclick = () => { current--; update(current); };
  btnN.onclick = () => { current++; update(current); };

  // Wave Border Engine
  class WaveBorder {
    constructor(cv) {
      this.cv = cv; this.ctx = cv.getContext("2d"); this.t = 0;
      this.dpr = window.devicePixelRatio || 1; 
      this.layers = [
        { freq: 3.2, speed: 0.55, amp: 9, step: 3.5, r: 55, g: 130, b: 185, opBase: 0.2, opPeak: 0.45, rBase: 1.2, rPeak: 2.2 },
        { freq: 5.8, speed: 0.95, amp: 5, step: 4.5, r: 90, g: 158, b: 210, opBase: 0.2, opPeak: 0.4, rBase: 1.0, rPeak: 1.8 },
        { freq: 10.5, speed: 1.5, amp: 2.5, step: 6.0, r: 180, g: 215, b: 235, opBase: 0.3, opPeak: 0.6, rBase: 0.8, rPeak: 2.5 }
      ];
      this.init();
    }
    init() {
      this.resize(); window.addEventListener("resize", () => this.resize());
      const ro = new ResizeObserver(() => this.resize()); ro.observe(this.cv.parentElement);
      this.tick();
    }
    resize() {
      const p = this.cv.parentElement;
      this.W = p.offsetWidth; this.H = p.offsetHeight;
      this.cv.width = this.W * this.dpr; this.cv.height = this.H * this.dpr;
      this.cv.style.width = this.W + "px"; this.cv.style.height = this.H + "px";
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }
    drawEdge(ox, oy, dx, dy, nx, ny, len, phase) {
      const ctx = this.ctx;
      this.layers.forEach(({ freq, speed, amp, step, r, g, b, opBase, opPeak, rBase, rPeak }) => {
        const n = Math.floor(len / step);
        for (let i = 0; i < n; i++) {
          const u = i / n;
          const wave = Math.sin(u * Math.PI * freq + this.t * speed + phase) * amp
                     + Math.sin(u * Math.PI * freq * 1.7 + this.t * speed * 0.6 + phase * 1.5) * amp * 0.35;
          const x = ox + dx * (u * len) + nx * wave;
          const y = oy + dy * (u * len) + ny * wave;
          const crest = (Math.sin(u * Math.PI * freq + this.t * speed + phase) + 1) / 2;
          const isFoam = crest > 0.72 && Math.random() < 0.22;
          const radius = isFoam ? rPeak * (0.8 + Math.random() * 0.5) : rBase + crest * (rPeak - rBase) * 0.4;
          const op = opBase + crest * (opPeak - opBase);
          ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${op.toFixed(3)})`;
          ctx.fill();
        }
      });
    }
    tick() {
      this.t += 0.014; this.ctx.clearRect(0, 0, this.W, this.H);
      this.drawEdge(0, 0, 1, 0, 0, 1, this.W, 0);
      this.drawEdge(this.W, 0, 0, 1, -1, 0, this.H, 1.8);
      this.drawEdge(this.W, this.H, -1, 0, 0, -1, this.W, 3.6);
      this.drawEdge(0, this.H, 0, -1, 1, 0, this.H, 5.4);
      requestAnimationFrame(() => this.tick());
    }
  }

  function initFalling(el) {
    if (el.dataset.falling || !window.Matter) return;
    el.dataset.falling = '1';

    const rect    = el.getBoundingClientRect();
    const W       = Math.max(rect.width + 100, 240);
    const H       = 420;
    const absLeft = rect.left + window.scrollX - 50;
    const absTop  = rect.top  + window.scrollY - 12;

    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    const hintWrap = el.querySelector('.sq-hint-wrap');
    if (hintWrap) hintWrap.style.display = 'none';

    const wrap = document.createElement('div');
    wrap.style.cssText = `
      position:absolute;left:${absLeft}px;top:${absTop}px;
      width:${W}px;height:${H}px;
      z-index:900;overflow:hidden;pointer-events:auto;cursor:pointer;
    `;
    document.body.appendChild(wrap);

    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    wrap.appendChild(cv);
    const ctx = cv.getContext('2d');

    const fontSize = parseFloat(getComputedStyle(el).fontSize);
    const colorVal = getComputedStyle(el).color;
    const fontStr  = `400 ${fontSize}px 'Noto Serif SC', serif`;

    // 逐字布局
    ctx.font = fontStr;
    let cx = 24, cy = fontSize + 14;
    const charData = [];
    // 换行符处理
    const lines = el.innerText.split('\n');
    lines.forEach((line, lineIdx) => {
        cx = 24;
        Array.from(line.trim()).forEach(c => {
            const mw = ctx.measureText(c).width;
            if (cx + mw > W - 20 && cx > 24) { cx = 24; cy += fontSize * 1.5; }
            charData.push({ c, ox: cx + mw/2, oy: cy - fontSize*0.25,
                            w: Math.max(mw, 7), h: fontSize * 1.25 });
            cx += mw + 1;
        });
        if (lineIdx < lines.length - 1) cy += fontSize * 1.5;
    });

    // 物理引擎
    const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;
    const engine = Engine.create();
    engine.gravity.y = 0.68;

    const floor = Bodies.rectangle(W/2, H+26, W*2, 50, { isStatic:true });
    const wallL = Bodies.rectangle(-26,  H/2,  50,  H, { isStatic:true });
    const wallR = Bodies.rectangle(W+26, H/2,  50,  H, { isStatic:true });

    const bodies = charData.map(({ c, ox, oy, w, h }) => {
      const b = Bodies.rectangle(ox, oy, w, h,
        { restitution:0.38, frictionAir:0.02, friction:0.1 });
      Body.setVelocity(b, { x:(Math.random()-0.5)*5, y:-Math.random()*1.5 });
      Body.setAngularVelocity(b, (Math.random()-0.5)*0.1);
      return { body:b, c };
    });

    const mc = MouseConstraint.create(engine, {
      mouse: Mouse.create(cv),
      constraint: { stiffness:0.88, render:{ visible:false } }
    });
    World.add(engine.world, [floor, wallL, wallR, mc, ...bodies.map(b=>b.body)]);

    // 鼠标悬停波拂特效
    cv.addEventListener('mousemove', (e) => {
      if (!drawActive) return;
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;
      bodies.forEach(({ body }) => {
        const dx = body.position.x - mouseX;
        const dy = body.position.y - mouseY;
        const distSq = dx*dx + dy*dy;
        const forceRadius = 45;
        if (distSq < forceRadius * forceRadius) {
          const dist = Math.sqrt(distSq) || 1;
          const force = (forceRadius - dist) / forceRadius * 0.04;
          Body.applyForce(body, body.position, { 
            x: dx * (force / dist) + (Math.random() - 0.5) * 0.01, 
            y: dy * (force / dist) + (Math.random() - 0.5) * 0.01 
          });
        }
      });
    });
    
    // 绘制循环
    let drawActive = true;
    const runner = Runner.create();
    Runner.run(runner, engine);

    const render = () => {
      if (!drawActive) return;
      ctx.clearRect(0, 0, W, H);
      ctx.font = fontStr; ctx.textAlign = 'center';
      ctx.textBaseline = 'middle'; ctx.fillStyle = colorVal;
      bodies.forEach(({ body, c }) => {
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.fillText(c, 0, 0);
        ctx.restore();
      });
      requestAnimationFrame(render);
    };
    render();

    // 1.5s 后显示漂流提示
    setTimeout(() => showDriftHint(wrap), 1500);

    // 点击散落区域 → 750ms 归位动画
    wrap.addEventListener('click', () => {
      Runner.stop(runner);
      drawActive = false;
      const snapshots = bodies.map(({ body }) => ({
        x: body.position.x, y: body.position.y, angle: body.angle
      }));
      const start = performance.now(), duration = 750;
      (function animateBack() {
        const p    = Math.min((performance.now() - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);  // ease-out cubic
        ctx.clearRect(0, 0, W, H);
        ctx.font = fontStr; ctx.textAlign = 'center';
        ctx.textBaseline = 'middle'; ctx.fillStyle = colorVal;
        bodies.forEach(({ c }, i) => {
          const s = snapshots[i], t = charData[i];
          ctx.save();
          ctx.translate(s.x + (t.ox - s.x) * ease, s.y + (t.oy - s.y) * ease);
          ctx.rotate(s.angle * (1 - ease));
          ctx.fillText(c, 0, 0);
          ctx.restore();
        });
        if (p < 1) {
          requestAnimationFrame(animateBack);
        } else {
          setTimeout(() => {
            wrap.remove();
            el.style.opacity = '';
            el.style.pointerEvents = '';
            delete el.dataset.falling;
            const hintWrap = el.querySelector('.sq-hint-wrap');
            if (hintWrap) hintWrap.style.display = '';
          }, 80);
        }
      })();
    });
  }

  function showDriftHint(wrap) {
    const hint = document.createElement('div');
    hint.style.cssText = `
      position:absolute;bottom:18px;left:50%;transform:translateX(-50%);
      text-align:center;pointer-events:none;opacity:0;
      transition:opacity 0.9s ease;z-index:10;white-space:nowrap;
    `;
    hint.innerHTML = `
      <div style="font-size:0.62rem;letter-spacing:0.3em;color:rgba(107,100,89,0.7);">
        — 它们仍在漂流 —
      </div>
      <div style="margin-top:5px;font-size:0.52rem;letter-spacing:0.22em;color:rgba(107,100,89,0.45);">
        以鼠标轻触，引它们归位
      </div>`;
    wrap.appendChild(hint);
    requestAnimationFrame(() => { hint.style.opacity = '1'; });
    setTimeout(() => {
      if (hint && hint.parentElement) {
        hint.style.opacity = '0';
        setTimeout(() => hint.remove(), 900);
      }
    }, 4000);
  }

  // 绑定初始点击事件
  ['sq0','sq1','sq2','sq3','sq4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.onclick = () => initFalling(el);
  });

  new WaveBorder(canvas);
  update(0);
}

  function renderProjectDetail(categorySlug, workSlug) {
    const root = document.querySelector("[data-project-main]");
    if (!root) return;
    const work = projectWorks.find((w) => w.slug === workSlug) || projectWorks[0];
    const cat = projectCategories.find((c) => c.slug === categorySlug) || projectCategories[0];
    document.title = `${work.title} - 项目 - 谢琬滢 Xiewanying`;
    const hasCapabilities = work.capabilities?.length;
    const hasReport = !!work.report;
    const simHTML = work.slug === "dabao-pet" && work.petDemo ? `
      <section class="dabao-demo reveal-on-scroll">
        <p class="dabao-demo__hint">点一下达宝，打开它的工作台 · 所有窗口都能拖动到你喜欢的位置</p>
        <div class="dabao-demo__area" data-demo-area>
          <div class="dabao-demo__bg" data-demo-bg></div>

          <div class="dabao-demo__pet" data-pet-wrap>
            <video class="dabao-demo__video" data-pet-video autoplay loop muted playsinline draggable="false" poster="./assets/dabao/idle.jpg">
              <source src="./assets/dabao/default.webm" type="video/webm">
              <source src="./assets/dabao/default.mp4" type="video/mp4">
              <source src="./assets/dabao/default.mov" type="video/quicktime">
              <img class="dabao-demo__video-fallback" src="./assets/dabao/idle.jpg" alt="达宝" draggable="false" />
            </video>
            <div class="dabao-demo__bubble" data-pet-bubble></div>
          </div>

          <div class="dabao-win dabao-win--main" data-win="main" hidden>
            <div class="dabao-win__head" data-drag-handle>
              <span class="dabao-win__avatar">🐦</span>
              <div class="dabao-win__title">
                <strong data-persona-name>叽与喧</strong>
                <small>和达宝聊聊天 · 查日程 · 问安排</small>
              </div>
              <div class="dabao-win__quick">
                <button data-open="calendar" title="努力工作了喂~">📅</button>
                <button data-open="board" title="毛毡板">🗂</button>
                <button data-open="pomodoro" title="摸摸虾呗">🍅</button>
              </div>
              <button class="dabao-win__close" data-win-close>×</button>
            </div>
            <div class="dabao-win__body">
              <p class="dabao-win__label">功能</p>
              <div class="dabao-win__grid">
                <button class="dabao-win__item" data-open="calendar"><span class="dabao-win__item-icon">📅</span><span class="dabao-win__item-text"><strong>努力工作了喂~</strong><small>月历 + 日程</small></span></button>
                <button class="dabao-win__item" data-open="library"><span class="dabao-win__item-icon">📚</span><span class="dabao-win__item-text"><strong>图书馆</strong><small>视频干货知识沉淀</small></span></button>
                <button class="dabao-win__item" data-open="meeting"><span class="dabao-win__item-icon">📝</span><span class="dabao-win__item-text"><strong>会议小秘书</strong><small>AI 整理会议纪要</small></span></button>
                <button class="dabao-win__item" data-open="review"><span class="dabao-win__item-icon">📊</span><span class="dabao-win__item-text"><strong>复盘报告</strong><small>周报/月报/年报生成</small></span></button>
                <button class="dabao-win__item" data-open="board"><span class="dabao-win__item-icon">🗂</span><span class="dabao-win__item-text"><strong>挖到宝藏咯！</strong><small>毛毡板</small></span></button>
                <button class="dabao-win__item" data-open="pomodoro"><span class="dabao-win__item-icon">🍅</span><span class="dabao-win__item-text"><strong>摸摸虾呗</strong><small>番茄切片时钟</small></span></button>
                <button class="dabao-win__item" data-open="diary"><span class="dabao-win__item-icon">📔</span><span class="dabao-win__item-text"><strong>心情日记</strong><small>记录今天的心情</small></span></button>
                <button class="dabao-win__item" data-open="bg"><span class="dabao-win__item-icon">🎨</span><span class="dabao-win__item-text"><strong>背景设计</strong><small>换个小世界待着</small></span></button>
              </div>
            </div>
            <div class="dabao-win__foot">
              <button data-open="console">⚙ 控制台</button>
              <button data-open="persona">🎭 性格调配</button>
            </div>
          </div>

          <div class="dabao-win dabao-win--sub dabao-win--calendar" data-win="calendar" hidden>
            <div class="dabao-win__head" data-drag-handle>
              <span class="dabao-win__icon">📅</span><strong>努力工作了喂~</strong>
              <button class="dabao-win__close" data-win-close>×</button>
            </div>
            <div class="dabao-win__body dabao-cal">
              <div class="dabao-cal__head">
                <button data-cal-prev>‹</button>
                <span data-cal-title></span>
                <button data-cal-next>›</button>
              </div>
              <div class="dabao-cal__weekdays">
                <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
              </div>
              <div class="dabao-cal__grid" data-cal-grid></div>
              <div class="dabao-cal__list">
                <div class="dabao-cal__list-head">
                  <span data-cal-selected-date></span>
                  <button data-cal-add>+ 新增日程</button>
                </div>
                <div class="dabao-cal__items" data-cal-items></div>
                <div class="dabao-cal__form" data-cal-form hidden>
                  <input type="text" placeholder="日程标题" data-cal-input-title />
                  <div class="dabao-cal__form-row">
                    <input type="time" data-cal-input-time value="09:00" />
                    <select data-cal-input-remind>
                      <option value="none">不提醒</option>
                      <option value="15">提前15分钟</option>
                      <option value="30">提前30分钟</option>
                    </select>
                  </div>
                  <div class="dabao-cal__form-actions">
                    <button data-cal-cancel>取消</button>
                    <button data-cal-save>保存</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dabao-win dabao-win--sub dabao-win--board" data-win="board" hidden>
            <div class="dabao-win__head" data-drag-handle>
              <span class="dabao-win__icon">🗂</span><strong>毛毡板</strong>
              <small class="dabao-win__hint-small">右键新建 · 拖动整理</small>
              <button class="dabao-win__close" data-win-close>×</button>
            </div>
            <div class="dabao-win__body dabao-board" data-board-canvas>
              <button class="dabao-board__add" data-board-add>+ 新建便签</button>
            </div>
          </div>

          <div class="dabao-win dabao-win--sub dabao-win--pomo" data-win="pomodoro" hidden>
            <div class="dabao-win__head" data-drag-handle>
              <span class="dabao-win__icon">🍅</span><strong>番茄专注</strong>
              <button class="dabao-win__close" data-win-close>×</button>
            </div>
            <div class="dabao-win__body dabao-pomo">
              <div class="dabao-pomo__ring" data-pomo-ring>
                <span class="dabao-pomo__time" data-pomo-time>25:00</span>
              </div>
              <div class="dabao-pomo__durations">
                <button data-pomo-duration="5">5</button>
                <button data-pomo-duration="10">10</button>
                <button data-pomo-duration="15">15</button>
                <button data-pomo-duration="25" class="is-active">25</button>
                <button data-pomo-duration="30">30</button>
                <button data-pomo-duration="45">45</button>
                <button data-pomo-duration="60">60</button>
              </div>
              <input type="text" class="dabao-pomo__note" placeholder="今天在做什么？（可留空）" data-pomo-note />
              <div class="dabao-pomo__actions">
                <button class="dabao-pomo__start" data-pomo-start>▶ 开始专注</button>
                <button class="dabao-pomo__reset" data-pomo-reset>↺</button>
              </div>
            </div>
          </div>

          <div class="dabao-win dabao-win--sub dabao-win--diary" data-win="diary" hidden>
            <div class="dabao-win__head" data-drag-handle>
              <span class="dabao-win__icon">📔</span><strong>心情日记</strong>
              <button class="dabao-win__close" data-win-close>×</button>
            </div>
            <div class="dabao-win__body dabao-diary">
              <div class="dabao-diary__moods" data-diary-moods>
                <button data-mood="😄">😄</button>
                <button data-mood="🙂" class="is-active">🙂</button>
                <button data-mood="😐">😐</button>
                <button data-mood="😔">😔</button>
                <button data-mood="😢">😢</button>
              </div>
              <textarea class="dabao-diary__text" placeholder="今天过得怎么样呀？" data-diary-text></textarea>
              <button class="dabao-diary__save" data-diary-save>保存今天的心情</button>
              <div class="dabao-diary__list" data-diary-list></div>
            </div>
          </div>

          <div class="dabao-win dabao-win--sub dabao-win--persona" data-win="persona" hidden>
            <div class="dabao-win__head" data-drag-handle>
              <span class="dabao-win__icon">🎭</span><strong>性格调配</strong>
              <button class="dabao-win__close" data-win-close>×</button>
            </div>
            <div class="dabao-win__body dabao-persona">
              <p class="dabao-persona__hint">点一下卡片，立即切换达宝的性格</p>
              <div class="dabao-persona__list" data-persona-list>
                <button class="dabao-persona__card" data-persona="独行侠"><strong>独行侠</strong><small>独自高效，话少但做事认真，专注力强</small></button>
                <button class="dabao-persona__card" data-persona="社牛懒鸟"><strong>社牛懒鸟</strong><small>超级爱聊天，但懒得动，经常在原地闲聊</small></button>
                <button class="dabao-persona__card is-active" data-persona="活力社鸟"><strong>活力社鸟</strong><small>小甜甜嘴，热爱冲鸭，带你一起卷</small></button>
                <button class="dabao-persona__card" data-persona="治愈系"><strong>治愈系</strong><small>温暖关怀且好奇心强，经常问你今天过得怎么样</small></button>
                <button class="dabao-persona__card" data-persona="暖心咸鱼"><strong>暖心咸鱼</strong><small>热情但躺平，关心你却不爱动，暖洋洋的</small></button>
              </div>
            </div>
          </div>

          <div class="dabao-win dabao-win--sub dabao-win--console" data-win="console" hidden>
            <div class="dabao-win__head" data-drag-handle>
              <span class="dabao-win__icon">⚙</span><strong>达宝后台控制台</strong>
              <button class="dabao-win__close" data-win-close>×</button>
            </div>
            <div class="dabao-win__body dabao-console">
              <p class="dabao-console__section-title">当前运行状态</p>
              <div class="dabao-console__status">
                <div><span>宠物性格</span><strong data-console-persona>活力社鸟</strong></div>
                <div><span>当前状态</span><strong data-console-state>发呆中</strong></div>
                <div><span>当前背景</span><strong data-console-bg>冬日午后</strong></div>
              </div>
              <p class="dabao-console__section-title">今日统计</p>
              <div class="dabao-console__stats">
                <div><strong data-console-pomo>0</strong><span>🍅 番茄完成</span></div>
                <div><strong data-console-remind>0</strong><span>⏰ 提醒设置</span></div>
                <div><strong data-console-diary>0</strong><span>📔 日记条数</span></div>
              </div>
              <div class="dabao-console__actions">
                <button data-console-action="reload">🔄 重载配置</button>
                <button data-console-action="export">📦 导出配置包</button>
                <button data-console-action="log">📂 打开日志目录</button>
              </div>
            </div>
          </div>

          <div class="dabao-win dabao-win--sub dabao-win--bg" data-win="bg" hidden>
            <div class="dabao-win__head" data-drag-handle>
              <span class="dabao-win__icon">🎨</span><strong>背景设计</strong>
              <button class="dabao-win__close" data-win-close>×</button>
            </div>
            <div class="dabao-win__body dabao-bgpicker">
              <p class="dabao-bgpicker__label">选一个达宝喜欢待着的小世界</p>
              <div class="dabao-bgpicker__grid">
                <button class="dabao-bgpicker__card" data-bg-option="none">
                  <span class="dabao-bgpicker__swatch dabao-bgpicker__swatch--none"></span>
                  <span>无背景</span>
                </button>
                <button class="dabao-bgpicker__card is-active" data-bg-option="winter">
                  <span class="dabao-bgpicker__swatch" style="background-image:url('./assets/dabao/bg-winter-afternoon.jpg')"></span>
                  <span>冬日午后</span>
                </button>
                <button class="dabao-bgpicker__card" data-bg-option="summer">
                  <span class="dabao-bgpicker__swatch" style="background-image:url('./assets/dabao/bg-summer-valley.jpg')"></span>
                  <span>夏日山谷</span>
                </button>
              </div>
            </div>
          </div>

          <div class="dabao-win dabao-win--sub dabao-win--placeholder" data-win="library" hidden>
            <div class="dabao-win__head" data-drag-handle>
              <span class="dabao-win__icon">📚</span><strong>图书馆</strong>
              <button class="dabao-win__close" data-win-close>×</button>
            </div>
            <div class="dabao-win__body dabao-placeholder">
              <p>粘贴任意文字进去，达宝自动生成标题、摘要和核心要点。</p>
              <p class="dabao-placeholder__lock">🔒 该版为体验版，暂不支持展开</p>
            </div>
          </div>

          <div class="dabao-win dabao-win--sub dabao-win--placeholder" data-win="meeting" hidden>
            <div class="dabao-win__head" data-drag-handle>
              <span class="dabao-win__icon">📝</span><strong>会议小秘书</strong>
              <button class="dabao-win__close" data-win-close>×</button>
            </div>
            <div class="dabao-win__body dabao-placeholder">
              <p>粘贴会议内容，自动提取目标 / 重点 / 行动待办。</p>
              <p class="dabao-placeholder__lock">🔒 该版为体验版，暂不支持展开</p>
            </div>
          </div>

          <div class="dabao-win dabao-win--sub dabao-win--placeholder" data-win="review" hidden>
            <div class="dabao-win__head" data-drag-handle>
              <span class="dabao-win__icon">📊</span><strong>复盘报告</strong>
              <button class="dabao-win__close" data-win-close>×</button>
            </div>
            <div class="dabao-win__body dabao-placeholder">
              <p>周报 / 月报 / 年报自动生成，还有 AI 温情洞察。</p>
              <p class="dabao-placeholder__lock">🔒 该版为体验版，暂不支持展开</p>
            </div>
          </div>
        </div>
        <p class="dabao-demo__hint dabao-demo__hint--sub">💡 网页体验版 · 非正式版本</p>
      </section>

      <section class="dabao-click" data-click>
        <div class="dabao-click__stage" data-click-stage>
          <div class="dabao-click__image-wrap" data-click-image="work">
            <div class="dabao-click__image-scroll">
              <img class="dabao-click__image" src="./assets/dabao/journey-work.jpg" alt="达宝 · 工作板块展示" width="1000" height="2334" />
            </div>
          </div>
          <div class="dabao-click__image-wrap" data-click-image="companion">
            <div class="dabao-click__image-scroll">
              <img class="dabao-click__image" src="./assets/dabao/journey-companion.jpg" alt="达宝 · 陪伴板块展示" width="1000" height="2293" />
            </div>
          </div>
          <div class="dabao-click__pet" data-click-pet role="button" tabindex="0" aria-label="点击达宝，探索它的小世界">
            <div class="dabao-click__glow" data-click-glow></div>
            <video class="dabao-click__pet-media" data-click-watch autoplay loop muted playsinline draggable="false">
              <source src="./assets/dabao/watch-alpha.webm" type="video/webm">
            </video>
            <video class="dabao-click__pet-media" data-click-fly muted playsinline draggable="false" style="display:none">
              <source src="./assets/dabao/fly-alpha.webm" type="video/webm">
            </video>
            <img class="dabao-click__pet-media" data-click-frame src="./assets/dabao/fly-last-frame.png" alt="达宝" draggable="false" style="display:none" />
            <p class="dabao-click__hint" data-click-hint>戳戳达宝 ⇢</p>
          </div>
        </div>
      </section>
    ` : "";
    const bodyHTML = hasReport ? `
        ${work.report.proposition ? `
        <section class="report-section reveal-on-scroll">
          <h2>${work.report.proposition.title}</h2>
          <blockquote class="report-quote"><p>${work.report.proposition.quote}</p></blockquote>
          <p class="report-body">${work.report.proposition.body}</p>
        </section>` : ""}
        ${work.report.strategyFlow ? `
        <section class="report-section reveal-on-scroll">
          <h2>${work.report.strategyFlow.title}</h2>
          <div class="report-flow">${work.report.strategyFlow.steps.map((s, i) => `${s}${i < work.report.strategyFlow.steps.length - 1 ? '<span class="report-flow__arrow">↓</span>' : ''}`).join("")}</div>
          <blockquote class="report-quote"><p>${work.report.strategyFlow.body}</p></blockquote>
        </section>` : ""}
        ${work.report.overview ? `
        <section class="report-section reveal-on-scroll">
          <h2>${work.report.overview.title}</h2>
          <blockquote class="report-quote"><p>${work.report.quote || ""}</p></blockquote>
          <p class="report-body">${work.report.overview.body}</p>
          <div class="report-flow">${work.report.overview.steps.map((s, i) => `${s}${i < work.report.overview.steps.length - 1 ? '<span class="report-flow__arrow">↓</span>' : ''}`).join("")}</div>
        </section>` : ""}
        ${work.report.methodology ? `
        <section class="report-section reveal-on-scroll">
          <h2>${work.report.methodology.title}</h2>
          <div class="report-flow">${work.report.methodology.steps.map((s, i) => `${s}${i < work.report.methodology.steps.length - 1 ? '<span class="report-flow__arrow">↓</span>' : ''}`).join("")}</div>
          <blockquote class="report-quote"><p>${work.report.methodology.body}</p></blockquote>
        </section>` : ""}
        ${work.report.strategyCards?.length ? `
        <section class="report-section reveal-on-scroll">
          <h2>四个核心策略</h2>
          <div class="report-strategy-grid">${work.report.strategyCards.map((sc) => `
            <div class="report-strategy-card">
              <h3>${sc.title}</h3>
              <span class="report-strategy-card__tag">${sc.tag}</span>
              <p class="report-strategy-card__insight">📌 ${sc.insight}</p>
              ${sc.points?.length ? `<ul>${sc.points.map((p) => `<li>${p}</li>`).join("")}</ul>` : ""}
              <div class="report-strategy-card__value"><strong>🎯 价值</strong><span>${sc.value}</span></div>
            </div>
          `).join("")}</div>
        </section>` : ""}
        ${work.report.howItWorks ? `
        <section class="report-section reveal-on-scroll">
          <h2>${work.report.howItWorks.title}</h2>
          <div class="report-flow">${work.report.howItWorks.steps.map((s, i) => `${s}${i < work.report.howItWorks.steps.length - 1 ? '<span class="report-flow__arrow">↓</span>' : ''}`).join("")}</div>
        </section>` : ""}
        ${work.report.insights?.length ? `
        <section class="report-section reveal-on-scroll">
          <h2>四个关键洞察</h2>
          <div class="report-insight-grid">${work.report.insights.map((ins) => `
            <div class="report-insight-card">
              <h3>${ins.title}</h3>
              <span class="report-insight-card__tag">${ins.tag}</span>
              <p class="report-insight-card__finding"><strong>发现</strong>${ins.finding}</p>
              <div class="report-insight-card__solutions"><strong>方案</strong><ul>${ins.solutions.map((s) => `<li>${s}</li>`).join("")}</ul></div>
            </div>
          `).join("")}</div>
        </section>` : ""}
        ${work.report.conceptMap ? `
        <section class="report-section reveal-on-scroll">
          <h2>${work.report.conceptMap.title}</h2>
          <p class="report-body">${work.report.conceptMap.body}</p>
          <div class="report-tree">${work.report.conceptMap.tree.map((s) => `<span>${s}</span>`).join("")}</div>
        </section>` : ""}
        ${work.report.designConcepts?.length ? `
        <section class="report-section reveal-on-scroll">
          <h2>为什么这样设计</h2>
          <div class="report-concept-grid">${work.report.designConcepts.map((c, i) => `
            <div class="report-concept-card">
              <span class="report-concept-card__num">0${i + 1}</span>
              <p>${c}</p>
            </div>
          `).join("")}</div>
        </section>` : ""}
        ${work.report.moreFindings?.length ? `
        <section class="report-section reveal-on-scroll">
          <h2>更多体验发现</h2>
          <p class="report-body">共整理 <strong>14 个体验问题</strong>、<strong>16 项优化建议</strong>。</p>
          ${work.report.moreFindings.map((f) => `
            <details class="report-accordion">
              <summary>${f.title}</summary>
              <ul>${f.items.map((i) => `<li>${i}</li>`).join("")}</ul>
            </details>
          `).join("")}
        </section>` : ""}
        ${work.report.moreStrategies?.length ? `
        <section class="report-section reveal-on-scroll">
          <h2>更多策略</h2>
          ${work.report.moreStrategies.map((f) => `
            <details class="report-accordion">
              <summary>${f.title}</summary>
              <ul>${f.items.map((i) => `<li>${i}</li>`).join("")}</ul>
            </details>
          `).join("")}
        </section>` : ""}
        ${work.report.stats?.length ? `
        <section class="report-section reveal-on-scroll">
          <h2>项目成果</h2>
          <div class="report-stats-grid">${work.report.stats.map((s) => `
            <div class="report-stat-card"><strong>${s.value}</strong><span>${s.label}</span></div>
          `).join("")}</div>
        </section>` : ""}
        ${work.report.outputs?.length ? `
        <section class="report-section reveal-on-scroll">
          <h2>输出成果</h2>
          <div class="report-outputs-row">${work.report.outputs.map((o) => `<span class="report-output-tag">${o}</span>`).join("")}</div>
        </section>` : ""}
    ` : hasCapabilities ? `
        ${work.slug === 'dabao-pet' && work.petDemo ? `
        <section class="project-detail__media reveal-on-scroll" style="margin-top: 40px; margin-bottom: 80px;">
          <div class="dabao-click" data-click>
            <div class="dabao-click__container">
              <div class="dabao-click__stage" data-click-stage>
                <!-- Fixed UI Layer -->
                <div class="dabao-click__ui">
                  <div class="dabao-click__image-wrap" data-click-image="work" style="display:none">
                    <div class="dabao-click__image-scroll">
                      <img src="./assets/dabao/journey-work.jpg" alt="Work" />
                    </div>
                  </div>
                  <div class="dabao-click__image-wrap" data-click-image="companion" style="display:none">
                    <div class="dabao-click__image-scroll">
                      <img src="./assets/dabao/journey-companion.jpg" alt="Companion" />
                    </div>
                  </div>
                </div>
                <!-- Pet Layer -->
                <div class="dabao-click__pet" data-click-pet>
                  <div class="dabao-click__glow" data-click-glow></div>
                  <video class="dabao-click__pet-media" data-click-watch autoplay loop muted playsinline draggable="false">
                    <source src="./assets/dabao/watch-alpha.webm" type="video/webm">
                  </video>
                  <video class="dabao-click__pet-media" data-click-fly muted playsinline draggable="false" style="display:none">
                    <source src="./assets/dabao/fly-alpha.webm" type="video/webm">
                  </video>
                  <img class="dabao-click__pet-media" data-click-frame src="./assets/dabao/fly-last-frame.png" alt="达宝" draggable="false" style="display:none" />
                  <p class="dabao-click__hint" data-click-hint>戳戳达宝 ⇢</p>
                </div>
              </div>
            </div>
          </div>
        </section>` : ""}
        ${work.platformMockups ? renderPlatformMockups(work.platformMockups) : ""}
        ${work.buildFlow ? `
        <section class="report-section reveal-on-scroll">
          <h2>${work.buildFlow.title}</h2>
          <div class="report-flow report-flow--h">${work.buildFlow.steps.map((s, i) => `<span>${s}</span>${i < work.buildFlow.steps.length - 1 ? '<span class="report-flow__arrow">→</span>' : ''}`).join("")}</div>
          <blockquote class="report-quote"><p>${work.buildFlow.body}</p></blockquote>
        </section>` : ""}
        ${work.painPoints?.length ? `
        <section class="report-section reveal-on-scroll">
          <h2>痛点识别</h2>
          <div class="report-insight-grid">${work.painPoints.map((p) => `
            <div class="report-insight-card">
              <span class="report-insight-card__tag">${p.tag}</span>
              <h3>${p.title}</h3>
              <p class="report-insight-card__finding">${p.finding}</p>
              ${p.solutions?.length ? `
              <div class="report-insight-card__solutions">
                <strong>达宝的回应</strong>
                <ul>${p.solutions.map((s) => `<li>${s}</li>`).join("")}</ul>
              </div>` : ""}
            </div>
          `).join("")}</div>
        </section>` : ""}
        <section class="project-cap-grid reveal-on-scroll">
          ${work.capabilities.map((cap) => `
            <div class="project-cap-card">
              <div class="project-cap-card__head">
                <h3>${cap.title}</h3>
                ${cap.subtitle ? `<span class="project-cap-card__sub">${cap.subtitle}</span>` : ""}
              </div>
              <p class="project-cap-card__body">${cap.body}</p>
              ${cap.points?.length ? `
              <div class="project-cap-card__points">
                <ul>${cap.points.map((p) => `<li>${p}</li>`).join("")}</ul>
              </div>` : ""}
              ${cap.result ? `<div class="project-cap-card__result"><span>${cap.result}</span></div>` : ""}
            </div>
          `).join("")}
        </section>
        ${work.slug === 'dabao-pet' ? `
        <div class="dabao-easter-egg reveal-on-scroll" data-easter-egg>
          <p class="dabao-easter-egg__text" data-easter-text>对了，达宝是我养的一只鹦鹉，它真的超级超级可爱。</p>
          <p class="dabao-easter-egg__signature" data-easter-signature>—— 达宝亲笔 ✓</p>
          <div class="dabao-easter-egg__dabao" data-easter-dabao>
            <img class="dabao-easter-egg__img" src="./assets/dabao/real-dabao-cutout.png" alt="达宝抠图" />
          </div>
        </div>` : ''}
        ${work.diffDesign?.length ? `
        <section class="report-section reveal-on-scroll">
          <h2>差异化设计</h2>
          <div class="report-strategy-grid">${work.diffDesign.map((d) => `
            <div class="report-strategy-card">
              <span class="report-strategy-card__tag">${d.tag}</span>
              <h3>${d.title}</h3>
              <p class="report-strategy-card__insight">${d.insight}</p>
              ${d.points?.length ? `<ul>${d.points.map((p) => `<li>${p}</li>`).join("")}</ul>` : ""}
              ${d.value ? `<div class="report-strategy-card__value"><strong>差异化价值</strong><span>${d.value}</span></div>` : ""}
            </div>
          `).join("")}</div>
        </section>` : ""}
        ${work.slug === 'dabao-pet' ? (work.platformMockups ? renderPlatformMockups(work.platformMockups) : "") : ""}
        ${work.methodology ? `<blockquote class="project-methodology reveal-on-scroll"><p>${work.methodology}</p></blockquote>` : ""}
    ` : `
        <section class="project-detail__cards reveal-on-scroll">
          <div class="project-info-card"><strong>角色</strong><p>${work.role}</p></div>
          <div class="project-info-card"><strong>核心动作</strong><ol>${(work.actions || []).map((a) => `<li>${a}</li>`).join("")}</ol></div>
          <div class="project-info-card"><strong>关键成果</strong><ul>${(work.results || []).map((r) => `<li>${r}</li>`).join("")}</ul></div>
        </section>
        ${work.highlights?.length ? `
        <section class="project-detail__highlights reveal-on-scroll">
          <h3>✨ 差异化亮点</h3>
          ${work.highlights.map((h) => `<div class="project-highlight-card"><strong>${h.title}</strong><p>${h.body}</p></div>`).join("")}
        </section>` : ""}
        ${work.metrics?.length ? `
        <section class="project-detail__metrics reveal-on-scroll">
          <h3>📊 量化成果 / 关键产出</h3>
          <div class="project-metrics-row">${work.metrics.map((m) => `<span class="project-metric-tag">${m}</span>`).join("")}</div>
        </section>` : ""}
        ${work.techStack ? `<p class="project-detail__tech reveal-on-scroll"><strong>技术栈：</strong>${work.techStack}</p>` : ""}
    `;
    root.innerHTML = `
      <section class="project-detail content-wide">
        <a class="project-back-link reveal-on-scroll" href="./project.html?category=${categorySlug}">← 返回${cat.label}</a>
        <div class="reveal-on-scroll">
          <p class="eyebrow">项目 / ${work.category}</p>
          <h1 class="page-title">${work.title}</h1>
        </div>
        ${work.interactiveSection ? `
          <div class="project-interactive-container reveal-on-scroll">
            ${work.interactiveSection}
          </div>
        ` : ""}
        <section class="project-detail__summary reveal-on-scroll">
          <p>${work.summary}</p>
        </section>
        ${simHTML}
        ${bodyHTML}
      </section>
    `;
    if (work.slug === "dabao-pet" && work.petDemo) initPetDemo(work.petDemo);
    if (work.slug === "dabao-pet" && work.petDemo) {
      initDabaoJourney();
      initDabaoEasterEgg();
    }
    if (work.slug === "data-management-platform" && work.platformMockups) {
      initPlatformDonutTooltip();
    }
    if (work.slug === "island-three-sounds") {
      initIslandStoryEngine();
    }
  }

  function initDabaoEasterEgg() {
    const egg = document.querySelector("[data-easter-egg]");
    if (!egg || !window.gsap) return;
    const dabao = egg.querySelector("[data-easter-dabao]");
    const textEl = egg.querySelector("[data-easter-text]");
    const signature = egg.querySelector("[data-easter-signature]");
    if (!dabao || !textEl || !signature) return;

    let count = 0;
    let busy = false;
    let breathTween = null;

    const ORIGINAL_TEXT = "对了，达宝是我养的一只鹦鹉，它真的超级超级可爱。";
    const PREFIX = "对了，达宝是我养的一只鹦鹉，";
    const TYPE_LINE1 = "它真的……超级超级可爱。";
    const TYPE_LINE2 = "但有时也会咬坏我的键帽&nbsp;🤏";

    function setBusy(b) {
      busy = b;
      // Allow interaction if not busy
      dabao.classList.toggle("is-interactive", !b);
    }

    function startBreath() {
      stopBreath();
      breathTween = gsap.to(dabao, {
        y: -2, duration: 1, ease: "sine.inOut", yoyo: true, repeat: -1
      });
    }

    function stopBreath() {
      if (breathTween) { breathTween.kill(); breathTween = null; }
      gsap.set(dabao, { y: 0 });
    }

    // Typewriter: writes chars of `str` into `el` one by one at 60ms/char, then calls onDone
    function typeChars(el, str, onDone) {
      let i = 0;
      const chars = str.replace(/&nbsp;/g, "\u00A0").split("");
      function step() {
        if (i >= chars.length) { if (onDone) onDone(); return; }
        el.textContent += chars[i];
        i++;
        setTimeout(step, 60);
      }
      step();
    }

    function doTypewriter() {
      textEl.innerHTML = PREFIX; // keep prefix visible immediately
      const span1 = document.createElement("span");
      textEl.appendChild(span1);
      typeChars(span1, TYPE_LINE1, () => {
        // Small pause, then append second line
        setTimeout(() => {
          const br = document.createElement("br");
          const span2 = document.createElement("span");
          span2.className = "dabao-easter-egg__small";
          textEl.appendChild(br);
          textEl.appendChild(span2);
          typeChars(span2, TYPE_LINE2);
        }, 500);
      });
    }

    function resetToZero(animate) {
      count = 0;
      stopBreath();
      gsap.killTweensOf(dabao);
      gsap.killTweensOf(textEl);
      gsap.killTweensOf(signature);
      textEl.textContent = ORIGINAL_TEXT;
      signature.classList.remove("is-visible");
      dabao.classList.remove("is-interactive");

      if (animate) {
        gsap.to(dabao, { x: "60%", scale: 0.8, duration: 0.5, ease: "power2.in", onComplete: () => {
          gsap.to(dabao, { x: "120%", scale: 1, duration: 0.5, ease: "power2.in", onComplete: () => {
            setBusy(false);
          }});
        }});
      } else {
        gsap.set(dabao, { x: "120%", scale: 1, rotate: 0, y: 0 });
      }
    }

    function activate() {
      if (busy) return;

      if (count === 0) {
        // ── Click 1: full reveal + typewriter ──
        setBusy(true);
        count = 1;
        stopBreath();
        gsap.killTweensOf(dabao);
        gsap.to(dabao, {
          x: "0%", duration: 0.5, ease: "back.out(1.7)",
          onComplete: () => { startBreath(); setBusy(false); }
        });
        // Fade out text, then typewriter
        gsap.to(textEl, { opacity: 0, duration: 0.3, ease: "power2.out", onComplete: () => {
          doTypewriter();
          gsap.to(textEl, { opacity: 1, duration: 0.2 });
        }});
      } else if (count === 1) {
        // ── Click 2: tilt + signature ──
        setBusy(true);
        count = 2;
        stopBreath();
        gsap.to(dabao, {
          rotate: 5, duration: 0.5, ease: "power2.out",
          onComplete: () => { startBreath(); setBusy(false); }
        });
        signature.classList.add("is-visible");
      } else if (count === 2) {
        // ── Click 3: reset ──
        setBusy(true);
        resetToZero(true);
      }
    }

    // Click
    dabao.addEventListener("click", (e) => { e.stopPropagation(); activate(); });

    // Hover: subtle tilt (-3°, -3px)
    dabao.addEventListener("mouseenter", () => {
      if (busy) return;
      gsap.killTweensOf(dabao, "rotate");
      gsap.to(dabao, { rotate: -3, y: -3, duration: 0.4, ease: "power2.out" });
    });
    dabao.addEventListener("mouseleave", () => {
      if (busy) return;
      gsap.to(dabao, { rotate: 0, y: 0, duration: 0.6, ease: "power2.out" });
      if (count > 0) startBreath();
    });

    // Auto-peek when scrolled into view (0.6s delay, 1s animation)
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        setTimeout(() => {
          if (count === 0 && !busy) {
            dabao.classList.add("is-interactive");
            gsap.to(dabao, { 
              x: "60%", 
              duration: 1.2, 
              ease: "back.out(1.2)", 
              onComplete: () => {
                // Subtle invite wiggle
                gsap.to(dabao, { rotate: 5, duration: 0.2, yoyo: true, repeat: 3 });
              }
            });
          }
        }, 800);
      }
    }, { threshold: 0.3 });
    observer.observe(egg);
  }

  function initDabaoJourney() {
    const section = document.querySelector("[data-click]");
    if (!section || !window.gsap) return;

    const stage = section.querySelector("[data-click-stage]");
    const pet = section.querySelector("[data-click-pet]");
    const glow = section.querySelector("[data-click-glow]");
    const hint = section.querySelector("[data-click-hint]");
    const videoWatch = section.querySelector("[data-click-watch]");
    const videoFly = section.querySelector("[data-click-fly]");
    const frameImg = section.querySelector("[data-click-frame]");
    const imgWork = section.querySelector('[data-click-image="work"]');
    const imgCompanion = section.querySelector('[data-click-image="companion"]');
    if (!stage || !pet || !glow || !hint || !videoWatch || !videoFly || !frameImg || !imgWork || !imgCompanion) return;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const TAKEOFF_CUT_MS = 700; // only play the front slice of the takeoff clip, not the full 5s source
    const FLIGHT_DURATION = 0.8; // fast, snappy bezier hop
    const ZOOM_MIN = 1;
    const ZOOM_MAX = 2.5;

    // "normal" | "flying_to_work" | "show_work" | "flying_to_companion" | "show_companion" | "flying_back"
    let state = "normal";
    let petPos = { x: 0, y: 0 };
    let zoomFactor = 1;

    let currentMedia = "watch";
    function showMedia(mode) {
      if (mode === currentMedia) return;
      currentMedia = mode;
      videoWatch.style.display = mode === "watch" ? "" : "none";
      videoFly.style.display = mode === "fly" ? "" : "none";
      frameImg.style.display = mode === "frame" ? "" : "none";
      if (mode === "watch") {
        try { videoWatch.currentTime = 0; } catch (e) {}
        videoWatch.play().catch(() => {});
      } else if (mode === "fly") {
        try { videoFly.currentTime = 0; } catch (e) {}
        videoFly.play().catch(() => {});
      }
    }

    function setPetCenter(x, y, rotate) {
      petPos = { x, y };
      const w = pet.offsetWidth || 130;
      const h = pet.offsetHeight || 130;
      gsap.set(pet, { left: x - w / 2, top: y - h / 2, rotate: rotate || 0 });
    }

    function setBusy(busy) {
      pet.classList.toggle("is-busy", busy);
    }

    function updateGuidance() {
      if (state === "normal") {
        hint.textContent = "戳戳达宝 ⇢";
        hint.classList.remove("is-hidden");
        glow.classList.add("is-active");
      } else if (state === "show_work" || state === "show_companion") {
        hint.textContent = "再戳戳我～";
        hint.classList.remove("is-hidden");
        glow.classList.add("is-active");
      } else {
        hint.classList.add("is-hidden");
        glow.classList.remove("is-active");
      }
    }

    function setState(next) {
      state = next;
      updateGuidance();
    }

    // Normal state keeps the pet in-flow (position: absolute, relative to the stage box)
    // so it scrolls with the page and the stage above the content list stays compact.
    // Flying/showing states lift it to position: fixed so it (and the revealed image) can
    // float above the rest of the page, matching the "hovering card" feel.
    function switchPetToFixed() {
      const r = pet.getBoundingClientRect();
      pet.style.position = "fixed";
      setPetCenter(r.left + r.width / 2, r.top + r.height / 2, 0);
    }

    function switchPetToAbsolute() {
      const r = pet.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      pet.style.position = "absolute";
      setPetCenter(r.left + r.width / 2 - stageRect.left, r.top + r.height / 2 - stageRect.top, 0);
    }

    function stageCenterLocal() {
      const r = stage.getBoundingClientRect();
      return { x: r.width * 0.5, y: r.height * 0.65 };
    }

    function stageCenterViewport() {
      const r = stage.getBoundingClientRect();
      return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.65 };
    }

    // Both the pet and the revealed image are position:fixed while showing, so this is
    // plain viewport math (no stage-offset subtraction needed). Gap kept generous so the
    // pet never overlaps the image, even with its idle bob/sway motion.
    function sideTargetViewport(wrapEl, side) {
      const rect = wrapEl.getBoundingClientRect();
      const petW = pet.offsetWidth || 130;
      const gap = window.innerWidth < 640 ? 64 : 110;
      const x = side === "left" ? rect.left - petW / 2 - gap : rect.right + petW / 2 + gap;
      const y = rect.top + rect.height * 0.35;
      return {
        x: clamp(x, petW / 2 + 10, window.innerWidth - petW / 2 - 10),
        y: clamp(y, petW / 2 + 10, window.innerHeight - petW / 2 - 10)
      };
    }

    // Deliberately cuts the takeoff clip short instead of waiting for it (or its "ended"
    // event) to finish — the source clip is several seconds long, which reads as sluggish.
    function playTakeoff(onDone) {
      showMedia("fly");
      setTimeout(onDone, TAKEOFF_CUT_MS);
    }

    // Manual quadratic-bezier flight path with a light bob + tilt layered on top, driven by
    // a plain GSAP value tween (keeps this dependency-free, no MotionPathPlugin). Fires
    // onHalfway partway through so the destination image can start revealing while the pet
    // is still mid-flight, instead of waiting for a full arrival + pause.
    function flyTo(from, to, duration, onHalfway, onComplete) {
      const dir = to.x >= from.x ? 1 : -1;
      const midX = (from.x + to.x) / 2;
      const arc = 40 + Math.abs(to.x - from.x) * 0.15;
      const midY = Math.min(from.y, to.y) - arc;
      const driver = { t: 0 };
      let halfwayFired = false;
      gsap.to(driver, {
        t: 1,
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          const t = driver.t;
          const inv = 1 - t;
          const bx = inv * inv * from.x + 2 * inv * t * midX + t * t * to.x;
          const by = inv * inv * from.y + 2 * inv * t * midY + t * t * to.y;
          const bob = Math.sin(t * Math.PI * 3) * 8;
          const rot = Math.sin(t * Math.PI) * 5 * dir;
          setPetCenter(bx, by + bob, rot);
          if (!halfwayFired && t >= 0.5) {
            halfwayFired = true;
            if (onHalfway) onHalfway();
          }
        },
        onComplete: () => {
          setPetCenter(to.x, to.y, 0);
          onComplete();
        }
      });
    }

    function revealImage(wrapEl) {
      zoomFactor = 1;
      gsap.killTweensOf(wrapEl);
      gsap.fromTo(wrapEl, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
      // Scroll the inner container back to top so the user sees the top of the long image first
      const scroll = wrapEl.querySelector('.dabao-click__image-scroll');
      if (scroll) scroll.scrollTop = 0;
    }

    function hideImage(wrapEl, onDone) {
      gsap.killTweensOf(wrapEl);
      gsap.to(wrapEl, {
        opacity: 0, scale: 0.3, duration: 0.4, ease: "power2.in",
        onComplete: () => { gsap.set(wrapEl, { display: "none" }); onDone(); }
      });
    }

    function attachWheelZoom(wrapEl) {
      wrapEl.addEventListener("wheel", (e) => {
        if (getComputedStyle(wrapEl).display === "none") return;

        // Ctrl / Cmd + wheel  →  zoom (like Figma / browser zoom)
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          gsap.killTweensOf(wrapEl, "scale");
          zoomFactor = clamp(zoomFactor - e.deltaY * 0.002, ZOOM_MIN, ZOOM_MAX);
          gsap.set(wrapEl, { scale: zoomFactor, opacity: 1 });
          return;
        }

        // Plain wheel at default size  →  let the browser scroll through the long image
        // (don't preventDefault, event reaches the overflow-y:auto scroll container)
        if (zoomFactor <= 1.001) {
          zoomFactor = 1;
          gsap.set(wrapEl, { scale: 1 });
          return;
        }

        // Plain wheel while zoomed in  →  continue zooming
        e.preventDefault();
        gsap.killTweensOf(wrapEl, "scale");
        zoomFactor = clamp(zoomFactor - e.deltaY * 0.0015, ZOOM_MIN, ZOOM_MAX);
        gsap.set(wrapEl, { scale: zoomFactor, opacity: 1 });
        if (zoomFactor <= 1.001) {
          zoomFactor = 1;
          gsap.set(wrapEl, { scale: 1 });
        }
      }, { passive: false });
    }

    function startFlightToWork() {
      setState("flying_to_work");
      setBusy(true);
      switchPetToFixed();
      playTakeoff(() => {
        showMedia("frame");
        // Measure at full size (scale:1) so sideTargetViewport gets the real rect,
        // then reset to the reveal start scale — the flash is hidden by opacity:0
        gsap.set(imgWork, { display: "block", opacity: 0, scale: 1 });
        const to = sideTargetViewport(imgWork, "left");
        gsap.set(imgWork, { scale: 0.3 });
        flyTo(petPos, to, FLIGHT_DURATION, () => revealImage(imgWork), () => {
          showMedia("watch");
          setState("show_work");
          setBusy(false);
        });
      });
    }

    function startFlightToCompanion() {
      setState("flying_to_companion");
      setBusy(true);
      hideImage(imgWork, () => {
        playTakeoff(() => {
          showMedia("frame");
          // Measure at full size (scale:1) so sideTargetViewport gets the real rect
          gsap.set(imgCompanion, { display: "block", opacity: 0, scale: 1 });
          const to = sideTargetViewport(imgCompanion, "right");
          gsap.set(imgCompanion, { scale: 0.3 });
          flyTo(petPos, to, FLIGHT_DURATION, () => revealImage(imgCompanion), () => {
            showMedia("watch");
            setState("show_companion");
            setBusy(false);
          });
        });
      });
    }

    function startFlightBack() {
      setState("flying_back");
      setBusy(true);
      hideImage(imgCompanion, () => {
        playTakeoff(() => {
          showMedia("frame");
          const to = stageCenterViewport();
          flyTo(petPos, to, FLIGHT_DURATION, null, () => {
            showMedia("watch");
            switchPetToAbsolute();
            setState("normal");
            setBusy(false);
          });
        });
      });
    }

    function handlePetActivate() {
      if (state === "normal") startFlightToWork();
      else if (state === "show_work") startFlightToCompanion();
      else if (state === "show_companion") startFlightBack();
    }

    pet.addEventListener("click", handlePetActivate);
    pet.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handlePetActivate();
      }
    });

    attachWheelZoom(imgWork);
    attachWheelZoom(imgCompanion);
    gsap.set([imgWork, imgCompanion], { xPercent: -50, yPercent: -50 });

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (state === "normal") { const t = stageCenterLocal(); setPetCenter(t.x, t.y, 0); }
        else if (state === "show_work") { const t = sideTargetViewport(imgWork, "left"); setPetCenter(t.x, t.y, 0); }
        else if (state === "show_companion") { const t = sideTargetViewport(imgCompanion, "right"); setPetCenter(t.x, t.y, 0); }
      }, 200);
    });

    const initial = stageCenterLocal();
    setPetCenter(initial.x, initial.y, 0);
    setState("normal");
  }

  function initPetDemo(petDemo) {
    const area = document.querySelector("[data-demo-area]");
    const petWrap = document.querySelector("[data-pet-wrap]");
    const bubble = document.querySelector("[data-pet-bubble]");
    const demoBg = document.querySelector("[data-demo-bg]");
    if (!area || !petWrap) return;

    const windows = {};
    document.querySelectorAll("[data-win]").forEach((el) => { windows[el.dataset.win] = el; });

    const state = {
      persona: "活力社鸟",
      petState: "发呆中",
      bg: "winter",
      pomodoroCount: 0,
      reminderCount: 0,
      diaryEntries: []
    };

    // Default background: dabao starts already living inside a background design.
    if (demoBg) {
      demoBg.style.backgroundImage = "url('./assets/dabao/bg-winter-afternoon.jpg')";
      demoBg.classList.add("is-visible");
    }

    let topZ = 10;
    function bringToFront(win) {
      topZ += 1;
      win.style.zIndex = String(topZ);
    }

    let bubbleTimer = null;
    function speak(text, ms = 2600) {
      if (!bubble) return;
      bubble.textContent = text;
      bubble.classList.add("is-visible");
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => bubble.classList.remove("is-visible"), ms);
    }

    function areaRect() { return area.getBoundingClientRect(); }

    // ---------- generic drag helper ----------
    function makeDraggable(el, handle, { clampToArea = true } = {}) {
      let startX = 0, startY = 0, startLeft = 0, startTop = 0, dragging = false, moved = 0;
      function onDown(e) {
        if (!e.touches) e.preventDefault();
        const point = e.touches ? e.touches[0] : e;
        dragging = true;
        moved = 0;
        startX = point.clientX;
        startY = point.clientY;
        const rect = el.getBoundingClientRect();
        const parentRect = areaRect();
        startLeft = rect.left - parentRect.left;
        startTop = rect.top - parentRect.top;
        bringToFront(el);
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
        document.addEventListener("touchmove", onMove, { passive: false });
        document.addEventListener("touchend", onUp);
      }
      function onMove(e) {
        if (!dragging) return;
        if (e.cancelable) e.preventDefault();
        const point = e.touches ? e.touches[0] : e;
        const dx = point.clientX - startX;
        const dy = point.clientY - startY;
        moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
        let left = startLeft + dx;
        let top = startTop + dy;
        if (clampToArea) {
          const parentRect = areaRect();
          const elRect = el.getBoundingClientRect();
          left = Math.max(0, Math.min(left, parentRect.width - elRect.width));
          top = Math.max(0, Math.min(top, parentRect.height - elRect.height));
        }
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
      }
      function onUp() {
        dragging = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onUp);
      }
      handle.addEventListener("mousedown", onDown);
      handle.addEventListener("touchstart", onDown, { passive: true });
      return { wasDragged: () => moved > 6 };
    }

    // ---------- pet drag + click ----------
    const petDrag = makeDraggable(petWrap, petWrap);
    petWrap.addEventListener("click", () => {
      if (petDrag.wasDragged()) return;
      toggleWindow("main");
      if (windows.main.hasAttribute("hidden") === false) speak("嗨，我的工作台开好啦～");
    });

    // ---------- window open/close ----------
    let openCount = 0;
    function cascadePosition(win) {
      if (win.dataset.positioned) return;
      win.dataset.positioned = "1";
      const rect = areaRect();
      const offset = (openCount % 6) * 26;
      openCount += 1;
      const isMain = win.dataset.win === "main";
      const baseLeft = isMain ? rect.width * 0.42 : rect.width * 0.30;
      const baseTop = isMain ? rect.height * 0.06 : rect.height * 0.12;
      win.style.left = `${Math.max(8, baseLeft + offset)}px`;
      win.style.top = `${Math.max(8, baseTop + offset)}px`;
    }
    function openWindow(name) {
      const win = windows[name];
      if (!win) return;
      cascadePosition(win);
      win.removeAttribute("hidden");
      bringToFront(win);
    }
    function closeWindow(name) {
      const win = windows[name];
      if (win) win.setAttribute("hidden", "");
    }
    function toggleWindow(name) {
      const win = windows[name];
      if (!win) return;
      if (win.hasAttribute("hidden")) openWindow(name);
      else closeWindow(name);
    }

    document.querySelectorAll("[data-open]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openWindow(btn.dataset.open);
      });
    });
    document.querySelectorAll("[data-win-close]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const win = btn.closest("[data-win]");
        if (win) closeWindow(win.dataset.win);
      });
    });
    Object.values(windows).forEach((win) => {
      const handle = win.querySelector("[data-drag-handle]");
      if (handle) makeDraggable(win, handle);
      win.addEventListener("mousedown", () => bringToFront(win));
    });

    // ---------- background picker ----------
    const bgFiles = { winter: "./assets/dabao/bg-winter-afternoon.jpg", summer: "./assets/dabao/bg-summer-valley.jpg" };
    const bgLabels = { none: "无背景", winter: "冬日午后", summer: "夏日山谷" };
    document.querySelectorAll("[data-bg-option]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const option = btn.dataset.bgOption;
        state.bg = option;
        document.querySelectorAll("[data-bg-option]").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        if (demoBg) {
          if (option === "none") {
            demoBg.style.backgroundImage = "";
            demoBg.classList.remove("is-visible");
          } else {
            demoBg.style.backgroundImage = `url('${bgFiles[option]}')`;
            demoBg.classList.add("is-visible");
          }
        }
        const consoleBg = document.querySelector("[data-console-bg]");
        if (consoleBg) consoleBg.textContent = bgLabels[option];
        speak("换了个新地方待着，感觉不错～");
      });
    });

    // ---------- persona picker ----------
    const personaLines = {
      "独行侠": "嗯。（继续专注工作）",
      "社牛懒鸟": "哎呀你可算来啦，我正无聊呢！",
      "活力社鸟": "冲鸭！今天也要元气满满哦～",
      "治愈系": "你今天过得怎么样呀？累了要说出来哦",
      "暖心咸鱼": "躺一会儿嘛…不过有你在真好"
    };
    document.querySelectorAll("[data-persona]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const persona = btn.dataset.persona;
        state.persona = persona;
        document.querySelectorAll("[data-persona]").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const nameEl = document.querySelector("[data-persona-name]");
        if (nameEl) nameEl.textContent = persona;
        const consolePersona = document.querySelector("[data-console-persona]");
        if (consolePersona) consolePersona.textContent = persona;
        speak(personaLines[persona] || "性格切换好啦～");
      });
    });

    // ---------- console actions ----------
    document.querySelectorAll("[data-console-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const map = { reload: "配置已重载～（演示）", export: "配置包已导出～（演示）", log: "日志目录已打开～（演示）" };
        speak(map[btn.dataset.consoleAction] || "完成啦～");
      });
    });

    // ---------- calendar ----------
    const today = new Date();
    const calState = { year: today.getFullYear(), month: today.getMonth(), selected: formatDate(today) };
    const calendarEvents = {};
    calendarEvents[formatDate(today)] = [
      { time: "09:00", title: "日程 (09:00-19:00)", remind: "none" },
      { time: "12:00", title: "完成达宝的功能升级", remind: "30" }
    ];

    function formatDate(d) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }

    function renderCalendar() {
      const titleEl = document.querySelector("[data-cal-title]");
      const gridEl = document.querySelector("[data-cal-grid]");
      if (!titleEl || !gridEl) return;
      titleEl.textContent = `${calState.year}年${calState.month + 1}月`;

      const firstOfMonth = new Date(calState.year, calState.month, 1);
      const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday-first
      const daysInMonth = new Date(calState.year, calState.month + 1, 0).getDate();
      const daysInPrevMonth = new Date(calState.year, calState.month, 0).getDate();

      let cellsHTML = "";
      for (let i = 0; i < startOffset; i++) {
        const day = daysInPrevMonth - startOffset + i + 1;
        cellsHTML += `<span class="dabao-cal__cell is-muted">${day}</span>`;
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(calState.year, calState.month, day);
        const dateStr = formatDate(dateObj);
        const isToday = dateStr === formatDate(today);
        const isSelected = dateStr === calState.selected;
        const hasEvents = calendarEvents[dateStr] && calendarEvents[dateStr].length > 0;
        cellsHTML += `<span class="dabao-cal__cell${isToday ? " is-today" : ""}${isSelected ? " is-selected" : ""}" data-cal-date="${dateStr}">${day}${hasEvents ? '<i class="dabao-cal__dot"></i>' : ""}</span>`;
      }
      const totalCells = startOffset + daysInMonth;
      const trailing = (7 - (totalCells % 7)) % 7;
      for (let i = 1; i <= trailing; i++) {
        cellsHTML += `<span class="dabao-cal__cell is-muted">${i}</span>`;
      }
      gridEl.innerHTML = cellsHTML;
      renderCalendarList();
    }

    function renderCalendarList() {
      const labelEl = document.querySelector("[data-cal-selected-date]");
      const itemsEl = document.querySelector("[data-cal-items]");
      if (!labelEl || !itemsEl) return;
      const [, m, d] = calState.selected.split("-");
      labelEl.textContent = `${Number(m)}月${Number(d)}日 的日程`;
      const events = calendarEvents[calState.selected] || [];
      itemsEl.innerHTML = events.length
        ? events.map((ev) => `<div class="dabao-cal__item"><span class="dabao-cal__item-time">${ev.time}</span><span class="dabao-cal__item-title">${ev.title}</span>${ev.remind !== "none" ? `<span class="dabao-cal__item-remind">⏰${ev.remind}分钟前</span>` : ""}</div>`).join("")
        : `<p class="dabao-cal__empty">这天还没有安排，点「+新增日程」试试～</p>`;
    }

    document.querySelector("[data-cal-prev]")?.addEventListener("click", () => {
      calState.month -= 1;
      if (calState.month < 0) { calState.month = 11; calState.year -= 1; }
      renderCalendar();
    });
    document.querySelector("[data-cal-next]")?.addEventListener("click", () => {
      calState.month += 1;
      if (calState.month > 11) { calState.month = 0; calState.year += 1; }
      renderCalendar();
    });
    document.querySelector("[data-cal-grid]")?.addEventListener("click", (e) => {
      const cell = e.target.closest("[data-cal-date]");
      if (!cell) return;
      calState.selected = cell.dataset.calDate;
      renderCalendar();
    });
    document.querySelector("[data-cal-add]")?.addEventListener("click", () => {
      const form = document.querySelector("[data-cal-form]");
      form?.toggleAttribute("hidden");
    });
    document.querySelector("[data-cal-cancel]")?.addEventListener("click", () => {
      document.querySelector("[data-cal-form]")?.setAttribute("hidden", "");
    });
    document.querySelector("[data-cal-save]")?.addEventListener("click", () => {
      const titleInput = document.querySelector("[data-cal-input-title]");
      const timeInput = document.querySelector("[data-cal-input-time]");
      const remindInput = document.querySelector("[data-cal-input-remind]");
      const title = titleInput?.value.trim();
      if (!title) { titleInput?.focus(); return; }
      const dateKey = calState.selected;
      if (!calendarEvents[dateKey]) calendarEvents[dateKey] = [];
      calendarEvents[dateKey].push({ time: timeInput?.value || "09:00", title, remind: remindInput?.value || "none" });
      calendarEvents[dateKey].sort((a, b) => a.time.localeCompare(b.time));
      if (remindInput?.value !== "none") {
        state.reminderCount += 1;
        const remindEl = document.querySelector("[data-console-remind]");
        if (remindEl) remindEl.textContent = String(state.reminderCount);
      }
      titleInput.value = "";
      document.querySelector("[data-cal-form]")?.setAttribute("hidden", "");
      renderCalendar();
      speak("记下啦！到点我会提醒你的～");
    });
    renderCalendar();

    // ---------- treasure board ----------
    const boardCanvas = document.querySelector("[data-board-canvas]");
    const noteColors = ["#fff2b8", "#ffd6e0", "#d6f5e3", "#dbe8ff", "#f5d6ff"];
    let noteCount = 0;
    function createNote(text, left, top, color) {
      noteCount += 1;
      const note = document.createElement("div");
      note.className = "dabao-board__note";
      note.style.left = `${left}px`;
      note.style.top = `${top}px`;
      note.style.background = color;
      note.innerHTML = `<button class="dabao-board__note-close" aria-label="删除">×</button><div class="dabao-board__note-text" contenteditable="true">${text}</div>`;
      boardCanvas.appendChild(note);
      const handle = note.querySelector(".dabao-board__note-text");
      makeDraggable(note, handle, { clampToArea: false });
      note.querySelector(".dabao-board__note-close").addEventListener("click", (e) => {
        e.stopPropagation();
        note.remove();
      });
      // Constrain drag to board bounds instead of full area
      note.addEventListener("mousedown", () => bringToFront(note));
      return note;
    }
    if (boardCanvas) {
      createNote("和算法重新确认需求2.0", 24, 60, noteColors[0]);
      createNote("记得点外卖！", 220, 40, noteColors[1]);
      createNote("晚上机器需要重启", 120, 180, noteColors[3]);
      document.querySelector("[data-board-add]")?.addEventListener("click", () => {
        const left = 30 + Math.random() * 200;
        const top = 60 + Math.random() * 140;
        const color = noteColors[Math.floor(Math.random() * noteColors.length)];
        createNote("新的想法…", left, top, color);
      });
      boardCanvas.addEventListener("contextmenu", (e) => {
        if (e.target !== boardCanvas) return;
        e.preventDefault();
        const rect = boardCanvas.getBoundingClientRect();
        const color = noteColors[Math.floor(Math.random() * noteColors.length)];
        createNote("新的想法…", e.clientX - rect.left, e.clientY - rect.top, color);
      });
    }

    // ---------- pomodoro ----------
    let pomoDuration = 25 * 60;
    let pomoRemaining = pomoDuration;
    let pomoTimer = null;
    let pomoRunning = false;
    const pomoTimeEl = document.querySelector("[data-pomo-time]");
    const pomoRingEl = document.querySelector("[data-pomo-ring]");
    const pomoStartBtn = document.querySelector("[data-pomo-start]");

    function renderPomo() {
      const m = String(Math.floor(pomoRemaining / 60)).padStart(2, "0");
      const s = String(pomoRemaining % 60).padStart(2, "0");
      if (pomoTimeEl) pomoTimeEl.textContent = `${m}:${s}`;
      const pct = 100 - (pomoRemaining / pomoDuration) * 100;
      pomoRingEl?.style.setProperty("--p", String(pct));
    }
    renderPomo();

    document.querySelectorAll("[data-pomo-duration]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (pomoRunning) return;
        document.querySelectorAll("[data-pomo-duration]").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        pomoDuration = Number(btn.dataset.pomoDuration) * 60;
        pomoRemaining = pomoDuration;
        renderPomo();
      });
    });
    pomoStartBtn?.addEventListener("click", () => {
      pomoRunning = !pomoRunning;
      if (pomoRunning) {
        pomoStartBtn.textContent = "⏸ 暂停";
        pomoTimer = setInterval(() => {
          pomoRemaining -= 1;
          if (pomoRemaining <= 0) {
            clearInterval(pomoTimer);
            pomoRunning = false;
            pomoRemaining = 0;
            renderPomo();
            pomoStartBtn.textContent = "▶ 开始专注";
            state.pomodoroCount += 1;
            const pomoCountEl = document.querySelector("[data-console-pomo]");
            if (pomoCountEl) pomoCountEl.textContent = String(state.pomodoroCount);
            speak("叮！专注完成，去摸摸虾呗休息一下～");
            pomoRemaining = pomoDuration;
            renderPomo();
            return;
          }
          renderPomo();
        }, 1000);
      } else {
        pomoStartBtn.textContent = "▶ 开始专注";
        clearInterval(pomoTimer);
      }
    });
    document.querySelector("[data-pomo-reset]")?.addEventListener("click", () => {
      clearInterval(pomoTimer);
      pomoRunning = false;
      pomoRemaining = pomoDuration;
      if (pomoStartBtn) pomoStartBtn.textContent = "▶ 开始专注";
      renderPomo();
    });

    // ---------- mood diary ----------
    let selectedMood = "🙂";
    document.querySelectorAll("[data-mood]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedMood = btn.dataset.mood;
        document.querySelectorAll("[data-mood]").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });
    function renderDiaryList() {
      const listEl = document.querySelector("[data-diary-list]");
      if (!listEl) return;
      listEl.innerHTML = state.diaryEntries.map((entry) => `<div class="dabao-diary__entry"><span class="dabao-diary__entry-mood">${entry.mood}</span><div class="dabao-diary__entry-body"><p>${entry.text}</p><small>${entry.time}</small></div></div>`).join("");
    }
    document.querySelector("[data-diary-save]")?.addEventListener("click", () => {
      const textEl = document.querySelector("[data-diary-text]");
      const text = textEl?.value.trim();
      if (!text) { textEl?.focus(); return; }
      const now = new Date();
      state.diaryEntries.unshift({ mood: selectedMood, text, time: `${now.getMonth() + 1}月${now.getDate()}日 ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}` });
      textEl.value = "";
      renderDiaryList();
      const diaryCountEl = document.querySelector("[data-console-diary]");
      if (diaryCountEl) diaryCountEl.textContent = String(state.diaryEntries.length);
      speak("记下啦，你的心情我都懂～");
    });
  }

  function renderStoryPage() {
    const entry = writingEntries.find((item) => item.slug === params.get("slug")) || writingEntries[0];
    const root = document.querySelector("[data-story-content]");
    if (!root) {
      return;
    }
    document.title = `${entry.title} - 谢琬滢 Xiewanying`;
    root.innerHTML = `
      <header class="essay-head reveal-on-scroll"><p class="eyebrow">${entry.category}</p><h1 class="page-title">${entry.title}</h1><p class="detail-meta">${entry.date}</p></header>
      <figure class="detail-image detail-image--full reveal-on-scroll"><img src="${entry.cover.src}" alt="${escapeHtml(entry.cover.alt)}" /></figure>
      <section class="detail-text-block reveal-on-scroll">${entry.body.map((item) => `<p>${item}</p>`).join("")}</section>
    `;
  }

  function renderHomeContent() {
    if (state.activeTab === "photography") {
      if (state.activePhotoCategory) {
        renderPhotographyGallery(state.activePhotoCategory);
      } else {
        renderPhotographyLanding();
      }
      return;
    }
    if (state.activeTab === "video") {
      if (state.activeVideoCategory) {
        renderVideoGrid(state.activeVideoCategory);
      } else {
        renderVideoCategoriesLanding();
      }
      return;
    }
    renderHomeResume();
  }

  function initHomePage() {
    updateTabLinks();
    renderHomeHero();
    renderHomeContent();
    initLightbox();
  }

  function initPage() {
    renderHeaderActions();
    renderDrawer();
    initHeader();
    initDrawer();
    initWechatModal();
    initContactActions();
    if (page === "home") {
      initHomePage();
    }
    if (page === "about") {
      renderAboutPage();
    }
    if (page === "series") {
      renderSeriesPage();
    }
    if (page === "video-work") {
      renderVideoPage();
    }
    if (page === "story") {
      renderStoryPage();
    }
    if (page === "project") {
      const catSlug = params.get("category");
      const workSlug = params.get("slug");
      if (catSlug && workSlug) {
        renderProjectDetail(catSlug, workSlug);
      } else if (catSlug) {
        renderProjectList(catSlug);
      } else {
        renderProjectLanding();
      }
    }
    initRevealObserver();
  }

  initPage();
})();
