declare const window: any;

const synth = typeof window !== 'undefined' && window.speechSynthesis;
let voices: any = [];

export const testRun = () => {
  let utterance = new SpeechSynthesisUtterance(
    'Browser-based text-to-speech app because reading is for nerds.'
  );
  speechSynthesis.speak(utterance);
};

export const populateVoiceList = () => {
  try {
    voices = synth.getVoices();
    return voices;
  } catch (err) {
    console.log(err);
  }
};

export const sayInput = (
  speechValue: string,
  inputVoice: any,
  pitch: number,
  rate: number
) => {
  const utterance = new SpeechSynthesisUtterance(speechValue);
  populateVoiceList();

  voices.forEach((voice: any) => {
    console.log(voice.name, inputVoice);
    if (voice.name === inputVoice) {
      utterance.voice = voice;
      return;
    }
  });

  utterance.pitch = pitch;
  utterance.rate = rate;

  synth.speak(utterance);
};
