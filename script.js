// Practice texts organized by difficulty
const practiceTexts = {
    easy: [
        "The ghost whispers softly.",
        "Mist floats through ancient halls.",
        "Secrets sleep in forgotten tombs.",
        "Time stands still in the void.",
        "Spirits dance among the stars."
    ],
    medium: [
        "The ancient spirits whisper through the misty veil of forgotten realms.",
        "Green particles drift silently through the cosmic void of endless night.",
        "Typing fast requires focus and the ability to maintain steady rhythm.",
        "Haunted by memories but driven by dreams the ghosts watch over us all.",
        "Every keystroke echoes through the digital realm creating waves of change."
    ],
    hard: [
        "The ancient spirits whisper through the misty veil of forgotten realms where time stands still and secrets sleep in eternal slumber beneath the stars.",
        "In the depths of cosmic space green particles drift silently illuminating the void with their ethereal glow carrying whispers of civilizations long lost to time.",
        "Typing fast and accurately requires consistent practice focused attention and the ability to maintain rhythm while avoiding mistakes that slow your progress dramatically.",
        "Haunted by the echoes of the past but driven by visions of the future the spectral guardians watch over the threshold where technology and mysticism intertwine eternally.",
        "Every keystroke resonates through the digital void creating ripples that shape the fabric of code and imagination beyond the boundaries of ordinary perception."
    ]
};

// DOM elements
const container = document.querySelector(".spooky-container");
const textDisplay = document.getElementById('textDisplay');
const typingInput = document.getElementById('typingInput');
const fontSelector = document.getElementById('fontSelector');
const difficultySelector = document.getElementById('difficultySelector');
const newTextBtn = document.getElementById('newTextBtn');

// App state
let currentText = '';
let currentFont = 'cinzel';
let currentDifficulty = 'medium';

// Initialize the app
function init() {
    // Generate green particles
    generateParticles();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial text
    loadNewText();
    
    // Focus typing input
    typingInput.focus();
}

// Generate green space particles
function generateParticles() {
    const greenColor = "#00ff88";
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        particle.style.top = Math.random() * 100 + "%";
        particle.style.left = Math.random() * 100 + "%";

        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.backgroundColor = greenColor;
        particle.style.boxShadow = `0 0 6px ${greenColor}, 0 0 12px ${greenColor}`;

        const duration = 8 + Math.random() * 17;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * -25}s`;

        container.appendChild(particle);
    }
}

// Set up event listeners
function setupEventListeners() {
    typingInput.addEventListener('input', handleTyping);
    typingInput.addEventListener('keydown', handleKeyDown);
    fontSelector.addEventListener('change', handleFontChange);
    difficultySelector.addEventListener('change', handleDifficultyChange);
    newTextBtn.addEventListener('click', loadNewText);
    
    // Focus typing input when clicking outside controls
    document.addEventListener('click', (e) => {
        // Don't focus if clicking on controls
        if (!e.target.closest('.controls-panel') && !e.target.closest('.new-text-btn')) {
            typingInput.focus();
        }
    });
}

// Load a new random text based on selected difficulty
function loadNewText() {
    const texts = practiceTexts[currentDifficulty];
    currentText = texts[Math.floor(Math.random() * texts.length)];
    
    // Update display
    setupTextDisplay();
    typingInput.value = '';
}

// Set up text display with character spans
function setupTextDisplay() {
    textDisplay.innerHTML = '';
    textDisplay.className = `text-area ${currentFont}`;
    
    currentText.split('').forEach((char, index) => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char === ' ' ? '\u00A0' : char;
        charSpan.dataset.index = index;
        if (index === 0) charSpan.classList.add('current');
        textDisplay.appendChild(charSpan);
    });
}

// Handle typing input
function handleTyping() {
    const inputText = typingInput.value;
    updateTextDisplay(inputText);
    
    // Auto-advance when text is completed
    if (inputText.length === currentText.length) {
        setTimeout(() => {
            loadNewText();
            typingInput.focus();
        }, 1000);
    }
}

// Handle key events
function handleKeyDown(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
    }
    
    if (e.key === 'Escape') {
        typingInput.value = '';
        setupTextDisplay();
        typingInput.focus();
    }
}

// Handle font change
function handleFontChange() {
    currentFont = fontSelector.value;
    setupTextDisplay();
}

// Handle difficulty change
function handleDifficultyChange() {
    currentDifficulty = difficultySelector.value;
    loadNewText();
}

// Update text display with real-time feedback
function updateTextDisplay(inputText) {
    const chars = textDisplay.querySelectorAll('span');
    
    chars.forEach((charSpan, index) => {
        charSpan.className = '';
        
        if (index < inputText.length) {
            if (inputText[index] === currentText[index]) {
                charSpan.classList.add('correct');
            } else {
                charSpan.classList.add('incorrect');
            }
        }
        
        if (index === inputText.length) {
            charSpan.classList.add('current');
        }
    });
}

// Initialize when page loads
window.addEventListener('load', init);