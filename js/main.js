// 🔄 REDIRECT TO INDEX ON REFRESH (for how-dare-you page)
(function () {
    const isHowDarePage = window.location.pathname.includes('how-dare-you');

    if (isHowDarePage) {
        // Check if this is a page refresh
        const navEntries = performance.getEntriesByType && performance.getEntriesByType("navigation");
        const isReload = performance.navigation?.type === 1 || (navEntries && navEntries[0]?.type === "reload");

        if (isReload) {
            window.location.href = "index.html";
            return;
        }
    }
})();

// Handle back/forward navigation - redirect to index
window.onpageshow = function (event) {
    if (event.persisted) {
        const isIndexPage = window.location.pathname.includes('index') || window.location.pathname.endsWith('/');
        if (!isIndexPage) {
            window.location.href = "index.html";
        }
    }
};

// 🔄 RESET PAGE ON LOAD
window.onload = function () {
    window.scrollTo(0, 0);
};

// Navigation Functions
function goToLetter() {
    window.location.href = 'letter.html';
}

function goToDare() {
    window.location.href = 'how-dare-you.html';
}

// Envelope Click Handler
document.addEventListener('DOMContentLoaded', function () {
    const envelope = document.getElementById('envelope');

    if (envelope) {
        envelope.addEventListener('click', function () {
            if (!this.classList.contains('open')) {
                this.classList.add('opening');
                this.classList.add('open');

                setTimeout(function () {
                    const letterContent = document.getElementById('letterContent');
                    if (letterContent) {
                        letterContent.classList.remove('hidden');
                        letterContent.classList.add('show');
                        startTypeWriter();
                    }
                }, 600);
            }
        });
    }
});
