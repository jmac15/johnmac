// Keep the footer year current without needing a rebuild each January.
var yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Subtle pointer-driven parallax on the aurora glow.
// Only runs for users with a precise pointer (i.e. not touch) and who
// haven't asked for reduced motion.
(function () {
  var aurora = document.querySelector('.aurora');
  if (!aurora) return;

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  var hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (!hasFinePointer || prefersReducedMotion) return;

  var ticking = false;
  var maxOffset = 16; // px

  window.addEventListener('pointermove', function (event) {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(function () {
      var xRatio = event.clientX / window.innerWidth - 0.5;
      var yRatio = event.clientY / window.innerHeight - 0.5;

      aurora.style.setProperty('--parallax-x', xRatio * maxOffset * 2 + 'px');
      aurora.style.setProperty('--parallax-y', yRatio * maxOffset * 2 + 'px');

      ticking = false;
    });
  });
})();
