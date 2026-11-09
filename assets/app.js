/* =========================================================================
 * LoRA 图鉴 · 模型库交互
 * 依赖 data/lora.js 提供的 window.LORA_DATA，无第三方库、无网络请求。
 * ========================================================================= */

(function () {
  "use strict";

  var DATA = window.LORA_DATA;
  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };

  var els = {
    q: $("q"),
    heroTitle: $("hero-title"),
    langToggle: $("lang-toggle"),
    searchClear: $("search-clear"),
    grid: $("grid"),
    loading: $("loading"),
    empty: $("empty"),
    loadMore: $("load-more"),
    resultCount: $("result-count"),
    activeFilters: $("active-filters"),
    filters: $("filters"),
    filterOpen: $("filter-open"),
    filterOpenCount: $("filter-open-count"),
    filterLeadText: $("filter-lead-text"),
    filterBody: $("filter-body"),
    filterDialog: $("filter-dialog"),
    filterDialogBody: $("filter-dialog-body"),
    filterDialogClose: $("filter-dialog-close"),
    filterDialogDone: $("filter-dialog-done"),
    chipsGroup: $("chips-group"),
    chipsFamily: $("chips-family"),
    chipsStyle: $("chips-style"),
    sort: $("sort"),
    filterReset: $("filter-reset"),
    emptyReset: $("empty-reset"),
    randomPick: $("random-pick"),
    themeToggle: $("theme-toggle"),
    toTop: $("to-top"),
    dialog: $("model-dialog"),
    dialogClose: $("dialog-close"),
    dialogTitle: $("dialog-title"),
    dialogMeta: $("dialog-meta"),
    dialogKeywords: $("dialog-keywords"),
    dialogKeywordsWrap: $("dialog-keywords-wrap"),
    dialogStatus: $("dialog-status"),
    openSource: $("open-source"),
    ctRow: $("ct-link"),
    ctDownload: $("ct-download"),
    ctCode: $("copy-ctcode"),
    ctCodeText: $("ct-code-text"),
    quarkRow: $("quark-link"),
    quarkDownload: $("quark-download"),
    quarkCode: $("copy-quarkcode"),
    quarkCodeText: $("quark-code-text"),
    toast: $("toast")
  };

  if (!DATA || !Array.isArray(DATA.models) || !DATA.meta) {
    if (els.loading) els.loading.textContent = t("loadError");
    root.removeAttribute("data-i18n-pending");
    return;
  }

  var META = DATA.meta;
  var MODELS = DATA.models;
  var PAGE_SIZE = 20;
  var THEME_KEY = "ebook-vault-theme";
  var LANG_KEY = "ebook-vault-lang";

  function readLang() {
    try {
      return localStorage.getItem(LANG_KEY) === "en" ? "en" : "zh";
    } catch (err) {
      return "zh";
    }
  }

  var LANG = readLang();
  var I18N = {
    zh: {
      docTitle: "LoRA 图鉴 · 本地模型库",
      metaDescription: "本地 LoRA 模型收藏索引：1,736 个模型、384.9 GB，覆盖 SD1.5、SDXL、FLUX 与其他开源系列。支持搜索、筛选、排序与详情查看，不存储、不传播模型文件。",
      brandShort: "书海拾贝",
      brandSub: "",
      homeButton: "首页",
      booksButton: "书籍",
      helpButton: "帮助",
      papersButton: "论文",
      softwareButton: "Mac 软件",
      openSourceButton: "开源软件",
      mainNavAria: "主导航",
      loraAria: "LoRA 图鉴",
      githubHotHint: "GitHub 热门开源",
      langAria: "语言",
      skip: "跳到模型列表",
      heroTitle: "",
      searchPlaceholder: "搜索模型名、文件名或触发词，例如 hanfu、pixel、Wan2.2",
      searchAria: "搜索模型名、文件名、触发词、系列或风格",
      clearSearch: "清空搜索",
      filtersAria: "筛选与排序",
      filterGroupAria: "按基础模型筛选",
      filterFamilyAria: "按模型系列筛选",
      filterStyleAria: "按风格筛选",
      sortAria: "排序方式",
      contentAria: "模型列表",
      toTop: "回到顶部",
      filterGroup: "基础模型",
      filterFamily: "模型系列",
      filterStyle: "风格",
      collectionLead: "收录 {n} 个 LoRA",
      filterOpen: "筛选",
      filterDialogTitle: "筛选",
      filterDone: "完成",
      closeFilters: "关闭筛选",
      sortLabel: "排序",
      sortDownloads: "下载量",
      sortSize: "体积",
      sortName: "名称",
      clearFilters: "清空筛选",
      random: "随机看看",
      loading: "正在载入模型索引…",
      emptyTitle: "没有匹配的模型",
      emptyHint: "换个关键词，或者清空筛选再试。",
      emptyReset: "清空搜索与筛选",
      loadError: "模型索引载入失败：缺少 data/lora.js。",
      all: "全部",
      groupOther: "其他开源",
      styleRealistic: "写实",
      styleAnime: "动漫",
      styleIllustration: "插画",
      styleGeneral: "通用",
      untagged: "未细分",
      untaggedStyle: "未细分风格",
      unclassified: "未分类",
      unknown: "未知",
      countAll: "共 <strong>{total}</strong> 个模型 · 已显示 <strong>{shown}</strong> 个",
      countFiltered: "筛选出 <strong>{count}</strong> 个 <span class=\"count-total\">（共 {total} 个）</span> · 已显示 <strong>{shown}</strong> 个",
      loadMoreLeft: "加载更多（还有 {n} 个）",
      searchPrefix: "搜索：{q}",
      clearAll: "清空全部",
      removeFilter: "移除筛选：{label}",
      viewDetails: "查看 {name} 详情",
      triggerTitle: "触发词：{kw}",
      moreTriggers: "还有 {n} 个触发词",
      downloadsTitle: "下载量：{n}",
      clicksTimes: "{n} 次点击",
      sortHot: "本站热门",
      sourceTitle: "来源：{s}",
      metaSeries: "模型系列",
      metaStyle: "风格",
      metaSize: "文件大小",
      keywordsLabel: "触发词 / 关键词",
      downloadLabel: "下载",
      openSource: "打开来源",
      ctDownload: "城通下载",
      copyCode: "复制提取码",
      quarkDownload: "夸克下载",
      copyQuarkCode: "复制夸克码",
      ctSource: "城通网盘",
      quarkSource: "夸克网盘",
      modalCode: "提取码：{code}",
      modalOpen: "打开下载页",
      modalCopy: "复制链接",
      linkCopied: "链接已复制",
      copiedCode: "提取码已复制",
      closeDialog: "关闭详情",
      copyFailed: "复制失败，请手动选择文本复制",
      themeToDark: "切换到深色模式",
      themeToLight: "切换到浅色模式",
      langSwitchToEn: "Switch to English",
      langSwitchToZh: "切换到中文",
      footerNoticeLead: "本站发布的内容若侵犯到您的权益，",
      footerContact: "请联系我们",
      footerNoticeTail: "，我们将及时处理！",
      footerCrawler: "以上内容由网络爬虫自动抓取，以非人工方式自动生成。书海拾贝不储存、复制、传播任何文件。",
      noscript: "本站的搜索与筛选依赖 JavaScript，请在浏览器中启用 JavaScript 后刷新页面。"
    },
    en: {
      docTitle: "LoRA Archive · Local Models",
      metaDescription: "Local LoRA catalog: 1,736 models, 384.9 GB, covering SD1.5, SDXL, FLUX, and other open-source families. Search, filter, and inspect local paths; no model files are stored or distributed.",
      brandShort: "Ebook Vault",
      brandSub: "",
      homeButton: "Home",
      booksButton: "Books",
      helpButton: "Help",
      papersButton: "Papers",
      softwareButton: "Mac Software",
      openSourceButton: "Open Source",
      mainNavAria: "Main navigation",
      loraAria: "LoRA archive",
      githubHotHint: "GitHub Trending",
      langAria: "Language",
      skip: "Skip to model list",
      heroTitle: "",
      searchPlaceholder: "Search model, filename, or trigger word, e.g. hanfu, pixel, Wan2.2",
      searchAria: "Search model name, filename, trigger words, family, or style",
      clearSearch: "Clear search",
      filtersAria: "Filters and sorting",
      filterGroupAria: "Filter by base model",
      filterFamilyAria: "Filter by family",
      filterStyleAria: "Filter by style",
      sortAria: "Sort order",
      contentAria: "Model list",
      toTop: "Back to top",
      filterGroup: "Base model",
      filterFamily: "Family",
      filterStyle: "Style",
      collectionLead: "{n} LoRAs collected",
      filterOpen: "Filter",
      filterDialogTitle: "Filters",
      filterDone: "Done",
      closeFilters: "Close filters",
      sortLabel: "Sort",
      sortDownloads: "Downloads",
      sortSize: "Size",
      sortName: "Name",
      clearFilters: "Clear filters",
      random: "Random pick",
      loading: "Loading model index…",
      emptyTitle: "No matching models",
      emptyHint: "Try another keyword or clear the filters.",
      emptyReset: "Clear search and filters",
      loadError: "Failed to load the model index: data/lora.js is missing.",
      all: "All",
      groupOther: "Other open-source",
      styleRealistic: "Realistic",
      styleAnime: "Anime",
      styleIllustration: "Illustration",
      styleGeneral: "General",
      untagged: "Untagged",
      untaggedStyle: "Untagged style",
      unclassified: "Uncategorized",
      unknown: "Unknown",
      countAll: "<strong>{total}</strong> models · <strong>{shown}</strong> shown",
      countFiltered: "<strong>{count}</strong> matched of {total} · <strong>{shown}</strong> shown",
      loadMoreLeft: "Load more ({n} left)",
      searchPrefix: "Search: {q}",
      clearAll: "Clear all",
      removeFilter: "Remove filter: {label}",
      viewDetails: "View details for {name}",
      triggerTitle: "Trigger: {kw}",
      moreTriggers: "{n} more triggers",
      downloadsTitle: "Downloads: {n}",
      clicksTimes: "{n} clicks",
      sortHot: "Popular",
      sourceTitle: "Source: {s}",
      metaSeries: "Series",
      metaStyle: "Style",
      metaSize: "File size",
      keywordsLabel: "Trigger words / keywords",
      downloadLabel: "Download",
      openSource: "Open source",
      ctDownload: "Download via CTFile",
      copyCode: "Copy code",
      quarkDownload: "Download via Quark",
      copyQuarkCode: "Copy Quark code",
      ctSource: "CTFile",
      quarkSource: "Quark",
      modalCode: "Code: {code}",
      modalOpen: "Open download",
      modalCopy: "Copy link",
      linkCopied: "Link copied",
      copiedCode: "Code copied",
      closeDialog: "Close details",
      copyFailed: "Copy failed, select the text manually",
      themeToDark: "Switch to dark mode",
      themeToLight: "Switch to light mode",
      langSwitchToEn: "Switch to English",
      langSwitchToZh: "切换到中文",
      footerNoticeLead: "If the content published on this site infringes your rights, ",
      footerContact: "contact us",
      footerNoticeTail: ". We will handle it promptly!",
      footerCrawler: "The content above is automatically collected by a web crawler and generated without human intervention. Ebook Vault does not store, copy, or distribute any files.",
      noscript: "Search and filters require JavaScript. Enable JavaScript and refresh this page."
    }
  };

  function t(key, vars) {
    var table = I18N[LANG] || I18N.zh;
    var text = table[key];
    if (text == null) text = I18N.zh[key];
    if (text == null) text = key;
    if (vars) {
      text = text.replace(/\{(\w+)\}/g, function (match, name) {
        return vars[name] == null ? "" : String(vars[name]);
      });
    }
    return text;
  }

  function isEn() { return LANG === "en"; }

  function groupLabel(key) {
    return key === "其他开源" ? t("groupOther") : key;
  }

  var INDEX_OF = new Map();
  MODELS.forEach(function (model, index) { INDEX_OF.set(model, index); });

  var GROUPS = ["SD1.5", "SDXL", "FLUX", "其他开源"];
  var STYLES = ["写实", "动漫", "插画", "通用"];
  var SOURCE_LABEL = {
    civitai: "CivitAI",
    huggingface: "Hugging Face",
    local: "本地收藏"
  };
  var SOURCE_KEY = { civitai: "C", huggingface: "HF", local: "本" };

  var GROUP_META = {
    "SD1.5": { c1: "#b4653f", c2: "#6d3922", desc: "经典 1.5 生态" },
    SDXL: { c1: "#b98a44", c2: "#7a5322", desc: "高分辨率 SDXL 生态" },
    FLUX: { c1: "#3f8f83", c2: "#1f514b", desc: "FLUX.1 / 2 / 3" },
    "其他开源": { c1: "#8f6aa8", c2: "#4c3466", desc: "视频与新一代模型" }
  };

  var FAMILY_META = {
    "SD1.5": { label: "SD 1.5", short: "SD1.5", c1: "#b4653f", c2: "#6d3922" },
    SDXL: { label: "SDXL", short: "SDXL", c1: "#b98a44", c2: "#7a5322" },
    FLUX1: { label: "FLUX.1", short: "FLUX1", c1: "#3f8f83", c2: "#1f514b" },
    FLUX2: { label: "FLUX.2", short: "FLUX2", c1: "#5b74ad", c2: "#2f3f68" },
    FLUX3: { label: "FLUX.3", short: "FLUX3", c1: "#8f6aa8", c2: "#4c3466" },
    Hunyuan: { label: "Hunyuan", short: "Hunyuan", c1: "#a05b7a", c2: "#5c3046" },
    Kolors: { label: "Kolors", short: "Kolors", c1: "#b56565", c2: "#6b3232" },
    PixArt: { label: "PixArt", short: "PixArt", c1: "#6f8f5e", c2: "#3c5232" },
    "Qwen-Image": { label: "Qwen-Image", short: "Qwen", c1: "#4f7fa8", c2: "#2a4a66" },
    SD3: { label: "SD 3 / 3.5", short: "SD3", c1: "#8f7a4a", c2: "#524224" },
    Wan: { label: "Wan", short: "Wan", c1: "#a05b5b", c2: "#5c3030" },
    ZImage: { label: "Z-Image", short: "Z-Image", c1: "#5f7fa0", c2: "#334a63" }
  };

  function familyMeta(key) {
    return FAMILY_META[key] || { label: key || "未分类", short: key || "LoRA", c1: "#8a5a2b", c2: "#3a2a1a" };
  }

  function groupMeta(key) {
    return GROUP_META[key] || { c1: "#8a5a2b", c2: "#3a2a1a", desc: "" };
  }

  function styleLabel(style) {
    if (!style) return t("untagged");
    var map = {
      "写实": "styleRealistic",
      "动漫": "styleAnime",
      "插画": "styleIllustration",
      "通用": "styleGeneral"
    };
    return map[style] ? t(map[style]) : style;
  }

  // --------------------------------------------------------------------- state

  var STATE = {
    q: "",
    groups: new Set(),
    families: new Set(),
    styles: new Set(),
    sort: "size"
  };

  var filtered = [];
  var shown = 0;
  var activeIndex = -1;
  var searchTimer = 0;

  var STYLE_WORDS = { "写实": "realistic", "动漫": "anime", "插画": "illustration", "通用": "general" };
  var GROUP_WORDS = { "其他开源": "other open-source" };

  var HAYSTACK = MODELS.map(function (m) {
    var fm = familyMeta(m.m);
    return [
      m.n, m.a, m.f, m.m, fm.label, m.g, m.s,
      (m.k || []).join(" "), m.src, SOURCE_LABEL[m.src] || "",
      STYLE_WORDS[m.s] || "", GROUP_WORDS[m.g] || "",
      "local collection civitai hugging face", m.id
    ].join(" ").toLowerCase();
  });

  function readStateFromUrl() {
    var params;
    try {
      params = new URLSearchParams(window.location.search);
    } catch (err) {
      return;
    }
    var q = (params.get("q") || "").trim();
    if (q) STATE.q = q;
    var sort = params.get("sort");
    if (sort === "size" || sort === "name" || sort === "downloads" || sort === "clicks") STATE.sort = sort;
    ["g", "m", "s"].forEach(function (key) {
      var raw = params.get(key) || "";
      var valid = key === "g" ? GROUPS : key === "m" ? Object.keys(FAMILY_META) : STYLES;
      raw.split(",").forEach(function (value) {
        if (valid.indexOf(value) >= 0) {
          if (key === "g") STATE.groups.add(value);
          else if (key === "m") STATE.families.add(value);
          else STATE.styles.add(value);
        }
      });
    });
  }

  function writeStateToUrl() {
    if (!window.history || !window.history.replaceState) return;
    var params = new URLSearchParams();
    if (STATE.q) params.set("q", STATE.q);
    if (STATE.groups.size) params.set("g", Array.from(STATE.groups).join(","));
    if (STATE.families.size) params.set("m", Array.from(STATE.families).join(","));
    if (STATE.styles.size) params.set("s", Array.from(STATE.styles).join(","));
    if (STATE.sort !== "downloads") params.set("sort", STATE.sort);
    var search = params.toString();
    var next = window.location.pathname + (search ? "?" + search : "") + window.location.hash;
    try {
      window.history.replaceState(null, "", next);
    } catch (err) { /* file:// 下个别浏览器会拒绝，忽略即可 */ }
  }

  // ------------------------------------------------------------------- format

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function fmtBytes(bytes) {
    if (!bytes && bytes !== 0) return "—";
    var units = ["B", "KB", "MB", "GB", "TB"];
    var value = bytes;
    var index = 0;
    while (value >= 1024 && index < units.length - 1) {
      value /= 1024;
      index += 1;
    }
    var digits = index >= 2 ? 1 : 0;
    return value.toFixed(digits).replace(/\.0$/, "") + " " + units[index];
  }

  function fmtInt(n) {
    if (n === null || n === undefined || Number.isNaN(Number(n))) return "—";
    return Number(n).toLocaleString("en-US");
  }

  function fmtCompact(n) {
    if (!n) return "—";
    if (n < 1000) return String(n);
    try {
      return new Intl.NumberFormat(isEn() ? "en-US" : "zh-CN", {
        notation: "compact",
        maximumFractionDigits: 1
      }).format(n);
    } catch (err) {
      if (!isEn() && n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "万";
      return String(n);
    }
  }

  function fileStem(relPath) {
    var name = String(relPath || "").split("/").pop();
    return name.replace(/\.safetensors$/i, "");
  }

  function dateOnly(iso) {
    return String(iso || "").slice(0, 10);
  }

  // ---------------------------------------------------------------- filtering

  var tokenCache = { key: null, tokens: [] };

  function queryTokens() {
    var key = STATE.q.toLowerCase();
    if (tokenCache.key === key) return tokenCache.tokens;
    tokenCache = { key: key, tokens: key.split(/[\s\u3000]+/).filter(Boolean) };
    return tokenCache.tokens;
  }

  function passes(model, index, ignoreDim) {
    if (!ignoreDim) {
      if (STATE.groups.size && !STATE.groups.has(model.g)) return false;
      if (STATE.families.size && !STATE.families.has(model.m)) return false;
      if (STATE.styles.size && (!model.s || !STATE.styles.has(model.s))) return false;
    } else {
      if (ignoreDim !== "group" && STATE.groups.size && !STATE.groups.has(model.g)) return false;
      if (ignoreDim !== "family" && STATE.families.size && !STATE.families.has(model.m)) return false;
      if (ignoreDim !== "style" && STATE.styles.size && (!model.s || !STATE.styles.has(model.s))) return false;
    }
    var tokens = queryTokens();
    if (!tokens.length) return true;
    var hay = HAYSTACK[index];
    for (var i = 0; i < tokens.length; i += 1) {
      if (hay.indexOf(tokens[i]) === -1) return false;
    }
    return true;
  }

  function sortModels(list) {
    var collator;
    try {
      collator = new Intl.Collator(isEn() ? "en" : "zh-Hans-CN", { numeric: true, sensitivity: "base" });
    } catch (err) {
      collator = null;
    }
    var byName = function (a, b) {
      var result = collator ? collator.compare(a.n, b.n) : a.n.localeCompare(b.n);
      if (result !== 0) return result;
      return (a.a || "").localeCompare(b.a || "");
    };
    list.sort(function (a, b) {
      if (STATE.sort === "size") return b.b - a.b || byName(a, b);
      if (STATE.sort === "name") return byName(a, b) || b.b - a.b;
      if (STATE.sort === "clicks") {
        var ca = CLICK_COUNTS[String(a.id)] || 0;
        var cb = CLICK_COUNTS[String(b.id)] || 0;
        if (cb !== ca) return cb - ca;
        return b.d - a.d || b.b - a.b || byName(a, b);
      }
      return b.d - a.d || b.b - a.b || byName(a, b);
    });
    return list;
  }

  function recompute(keepScroll) {
    var previous = window.scrollY;
    queryTokens();
    filtered = sortModels(MODELS.filter(function (model, index) {
      return passes(model, index);
    }));
    shown = 0;
    els.grid.innerHTML = "";
    els.empty.hidden = filtered.length > 0;
    els.loading.hidden = true;
    appendPage();
    updateCounts();
    renderChips();
    renderActiveFilters();
    writeStateToUrl();
    if (keepScroll) {
      window.requestAnimationFrame(function () { window.scrollTo(0, previous); });
    }
  }

  function appendPage() {
    if (shown >= filtered.length) {
      updateLoadMore();
      return;
    }
    var end = Math.min(shown + PAGE_SIZE, filtered.length);
    var html = "";
    for (var i = shown; i < end; i += 1) {
      html += cardHTML(filtered[i]);
    }
    els.grid.insertAdjacentHTML("beforeend", html);
    shown = end;
    updateCounts();
    updateLoadMore();
    requestClickCounts();
  }

  function updateLoadMore() {
    var rest = filtered.length - shown;
    els.loadMore.hidden = rest <= 0;
    if (rest > 0) {
      els.loadMore.textContent = t("loadMoreLeft", { n: fmtInt(rest) });
    }
  }

  function updateCounts() {
    var total = META.total;
    var filteredCount = filtered.length;
    var text;
    if (!STATE.q && !STATE.groups.size && !STATE.families.size && !STATE.styles.size) {
      text = t("countAll", {
        total: fmtInt(total),
        shown: fmtInt(Math.min(shown, filteredCount))
      });
    } else {
      text = t("countFiltered", {
        count: fmtInt(filteredCount),
        total: fmtInt(total),
        shown: fmtInt(Math.min(shown, filteredCount))
      });
    }
    els.resultCount.innerHTML = text;
    els.searchClear.hidden = !STATE.q;
    var dirty = !!STATE.q || STATE.groups.size > 0 || STATE.families.size > 0 || STATE.styles.size > 0;
    els.filterReset.hidden = !dirty;
    updateFilterLead();
  }

  // ------------------------------------------------------------------- cards

  function cardHTML(model) {
    var index = INDEX_OF.get(model);
    var fm = familyMeta(model.m);
    var spineText = fm.short + (model.s ? " · " + styleLabel(model.s) : "");
    var styleText = model.s ? styleLabel(model.s) : fm.label;
    var keywords = model.k || [];
    var keywordHTML = "";
    for (var i = 0; i < Math.min(keywords.length, 3); i += 1) {
      keywordHTML += '<span class="kw" title="' + esc(t("triggerTitle", { kw: keywords[i] })) + '">' + esc(keywords[i]) + "</span>";
    }
    if (keywords.length > 2) {
      keywordHTML += '<span class="kw kw-more" title="' + esc(t("moreTriggers", { n: keywords.length - 3 })) + '">+' +
        (keywords.length - 3) + "</span>";
    }
    return (
      '<article class="card" tabindex="0" role="button" aria-label="' + esc(t("viewDetails", { name: model.n })) + '"' +
      ' title="' + esc(model.f) + '"' +
      ' data-idx="' + index + '" style="--c1:' + fm.c1 + ";--c2:" + fm.c2 + '">' +
        '<div class="card-spine" aria-hidden="true"><span class="card-spine-text">' + esc(spineText) + "</span></div>" +
        '<div class="card-main">' +
          '<h3 class="card-title" title="' + esc(model.n) + '">' + esc(model.n) + "</h3>" +
          '<div class="card-tags">' +
            '<span class="tag tag-style">' + esc(styleText) + "</span>" +
            '<span class="tag tag-size">' + fmtBytes(model.b) + "</span>" +
            '<span class="card-clicks" hidden></span>' +
          "</div>" +
          '<div class="card-keywords">' + keywordHTML + "</div>" +
          '<div class="card-actions"><button type="button" class="btn download" data-dl="' + index + '" aria-label="' + esc(t("downloadLabel") + " " + model.n) + '">' + esc(t("downloadLabel")) + "</button></div>" +
        "</div>" +
      "</article>"
    );
  }

  // ------------------------------------------------------------------- chips

  function countFor(dim) {
    var counts = {};
    for (var i = 0; i < MODELS.length; i += 1) {
      if (!passes(MODELS[i], i, dim)) continue;
      var key = dim === "group" ? MODELS[i].g : dim === "family" ? MODELS[i].m : MODELS[i].s;
      if (!key) continue;
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }

  function chipHTML(kind, value, label, count, active, disallowZero) {
    var disabled = disallowZero && !active && !count;
    return '<button type="button" class="chip' + (active ? " is-active" : "") +
      (disabled ? " is-zero" : "") + '"' +
      ' data-kind="' + kind + '" data-value="' + esc(value) + '"' +
      ' aria-pressed="' + (active ? "true" : "false") + '"' +
      (disabled ? " disabled" : "") + ">" +
      esc(label) + '<span class="chip-count">' + fmtInt(count) + "</span></button>";
  }

  function renderChips() {
    var groupCounts = countFor("group");
    var familyCounts = countFor("family");
    var styleCounts = countFor("style");

    var groupTotal = 0;
    GROUPS.forEach(function (key) { groupTotal += groupCounts[key] || 0; });
    var html = chipHTML("group", "", t("all"), groupTotal, STATE.groups.size === 0, false);
    GROUPS.forEach(function (key) {
      var c = groupCounts[key] || 0;
      if (!c && !STATE.groups.has(key)) return;
      html += chipHTML("group", key, groupLabel(key), c, STATE.groups.has(key), false);
    });
    els.chipsGroup.innerHTML = html;

    var familyKeys = Object.keys(FAMILY_META);
    var familyTotal = 0;
    familyKeys.forEach(function (key) { familyTotal += familyCounts[key] || 0; });
    html = chipHTML("family", "", t("all"), familyTotal, STATE.families.size === 0, false);
    familyKeys.forEach(function (key) {
      var c = familyCounts[key] || 0;
      if (!c && !STATE.families.has(key)) return;
      html += chipHTML("family", key, familyMeta(key).label, c, STATE.families.has(key), false);
    });
    els.chipsFamily.innerHTML = html;

    var styleTotal = 0;
    for (var si = 0; si < MODELS.length; si += 1) {
      if (passes(MODELS[si], si, "style")) styleTotal += 1;
    }
    html = chipHTML("style", "", t("all"), styleTotal, STATE.styles.size === 0, false);
    STYLES.forEach(function (key) {
      var c = styleCounts[key] || 0;
      if (!c && !STATE.styles.has(key)) return;
      html += chipHTML("style", key, styleLabel(key), c, STATE.styles.has(key), false);
    });
    els.chipsStyle.innerHTML = html;
  }

  function renderActiveFilters() {
    var items = [];
    if (STATE.q) items.push({ kind: "q", value: STATE.q, label: t("searchPrefix", { q: STATE.q }) });
    STATE.groups.forEach(function (key) { items.push({ kind: "group", value: key, label: groupLabel(key) }); });
    STATE.families.forEach(function (key) { items.push({ kind: "family", value: key, label: familyMeta(key).label }); });
    STATE.styles.forEach(function (key) { items.push({ kind: "style", value: key, label: styleLabel(key) }); });

    if (!items.length) {
      els.activeFilters.hidden = true;
      els.activeFilters.innerHTML = "";
      return;
    }
    var html = "";
    items.forEach(function (item) {
      html += '<span class="active-chip">' + esc(item.label) +
        '<button type="button" data-remove-kind="' + item.kind + '" data-remove-value="' + esc(item.value) +
        '" aria-label="' + esc(t("removeFilter", { label: item.label })) + '">✕</button></span>';
    });
    html += '<button type="button" class="active-clear" data-clear-all>' + esc(t("clearAll")) + "</button>";
    els.activeFilters.innerHTML = html;
    els.activeFilters.hidden = false;
  }

  function isOneColumnLayout() {
    try {
      return window.matchMedia("(max-width: 600px)").matches;
    } catch (err) {
      return window.innerWidth <= 600;
    }
  }

  function updateFilterLead() {
    if (els.filterLeadText) {
      els.filterLeadText.innerHTML = t("collectionLead", {
        n: "<strong>" + fmtInt(META.total) + "</strong>"
      });
    }
    var active = STATE.groups.size + STATE.families.size + STATE.styles.size;
    if (els.filterOpenCount) {
      els.filterOpenCount.textContent = active ? String(active) : "";
      els.filterOpenCount.hidden = active === 0;
    }
    if (els.filterOpen) {
      var label = t("filterOpen") + (active ? " (" + active + ")" : "");
      els.filterOpen.setAttribute("aria-label", label);
    }
  }

  function restoreFilterBody() {
    if (els.filterBody && els.filters && els.filterBody.parentElement !== els.filters) {
      els.filters.appendChild(els.filterBody);
    }
    root.classList.remove("dialog-open");
    if (els.filterOpen) els.filterOpen.setAttribute("aria-expanded", "false");
  }

  function openFilters() {
    if (!els.filterDialog || !els.filterBody || !isOneColumnLayout()) return;
    if (els.filterDialog.open) return;
    if (els.filterBody.parentElement !== els.filterDialogBody) {
      els.filterDialogBody.appendChild(els.filterBody);
    }
    els.filterDialog.showModal();
    root.classList.add("dialog-open");
    if (els.filterOpen) els.filterOpen.setAttribute("aria-expanded", "true");
  }

  function closeFilters() {
    if (els.filterDialog && els.filterDialog.open) {
      els.filterDialog.close();
    } else {
      restoreFilterBody();
    }
  }

  // ------------------------------------------------------------------ modal

  // 下载行与主站首页卡片弹窗一致：来源名 + 提取码在左，打开/复制按钮在右。
  // 没有链接时整行隐藏，不留空按钮位。
  function fillDownloadRow(row, download, copy, codeText, url, pass) {
    if (!row) return;
    if (!url) {
      row.hidden = true;
      return;
    }
    row.hidden = false;
    download.href = url;
    download.title = url;
    if (codeText) {
      codeText.textContent = pass ? t("modalCode").replace("{code}", pass) : "";
      codeText.hidden = !pass;
    }
    if (copy) {
      copy.onclick = (function (link) {
        return function () {
          copyText(link, t("linkCopied"));
        };
      })(url);
    }
  }

  // ------------------------------------------------------------------- clicks
// 参考首页：卡片显示本站点击次数，弹窗打开下载页/复制链接时各记 1 次。
var CLICK_COUNTS = Object.create(null);

function clicksLabel(n) {
  return t("clicksTimes").replace("{n}", String(n));
}

function trackLoraClick(index) {
  var model = MODELS[index];
  if (!model || !window.fetch) return;
  try {
    window.fetch("/api/lora-click", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: model.id }),
      keepalive: true
    })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (doc) {
        if (!doc || !doc.ok) return;
        CLICK_COUNTS[String(doc.id)] = Number(doc.count) || 0;
        paintClickCounts();
      })
      .catch(function () {});
  } catch (err) { /* 忽略网络错误 */ }
}

