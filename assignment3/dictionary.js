const wordSelect = document.getElementById("wordSelect");
const sentenceDisplay = document.getElementById("sentenceDisplay");

function speak(textToSay) {
    if (!textToSay) {
        return;
    }

    const message = new SpeechSynthesisUtterance(textToSay);
    message.pitch = 1.2;
    message.rate = 1.0;
    window.speechSynthesis.speak(message);
}

function syncDictionary() {
    if (wordSelect.selectedIndex > 0) {
        const selectedOption = wordSelect.options[wordSelect.selectedIndex];
        sentenceDisplay.value = selectedOption.dataset.sentence;
        speak(selectedOption.value);
    } else {
        sentenceDisplay.value = "";
    }
}

function speakSelectedWord() {
    if (wordSelect.selectedIndex > 0) {
        const selectedOption = wordSelect.options[wordSelect.selectedIndex];
        speak(selectedOption.value);
    }
}

function speakCurrentSentence() {
    if (wordSelect.selectedIndex > 0) {
        const selectedOption = wordSelect.options[wordSelect.selectedIndex];
        speak(selectedOption.dataset.sentence);
    }
}
