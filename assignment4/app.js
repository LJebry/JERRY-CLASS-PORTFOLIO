const topicMenu = document.getElementById("topicMenu");
const topicImage = document.getElementById("topicImage");
const topicTitle = document.getElementById("topicTitle");
const topicDescription = document.getElementById("topicDescription");
const topicFact = document.getElementById("topicFact");
const statusMessage = document.getElementById("statusMessage");
const profileInfo = document.getElementById("profileInfo");
const installBtn = document.getElementById("installBtn");
const playAudioBtn = document.getElementById("playAudioBtn");
const speakTextBtn = document.getElementById("speakTextBtn");
const factBtn = document.getElementById("factBtn");

let dataset = null;
let currentIndex = 0;
let deferredInstallPrompt = null;

function getCurrentTopic() {
    return dataset?.topics?.[currentIndex] ?? null;
}

function speakText(text) {
    if (!text) {
        return;
    }

    const narrationRate = Number(dataset?.userProfile?.preferredNarrationRate) || 0.95;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.05;
    utterance.rate = narrationRate;
    window.speechSynthesis.speak(utterance);
}

function renderTopic(index) {
    if (!dataset?.topics?.length) {
        return;
    }

    currentIndex = index;
    const topic = dataset.topics[index];

    topicTitle.textContent = topic.title;
    topicDescription.textContent = topic.description;
    topicImage.src = topic.image;
    topicImage.alt = topic.imageAlt || topic.title;

    topicFact.hidden = true;
    topicFact.textContent = topic.quickFact || "";

    statusMessage.textContent = `Viewing: ${topic.title}`;
}

function populateMenu() {
    topicMenu.innerHTML = "";

    dataset.topics.forEach((topic, index) => {
        const option = document.createElement("option");
        option.value = String(index);
        option.textContent = topic.title;
        topicMenu.appendChild(option);
    });

    topicMenu.selectedIndex = 0;
    renderTopic(0);
}

function playTopicAudio() {
    const topic = getCurrentTopic();
    if (!topic) {
        return;
    }

    if (topic.audio?.mode === "file" && topic.audio.url) {
        const media = new Audio(topic.audio.url);
        media.play().catch(() => {
            statusMessage.textContent = "Audio file could not be played. Falling back to narration.";
            speakText(topic.audio.text || topic.description);
        });
        return;
    }

    speakText(topic.audio?.text || topic.description);
}

function toggleFact() {
    if (!topicFact.textContent) {
        return;
    }

    topicFact.hidden = !topicFact.hidden;
}

async function loadTopics() {
    try {
        const response = await fetch("./data/topics.json");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        dataset = await response.json();
        if (!Array.isArray(dataset.topics) || dataset.topics.length === 0) {
            throw new Error("Dataset has no topics.");
        }

        const learnerName = dataset?.userProfile?.learnerName || "Guest Learner";
        const learnerLevel = dataset?.userProfile?.level || "General";
        profileInfo.textContent = `Learner profile: ${learnerName} (${learnerLevel})`;
        populateMenu();
        statusMessage.textContent = "Dataset loaded. Choose a topic from the menu.";
    } catch (error) {
        statusMessage.textContent = "Unable to load the dataset. Check JSON format or network connection.";
        topicTitle.textContent = "Load Error";
        topicDescription.textContent = "The app could not read data/topics.json.";
    }
}

async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        statusMessage.textContent = "Service Worker is not supported in this browser.";
        return;
    }

    try {
        await navigator.serviceWorker.register("./sw.js");
    } catch (error) {
        statusMessage.textContent = "Service worker registration failed.";
    }
}

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installBtn.hidden = false;
});

window.addEventListener("appinstalled", () => {
    installBtn.hidden = true;
    deferredInstallPrompt = null;
    statusMessage.textContent = "App installed successfully.";
});

installBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
        statusMessage.textContent = "Install option is not available yet.";
        return;
    }

    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    statusMessage.textContent =
        choice.outcome === "accepted" ? "Install accepted." : "Install dismissed.";

    deferredInstallPrompt = null;
    installBtn.hidden = true;
});

topicMenu.addEventListener("change", (event) => {
    const nextIndex = Number(event.target.value);
    renderTopic(nextIndex);
});

playAudioBtn.addEventListener("click", playTopicAudio);
speakTextBtn.addEventListener("click", () => {
    const topic = getCurrentTopic();
    if (topic) {
        speakText(topic.description);
    }
});
factBtn.addEventListener("click", toggleFact);

registerServiceWorker();
loadTopics();