function applyClickCounts(clicks) {
  if (!clicks) return;
  Object.keys(clicks).forEach(function (id) {
    CLICK_COUNTS[id] = Number(clicks[id]) || 0;
  });
  paintClickCounts();
}

function requestClickCounts() {
  if (location.protocol === "file:" || !window.fetch || !els.grid) return;
  var cards = els.grid.querySelectorAll(".card");
  var ids = [];
  var seen = Object.create(null);
  for (var i = 0; i < cards.length && ids.length < 60; i += 1) {
    var model = MODELS[Number(cards[i].getAttribute("data-idx"))];
    if (!model) continue;
    var key = String(model.id);
    if (seen[key]) continue;
    seen[key] = true;
    ids.push(key);
  }
  for (var start = 0; start < ids.length; start += 20) {
    (function (batch) {
      window
        .fetch("/api/lora-clicks?ids=" + encodeURIComponent(batch.join(",")))
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(function (doc) { if (doc && doc.ok) applyClickCounts(doc.clicks); })
        .catch(function () {});
    })(ids.slice(start, start + 20));
  }
}

function paintClickCounts() {
  if (!els.grid) return;
  var cards = els.grid.querySelectorAll(".card");
  for (var i = 0; i < cards.length; i += 1) {
    var model = MODELS[Number(cards[i].getAttribute("data-idx"))];
    var el = cards[i].querySelector(".card-clicks");
    if (!model || !el) continue;
    var n = CLICK_COUNTS[String(model.id)] || 0;
    if (n > 0) {
      el.textContent = clicksLabel(n);
      el.hidden = false;
    } else {
      el.textContent = "";
      el.hidden = true;
    }
  }
}

