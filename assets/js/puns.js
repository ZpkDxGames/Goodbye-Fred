const puns = [
    {
        setup: "Por que o filósofo não trocou a lâmpada?",
        punchline: "Porque ele preferiu refletir sobre a escuridão! 🕯️"
    },
    {
        setup: "O que Descartes disse ao garçom?",
        punchline: "Penso, logo peço! 🍺"
    },
    {
        setup: "Por que Marx não usa iPhone?",
        punchline: "Porque ele luta contra o capital! 📱"
    },
    {
        setup: "Qual é o filósofo que adora comer?",
        punchline: "O Platão! 🍽️"
    },
    {
        setup: "O que Sócrates disse quando perdeu os óculos?",
        punchline: "Só sei que nada vejo! 👓"
    },
    {
        setup: "Por que Durkheim adora festas?",
        punchline: "Por causa da efervescência coletiva! 🎉"
    },
    {
        setup: "O que Weber disse sobre a fila do banco?",
        punchline: "Isso é o auge da burocracia! 🏢"
    },
    {
        setup: "Por que o sociólogo terminou o namoro?",
        punchline: "Incompatibilidade de habitus! 💔"
    },
    {
        setup: "O que Nietzsche disse para a montanha?",
        punchline: "O que não me mata me fortalece! 🏔️"
    },
    {
        setup: "Como o sociólogo pede alguém em casamento?",
        punchline: "Vamos institucionalizar nossa relação? 💍"
    }
];

let currentPunIndex = -1;
const cardContainer = document.getElementById('pun-card-container');
const nextBtn = document.getElementById('next-pun-btn');

function getRandomPun() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * puns.length);
    } while (newIndex === currentPunIndex && puns.length > 1);
    
    currentPunIndex = newIndex;
    return puns[currentPunIndex];
}

function createCard(pun) {
    const card = document.createElement('div');
    card.className = 'pun-display-card';
    
    card.innerHTML = `
        <div class="pun-inner">
            <div class="pun-front">
                <div class="pun-icon">🤔</div>
                <p class="pun-text">${pun.setup}</p>
                <span class="tap-hint">Toque para ver a resposta</span>
            </div>
            <div class="pun-back">
                <div class="pun-icon">😂</div>
                <p class="pun-text">${pun.punchline}</p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
            triggerConfetti(card);
        }
    });

    return card;
}

function showNextPun() {
    // Disable button temporarily
    nextBtn.disabled = true;
    
    const oldCard = cardContainer.querySelector('.pun-display-card');
    const newPun = getRandomPun();
    const newCard = createCard(newPun);

    // Prepare new card (start off-screen right)
    newCard.classList.add('entering');
    cardContainer.appendChild(newCard);

    // Animate old card out (to left)
    if (oldCard) {
        oldCard.classList.add('exiting');
        setTimeout(() => {
            oldCard.remove();
        }, 500); // Match CSS transition
    }

    // Animate new card in
    requestAnimationFrame(() => {
        newCard.classList.remove('entering');
    });

    setTimeout(() => {
        nextBtn.disabled = false;
    }, 500);
}

function triggerConfetti(element) {
    // Simple emoji burst effect
    const rect = element.getBoundingClientRect();
    const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };

    for (let i = 0; i < 10; i++) {
        createEmojiParticle(center.x, center.y);
    }
}

function createEmojiParticle(x, y) {
    const emojis = ['😂', '🤣', '😹', '💀', '✨'];
    const particle = document.createElement('div');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.className = 'emoji-particle';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showNextPun();
    nextBtn.addEventListener('click', showNextPun);
});
