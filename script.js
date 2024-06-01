// script.js

let recognition; // Declare recognition variable globally

function startSpeechToText() {
    if (!recognition) {
        // Create a new instance of SpeechRecognition if it doesn't exist
        recognition = new webkitSpeechRecognition() || new SpeechRecognition();
        
        // Set properties
        recognition.lang = document.getElementById('languageSelect').value;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        // Event listener for result
        recognition.onresult = function(event) {
            // Get the transcript of the speech
            let speechResult = event.results[0][0].transcript;
            
            // Output the result to the user
            document.getElementById('outputText').textContent = speechResult;
        };
        
        // Event listener for errors
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
        };
    }

    // Start recognition
    recognition.start();
    showPopup(true);
}

function stopSpeechToText() {
    // Stop recognition
    recognition.stop();
    showPopup(false);
}

// Function to show/hide popup
function showPopup(isRecording) {
    let popup = document.getElementById('popup');
    if (isRecording) {
        popup.textContent = 'Recording...';
        popup.style.display = 'block';
        setTimeout(function() {
            popup.style.display = 'none';
        }, 2000); // 2000 milliseconds = 2 seconds
    } else {
        popup.textContent = 'Recording stopped';
        popup.style.display = 'block';
        setTimeout(function() {
            popup.style.display = 'none';
        }, 2000); // 2000 milliseconds = 2 seconds
    }
}

function speakText() {
    // Get the text from the input field
    var text = document.getElementById('textInput').value;

    // Create a new SpeechSynthesisUtterance object with the text to be spoken
    var utterance = new SpeechSynthesisUtterance(text);
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
}

// Add event listener to language selection dropdown to update recognition language
document.getElementById('languageSelect').addEventListener('change', function() {
    if (recognition) {
        recognition.lang = this.value; // Update recognition language
    }
});
