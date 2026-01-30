// 🔄 REDIRECT TO FIRST PAGE ON REFRESH
// Check if this is a page refresh (not first visit from index)
if (performance.navigation.type === 1 || (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]?.type === "reload")) {
    window.location.href = "index.html";
}

// Also redirect on page show (back/forward navigation)
window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.href = "index.html";
    }
};

// 💌 LETTER CONTENT (WITH FORMATTING)
const letterContent = `Dear Sona,

I know we’ve had our share of misunderstandings and silence, but my feelings for you never really left. With time, I’ve realized that what we had was real and worth fighting for.
I’m not here to repeat the past—I want to build something better, together.
If your heart still has space for me, I’d love to start again… slowly, honestly, and with love.

Forever yours Radu,
❤️

Will you be mine?`;

// ELEMENTS
const btnLetter = document.getElementById("btn__letter");
const boxLetter = document.querySelector(".box__letter");
const letterBorder = document.querySelector(".letter__border");
const textLetter = document.querySelector(".text__letter p");
const titleLetter = document.querySelector(".title__letter");
const closeBtn = document.querySelector(".close");

let index = 0;
let typingInterval;

// 🖋️ TYPEWRITER FUNCTION
function startTyping() {
    textLetter.innerHTML = "";
    index = 0;

    typingInterval = setInterval(() => {
        if (index < letterContent.length) {
            const char = letterContent[index];

            if (char === "\n") {
                textLetter.innerHTML += "<br>";
            } else {
                textLetter.innerHTML += char;
            }

            index++;
        } else {
            clearInterval(typingInterval);
            // Add confetti celebration at the end!
            createConfetti();
        }
    }, 30);
}

// 🎉 CONFETTI CELEBRATION
function createConfetti() {
    const colors = ['#FF1493', '#FFD700', '#FF6B9D', '#FF85B3', '#FFC0CB', '#FFE55C'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${5 + Math.random() * 10}px;
                height: ${5 + Math.random() * 10}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -20px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                pointer-events: none;
                z-index: 10000;
                animation: confettiFall ${3 + Math.random() * 2}s linear forwards;
            `;
            document.body.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// Add confetti animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 💌 OPEN LETTER
let letterOpen = false;
let gifsAnimated = false;

btnLetter.addEventListener("click", () => {
    if (letterOpen) return; // Prevent double opening
    letterOpen = true;
    gifsAnimated = false; // Reset for new opening

    boxLetter.style.display = "block";

    setTimeout(() => {
        letterBorder.style.display = "block";
    }, 600);

    // TITLE TYPE
    titleLetter.innerHTML = "To You 💌";

    // HEART + GIF ANIMATIONS (only once)
    setTimeout(() => {
        if (!gifsAnimated) {
            gifsAnimated = true;
            document.getElementById("heart__letter")?.classList.add("animationOp");
            document.querySelectorAll(".left-gif")?.forEach(img =>
                img.classList.add("animationOp")
            );
        }
    }, 1200);

    // START TYPING
    setTimeout(startTyping, 2500);
});

// ❌ CLOSE LETTER
closeBtn.addEventListener("click", () => {
    clearInterval(typingInterval);

    textLetter.innerHTML = "";
    titleLetter.innerHTML = "";

    document.getElementById("heart__letter")?.classList.remove("animationOp");
    document.querySelectorAll(".left-gif")?.forEach(img =>
        img.classList.remove("animationOp")
    );

    letterBorder.style.display = "none";
    boxLetter.style.display = "none";

    letterOpen = false; // Allow opening again
});

// 🔄 RESET FUNCTION
function resetLetterState() {
    clearInterval(typingInterval);

    if (textLetter) textLetter.innerHTML = "";
    if (titleLetter) titleLetter.innerHTML = "";

    document.getElementById("heart__letter")?.classList.remove("animationOp");
    document.querySelectorAll(".left-gif")?.forEach(img =>
        img.classList.remove("animationOp")
    );

    if (letterBorder) letterBorder.style.display = "none";
    if (boxLetter) boxLetter.style.display = "none";

    letterOpen = false;
    gifsAnimated = false;
    index = 0;
}
