document.addEventListener("DOMContentLoaded", () => {
    // --------------------------
    // Personality Archetypes
    // --------------------------
    const ARCHETYPES = {
        Explorer: {
            desc: "You live for new experiences and thrive on spontaneity. Adventure fuels your soul.",
            score: 0
        },
        Analyst: {
            desc: "You love solving puzzles and approaching life with logical precision.",
            score: 0
        },
        Helper: {
            desc: "Empathy is your superpower. You find joy in supporting and uplifting others.",
            score: 0
        },
        Leader: {
            desc: "You’re decisive, confident, and naturally motivate those around you.",
            score: 0
        }
    };

    // --------------------------
    // Quiz Questions
    // --------------------------
    const quizQuestions = [
        {
            q: "What does your ideal Saturday look like?",
            options: [
                { text: "Trying a brand-new outdoor activity", scores: { Explorer: 2, Leader: 1 } },
                { text: "Curling up with a brain-teasing book", scores: { Analyst: 2 } },
                { text: "Volunteering at a community event", scores: { Helper: 2, Leader: 1 } },
                { text: "Organizing a group trip and leading the way", scores: { Leader: 2, Explorer: 1 } }
            ]
        },
        {
            q: "In a group project, you tend to…",
            options: [
                { text: "Generate fresh ideas and keep energy high", scores: { Explorer: 2 } },
                { text: "Create the plan, timeline, and spreadsheet", scores: { Analyst: 2, Leader: 1 } },
                { text: "Make sure everyone feels heard and supported", scores: { Helper: 2 } },
                { text: "Take charge and delegate tasks", scores: { Leader: 2 } }
            ]
        },
        {
            q: "Which activity sounds most appealing?",
            options: [
                { text: "Backpacking somewhere you’ve never been", scores: { Explorer: 2 } },
                { text: "Playing a strategy board game", scores: { Analyst: 2 } },
                { text: "Hosting a dinner for friends", scores: { Helper: 2 } },
                { text: "Pitching a new venture to investors", scores: { Leader: 2 } }
            ]
        },
        {
            q: "Your friends describe you as…",
            options: [
                { text: "Adventurous", scores: { Explorer: 2 } },
                { text: "Analytical", scores: { Analyst: 2 } },
                { text: "Warm-hearted", scores: { Helper: 2 } },
                { text: "Confident", scores: { Leader: 2 } }
            ]
        },
        {
            q: "At a fork in the road, you…",
            options: [
                { text: "Pick the path less traveled", scores: { Explorer: 2 } },
                { text: "Study the map carefully", scores: { Analyst: 2 } },
                { text: "Ask companions which route feels best", scores: { Helper: 2 } },
                { text: "Decide quickly and start moving", scores: { Leader: 2 } }
            ]
        },
        {
            q: "Which quote resonates with you most?",
            options: [
                { text: "“Life is either a daring adventure or nothing.” – Helen Keller", scores: { Explorer: 2 } },
                { text: "“Knowledge is power.” – Francis Bacon", scores: { Analyst: 2 } },
                { text: "“We rise by lifting others.” – Robert G. Ingersoll", scores: { Helper: 2 } },
                { text: "“Leadership is influence.” – John C. Maxwell", scores: { Leader: 2 } }
            ]
        },
        {
            q: "You’re faced with an unexpected problem. First you…",
            options: [
                { text: "Experiment to see what might work", scores: { Explorer: 2 } },
                { text: "Break it down logically", scores: { Analyst: 2 } },
                { text: "Ask who’s affected and how to help", scores: { Helper: 2 } },
                { text: "Take charge and rally resources", scores: { Leader: 2 } }
            ]
        },
        {
            q: "Your dream vacation involves…",
            options: [
                { text: "A one-way ticket with no set plan", scores: { Explorer: 2 } },
                { text: "A museum tour through ancient cities", scores: { Analyst: 2 } },
                { text: "Volunteering on a meaningful project", scores: { Helper: 2 } },
                { text: "Luxury, networking, and big opportunities", scores: { Leader: 2 } }
            ]
        }
    ];

    // --------------------------
    // DOM Elements
    // --------------------------
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const shareBtn = document.getElementById("share-btn");
    const quizScreen = document.getElementById("quiz-screen");
    const resultScreen = document.getElementById("result-screen");
    const startScreen = document.getElementById("start-screen");
    const questionText = document.getElementById("question-text");
    const optionsList = document.getElementById("options");
    const progressEl = document.getElementById("progress");
    const archetypeNameEl = document.getElementById("archetype-name");
    const archetypeDescEl = document.getElementById("archetype-desc");
    const shareConfirmEl = document.getElementById("share-confirm");

    let currentQuestion = 0;
    let selectedOption = null;

    // --------------------------
    // Event Listeners
    // --------------------------
    startBtn.addEventListener("click", () => {
        startScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");
        loadQuestion();
    });

    nextBtn.addEventListener("click", () => {
        if (selectedOption === null) return;

        // Apply scores
        const scores = quizQuestions[currentQuestion].options[selectedOption].scores;
        for (const [type, value] of Object.entries(scores)) {
            ARCHETYPES[type].score += value;
        }

        currentQuestion++;
        selectedOption = null;

        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    });

    optionsList.addEventListener("click", (e) => {
        if (!e.target || !e.target.matches("li")) return;
        const index = Array.from(optionsList.children).indexOf(e.target);
        selectedOption = index;

        // Highlight selection
        Array.from(optionsList.children).forEach(li => li.classList.remove("selected"));
        e.target.classList.add("selected");
        nextBtn.classList.remove("hidden");
    });

    restartBtn.addEventListener("click", () => {
        resetQuiz();
    });

    shareBtn.addEventListener("click", async () => {
        const url = window.location.href.split("#")[0];
        try {
            await navigator.clipboard.writeText(url + "?result=" + encodeURIComponent(archetypeNameEl.textContent));
            shareConfirmEl.classList.remove("hidden");
            setTimeout(() => shareConfirmEl.classList.add("hidden"), 2000);
        } catch (err) {
            alert("Copy failed. Please copy the URL manually.");
        }
    });

    // --------------------------
    // Functions
    // --------------------------
    function loadQuestion() {
        const qObj = quizQuestions[currentQuestion];
        questionText.textContent = qObj.q;
        progressEl.textContent = `Question ${currentQuestion + 1} / ${quizQuestions.length}`;

        optionsList.innerHTML = "";
        qObj.options.forEach(opt => {
            const li = document.createElement("li");
            li.textContent = opt.text;
            optionsList.appendChild(li);
        });

        nextBtn.classList.add("hidden");
    }

    function endQuiz() {
        quizScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");

        // Determine top archetype
        const top = Object.entries(ARCHETYPES).sort((a, b) => b[1].score - a[1].score)[0];
        archetypeNameEl.textContent = top[0];
        archetypeDescEl.textContent = top[1].desc;
    }

    function resetQuiz() {
        // Reset scores
        Object.values(ARCHETYPES).forEach(a => a.score = 0);
        currentQuestion = 0;
        selectedOption = null;
        resultScreen.classList.add("hidden");
        startScreen.classList.remove("hidden");
    }

    // Deep link to results (if any)
    window.addEventListener("load", () => {
        const params = new URLSearchParams(window.location.search);
        const result = params.get("result");
        if (result && ARCHETYPES[result]) {
            startScreen.classList.add("hidden");
            quizScreen.classList.add("hidden");
            resultScreen.classList.remove("hidden");
            archetypeNameEl.textContent = result;
            archetypeDescEl.textContent = ARCHETYPES[result].desc;
        }
    });
});

