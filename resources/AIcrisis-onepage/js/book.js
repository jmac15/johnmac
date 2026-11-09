/*
 * The AI Crisis in Higher Education – web edition
 * Based on Start Bootstrap Creative v7.0.7 scripts (MIT licence),
 * extended for footnotes, back-to-top and print.
 */
window.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('mainNav');
    const toTop = document.getElementById('toTop');

    // Shrink the navbar (and show back-to-top) once the page is scrolled
    const onScroll = () => {
        const scrolled = window.scrollY > 0;
        if (nav) nav.classList.toggle('navbar-shrink', scrolled);
        if (toTop) toTop.classList.toggle('show', window.scrollY > 800);
    };
    onScroll();
    document.addEventListener('scroll', onScroll, { passive: true });

    // Bootstrap scrollspy for the main navigation
    if (nav) {
        new bootstrap.ScrollSpy(document.body, { target: '#mainNav', rootMargin: '0px 0px -40%' });
    }

    // Collapse the mobile menu after a link is chosen
    const toggler = document.querySelector('.navbar-toggler');
    document.querySelectorAll('#navbarResponsive .nav-link:not(.dropdown-toggle), #navbarResponsive .dropdown-item')
        .forEach(link => link.addEventListener('click', () => {
            if (window.getComputedStyle(toggler).display !== 'none' &&
                document.getElementById('navbarResponsive').classList.contains('show')) {
                toggler.click();
            }
        }));

    // Open any <details> that contains the target of an in-page link,
    // then move keyboard focus to the target so screen readers follow.
    const revealTarget = (id, focus) => {
        if (!id) return;
        const target = document.getElementById(decodeURIComponent(id));
        if (!target) return;
        let d = target.closest('details');
        while (d) { d.open = true; d = d.parentElement.closest('details'); }
        if (focus) {
            if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            target.scrollIntoView({ block: 'center' });
        }
    };
    document.addEventListener('click', e => {
        const a = e.target.closest('a[href^="#fn-"], a[href^="#fnref-"]');
        if (!a) return;
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        history.pushState(null, '', '#' + id);
        revealTarget(id, true);
    });
    window.addEventListener('hashchange', () => revealTarget(location.hash.slice(1), false));
    if (location.hash) revealTarget(location.hash.slice(1), false);

    // Show all notes and outlines when printing
    window.addEventListener('beforeprint', () => {
        document.querySelectorAll('details').forEach(d => { d.dataset.wasOpen = d.open; d.open = true; });
    });
    window.addEventListener('afterprint', () => {
        document.querySelectorAll('details').forEach(d => { d.open = d.dataset.wasOpen === 'true'; });
    });
});
