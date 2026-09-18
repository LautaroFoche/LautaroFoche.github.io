const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#nav-menu');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const scrollBehavior = () => motionPreference.matches ? 'instant' : 'smooth';

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
const closeMenu = () => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = 'Abrir menú';
    menu.classList.remove('is-open');
};

function initStackExplorer() {
    const explorer = document.querySelector('[data-stack-explorer]');
    if (!explorer) return null;
    const map = explorer.querySelector('[data-star-map]');
    const core = explorer.querySelector('[data-stack-core]');
    const toggle = explorer.querySelector('[data-stack-toggle]');
    const categories = explorer.querySelector('#stack-categories');
    const cards = [...explorer.querySelectorAll('[data-category]')];
    const panel = explorer.querySelector('#stack-detail');
    const detail = explorer.querySelector('[data-stack-detail]');
    const svg = explorer.querySelector('[data-connections]');
    if (!map || !core || !toggle || !categories || !panel || !detail || !svg || !cards.length) return null;
    let isOpen = false;
    let activeCategory = null;
    let isClosing = false;
    let transitionId = 0;
    let finishPendingClose = null;
    let frame = null;
    let containerAnimation = null;
    const entranceAnimations = new Set();
    const defaultDetail = detail.textContent;
    const ns = 'http://www.w3.org/2000/svg';

    // Paths use the measured card edges; they never participate in document layout.
    function drawConnections() {
        frame = null;
        svg.replaceChildren();
        if (!isOpen) return;
        const bounds = map.getBoundingClientRect();
        const relative = (element) => {
            // Layout coordinates stay stable while the cards travel out from the core.
            return { x: element.offsetLeft, y: element.offsetTop, w: element.offsetWidth, h: element.offsetHeight };
        };
        const center = relative(core);
        const cx = center.x + center.w / 2;
        const cy = center.y + center.h / 2;
        const desktop = window.matchMedia('(min-width: 1100px)').matches;
        const mobile = window.matchMedia('(max-width: 699px)').matches;
        svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
        cards.forEach((card) => {
            const box = relative(card);
            let sx, sy, ex, ey, path;
            if (desktop) {
                const above = box.y < center.y;
                sx = cx;
                sy = above ? center.y : center.y + center.h;
                ex = box.x + box.w / 2;
                ey = above ? box.y + box.h : box.y;
                const bend = (sy + ey) / 2;
                path = `M${sx},${sy} V${bend} H${ex} V${ey}`;
            } else {
                const left = mobile || box.x + box.w / 2 < cx;
                sx = left ? center.x : center.x + center.w;
                sy = cy;
                ex = left ? box.x : box.x + box.w;
                ey = box.y + 28;
                const trunk = left ? (mobile ? 12 : 16) : bounds.width - 16;
                path = `M${sx},${sy} H${trunk} V${ey} H${ex}`;
            }
            const group = document.createElementNS(ns, 'g');
            if (card.dataset.category === activeCategory) group.classList.add('is-active');
            const line = document.createElementNS(ns, 'path');
            line.setAttribute('d', path);
            group.append(line);
            for (const [x, y] of [[sx, sy], [ex, ey]]) {
                const port = document.createElementNS(ns, 'circle');
                port.setAttribute('cx', x);
                port.setAttribute('cy', y);
                port.setAttribute('r', '3');
                group.append(port);
            }
            // Paint the selected route last so shared portions remain highlighted.
            if (card.dataset.category === activeCategory) svg.append(group);
            else svg.prepend(group);
        });
    }
    const scheduleDraw = () => {
        if (frame !== null) return;
        frame = requestAnimationFrame(drawConnections);
    };
    function cancelEntrance() {
        entranceAnimations.forEach((animation) => animation.cancel());
        entranceAnimations.clear();
    }
    function animateEntrance(startFrames = null) {
        if (motionPreference.matches || typeof core.animate !== 'function') return;
        const cx = core.offsetLeft + core.offsetWidth / 2;
        const cy = core.offsetTop + core.offsetHeight / 2;
        const play = (element, keyframes, options) => {
            const animation = element.animate(keyframes, options);
            entranceAnimations.add(animation);
            animation.finished.then(() => {
                entranceAnimations.delete(animation);
            }, () => entranceAnimations.delete(animation));
        };
        cards.forEach((card, index) => {
            const dx = cx - (card.offsetLeft + card.offsetWidth / 2);
            const dy = cy - (card.offsetTop + card.offsetHeight / 2);
            const distance = Math.hypot(dx, dy) || 1;
            // A small, bounded overshoot keeps even the long mobile routes gentle.
            const ox = -dx / distance * 9;
            const oy = -dy / distance * 9;
            play(card, [
                { ...(startFrames?.[index] || { transform: `translate(${dx}px, ${dy}px) scale(.12)`, opacity: 0 }), offset: 0 },
                { opacity: 1, offset: .25 },
                { transform: `translate(${ox}px, ${oy}px) scale(1.015)`, opacity: 1, offset: .8 },
                { transform: 'translate(0, 0) scale(1)', opacity: 1, offset: 1 }
            ], {
                duration: 1100, delay: index * 75,
                easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'backwards'
            });
        });
        play(svg, [{ opacity: 0 }, { opacity: 1 }], {
            duration: 550, delay: 450, easing: 'ease-out', fill: 'backwards'
        });
        const symbol = core.querySelector('.core-symbol');
        if (symbol) play(symbol, [
            { transform: 'scale(1)' },
            { transform: 'scale(1.18)', offset: .3 },
            { transform: 'scale(1)' }
        ], { duration: 700, easing: 'ease-out' });
    }
    function render() {
        explorer.classList.toggle('is-open', isOpen);
        categories.hidden = !isOpen;
        panel.hidden = !isOpen;
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.querySelector('[data-toggle-label]').textContent = isOpen ? 'Contraer herramientas' : 'Explorar herramientas';
        toggle.querySelector('.toggle-sign').textContent = isOpen ? '−' : '+';
        for (const card of cards) {
            const active = card.dataset.category === activeCategory;
            card.classList.toggle('is-active', active);
            card.querySelector('[data-category-button]').setAttribute('aria-pressed', String(active));
            card.querySelector('.dimension-indicator').textContent = active ? '✓' : '↗';
        }
        const selected = cards.find((card) => card.dataset.category === activeCategory);
        if (selected) {
            const title = document.createElement('strong');
            title.textContent = selected.querySelector('[data-category-title]').textContent + '. ';
            detail.replaceChildren(title, document.createTextNode(selected.querySelector('[data-category-description]').textContent));
        } else detail.textContent = defaultDetail;
        scheduleDraw();
    }
    function keepToggleVisible() {
        requestAnimationFrame(() => {
            const box = toggle.getBoundingClientRect();
            if (box.top < (header?.offsetHeight || 0) + 12 || box.bottom > window.innerHeight - 12) {
                toggle.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
            }
        });
    }
    function cardFrames() {
        return cards.map((card) => {
            const style = getComputedStyle(card);
            return { transform: style.transform, opacity: style.opacity };
        });
    }
    function cancelContainerMotion() {
        containerAnimation?.cancel();
        containerAnimation = null;
        explorer.classList.remove('is-resizing');
    }
    function animateContainer(previousHeight, keepVisible) {
        cancelContainerMotion();
        const targetHeight = explorer.getBoundingClientRect().height;
        if (motionPreference.matches || typeof explorer.animate !== 'function' || Math.abs(targetHeight - previousHeight) < 1) return;
        explorer.classList.add('is-resizing');
        const animation = explorer.animate([
            { height: `${previousHeight}px` },
            { height: `${targetHeight}px` }
        ], {
            duration: targetHeight > previousHeight ? 1100 : 800,
            easing: 'cubic-bezier(.22, 1, .36, 1)'
        });
        containerAnimation = animation;
        animation.finished.then(() => {
            if (containerAnimation !== animation) return;
            containerAnimation = null;
            explorer.classList.remove('is-resizing');
            if (keepVisible) keepToggleVisible();
        }, () => {});
    }
    function setOpen(next, keepVisible = false) {
        if (next === (isOpen && !isClosing)) return;
        const id = ++transitionId;
        const previousHeight = explorer.getBoundingClientRect().height;
        const startFrames = isOpen ? cardFrames() : null;
        cancelEntrance();
        finishPendingClose = null;
        if (next) {
            isClosing = false;
            isOpen = true;
            categories.inert = false;
            render();
            animateContainer(previousHeight, keepVisible);
            animateEntrance(startFrames);
            if (keepVisible) keepToggleVisible();
            return;
        }
        // Keep the expanded layout until every card has reached the core.
        isClosing = true;
        if (categories.contains(document.activeElement)) toggle.focus({ preventScroll: true });
        categories.inert = true;
        toggle.querySelector('[data-toggle-label]').textContent = 'Explorar herramientas';
        toggle.querySelector('.toggle-sign').textContent = '+';
        const finishClose = () => {
            if (id !== transitionId) return;
            const expandedHeight = explorer.getBoundingClientRect().height;
            cancelEntrance();
            isClosing = false;
            isOpen = false;
            activeCategory = null;
            categories.inert = false;
            finishPendingClose = null;
            render();
            animateContainer(expandedHeight, keepVisible);
            if (keepVisible) keepToggleVisible();
        };
        finishPendingClose = finishClose;
        if (motionPreference.matches || typeof core.animate !== 'function') {
            finishClose();
            return;
        }
        const cx = core.offsetLeft + core.offsetWidth / 2;
        const cy = core.offsetTop + core.offsetHeight / 2;
        const closing = cards.map((card, index) => {
            const dx = cx - (card.offsetLeft + card.offsetWidth / 2);
            const dy = cy - (card.offsetTop + card.offsetHeight / 2);
            const animation = card.animate([
                startFrames[index],
                { transform: `translate(${dx}px, ${dy}px) scale(.12)`, opacity: 0 }
            ], {
                duration: 850, delay: (cards.length - 1 - index) * 55,
                easing: 'cubic-bezier(.55, 0, .25, 1)', fill: 'both'
            });
            entranceAnimations.add(animation);
            return animation.finished;
        });
        entranceAnimations.add(svg.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 350, easing: 'ease-out', fill: 'forwards'
        }));
        Promise.all(closing).then(finishClose, () => {});
    }
    toggle.addEventListener('click', () => setOpen(!(isOpen && !isClosing), true));
    cards.forEach((card) => {
        const button = card.querySelector('[data-category-button]');
        button.addEventListener('click', () => {
            activeCategory = card.dataset.category;
            render();
        });
        button.hidden = false;
        card.querySelector('[data-category-description]').hidden = true;
    });
    explorer.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen) {
            event.preventDefault();
            setOpen(false, true);
            toggle.focus({ preventScroll: true });
        }
    });
    toggle.hidden = false;
    explorer.classList.add('is-enhanced');
    render();
    // Never leave a moving target under keyboard focus or retain stale resize paths.
    categories.addEventListener('focusin', cancelEntrance);
    const settleMotion = () => {
        if (finishPendingClose) finishPendingClose();
        else cancelEntrance();
        cancelContainerMotion();
    };
    window.addEventListener('resize', settleMotion);
    motionPreference.addEventListener('change', () => {
        if (motionPreference.matches) settleMotion();
    });
    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(scheduleDraw);
        [map, core, ...cards].forEach((element) => observer.observe(element));
    } else window.addEventListener('resize', scheduleDraw);
    return { open: () => setOpen(true) };
}
const stackExplorer = initStackExplorer();

menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
    menu?.classList.toggle('is-open', open);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const hash = link.getAttribute('href');
        const target = document.getElementById(hash.slice(1));
        if (!target) return;
        event.preventDefault();
        closeMenu();
        if (hash === '#tecnologias') stackExplorer?.open();
        // Transfer keyboard focus to the destination, including the skip link.
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
        history.replaceState(null, '', hash);
    });
});
const openStackFromHash = () => { if (location.hash === '#tecnologias') stackExplorer?.open(); };
window.addEventListener('hashchange', openStackFromHash);
openStackFromHash();

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.classList.contains('is-open')) { closeMenu(); menuButton?.focus(); }
});
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', () => { if (window.innerWidth > 700) closeMenu(); });
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
updateHeader();
