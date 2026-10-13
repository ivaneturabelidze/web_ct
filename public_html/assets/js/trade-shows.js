/* Local calendar days avoid UTC parsing and end-of-day boundary errors. */
(function () {
  function dateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  function classifyEvents(events, today = new Date()) {
    const key = dateKey(today);
    const sorted = events.map(event => ({ ...event })).sort((a, b) => a.start.localeCompare(b.start));
    const next = sorted.find(event => event.start > key);
    return sorted.map(event => ({ ...event, status: key > event.end ? 'past' : key >= event.start ? 'now' : event === next ? 'next' : 'upcoming' }));
  }
  function localDate(value) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  function formatDates(event) {
    const start = localDate(event.start), end = localDate(event.end);
    const format = date => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    if (event.start === event.end) return `${format(start)} ${start.getFullYear()}`;
    if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) return `${start.getDate()}–${format(end)} ${end.getFullYear()}`;
    return `${format(start)} ${start.getFullYear()} – ${format(end)} ${end.getFullYear()}`;
  }
  if (typeof module !== 'undefined') module.exports = { dateKey, classifyEvents, formatDates };
  if (typeof document === 'undefined') return;
  const labels = { past: 'Past', now: 'Happening now', next: 'Next event', upcoming: 'Upcoming' };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.trade-shows').forEach(root => {
    const viewport = root.querySelector('.trade-shows__viewport');
    const track = root.querySelector('.trade-shows__track');
    let renderedDay;
    function positionFeatured(animate = false) {
      const target = track.querySelector('.trade-show--next') || track.querySelector('.trade-show--now');
      if (!target) return;
      const desktop = window.matchMedia('(min-width: 993px)').matches;
      const center = target.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft + target.clientWidth / 2;
      viewport.scrollTo({ left: center - viewport.clientWidth * (desktop ? .65 : .50), behavior: animate && !reducedMotion.matches ? 'smooth' : 'instant' });
    }
    function element(tag, className, value) {
      const node = document.createElement(tag);
      node.className = className;
      if (value !== undefined) node.textContent = value;
      return node;
    }
    function render() {
      const today = new Date();
      if (renderedDay === dateKey(today)) return;
      const initial = renderedDay === undefined;
      renderedDay = dateKey(today);
      const time = root.querySelector('.trade-shows__date');
      time.dateTime = renderedDay;
      time.textContent = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      track.replaceChildren();
      classifyEvents(tradeShows, today).forEach(event => {
        const item = element('li', `trade-show trade-show--${event.status}`);
        if (event.status === 'now') item.setAttribute('aria-current', 'date');
        const panel = element('div', 'trade-show__panel'); panel.setAttribute('aria-hidden', 'true');
        const flag = element('div', 'trade-show__flag');
        if (event.status === 'next') flag.append(element('span', '', 'NEXT EVENT'));
        const logo = element('div', 'trade-show__logo');
        const image = document.createElement('img'); image.src = event.logo; image.alt = `${event.name} logo`; image.width = 126; image.height = 65; logo.append(image);
        const stem = element('div', 'trade-show__stem'); stem.setAttribute('aria-hidden', 'true');
        const node = element('span', 'trade-show__node'); node.setAttribute('aria-hidden', 'true');
        const details = element('div', 'trade-show__details');
        details.append(element('h3', 'trade-show__name', event.name), element('p', 'trade-show__date', formatDates(event)), element('p', 'trade-show__city', event.city));
        if (event.booth) details.append(element('p', 'trade-show__booth', `Booth ${event.booth}`));
        if (event.status !== 'next') details.append(element('p', 'trade-show__status', labels[event.status]));
        item.append(panel, flag, logo, stem, node, details); track.append(item);
      });
      // Synchronous initial positioning avoids a visible jump after first paint.
      positionFeatured(!initial);
    }
    let resizeFrame;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => positionFeatured());
    });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) render(); });
    render();
    setInterval(render, 60000);
  });
})();
