let userName = prompt("Welcome aboard cadet!  Score points to advance. Can you become Fire Chief? Let's get started. What is your name?")

// Define level data with score requirements
const levels = [
    { name: "Cadet", scoreRequirement: 0 },
    { name: "Rookie", scoreRequirement: 10 },
    { name: "Firefighter", scoreRequirement: 20 },
    { name: "Lieutenant", scoreRequirement: 30 },
    { name: "Captain", scoreRequirement: 40 },
    { name: "Fire Chief", scoreRequirement: 50 },
];

// Define a list of random Korean names
const koreanNames = [
    "김철수", "이영희", "박민지", "정승호", "한지민", "송재영", "윤영석", "임지수", "최승우", "강현우", "Roy Bragg", "Jason Gatts", "Chad Miller",
];

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const scoreDisplay = document.getElementById("score");
const accumulatedScoreDisplay = document.getElementById("accumulated-score");
const resetButton = document.getElementById("reset-button");
const leaderboard = document.getElementById("leaderboard");
const ticker = document.getElementById("ticker");
const trophiesContainer = document.getElementById("trophies");
const levelDisplay = document.getElementById("level");

let currentQuestion = 0;
let score = 0;
let accumulatedScore = 0; // Initialize accumulated score

// Sample quiz data
const quizData = [
    {
        question: "What should you do in case of a small kitchen fire?",
        options: ["Use water to extinguish it", "Use a fire extinguisher", "Run away"],
        correct: 1,
    },
    {
        question: "What does 'Stop, Drop, and Roll' refer to?",
        options: ["A dance move", "A fire safety technique", "A cooking method"],
        correct: 1,
    },
    {
        question: "What is the number to call for emergencies in the USA?",
        options: ["911", "999", "112"],
        correct: 0,
    },
    {
    		question: "What does the acronym 'PASS' stand for in fire extinguisher operation?",
        options: ["Pull, Aim, Squeeze, Sweep", "Push, Activate, Squeeze, Secure", "Pull, Activate, Shoot, Stop"],
        correct: 0,
    },
    {
    		question: "What type of fire is Class C, as classified by fire extinguishers?",
        options: ["Wood and paper fires", "Electrical fires", "Grease fires"],
        correct: 1,
    },
    {
    		question: "In fire safety, what does the term 'flashover' refer to?",
        options: ["The rapid spread of fire through a building", "A sudden burst of flames from a fuel source", "A controlled burn for training purposes"],
        correct: 0,
    },
    {
    		question: "What is the primary function of a fire sprinkler system in a building?",
        options: ["To detect fires and sound alarms", "To suppress or control fires automatically", "To provide emergency lighting during fires"],
        correct: 1,
    },
    {
    		question: "Which type of fire extinguisher is typically used for flammable liquid fires, such as gasoline or oil?",
        options: ["Class A", "Class B", "Class C"],
        correct: 1,
    },
    {
    		question: "What is the term for the practice of creating a firebreak by removing vegetation or other flammable materials to prevent the spread of wildfires?",
        options: ["Controlled burn", "Deforestation", "Firebreak"],
        correct: 2,
    },
    {
    		question: "Which gas is commonly released by fire extinguishers to suppress fires and displace oxygen?",
        options: ["Carbon dioxide (CO2)", "Nitrogen (N2)", "Hydrogen (H2)"],
        correct: 0,
    },
    {
    		question: "What is the purpose of a fire evacuation plan in a workplace or building?",
        options: ["To identify fire hazards", "To designate the location of fire exits", "To ensure the safe evacuation of occupants during a fire emergency"],
        correct: 2,
    },
    {
    		question: "What is the recommended method for testing smoke detectors in your home?",
        options: ["Spray them with water", "Use a lit match near the detector", "Press the test button regularly"],
        correct: 2,
    },
    {
    		question: "What is the role of a fire safety officer in an organization or community?",
        options: ["To start fires for training purposes", "To oversee fire prevention measures", "To extinguish fires in hazardous areas"],
        correct: 1,
    },
    // Add more questions and answers as needed
];

// Function to generate a random name and score for the leaderboard
function generateRandomLeaderboardData(userScore) {
    const randomName = koreanNames[Math.floor(Math.random() * koreanNames.length)];
    const randomScore = userScore + Math.floor(Math.random() * 41) + 20;
    return { name: randomName, score: randomScore };
}

// Function to update the leaderboard with random data
function updateLeaderboard(userScore) {
    leaderboard.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const randomData = generateRandomLeaderboardData(userScore);
        const listItem = document.createElement("li");
        listItem.textContent = `
           ${randomData.name}: ${randomData.score} points
        `;
        leaderboard.appendChild(listItem);
    }
}

// Function to update the leaderboard ticker
function displayTicker(userScore) {
    ticker.textContent = "Leader Board... ";
    let tickerContent = "";

    for (let i = 0; i < 4; i++) {
        const randomData = generateRandomLeaderboardData(userScore);
        tickerContent += `${randomData.name}: ${randomData.score} points | `;
    }

    // Add the user's name and accumulated score to the end of the ticker
    tickerContent += `${userName}: ${userScore} points | `;

    ticker.textContent += tickerContent;
    ticker.scrollLeft = 0;
}

// Function to update the user's level and total score based on their accumulated score
function updateLevelAndTotalScore(accumulatedScore) {
    let currentLevel = "";
    let totalScore = accumulatedScore;

    for (let i = 0; i < levels.length; i++) {
        if (accumulatedScore >= levels[i].scoreRequirement) {
            currentLevel = levels[i].name;
        } else {
            break;
        }
    }

    levelDisplay.textContent = `Level: ${currentLevel}`;
    scoreDisplay.textContent = `Score: ${accumulatedScore} / ${totalScore}`;
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionContainer.textContent = question.question;

    optionsContainer.innerHTML = "";
    for (let i = 0; i < question.options.length; i++) {
        const optionButton = document.createElement("button");
        optionButton.classList.add("option-button");
        optionButton.textContent = question.options[i];
        optionButton.addEventListener("click", () => checkAnswer(i));
        optionsContainer.appendChild(optionButton);
    }
}

function checkAnswer(selectedOption) {
    const correctOption = quizData[currentQuestion].correct;
    if (selectedOption === correctOption) {
        score++;
        accumulatedScore++;
        updateLevelAndTotalScore(accumulatedScore); // Update level and total score based on accumulated score
    }
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }

    // Update the score and accumulated score displays after each quiz
    updateScoreDisplay();
}

// Function to update the score and accumulated score display
function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${accumulatedScore}`;
    accumulatedScoreDisplay.textContent = `Accumulated Score: ${accumulatedScore}`;
}

function endQuiz() {
    questionContainer.textContent = "Quiz completed!";
    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";
    resetButton.style.display = "block";
    updateLeaderboard(accumulatedScore); // Update leaderboard based on accumulated score
    displayTicker(accumulatedScore);

    // Update the accumulated score display after the entire quiz
    updateScoreDisplay();
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    // Do not reset accumulated score here
    loadQuestion();
    resetButton.style.display = "none";
    scoreDisplay.textContent = "";
    // Do not reset accumulated score display here
    nextButton.style.display = "block";
    levelDisplay.textContent = `Level: ${levels[i].name}`;
}

loadQuestion();

nextButton.addEventListener("click", () => {
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
});

resetButton.addEventListener("click", () => {
    resetQuiz();
});