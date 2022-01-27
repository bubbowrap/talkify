declare const window: any;

const synth = typeof window !== 'undefined' && window.speechSynthesis;

export const populateVoiceList = () => {
  try {
    let voices = synth.getVoices();
    return voices.sort((a: any, b: any) => a.name.localeCompare(b.name));
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

  populateVoiceList().forEach((voice: any) => {
    if (voice.name === inputVoice) {
      utterance.voice = voice;
      return;
    }
  });

  utterance.pitch = pitch;
  utterance.rate = rate;

  window.speechSynthesis.cancel();
  synth.speak(utterance);
};
