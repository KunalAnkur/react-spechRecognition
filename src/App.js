import { useState , useEffect, useMemo} from "react";
import Image from "./alexandra.jpg";
import './App.css';
import { SyncLoader } from "react-spinners";
function App() {
  const [content, setContent] = useState(
    "Hey!! 👋 If you wanna talk to me 😇. Click below! "
  );
  const [listening, setListening] = useState(false);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = useMemo(() => new SpeechRecognition(), [SpeechRecognition]); 

  useEffect(() => {
    const greetings = [
      "I'm very good my friend, How you are feeling",
    ];
    const greetingText = [
      "I'm very good my friend 😊 How you are feeling?",
    ];
    const byDefaultText = [
      "Can you please repeat 😅",
      "I did not understand ☹️",
    ];
    const byDefault = [
      "Can you please repeat",
      "I did not understand",
    ];
    const missing = [
      "My friend! I was also just thinking about you only ",
    ];
    const missingText = [
      "My friend! I was also just thinking about you only 🥺🥺",
    ];
    const fine = [
      "Yes! I wish you always feel good",
    ];
    const fineText = [
      "Yes! I wish you always feel good 😇",
    ];
recognition.onstart = () => {
  console.log("voice is activated, you can use your microphone");
};
recognition.onresult = (event) => {
  console.log(event);
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  const speech = new SpeechSynthesisUtterance();
  setListening(false);
  if (transcript.includes("how are you")) {
    const Index = Math.floor(Math.random() * greetings.length);
    const finaltext = greetings[Index];
    speech.text = finaltext;
    setContent(greetingText[Index]);
  } else if (transcript.includes("missing")) {
    const Index = Math.floor(Math.random() * missing.length);
    const finaltext = missing[Index];
    speech.text = finaltext;
    setContent(missingText[Index]);
  } else if (transcript.includes("I am feeling")) {
    const Index = Math.floor(Math.random() * fine.length);

    const finaltext = fine[Index];
    speech.text = finaltext;
    setContent(fineText[Index]);
  } else if (transcript.includes("understand")) {
    speech.text =
      "Yes!! Ofcourse, I understand your english. After all I know five languages.";
    setContent(
      "Yes!!😇 Ofcourse, I understand your english. After all I know five languages.😅"
    );
  } else if (transcript.includes("beautiful")) {
    speech.text =
      "Ohh!! yes, I know, I am very beautiful, but thankyou so much for noticing this.";
    setContent(
      "Ohh!! yes, I know, I am very beautiful😏, but thankyou so much for noticing this 😇"
    );
  } else {
    const Index = Math.floor(Math.random() * byDefault.length);
    speech.text = byDefault[Index];
    setContent(byDefaultText[Index]);
  }

   speech.volume = 1;
   speech.rate = 1;
   speech.pitch = 1;
   window.speechSynthesis.speak(speech);
}
  },[recognition])
  return (
    <div className="App">
      <div className="container">
        <div className="upper__part">
          <img src={Image} alt="zk" />
          {!listening ? (
            <span>{content}</span>
          ) : (
            <SyncLoader color={"white"} loading size={12} />
          )}
        </div>
        <div className="lower_part">
          <button
            onClick={() => {
              recognition.start();
              setListening(true);
            }}
            className="talk"
          >
            Talk to Alexandra
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
