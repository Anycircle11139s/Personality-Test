document.addEventListener("DOMContentLoaded", () => {
    const ARCHETYPES = {
        Explorer: {
            desc: "You love new experiences and thrive on adventure and curiosity.",
            score: 0
        },
        Analyst: {
            desc: "You enjoy logic, strategy, and understanding complex systems.",
            score: 0
        },
        Helper: {
            desc: "You find fulfillment in supporting and caring for others.",
            score: 0
        },
        Leader: {
            desc: "You naturally inspire and motivate those around you.",
            score: 0
        },
        Creator: {
            desc: "You express yourself through innovation and artistic endeavors.",
            score: 0
        },
        Harmonizer: {
            desc: "You seek balance and understanding among people and ideas.",
            score: 0
        }
    };

    const quizQuestions = [
        {
            q: "When faced with a new challenge, you usually...",
            options: [
                { text: "Jump right in and learn by doing", scores: { Explorer: 2 } },
                { text: "Analyze all possible outcomes first", scores: { Analyst: 2 } },
                { text: "Consider how it affects everyone involved", scores: { Helper: 2, Harmonizer: 1 } },
                { text: "Take charge and set a plan in motion", scores: { Leader: 2 } },
                { text: "Find a creative way to approach the problem", scores: { Creator: 2 } }
            ]
        },
        {
            q: "Your ideal weekend involves...",
            options: [
                { text: "Exploring a new place or activity", scores: { Explorer: 2 } },
                { text: "Diving into a complex book or puzzle", scores: { Analyst: 2 } },
                { text: "Spending quality time helping friends or family", scores: { Helper: 2 } },
                { text: "Organizing a group event or meetup", scores: { Leader: 2 } },
                { text: "Creating art, music, or writing", scores: { Creator: 2 } }
            ]
        },
        {
            q: "In group discussions, you tend to...",
            options: [
                { text: "Suggest bold new ideas", scores: { Explorer: 2, Creator: 1 } },
                { text: "Focus on facts and logic", scores: { Analyst: 2 } },
                { text: "Make sure everyone feels heard", scores: { Helper: 2, Harmonizer: 1 } },
                { text: "Guide the group toward decisions", scores: { Leader: 2 } },
                { text: "Inspire others with original thinking", scores: { Creator: 2 } }
            ]
        },
        {
            q: "Which of these values resonates most with you?",
            options: [
                { text: "Freedom and adventure", scores: { Explorer: 2 } },
                { text: "Knowledge and insight", scores: { Analyst: 2 } },
                { text: "Compassion and empathy", scores: { Helper: 2 } },
                { text: "Responsibility and influence", scores: { Leader: 2 } },
                { text: "Creativity and expression", scores: { Creator: 2 } },
                { text: "Harmony and understanding", scores: { Harmonizer: 2 } }
            ]
        },
        {
            q: "When working on a project, you prefer to...",
            options: [
                { text: "Try new methods and experiment", scores: { Explorer: 2 } },
                { text: "Plan carefully and use data", scores: { Analyst: 2 } },
                { text: "Support the team and maintain morale", scores: { Helper: 2 } },
                { text: "Lead and coordinate efforts", scores: { Leader: 2 } },
                { text: "Bring fresh, creative ideas", scores: { Creator: 2 } },
                { text: "Ensure everyone collaborates smoothly", scores: { Harmonizer: 2 } }
            ]
        },
        {
            q: "Your friends would describe you as...",
            options: [
                { text: "Adventurous and curious", scores: { Explorer: 2 } },
                { text: "Logical and thoughtful", scores: { Analyst: 2 } },
                { text: "Kind and dependable", scores: { Helper: 2 } },
                { text: "Confident and inspiring", scores: { Leader: 2 } },
                { text: "Imaginative and expressive", scores: { Creator: 2 } },
                { text: "Calm and diplomatic", scores: { Harmonizer: 2 } }
            ]
        },
        {
            q: "When you need to recharge, you...",
            options: [
                { text: "Go on an adventure or try something new", scores: { Explorer: 2 } },
                { text: "Read, research, or reflect", scores: { Analyst: 2 } },
                { text: "Connect with close friends or family", scores: { Helper: 2 } },
                { text: "Take time to organize your thoughts and goals", scores: { Leader: 2 } },
                { text: "Engage in a creative hobby", scores: { Creator: 2 } },
                { text: "Spend quiet time in nature or meditation", scores: { Harmonizer: 2 } }
            ]
        },
        {
            q: "How do you handle conflict?",
            options: [
                { text: "Look for new solutions and options", scores: { Explorer: 2 } },
                { text: "Analyze the root cause logically", scores: { Analyst: 2 } },
                { text: "Empathize and seek compromise", scores: { Helper: 2, Harmonizer: 1 } },
                { text: "Take charge to resolve it quickly", scores: { Leader: 2 } },
                { text: "Express feelings through creativity", scores: { Creator: 2 } }
            ]
        },
        {
            q: "Your dream job would be...",
            options: [
                { text: "Travel blogger or explorer", scores: { Explorer: 2 } },
                { text: "Scientist or researcher", scores: { Analyst: 2 } },
                { text: "Counselor or nurse", scores: { Helper: 2 } },
                { text: "Manager or entrepreneur", scores: { Leader: 2 } },
                { text: "Artist or designer", scores: { Creator: 2 } },
                { text: "Mediator or community organizer", scores: { Harmonizer: 2 } }
            ]
        },
        {
            q: "What motivates you most?",
            options: [
                { text: "Discovering new horizons", scores: { Explorer: 2 } },
                { text: "Solving problems and puzzles", scores: { Analyst: 2 } },
                { text: "Helping others and making a difference", scores: { Helper: 2 } },
                { text: "Leading and inspiring others", scores: { Leader: 2 } },
                { text: "Creating and innovating", scores: { Creator: 2 } },
                { text: "Building peace and harmony", scores: { Harmonizer: 2 } }
            ]
        },
        {
            q: "You value communication that is...",
            options: [
                { text: "Open and adventurous", scores: { Explorer: 2 } },
                { text: "Clear and logical", scores: { Analyst: 2 } },
                { text: "Warm and supportive", scores: { Helper: 2 } },
                { text: "Direct and confident", scores: { Leader: 2 } },
                { text: "Expressive and imaginative", scores: { Creator: 2 } },
                { text: "Respectful and balanced", scores: { Harmonizer: 2 } }
            ]
        },
        {
            q: "When working in teams, you often...",
            options: [
                { text: "Encourage trying new things", scores: { Explorer: 2 } },
                { text: "Focus on details and quality", scores: { Analyst: 2 } },
                { text: "Support teammates emotionally", scores: { Helper: 2 } },
                { text: "Coordinate and lead efforts", scores: { Leader: 2 } },
                { text: "Bring creative ideas forward", scores: { Creator: 2 } },
                { text: "Mediate conflicts and build consensus", scores: { Harmonizer: 2 } }
            ]
        },
        {
            q: "Which environment do you thrive in?",
            options: [
                { text: "Dynamic and unpredictable", scores: { Explorer: 2 } },
                { text: "Structured and orderly", scores: { Analyst: 2 } },
                { text: "Caring and collaborative", scores: { Helper: 2 } },
                { text: "Fast-paced and goal-oriented", scores: { Leader: 2 } },
                { text: "Expressive and inspiring", scores: { Creator: 2 } },
                { text: "Peaceful and harmonious", scores: { Harmonizer: 2 } }
            ]
        }
    ];

    // DOM elements
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

    startBtn.addEventListener("click", () => {
        startScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");
        loadQuestion();
    });

    nextBtn.addEventListener("click", () => {
        if (selectedOption === null) return;

        const scores = quizQuestions[currentQuestion].options[selectedOption].scores;
        for (const [type, val] of Obj


