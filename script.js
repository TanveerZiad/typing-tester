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

// Time limits for each difficulty (in seconds)
const timeLimits = {
    easy: 15,
    medium: 30,
    hard: 60
};

// DOM elements
const container = document.querySelector(".spooky-container");
const textDisplay = document.getElementById('textDisplay');
const typingInput = document.getElementById('typingInput');
const fontSelector = document.getElementById('fontSelector');
const difficultySelector = document.getElementById('difficultySelector');
const newTextBtn = document.getElementById('newTextBtn');
const wpmDisplay = document.querySelector('.wpm');
const accuracyDisplay = document.querySelector('.accuracy');
const timerDisplay = document.querySelector('.timer');

// App state
let currentText = '';
let currentFont = 'cinzel';
let currentDifficulty = 'medium';
let startTime = null;
let timer = null;
let elapsedTime = 0;
let timeLimit = timeLimits[currentDifficulty];
let isTyping = false;

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
        // Don't focus if clicking on controls or stats
        const clickOnControl = e.target.closest('.controls-panel') || 
                              e.target.closest('.new-text-btn') ||
                              e.target.closest('.stats-display');
        if (!clickOnControl) {
            typingInput.focus();
        }
    });
}

// Load a new random text based on selected difficulty
function loadNewText() {
    // Reset timer and stats
    resetTimer();
    updateStats(0, 100, 0);
    
    // Update difficulty and time limit
    currentDifficulty = difficultySelector.value;
    timeLimit = timeLimits[currentDifficulty];
    
    // Get random text
    const texts = practiceTexts[currentDifficulty];
    currentText = texts[Math.floor(Math.random() * texts.length)];
    
    // Update display
    setupTextDisplay();
    typingInput.value = '';
    isTyping = false;
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
    
    // Start timer on first keystroke
    if (!isTyping) {
        startTimer();
        isTyping = true;
    }
    
    updateTextDisplay(inputText);
    updateStatsFromInput(inputText);
    
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
        resetTimer();
        updateStats(0, 100, 0);
        isTyping = false;
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
    loadNewText();
}

// Start the countdown timer
function startTimer() {
    startTime = Date.now();
    elapsedTime = 0;
    
    // Clear any existing timer
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const remainingTime = timeLimit - elapsedTime;
        
        // Update timer display
        timerDisplay.textContent = `Time: ${remainingTime}s`;
        
        // Change color when time is running low
        if (remainingTime <= 5) {
            timerDisplay.style.color = '#ff6b6b';
            timerDisplay.style.textShadow = '0 0 8px rgba(255, 107, 107, 0.6)';
        } else {
            timerDisplay.style.color = 'rgba(64, 224, 208, 0.8)';
            timerDisplay.style.textShadow = '0 0 6px rgba(64, 224, 208, 0.4)';
        }
        
        // Time's up!
        if (elapsedTime >= timeLimit) {
            finishTest();
        }
    }, 1000);
}

// Reset timer
function resetTimer() {
    if (timer) clearInterval(timer);
    timer = null;
    startTime = null;
    elapsedTime = 0;
    timerDisplay.textContent = 'Time: 0s';
    timerDisplay.style.color = 'rgba(64, 224, 208, 0.8)';
    timerDisplay.style.textShadow = '0 0 6px rgba(64, 224, 208, 0.4)';
}

// Finish the test when time runs out
function finishTest() {
    clearInterval(timer);
    typingInput.disabled = true;
    
    setTimeout(() => {
        if (confirm('Time\'s up! Want to try again?')) {
            typingInput.disabled = false;
            loadNewText();
            typingInput.focus();
        } else {
            typingInput.disabled = false;
            loadNewText();
            typingInput.focus();
        }
    }, 500);
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

// Update stats based on current input
function updateStatsFromInput(inputText) {
    if (!isTyping) return;
    
    // Calculate WPM (words per minute)
    const wordsTyped = inputText.length / 5; // Standard: 5 chars = 1 word
    const minutesElapsed = elapsedTime / 60;
    const wpm = minutesElapsed > 0 ? Math.round(wordsTyped / minutesElapsed) : 0;
    
    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] === currentText[i]) {
            correctChars++;
        }
    }
    const accuracy = inputText.length > 0 ? Math.round((correctChars / inputText.length) * 100) : 100;
    
    // Update displays
    updateStats(wpm, accuracy, timeLimit - elapsedTime);
}

// Update stats display
function updateStats(wpm, accuracy, remainingTime) {
    wpmDisplay.textContent = `WPM: ${wpm}`;
    accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
    timerDisplay.textContent = `Time: ${remainingTime}s`;
}

// Initialize when page loads
window.addEventListener('load', init);