/* SOLO Taxonomy activity — random topic draw and example modal */
(function () {
	'use strict';

	var topics = window.SOLO_TOPICS || [];
	var LEVELS = ['Prestructural', 'Unistructural', 'Multistructural', 'Relational', 'Extended Abstract'];

	var drawBtn = document.getElementById('draw-btn');
	var card = document.getElementById('topic-card');
	var status = document.getElementById('deck-status');
	var imgEl = document.getElementById('topic-img');
	var creditEl = document.getElementById('topic-credit');
	var ctxEl = document.getElementById('topic-context');
	var numEl = document.getElementById('topic-num');
	var titleEl = document.getElementById('topic-title');
	var revealBtn = document.getElementById('reveal-btn');
	var againBtn = document.getElementById('again-btn');
	var modal = document.getElementById('example-modal');
	var modalTitle = document.getElementById('modal-title');
	var modalContext = document.getElementById('modal-context');
	var modalRows = document.getElementById('modal-rows');
	var lastTrigger = null;

	if (!drawBtn || !topics.length) return;

	// A shuffled deck so every topic comes up once before any repeats.
	var deck = [], drawn = 0, current = null;
	function shuffle() {
		deck = topics.map(function (_, i) { return i; });
		for (var i = deck.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var t = deck[i]; deck[i] = deck[j]; deck[j] = t;
		}
		// Avoid repeating the topic just shown when a new round starts.
		if (current !== null && deck[deck.length - 1] === current && deck.length > 1) {
			var k = deck.pop(); deck.unshift(k);
		}
		drawn = 0;
	}
	shuffle();

	function esc(s) {
		return String(s).replace(/[&<>"']/g, function (c) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
		});
	}

	function draw() {
		if (!deck.length) shuffle();
		current = deck.pop();
		drawn++;
		var t = topics[current];

		imgEl.src = 'images/topics/' + t.img.file;
		imgEl.alt = t.img.alt;
		creditEl.innerHTML = 'Image: <a href="' + esc(t.img.page) + '" target="_blank" rel="noopener">' + esc(t.img.user) + '<span class="visually-hidden"> (opens in a new tab)</span></a> / Pixabay';
		ctxEl.textContent = t.context;
		numEl.textContent = 'Example ' + t.n + ' of ' + topics.length;
		titleEl.textContent = t.topic;

		card.hidden = false;
		card.classList.remove('is-new');
		void card.offsetWidth; // restart animation
		card.classList.add('is-new');

		drawBtn.innerHTML = '<span class="icon solid fa-random" aria-hidden="true"></span>Draw a different topic';
		var left = deck.length;
		status.textContent = left
			? 'You have drawn ' + drawn + ' of ' + topics.length + ' topics this round. No topic repeats until all have been drawn.'
			: 'That was the last topic in this round — the next draw reshuffles all ' + topics.length + '.';

		titleEl.focus();
	}

	function openModal(e) {
		if (current === null) return;
		lastTrigger = e && e.currentTarget ? e.currentTarget : revealBtn;
		var t = topics[current];
		modalTitle.textContent = t.topic;
		modalContext.textContent = t.context + ' · Example ' + t.n;
		modalRows.innerHTML = LEVELS.map(function (lv) {
			return '<tr><th scope="row">' + lv + '</th><td>' + esc(t.levels[lv] || '') + '</td></tr>';
		}).join('');
		if (typeof modal.showModal === 'function') {
			modal.showModal();
		} else {
			modal.setAttribute('open', '');
		}
		document.body.classList.add('modal-open');
		var inner = modal.querySelector('.modal-inner');
		if (inner) inner.scrollTop = 0;
		modal.scrollTop = 0;
		modal.querySelector('.modal-x').focus();
	}

	function closeModal() {
		if (typeof modal.close === 'function' && modal.open) modal.close();
		else modal.removeAttribute('open');
	}

	modal.addEventListener('close', function () {
		document.body.classList.remove('modal-open');
		if (lastTrigger) lastTrigger.focus();
	});
	// Click on the backdrop closes the dialog.
	modal.addEventListener('click', function (e) {
		if (e.target === modal) closeModal();
	});
	Array.prototype.forEach.call(modal.querySelectorAll('[data-close]'), function (b) {
		b.addEventListener('click', closeModal);
	});
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && modal.hasAttribute('open') && typeof modal.showModal !== 'function') closeModal();
	});

	drawBtn.addEventListener('click', draw);
	againBtn.addEventListener('click', function () { draw(); });
	revealBtn.addEventListener('click', openModal);
})();
