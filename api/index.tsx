const synth = typeof window !== 'undefined' && window.speechSynthesis;
let voices = [];

export const testRun = () => {
    let utterance = new SpeechSynthesisUtterance("Browser-based text-to-speech app because reading is for nerds.");
    speechSynthesis.speak(utterance);
}

export const populateVoiceList = () => {
    voices = synth.getVoices();

    voices.forEach(voice => {

    })
}

export const sayInput = (speechValue: string) => {
    const utterance = new SpeechSynthesisUtterance(speechValue);
    //const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    //voices.forEach(voice => voice.name === selectedVoice ? utterance.voice = voice : 'not');

    utterance.pitch = 1.3;
    utterance.rate = 1.1;

    synth.speak(utterance);
}