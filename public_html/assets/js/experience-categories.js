(() => {
  "use strict";
  const root = document.querySelector(".ct-home-experiences");
  if (!root) return;
  const strip = root.querySelector("#ct-experience-results"),
    cards = [...strip.querySelectorAll("[data-experience]")],
    buttons = [...root.querySelectorAll(".ct-category-filter")],
    prev = root.querySelector(".ct-home-prev"),
    next = root.querySelector(".ct-home-next");
  const behavior = () => "smooth";
  const categoryOrder = [
      "food-wine",
      "culture-heritage",
      "nature-adventure",
      "people-traditions",
      "leisure-wellbeing",
    ],
    categoryGroups = categoryOrder.map((category) =>
      cards.filter((card) => card.dataset.categories === category),
    ),
    groupedCards = categoryGroups.flat(),
    featuredIds = ["1", "2", "3", "28", "20"],
    mixedGroups = categoryGroups.map((group, index) => {
      const featured = group.find(
        (card) => card.dataset.experience === featuredIds[index],
      );
      return featured
        ? [featured, ...group.filter((card) => card !== featured)]
        : group;
    }),
    mixedCards = Array.from(
      { length: Math.max(...mixedGroups.map((group) => group.length)) },
      (_, index) =>
        mixedGroups.flatMap((group) => (group[index] ? [group[index]] : [])),
    ).flat(),
    orderedCards = [...mixedCards],
    detailsByExperience = new Map(
      cards.map((card) => {
        const details = card.querySelector(".card-hovered");
        details.remove();
        return [card.dataset.experience, details];
      }),
    );
  function copyCycle(label) {
    return orderedCards.map((card) => {
      const clone = card.cloneNode(true);
      clone.dataset.loopCopy = label;
      clone.setAttribute("aria-hidden", "true");
      clone.removeAttribute("id");
      clone.removeAttribute("tabindex");
      clone.removeAttribute("role");
      clone
        .querySelectorAll("[id]")
        .forEach((node) => node.removeAttribute("id"));
      clone
        .querySelectorAll("a,button,input,select,textarea,[tabindex]")
        .forEach((node) => (node.tabIndex = -1));
      clone
        .querySelectorAll("img")
        .forEach((image) => (image.loading = "lazy"));
      return clone;
    });
  }
  const beforeCards = copyCycle("before"),
    afterCards = copyCycle("after"),
    renderedCards = [...beforeCards, ...orderedCards, ...afterCards];
  const byExperience = new Map(
      cards.map((card) => [card.dataset.experience, card]),
    ),
    beforeByExperience = new Map(
      beforeCards.map((card) => [card.dataset.experience, card]),
    ),
    afterByExperience = new Map(
      afterCards.map((card) => [card.dataset.experience, card]),
    );
  let mixedMode = true,
    previewingMixed = false,
    previewAnchor = null,
    previewAnchorLeft = 0,
    changingSequence = false,
    sequenceRevision = 0;
  strip.replaceChildren(...renderedCards);
  const popup = document.createElement("div");
  popup.className = "card-hovered ct-home-hover";
  popup.id = "ct-home-hover";
  popup.setAttribute("popover", "manual");
  popup.setAttribute("role", "region");
  popup.setAttribute("aria-labelledby", "ct-home-hover-title");
  popup.hidden = true;
  document.body.append(popup);
  let active = null,
    dismissed = null,
    hideTimer,
    returningFocus = false,
    hoverBlockedUntil = 0;
  function cancelHide() {
    clearTimeout(hideTimer);
  }
  function close(restore = false) {
    cancelHide();
    const previous = active;
    if (restore && previous) dismissed = previous;
    active = null;
    if (previous) previous.setAttribute("aria-expanded", "false");
    popup.classList.remove("is-visible");
    if (
      typeof popup.hidePopover === "function" &&
      popup.matches(":popover-open")
    )
      popup.hidePopover();
    popup.hidden = true;
    if (restore && previous) {
      returningFocus = true;
      previous.focus({ preventScroll: true });
      returningFocus = false;
    }
  }
  function restoreMixedPreview() {
    if (!mixedMode || !previewingMixed) return;
    const anchor = previewAnchor,
      left = previewAnchorLeft;
    previewingMixed = false;
    previewAnchor = null;
    overview = true;
    pendingCategory = null;
    arrange(mixedCards, anchor, left, () => select("experiences"));
  }
  function restoreCategoryAfterClose() {
    if (mixedMode) restoreMixedPreview();
    else {
      pendingCategory = null;
      syncCategory();
    }
  }
  function position() {
    if (!active || popup.hidden) return;
    const r = active.getBoundingClientRect(),
      width = Math.min(r.width * 1.16, innerWidth - 16);
    const correctedX = ((r.left % cycleWidth) + cycleWidth) % cycleWidth;
    popup.style.width = width + "px";
    const h = popup.getBoundingClientRect().height;
    popup.style.left =
      Math.max(8, Math.min(innerWidth - width - 8, correctedX - r.width * 0.08)) +
      "px";
    popup.style.top =
      Math.max(8, Math.min(innerHeight - h - 8, r.top - h * 0.05)) + "px";
  }
  function open(card) {
    cancelHide();
    if (mixedMode && !previewingMixed) card = revealCategory(card);
    if (active === card) {
      position();
      return;
    }
    close();
    dismissed = null;
    active = card;
    const content = card.querySelector(".card-hovered").cloneNode(true);
    popup.replaceChildren(...content.childNodes);
    const title = popup.querySelector(".card-title");
    title.id = "ct-home-hover-title";
    const image = popup.querySelector(".card-hovered-image img");
    if (image) {
      image.loading = "eager";
      image.alt = card
        .querySelector(".card-preview-caption")
        .textContent.trim();
      image.addEventListener("load", position, { once: true });
    }
    popup.hidden = false;
    card.setAttribute("aria-expanded", "true");
    if (typeof popup.showPopover === "function") popup.showPopover();
    position();
    requestAnimationFrame(() => {
      if (active === card) popup.classList.add("is-visible");
    });
  }
  function scheduleHide() {
    cancelHide();
    hideTimer = setTimeout(() => {
      if (popup.contains(document.activeElement)) return;
      close();
      restoreCategoryAfterClose();
    }, 160);
  }
  renderedCards.forEach((card) => {
    const title = card
        .querySelector(".card-preview-caption")
        .textContent.trim(),
      isCopy = !!card.dataset.loopCopy;
    if (!isCopy) {
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "More about " + title);
    }
    card.setAttribute("aria-controls", popup.id);
    card.setAttribute("aria-expanded", "false");
    card.addEventListener("pointerenter", (e) => {
      if (
        e.pointerType !== "touch" &&
        !changingSequence &&
        performance.now() > hoverBlockedUntil &&
        dismissed !== card &&
        matchMedia("(hover:hover)").matches
      )
        open(card);
    });
    card.addEventListener("pointermove", (e) => {
      if (
        e.pointerType !== "touch" &&
        !changingSequence &&
        performance.now() > hoverBlockedUntil &&
        dismissed !== card &&
        active !== card &&
        matchMedia("(hover:hover)").matches
      )
        open(card);
    });
    card.addEventListener("pointerleave", () => {
      if (changingSequence) return;
      if (dismissed === card) dismissed = null;
      scheduleHide();
    });
    card.addEventListener("focusin", () => {
      if (!isCopy && !returningFocus) {
        pendingCategory = null;
        syncCategory();
        if (
          card.matches(":focus-visible") ||
          matchMedia("(hover:hover)").matches
        )
          open(card);
      }
    });
    card.addEventListener("focusout", (e) => {
      if (!popup.contains(e.relatedTarget)) scheduleHide();
    });
    card.addEventListener("click", (e) => {
      if (e.pointerType === "touch" || !matchMedia("(hover:hover)").matches) {
        if (active === card) {
          close();
          restoreCategoryAfterClose();
        } else open(card);
      } else open(card);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (active === card) {
          close();
          restoreCategoryAfterClose();
        } else open(card);
      }
    });
  });
  popup.addEventListener(
    "wheel",
    (e) => {
      const horizontal = e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY),
        raw = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (horizontal && raw) {
        e.preventDefault();
        if (changingSequence) return;
        close();
        interact();
        const unit =
          e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? strip.clientWidth : 1;
        queueWheel(raw * unit);
      }
    },
    { passive: false },
  );
  popup.addEventListener(
    "touchstart",
    (e) => {
      if (changingSequence) e.stopImmediatePropagation();
    },
    { capture: true, passive: true },
  );
  let popupSwipe = null;
  popup.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      popupSwipe = {
        x: touch.clientX,
        y: touch.clientY,
        left: strip.scrollLeft,
        dragging: false,
        snap: strip.style.scrollSnapType,
      };
    },
    { passive: true },
  );
  document.addEventListener(
    "touchmove",
    (e) => {
      if (!popupSwipe || e.touches.length !== 1) return;
      const touch = e.touches[0],
        dx = touch.clientX - popupSwipe.x,
        dy = touch.clientY - popupSwipe.y;
      if (!popupSwipe.dragging) {
        if (Math.abs(dy) > 10 && Math.abs(dy) >= Math.abs(dx)) {
          popupSwipe = null;
          return;
        }
        if (Math.abs(dx) <= 10 || Math.abs(dx) <= Math.abs(dy)) return;
        popupSwipe.dragging = true;
        strip.style.scrollSnapType = "none";
        close();
        interact();
      }
      e.preventDefault();
      strip.scrollTo({ left: popupSwipe.left - dx, behavior: "instant" });
    },
    { passive: false },
  );
  function finishPopupSwipe() {
    if (!popupSwipe) return;
    const gesture = popupSwipe;
    popupSwipe = null;
    if (gesture.dragging) {
      strip.style.scrollSnapType = gesture.snap;
      const target =
        cycleStart +
        Math.round((strip.scrollLeft - cycleStart) / cardStep) * cardStep;
      strip.scrollTo({ left: target, behavior: behavior() });
    }
  }
  document.addEventListener("touchend", finishPopupSwipe, { passive: true });
  document.addEventListener("touchcancel", finishPopupSwipe, { passive: true });
  popup.addEventListener("pointerenter", cancelHide);
  popup.addEventListener("pointerleave", scheduleHide);
  popup.addEventListener("focusin", cancelHide);
  popup.addEventListener("focusout", (e) => {
    if (active && !active.contains(e.relatedTarget)) scheduleHide();
  });
  document.addEventListener("pointerdown", (e) => {
    if (active && !active.contains(e.target) && !popup.contains(e.target)) {
      close();
      if (!e.target.closest(".ct-category-filter")) restoreCategoryAfterClose();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && active) {
      e.preventDefault();
      close(true);
      restoreCategoryAfterClose();
    }
  });
  window.addEventListener(
    "scroll",
    () => {
      close();
      restoreCategoryAfterClose();
    },
    { passive: true },
  );
  window.addEventListener("resize", () => {
    close();
    restoreCategoryAfterClose();
  });
  let cycleStart = 0,
    cycleWidth = 0,
    cardStep = 0,
    layoutWidth = 0,
    logicalPhase = 0,
    overview = true,
    normalizing = false,
    settleTimer,
    resizeTimer,
    pendingCategory = null,
    instantRevision = 0,
    savedSnap = "";
  const modulo = (n, d) => ((n % d) + d) % d;
  const offset = (node) =>
    node.getBoundingClientRect().left -
    strip.getBoundingClientRect().left +
    strip.scrollLeft;
  const nav = root.querySelector(".ct-category-nav");
  function select(category) {
    buttons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === category),
      ),
    );
    const button = buttons.find(
      (button) => button.dataset.category === category,
    );
    if (!button) return;
    const r = button.getBoundingClientRect(),
      n = nav.getBoundingClientRect();
    if (r.left < n.left)
      nav.scrollBy({ left: r.left - n.left, behavior: behavior() });
    else if (r.right > n.right)
      nav.scrollBy({ left: r.right - n.right, behavior: behavior() });
  }
  function currentIndex() {
    if (!cardStep) return 0;
    return modulo(
      Math.round((strip.scrollLeft - cycleStart) / cardStep),
      orderedCards.length,
    );
  }
  function syncCategory() {
    if (overview) {
      select("experiences");
      return;
    }
    if (!pendingCategory)
      select(orderedCards[currentIndex()].dataset.categories);
  }
  function instant(left) {
    if (!normalizing) savedSnap = strip.style.scrollSnapType;
    const revision = ++instantRevision;
    normalizing = true;
    strip.style.scrollSnapType = "none";
    strip.scrollTo({ left, behavior: "instant" });
    requestAnimationFrame(() => {
      if (revision !== instantRevision) return;
      strip.style.scrollSnapType = savedSnap;
      normalizing = false;
      syncCategory();
    });
  }
  function normalize() {
    if (!cycleWidth || normalizing) return;
    const left = strip.scrollLeft;
    if (left < cycleStart - 0.5 || left >= cycleStart + cycleWidth - 0.5) {
      const target = cycleStart + modulo(left - cycleStart, cycleWidth),
        shift = target - left;
      if (wheelTarget !== null) wheelTarget += shift;
      if (railDrag) railDrag.left += shift;
      if (popupSwipe) popupSwipe.left += shift;
      instant(target);
    }
  }
  function settle() {
    clearTimeout(settleTimer);
    if (changingSequence || strip.clientWidth !== layoutWidth) return;
    pendingCategory = null;
    normalize();
    syncCategory();
    scheduleVisibleDetails();
  }
  function metrics(preserve = false) {
    stopWheel();
    const phase = preserve ? logicalPhase : 0;
    cycleStart = offset(orderedCards[0]);
    cycleWidth = offset(afterCards[0]) - cycleStart;
    cardStep = cycleWidth / orderedCards.length;
    layoutWidth = strip.clientWidth;
    logicalPhase = phase;
    instant(cycleStart + phase * cardStep);
    prev.disabled = false;
    next.disabled = false;
  }
  let wheelTarget = null,
    wheelFrame = 0,
    wheelEndTimer,
    wheelSnap = "";
  function wheelTick() {
    const distance = wheelTarget - strip.scrollLeft;
    if (Math.abs(distance) > 0.6) {
      strip.scrollLeft += distance * 0.24;
      wheelFrame = requestAnimationFrame(wheelTick);
      return;
    }
    strip.scrollLeft = wheelTarget;
    wheelFrame = 0;
    if (wheelEndTimer) return;
    strip.style.scrollSnapType = wheelSnap;
    wheelTarget = null;
    settle();
  }
  function queueWheel(delta) {
    if (changingSequence || !cardStep) return;
    if (wheelTarget === null) {
      wheelTarget = strip.scrollLeft;
      wheelSnap = strip.style.scrollSnapType;
      strip.style.scrollSnapType = "none";
    }
    const step = cardStep || 244,
      limited = Math.max(-step * 0.5, Math.min(step * 0.5, delta)),
      lead = step * 1.25;
    wheelTarget = Math.max(
      strip.scrollLeft - lead,
      Math.min(strip.scrollLeft + lead, wheelTarget + limited),
    );
    if (!wheelFrame) wheelFrame = requestAnimationFrame(wheelTick);
    clearTimeout(wheelEndTimer);
    wheelEndTimer = setTimeout(() => {
      wheelEndTimer = null;
      wheelTarget =
        cycleStart +
        Math.round((wheelTarget - cycleStart) / cardStep) * cardStep;
      if (!wheelFrame) wheelFrame = requestAnimationFrame(wheelTick);
    }, 140);
  }
  function stopWheel() {
    if (wheelFrame) cancelAnimationFrame(wheelFrame);
    clearTimeout(wheelEndTimer);
    if (wheelTarget !== null) strip.style.scrollSnapType = wheelSnap;
    wheelTarget = null;
    wheelFrame = 0;
    wheelEndTimer = null;
  }
  function visibleCards() {
    const start = Math.max(0, Math.floor(strip.scrollLeft / cardStep) - 2),
      count = Math.ceil(strip.clientWidth / cardStep) + 5;
    return renderedCards.slice(
      start,
      Math.min(renderedCards.length, start + count),
    );
  }
  const detailImageCache = new Map();
  let detailPrimePending = false;
  function primeDetailImage(card, priority = "low") {
    card = byExperience.get(card.dataset.experience) || card;
    const id = card.dataset.experience;
    let entry = detailImageCache.get(id);
    if (entry) {
      detailImageCache.delete(id);
      detailImageCache.set(id, entry);
      if (priority === "high") entry.image.fetchPriority = "high";
      return entry;
    }
    const source = detailsByExperience
      .get(id)
      ?.querySelector(".card-hovered-image img")
      ?.getAttribute("src");
    if (!source) return null;
    while (detailImageCache.size >= 12)
      detailImageCache.delete(detailImageCache.keys().next().value);
    const preload = new Image();
    preload.decoding = "async";
    preload.fetchPriority = priority;
    entry = { image: preload, ready: false, promise: null };
    entry.promise = new Promise((resolve) => {
      let resolved = false;
      const done = () => {
        if (resolved) return;
        resolved = true;
        resolve(preload.naturalWidth > 0);
      };
      preload.addEventListener("load", done, { once: true });
      preload.addEventListener("error", done, { once: true });
      preload.src = source;
      if (preload.complete) done();
    }).then(async (loaded) => {
      if (loaded && typeof preload.decode === "function") {
        try {
          await preload.decode();
        } catch {}
      }
      entry.ready = loaded;
      return loaded;
    });
    detailImageCache.set(id, entry);
    return entry;
  }
  function scheduleVisibleDetails() {
    if (detailPrimePending || !cardStep) return;
    detailPrimePending = true;
    const run = () => {
      detailPrimePending = false;
      const unique = new Set();
      visibleCards().forEach((card) => {
        const canonical = byExperience.get(card.dataset.experience),
          id = canonical?.dataset.experience;
        if (canonical && !unique.has(id)) {
          unique.add(id);
          primeDetailImage(canonical);
        }
      });
    };
    if ("requestIdleCallback" in window)
      requestIdleCallback(run, { timeout: 700 });
    else setTimeout(run, 80);
  }
  function arrange(
    sequence,
    anchor = null,
    anchorLeft = 0,
    onTransitionStart = null,
  ) {
    stopWheel();
    const focused = document.activeElement,
      restoreFocus = cards.some(
        (card) => card === focused || card.contains(focused),
      ),
      revision = ++sequenceRevision,
      reduceMotion = false,
      transitionLock = reduceMotion ? 60 : 1320,
      viewport = strip.getBoundingClientRect(),
      beforeRects = new Map(),
      transitionGhosts = [];
    if (!reduceMotion)
      visibleCards().forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (
          Math.min(rect.right, viewport.right) -
            Math.max(rect.left, viewport.left) >
          1
        )
          beforeRects.set(card, rect);
      });
    if (!reduceMotion)
      beforeRects.forEach((rect, card) => {
        if (anchor && card.dataset.experience === anchor.dataset.experience)
          return;
        const ghost = card.cloneNode(true);
        ghost.removeAttribute("id");
        ghost.removeAttribute("aria-controls");
        ghost.removeAttribute("aria-expanded");
        ghost.setAttribute("aria-hidden", "true");
        ghost
          .querySelectorAll("[id]")
          .forEach((node) => node.removeAttribute("id"));
        ghost.classList.add("ct-home-experiences", "ct-transition-ghost");
        Object.assign(ghost.style, {
          position: "fixed",
          left: rect.left + "px",
          top: rect.top + "px",
          width: rect.width + "px",
          height: rect.height + "px",
          display: "flex",
          flexDirection: "column",
          margin: "0",
          background: "#fff",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: "9998",
        });
        document.body.append(ghost);
        transitionGhosts.push(ghost);
      });
    const preserveOpen = !!(
      anchor &&
      active &&
      active.dataset.experience === anchor.dataset.experience
    );
    if (preserveOpen) cancelHide();
    else close();
    clearTimeout(settleTimer);
    clearTimeout(transitionTimer);
    changingSequence = true;
    strip.classList.add("is-transitioning");
    orderedCards.splice(0, orderedCards.length, ...sequence);
    beforeCards.splice(
      0,
      beforeCards.length,
      ...sequence.map((card) =>
        beforeByExperience.get(card.dataset.experience),
      ),
    );
    afterCards.splice(
      0,
      afterCards.length,
      ...sequence.map((card) => afterByExperience.get(card.dataset.experience)),
    );
    renderedCards.splice(
      0,
      renderedCards.length,
      ...beforeCards,
      ...orderedCards,
      ...afterCards,
    );
    strip.replaceChildren(...renderedCards);
    cycleStart = offset(orderedCards[0]);
    cycleWidth = offset(afterCards[0]) - cycleStart;
    cardStep = cycleWidth / orderedCards.length;
    layoutWidth = strip.clientWidth;
    const target = anchor ? offset(anchor) - anchorLeft : cycleStart;
    logicalPhase = modulo(
      (target - cycleStart) / cardStep,
      orderedCards.length,
    );
    instant(target);
    if (restoreFocus) {
      returningFocus = true;
      focused.focus({ preventScroll: true });
      returningFocus = false;
    }
    const startTransition = () => {
      if (revision !== sequenceRevision) {
        transitionGhosts.forEach((ghost) => ghost.remove());
        return;
      }
      onTransitionStart?.();
      logicalPhase = modulo(
        (strip.scrollLeft - cycleStart) / cardStep,
        orderedCards.length,
      );
      position();
      syncCategory();
      hoverBlockedUntil = performance.now() + transitionLock;
      if (reduceMotion) transitionGhosts.forEach((ghost) => ghost.remove());
      else {
        transitionGhosts.forEach((ghost, index) => {
          const animation = ghost.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 1050,
            delay: index * 60,
            easing: "cubic-bezier(.22,.61,.36,1)",
            fill: "forwards",
          });
          animation.finished.catch(() => {}).finally(() => ghost.remove());
        });
        const nextViewport = strip.getBoundingClientRect();
        let visibleIndex = 0;
        visibleCards().forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (
            Math.min(rect.right, nextViewport.right) -
              Math.max(rect.left, nextViewport.left) <=
            1
          )
            return;
          if (anchor && card.dataset.experience === anchor.dataset.experience) {
            visibleIndex++;
            return;
          }
          const first = beforeRects.get(card);
          card.getAnimations().forEach((animation) => animation.cancel());
          card.animate([{ opacity: first ? 0.3 : 0 }, { opacity: 1 }], {
            duration: 1050,
            delay: Math.min(visibleIndex++, 4) * 60,
            easing: "cubic-bezier(.22,.61,.36,1)",
          });
        });
      }
      transitionTimer = setTimeout(() => {
        if (revision !== sequenceRevision) return;
        changingSequence = false;
        strip.classList.remove("is-transitioning");
        logicalPhase = modulo(
          (strip.scrollLeft - cycleStart) / cardStep,
          orderedCards.length,
        );
        cancelHide();
        position();
        syncCategory();
        if (
          active &&
          !active.matches(":hover") &&
          !popup.matches(":hover") &&
          !active.matches(":focus-within")
        )
          scheduleHide();
        settle();
      }, transitionLock);
    };
    requestAnimationFrame(() => requestAnimationFrame(startTransition));
  }
  function revealCategory(card) {
    const selected = byExperience.get(card.dataset.experience),
      category = selected.dataset.categories,
      anchorLeft =
        card.getBoundingClientRect().left - strip.getBoundingClientRect().left;
    const categoryIndex = categoryOrder.indexOf(category),
      group = categoryGroups[categoryIndex],
      slot = Math.min(
        group.length - 1,
        Math.max(0, Math.ceil((anchorLeft - 0.5) / cardStep)),
      ),
      start = modulo(group.indexOf(selected) - slot, group.length);
    const rotated = [...group.slice(start), ...group.slice(0, start)],
      following = Array.from(
        { length: categoryOrder.length - 1 },
        (_, i) =>
          categoryGroups[(categoryIndex + i + 1) % categoryOrder.length],
      ).flat();
    previewingMixed = true;
    previewAnchor = selected;
    previewAnchorLeft = anchorLeft;
    overview = false;
    pendingCategory = category;
    arrange([...rotated, ...following], selected, anchorLeft, () =>
      select(category),
    );
    return selected;
  }
  let revealTimer, transitionTimer;
  const revealDelay = 1500,
    categoryIndicator = document.createElement("span");
  categoryIndicator.className = "ct-category-indicator";
  categoryIndicator.setAttribute("aria-hidden", "true");
  nav.append(categoryIndicator);
  function cancelReveal() {
    clearTimeout(revealTimer);
  }
  function close(restore = false) {
    cancelHide();
    cancelReveal();
    const previous = active;
    if (restore && previous) dismissed = previous;
    active = null;
    if (previous) previous.setAttribute("aria-expanded", "false");
    popup.classList.remove("is-visible");
    if (
      typeof popup.hidePopover === "function" &&
      popup.matches(":popover-open")
    )
      popup.hidePopover();
    popup.hidden = true;
    if (restore && previous) {
      returningFocus = true;
      previous.focus({ preventScroll: true });
      returningFocus = false;
    }
  }
  function scheduleReveal(card) {
    cancelReveal();
    const selected = byExperience.get(card.dataset.experience);
    revealTimer = setTimeout(() => {
      if (active !== selected || !mixedMode || previewingMixed) return;
      revealCategory(selected);
      commitCategory(selected);
      position();
    }, revealDelay);
  }
  function open(card) {
    card = byExperience.get(card.dataset.experience) || card;
    if (previewingMixed && previewAnchor && card !== previewAnchor) return;
    cancelHide();
    if (active === card) {
      position();
      return;
    }
    close();
    dismissed = null;
    active = card;
    if (!mixedMode) {
      pendingCategory = null;
      select(card.dataset.categories);
    }
    const content = detailsByExperience
        .get(card.dataset.experience)
        .cloneNode(true),
      frame = content.querySelector(".card-hovered-image"),
      image = frame?.querySelector("img"),
      preview = card.querySelector(".card-preview-image img"),
      previewSrc = preview?.currentSrc || preview?.getAttribute("src");
    if (frame && previewSrc)
      frame.style.backgroundImage = `url(${JSON.stringify(previewSrc)})`;
    if (image) {
      image.loading = "eager";
      image.decoding = "async";
      image.fetchPriority = "high";
      image.alt = card
        .querySelector(".card-preview-caption")
        .textContent.trim();
      primeDetailImage(card, "high");
    }
    popup.replaceChildren(...content.childNodes);
    const title = popup.querySelector(".card-title");
    title.id = "ct-home-hover-title";
    popup.hidden = false;
    card.setAttribute("aria-expanded", "true");
    if (typeof popup.showPopover === "function") popup.showPopover();
    position();
    if (image) {
      const revealQuality = () => {
        if (active === card && popup.contains(image)) {
          image.classList.add("is-detail-ready");
          position();
        }
      };
      const decodeQuality = () => {
        if (typeof image.decode === "function")
          image
            .decode()
            .catch(() => {})
            .then(revealQuality);
        else revealQuality();
      };
      if (image.complete && image.naturalWidth) decodeQuality();
      else image.addEventListener("load", decodeQuality, { once: true });
    }
    if (mixedMode && !previewingMixed) scheduleReveal(card);
    requestAnimationFrame(() => {
      if (active === card) popup.classList.add("is-visible");
    });
  }
  function select(category) {
    buttons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === category),
      ),
    );
    const button = buttons.find(
      (button) => button.dataset.category === category,
    );
    if (!button) return;
    categoryIndicator.style.left = button.offsetLeft + "px";
    categoryIndicator.style.width = button.offsetWidth + "px";
    const r = button.getBoundingClientRect(),
      n = nav.getBoundingClientRect();
    if (r.left < n.left)
      nav.scrollBy({ left: r.left - n.left, behavior: behavior() });
    else if (r.right > n.right)
      nav.scrollBy({ left: r.right - n.right, behavior: behavior() });
  }
  function commitCategory(card) {
    let selected = byExperience.get(card.dataset.experience),
      category = selected.dataset.categories;
    if (mixedMode && !previewingMixed) selected = revealCategory(selected);
    previewingMixed = false;
    previewAnchor = null;
    mixedMode = false;
    overview = false;
    pendingCategory = category;
    if (!changingSequence) select(category);
    return selected;
  }
  let railDrag = null,
    suppressRailClick = false;
  const inRailBand = (event) => {
    if (event.target.closest("#ct-experience-results")) return true;
    const rect = strip.getBoundingClientRect();
    return event.clientY >= rect.top - 20 && event.clientY <= rect.bottom + 20;
  };
  root.addEventListener(
    "wheel",
    (event) => {
      if (
        !inRailBand(event) ||
        event.target.closest(".ct-category-nav,.ct-home-footer")
      )
        return;
      const raw = event.deltaX || (event.shiftKey ? event.deltaY : 0);
      if (!raw) return;
      event.preventDefault();
      if (changingSequence) return;
      close();
      interact();
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? strip.clientWidth
            : 1;
      queueWheel(raw * unit);
    },
    { passive: false },
  );
  root.addEventListener("pointerdown", (event) => {
    if (
      changingSequence ||
      event.pointerType === "touch" ||
      event.button !== 0 ||
      !inRailBand(event) ||
      event.target.closest(".ct-category-nav,.ct-home-footer")
    )
      return;
    stopWheel();
    railDrag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: strip.scrollLeft,
      dragging: false,
      snap: strip.style.scrollSnapType,
    };
    suppressRailClick = false;
    if (root.setPointerCapture) root.setPointerCapture(event.pointerId);
  });
  root.addEventListener("pointermove", (event) => {
    if (!railDrag || railDrag.id !== event.pointerId) return;
    const dx = event.clientX - railDrag.x,
      dy = event.clientY - railDrag.y;
    if (!railDrag.dragging) {
      if (Math.abs(dx) < 7 || Math.abs(dx) <= Math.abs(dy)) return;
      railDrag.dragging = true;
      strip.style.scrollSnapType = "none";
      root.classList.add("ct-dragging");
      close();
      interact();
    }
    event.preventDefault();
    strip.scrollTo({ left: railDrag.left - dx, behavior: "instant" });
  });
  function finishRailDrag(event) {
    if (!railDrag || railDrag.id !== event.pointerId) return;
    const gesture = railDrag;
    railDrag = null;
    if (root.hasPointerCapture && root.hasPointerCapture(event.pointerId))
      root.releasePointerCapture(event.pointerId);
    root.classList.remove("ct-dragging");
    if (!gesture.dragging) return;
    strip.style.scrollSnapType = gesture.snap;
    const target =
      cycleStart +
      Math.round((strip.scrollLeft - cycleStart) / cardStep) * cardStep;
    strip.scrollTo({ left: target, behavior: behavior() });
    suppressRailClick = true;
    setTimeout(() => {
      suppressRailClick = false;
    }, 0);
  }
  root.addEventListener("pointerup", finishRailDrag);
  root.addEventListener("pointercancel", finishRailDrag);
  root.addEventListener(
    "click",
    (event) => {
      if (!suppressRailClick) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      suppressRailClick = false;
    },
    true,
  );
  strip.addEventListener("dragstart", (event) => event.preventDefault());
  strip.addEventListener(
    "click",
    (event) => {
      const card = event.target.closest("[data-experience]");
      if (card && mixedMode) commitCategory(card);
    },
    true,
  );
  popup.addEventListener(
    "click",
    () => {
      if (active && mixedMode) commitCategory(active);
    },
    true,
  );
  strip.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const card = event.target.closest("[data-experience]");
      if (!card || !mixedMode) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      open(commitCategory(card));
    },
    true,
  );
  ["pointerdown", "touchstart", "wheel"].forEach((type) =>
    strip.addEventListener(
      type,
      (event) => {
        if (!changingSequence) return;
        if (type === "wheel") event.preventDefault();
        event.stopImmediatePropagation();
      },
      { capture: true, passive: type !== "wheel" },
    ),
  );

  function jump(category) {
    if (changingSequence) return;
    close();
    dismissed = null;
    previewingMixed = false;
    previewAnchor = null;
    mixedMode = category === "experiences";
    overview = mixedMode;
    pendingCategory = mixedMode ? null : category;
    arrange(mixedMode ? mixedCards : groupedCards, null, 0, () =>
      select(category),
    );
    if (mixedMode) return;
    const index = orderedCards.findIndex(
      (card) => card.dataset.categories === category,
    );
    if (index < 0) return;
    const center = cycleStart + index * cardStep,
      targets = [center - cycleWidth, center, center + cycleWidth].filter(
        (left) => left >= 0 && left <= strip.scrollWidth - strip.clientWidth,
      ),
      target = overview
        ? center
        : targets.reduce(
            (best, left) =>
              Math.abs(left - strip.scrollLeft) <
              Math.abs(best - strip.scrollLeft)
                ? left
                : best,
            targets[0],
          );
    const distance = Math.abs(target - strip.scrollLeft);
    strip.scrollTo({
      left: target,
      behavior: distance > strip.clientWidth * 2 ? "instant" : behavior(),
    });
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, 200);
  }
  function interact() {
    overview = false;
    pendingCategory = null;
  }
  function step(direction) {
    if (changingSequence) return;
    stopWheel();
    close();
    interact();
    const target =
      cycleStart +
      (Math.round((strip.scrollLeft - cycleStart) / cardStep) + direction) *
        cardStep;
    strip.scrollTo({ left: target, behavior: behavior() });
  }
  buttons.forEach((button) =>
    button.addEventListener("click", () => jump(button.dataset.category)),
  );
  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));
  ["pointerdown", "touchstart", "wheel"].forEach((type) =>
    strip.addEventListener(type, interact, { passive: true }),
  );
  strip.addEventListener(
    "scroll",
    () => {
      if (changingSequence || normalizing) {
        position();
        return;
      }
      hoverBlockedUntil = performance.now() + 180;
      close();
      if (strip.clientWidth !== layoutWidth) return;
      if (!normalizing) {
        logicalPhase = modulo(
          (strip.scrollLeft - cycleStart) / cardStep,
          orderedCards.length,
        );
        syncCategory();
      }
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 160);
    },
    { passive: true },
  );
  strip.addEventListener("scrollend", settle);
  strip.addEventListener("keydown", (e) => {
    if (e.target !== strip) return;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      step(e.key === "ArrowRight" ? 1 : -1);
    }
  });
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      close();
      restoreMixedPreview();
      metrics(true);
    }, 100);
  }).observe(strip);
  metrics(false);
  select("experiences");
  scheduleVisibleDetails();
})();