function requestLoraPopular() {
  if (location.protocol === "file:" || !window.fetch) return;
  window
    .fetch("/api/lora-popular")
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (doc) {
      if (!doc || !doc.ok || !Array.isArray(doc.models)) return;
      doc.models.forEach(function (item) {
        if (item && item.id !== undefined && item.id !== null) {
          CLICK_COUNTS[String(item.id)] = Number(item.count) || 0;
        }
      });
      paintClickCounts();
    })
    .catch(function () {});
}

function openModel(index) {
    var model = MODELS[index];
    if (!model) return;
    activeIndex = index;
    var fm = familyMeta(model.m);
    if (els.dialogStatus) {
      els.dialogStatus.hidden = true;
      els.dialogStatus.textContent = "";
    }

    els.dialogTitle.textContent = model.n;

    var cells = [
      [t("metaSeries"), fm.label],
      [t("metaStyle"), model.s ? styleLabel(model.s) : t("untaggedStyle")],
      [t("metaSize"), fmtBytes(model.b)]
    ];
    els.dialogMeta.innerHTML = cells.map(function (cell) {
      return '<div class="meta-cell"><dt>' + esc(cell[0]) + "</dt><dd title=\"" +
        esc(cell[1]) + '">' + esc(cell[1]) + "</dd></div>";
    }).join("");

    var keywords = model.k || [];
    if (keywords.length) {
      els.dialogKeywordsWrap.hidden = false;
      els.dialogKeywords.innerHTML = keywords.map(function (keyword) {
        return '<span class="kw">' + esc(keyword) + "</span>";
      }).join("");
    } else {
      // 没有触发词 / 关键词时整块不展示，避免只留一行占位说明。
      els.dialogKeywordsWrap.hidden = true;
      els.dialogKeywords.innerHTML = "";
    }

    if (els.openSource) {
      if (model.u) {
        els.openSource.href = model.u;
        els.openSource.hidden = false;
        els.openSource.title = model.u;
      } else {
        els.openSource.removeAttribute("href");
        els.openSource.hidden = true;
      }
    }

    // 下载区与主站首页卡片弹窗一致：每个来源一行，左侧来源名 + 提取码，
    // 右侧「打开下载页 / 复制链接」，链接本身自带提取码便于直接打开。
    fillDownloadRow(els.ctRow, els.ctDownload, els.ctCode, els.ctCodeText,
      model.dl || model.link || "", model.pw || "");

    var quarkLink = model.q || model.quark_link || "";
    var quarkPass = model.qp || model.quark_password || "";
    var quarkHref = quarkLink;
    if (quarkLink && quarkPass && quarkLink.indexOf("pwd=") < 0) {
      quarkHref = quarkLink + (quarkLink.indexOf("?") < 0 ? "?" : "&")
        + "pwd=" + encodeURIComponent(quarkPass);
    }
    fillDownloadRow(els.quarkRow, els.quarkDownload, els.quarkCode, els.quarkCodeText,
      quarkHref, quarkPass);

    if (typeof els.dialog.showModal === "function") {
      if (!els.dialog.open) els.dialog.showModal();
      root.classList.add("dialog-open");
    } else {
      window.alert(model.n);
    }
  }

  function closeModel() {
    if (typeof els.dialog.close === "function" && els.dialog.open) {
      els.dialog.close();
    }
    root.classList.remove("dialog-open");
  }

  // ------------------------------------------------------------------- copy

  var dialogStatusTimer = 0;

  function showDialogStatus(message, isError) {
    if (!els.dialogStatus) return;
    els.dialogStatus.textContent = message;
    els.dialogStatus.classList.toggle("is-error", !!isError);
    els.dialogStatus.hidden = false;
    window.clearTimeout(dialogStatusTimer);
    dialogStatusTimer = window.setTimeout(function () {
      els.dialogStatus.hidden = true;
    }, 2400);
  }

  function copyText(text, message) {
    var done = function (ok) {
      var failed = ok === false;
      var textMessage = failed ? t("copyFailed") : message;
      if (els.dialog.open) showDialogStatus(textMessage, failed);
      else showToast(textMessage, failed);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        function () { done(true); },
        function () { fallbackCopy(text, done); }
      );
      return;
    }
    fallbackCopy(text, done);
  }

  function fallbackCopy(text, done) {
    try {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "-1000px";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(area);
      done(ok);
    } catch (err) {
      if (els.dialog.open) showDialogStatus(t("copyFailed"), true);
      else showToast(t("copyFailed"), true);
    }
  }

  var toastTimer = 0;
  function showToast(message, isError) {
    els.toast.textContent = message;
    els.toast.classList.toggle("is-error", !!isError);
    els.toast.hidden = false;
    window.clearTimeout(toastTimer);
    window.requestAnimationFrame(function () { els.toast.classList.add("is-visible"); });
    toastTimer = window.setTimeout(function () {
      els.toast.classList.remove("is-visible");
      window.setTimeout(function () { els.toast.hidden = true; }, 200);
    }, 2000);
  }

  // ------------------------------------------------------------------ theme

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    els.themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    var label = theme === "dark" ? t("themeToLight") : t("themeToDark");
    els.themeToggle.setAttribute("aria-label", label);
    els.themeToggle.title = label;
    els.themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#14110e" : "#f2ece1");
  }

  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (err) { /* ignore */ }
  }

  // ------------------------------------------------------------------ reset

  function resetAll() {
    window.clearTimeout(searchTimer);
    STATE.q = "";
    STATE.groups.clear();
    STATE.families.clear();
    STATE.styles.clear();
    STATE.sort = "size";
    els.q.value = "";
    syncSortButtons();
    recompute();
  }

  function syncSortButtons() {
    var buttons = els.sort.querySelectorAll("button[data-sort]");
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].classList.toggle("is-active", buttons[i].getAttribute("data-sort") === STATE.sort);
      buttons[i].setAttribute("aria-pressed", buttons[i].getAttribute("data-sort") === STATE.sort ? "true" : "false");
    }
  }

  // ------------------------------------------------------------- interactions

  function bindEvents() {
    function scheduleSearch() {
      window.clearTimeout(searchTimer);
      var value = els.q.value;
      searchTimer = window.setTimeout(function () {
        STATE.q = value.trim();
        recompute();
      }, 130);
    }

    els.q.addEventListener("input", function () {
      if (composing) return;
      scheduleSearch();
    });

    var composing = false;
    els.q.addEventListener("compositionstart", function () { composing = true; });
    els.q.addEventListener("compositionend", function () {
      composing = false;
      scheduleSearch();
    });

    els.q.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && els.q.value) {
        event.stopPropagation();
        window.clearTimeout(searchTimer);
        els.q.value = "";
        STATE.q = "";
        recompute();
      }
    });

    els.searchClear.addEventListener("click", function () {
      window.clearTimeout(searchTimer);
      els.q.value = "";
      STATE.q = "";
      els.q.focus();
      recompute();
    });

    els.filterReset.addEventListener("click", resetAll);
    els.emptyReset.addEventListener("click", resetAll);
    els.randomPick.addEventListener("click", function () {
      if (!filtered.length) return;
      openModel(INDEX_OF.get(filtered[Math.floor(Math.random() * filtered.length)]));
    });

    els.sort.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-sort]");
      if (!button) return;
      STATE.sort = button.getAttribute("data-sort");
      syncSortButtons();
      recompute();
    });

    function chipsHandler(event) {
      var chip = event.target.closest(".chip");
      if (!chip || chip.disabled) return;
      var kind = chip.getAttribute("data-kind");
      var value = chip.getAttribute("data-value");
      var target = kind === "group" ? STATE.groups : kind === "family" ? STATE.families : STATE.styles;
      if (!value) {
        target.clear();
      } else if (target.has(value)) {
        target.delete(value);
      } else {
        target.add(value);
      }
      recompute();
    }
    els.chipsGroup.addEventListener("click", chipsHandler);
    els.chipsFamily.addEventListener("click", chipsHandler);
    els.chipsStyle.addEventListener("click", chipsHandler);

    els.activeFilters.addEventListener("click", function (event) {
      var clear = event.target.closest("[data-clear-all]");
      if (clear) {
        resetAll();
        return;
      }
      var remove = event.target.closest("[data-remove-kind]");
      if (!remove) return;
      var kind = remove.getAttribute("data-remove-kind");
      var value = remove.getAttribute("data-remove-value");
      if (kind === "q") {
        window.clearTimeout(searchTimer);
        STATE.q = "";
        els.q.value = "";
      } else if (kind === "group") {
        STATE.groups.delete(value);
      } else if (kind === "family") {
        STATE.families.delete(value);
      } else if (kind === "style") {
        STATE.styles.delete(value);
      }
      recompute();
    });

    els.loadMore.addEventListener("click", function () {
      appendPage();
    });

    els.grid.addEventListener("click", function (event) {
      var card = event.target.closest(".card");
      if (!card) return;
      openModel(Number(card.getAttribute("data-idx")));
    });

    els.grid.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      var card = event.target.closest(".card");
      if (!card) return;
      event.preventDefault();
      openModel(Number(card.getAttribute("data-idx")));
    });

    [els.ctDownload, els.quarkDownload, els.ctCode, els.quarkCode].forEach(function (el) {
      if (!el) return;
      el.addEventListener("click", function () {
        if (activeIndex >= 0) trackLoraClick(activeIndex);
      });
    });
    requestLoraPopular();

    els.dialogClose.addEventListener("click", closeModel);
    els.dialog.addEventListener("click", function (event) {
      if (event.target === els.dialog) closeModel();
    });
    els.dialog.addEventListener("close", function () {
      root.classList.remove("dialog-open");
    });
    els.dialog.addEventListener("cancel", function () {
      root.classList.remove("dialog-open");
    });

    els.themeToggle.addEventListener("click", toggleTheme);

    window.addEventListener("resize", syncHeaderHeight);
    var headerEl = document.querySelector(".topbar");
    if (headerEl && typeof window.ResizeObserver === "function") {
      new window.ResizeObserver(syncHeaderHeight).observe(headerEl);
    }
    var footerEl = document.querySelector(".site-footer");
    if (footerEl && typeof window.ResizeObserver === "function") {
      new window.ResizeObserver(syncFooterHeight).observe(footerEl);
    }

    if (els.langToggle) {
      els.langToggle.addEventListener("click", function () {
        applyLanguage(isEn() ? "zh" : "en");
      });
    }

    if (els.filterOpen) {
      els.filterOpen.addEventListener("click", openFilters);
    }
    if (els.filterDialogClose) {
      els.filterDialogClose.addEventListener("click", closeFilters);
    }
    if (els.filterDialogDone) {
      els.filterDialogDone.addEventListener("click", closeFilters);
    }
    if (els.filterDialog) {
      els.filterDialog.addEventListener("click", function (event) {
        if (event.target === els.filterDialog) closeFilters();
      });
      els.filterDialog.addEventListener("close", restoreFilterBody);
    }
    window.addEventListener("resize", function () {
      if (els.filterDialog && els.filterDialog.open && !isOneColumnLayout()) closeFilters();
    });

    var topTimer = 0;
    window.addEventListener("scroll", function () {
      window.clearTimeout(topTimer);
      topTimer = window.setTimeout(function () {
        els.toTop.hidden = window.scrollY < 560;
      }, 100);
    }, { passive: true });

    els.toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.addEventListener("keydown", function (event) {
      var target = event.target;
      var typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (event.key === "/" && !typing && !els.dialog.open) {
        event.preventDefault();
        els.q.focus();
        els.q.select();
        return;
      }
      if (event.key === "Escape" && !els.dialog.open && (STATE.q || STATE.groups.size || STATE.families.size || STATE.styles.size)) {
        resetAll();
      }
    });

    window.addEventListener("popstate", function () {
      STATE.q = "";
      STATE.groups.clear();
      STATE.families.clear();
      STATE.styles.clear();
      STATE.sort = "size";
      readStateFromUrl();
      els.q.value = STATE.q;
      syncSortButtons();
      recompute();
    });
  }

  // --------------------------------------------------------------- page init

  function paintHero() {
    if (!els.heroTitle) return;
    els.heroTitle.innerHTML = t("heroTitle", {
      n: "<em>" + fmtInt(META.total) + "</em>"
    });
  }

  function applyStaticI18n() {
    root.lang = isEn() ? "en" : "zh-CN";
    root.setAttribute("data-lang", isEn() ? "en" : "zh");

    var textNodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < textNodes.length; i += 1) {
      var key = textNodes[i].getAttribute("data-i18n");
      if (key) textNodes[i].textContent = t(key);
    }

    var placeholderNodes = document.querySelectorAll("[data-i18n-placeholder]");
    for (var p = 0; p < placeholderNodes.length; p += 1) {
      placeholderNodes[p].setAttribute("placeholder", t(placeholderNodes[p].getAttribute("data-i18n-placeholder")));
    }

    var ariaNodes = document.querySelectorAll("[data-i18n-aria]");
    for (var a = 0; a < ariaNodes.length; a += 1) {
      ariaNodes[a].setAttribute("aria-label", t(ariaNodes[a].getAttribute("data-i18n-aria")));
    }

    var titleNodes = document.querySelectorAll("[data-i18n-title]");
    for (var ti = 0; ti < titleNodes.length; ti += 1) {
      titleNodes[ti].setAttribute("title", t(titleNodes[ti].getAttribute("data-i18n-title")));
    }

    var brandSub = document.querySelector(".brand-sub");
    if (brandSub) brandSub.hidden = !t("brandSub");
    var brand = document.querySelector(".brand");
    if (brand) {
      brand.setAttribute("aria-label", (t("brandShort") + (t("brandSub") ? " · " + t("brandSub") : "")).trim());
    }

    document.title = t("docTitle");
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t("metaDescription"));

    var langToggle = els.langToggle;
    if (langToggle) {
      langToggle.textContent = isEn() ? "中文" : "EN";
      langToggle.setAttribute("data-lang", isEn() ? "zh-CN" : "en");
      var langLabel = isEn() ? t("langSwitchToZh") : t("langSwitchToEn");
      langToggle.setAttribute("aria-label", langLabel);
      langToggle.title = langLabel;
    }

    paintHero();
    applyTheme(currentTheme());
  }

  function applyLanguage(next) {
    if (els.dialog && els.dialog.open) closeModel();
    if (els.filterDialog && els.filterDialog.open) closeFilters();
    LANG = next === "en" ? "en" : "zh";
    try {
      localStorage.setItem(LANG_KEY, LANG === "en" ? "en" : "zh-CN");
    } catch (err) { /* ignore */ }
    applyStaticI18n();
    initChrome();
    syncSortButtons();
    recompute();
    syncFooterHeight();
  }

  function syncHeaderHeight() {
    var header = document.querySelector(".topbar");
    if (!header) return;
    var height = Math.round(header.getBoundingClientRect().height);
    if (height > 0) root.style.setProperty("--header-h", height + "px");
  }

  function syncFooterHeight() {
    var footer = document.querySelector(".site-footer");
    if (!footer) return;
    var height = Math.round(footer.getBoundingClientRect().height);
    if (height > 0) root.style.setProperty("--footer-stack", height + "px");
  }

  function initChrome() {
    updateFilterLead();
    applyStaticI18n();
    syncFooterHeight();
  }

  function init() {
    readStateFromUrl();
    els.q.value = STATE.q;
    applyStaticI18n();
    initChrome();
    syncHeaderHeight();
    bindEvents();
    syncSortButtons();
    recompute();
    root.removeAttribute("data-i18n-pending");
  }

  init();
})();
