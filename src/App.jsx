import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const steps = [
    { text: "Seja bem-vinda, prepare-se para um desafio!" },
    { text: "Esse sou eu, Jadiel, o novo produtor musical", image: "/imgs/eu.jpg" },
    { text: "Essa linda e maravilhosa é a luisa, mestra de jadiel", image: "/imgs/luisa1.jpg" },
    { text: "Ok, vamos para o desafio👀" },
  ];

  const questions = [
    {
      type: "multiple",
      question: "Qual desses é o mestre de Jadiel no mundo da música?",
      options: ["Alok", "Luisa", "Marshmello", "David Guetta"],
      answer: "Luisa",
    },
    {
      type: "multiple",
      question: "Aonde se conheceram?",
      options: ["Reddit", "Shopping", "Valorant", "Parque"],
      answer: "Reddit",
    },
    {
      type: "truefalse",
      question: "A mestra de Jadiel é super linda.",
      answer: "Verdadeiro",
    },
    {
      type: "truefalse",
      question: "Jadiel está se esforçando para impressionar a mestra com seu phonk.",
      answer: "Verdadeiro",
    },
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const [startedQuiz, setStartedQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef(null);
  const currentStep = steps[stepIndex];
  const currentQuestion = questions[quizIndex];

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
      audioRef.current.volume = 0.1;
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  const handleAnswer = () => {
    if (selected === null) return;
    if (selected === currentQuestion.answer) setScore(score + 1);
    if (quizIndex + 1 < questions.length) {
      setQuizIndex(quizIndex + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="App">
      <audio ref={audioRef} loop src="/music/music.mp3" />

      <button className="music-btn" onClick={() => setPlaying(!playing)}>
        {playing ? "⏸️ Parar música" : "▶️ Tocar música"}
      </button>

      <div className="emojis">
        <span>🎵</span>
        <span>💖</span>
        <span>🎶</span>
        <span>🎧</span>
        <span>💘</span>
      </div>

      {!startedQuiz ? (
        <div className="step">
          <h2>{currentStep.text}</h2>
          {currentStep.image && (
            <img
              src={currentStep.image}
              alt="Step"
              className="step-img"
            />
          )}
          <div className="buttons">
            {stepIndex > 0 && (
              <button onClick={() => setStepIndex(stepIndex - 1)}>Voltar</button>
            )}
            {stepIndex < steps.length - 1 ? (
              <button onClick={() => setStepIndex(stepIndex + 1)}>Próximo</button>
            ) : (
              <button onClick={() => setStartedQuiz(true)}>Começar Quiz</button>
            )}
          </div>
        </div>
      ) : !showResult ? (
        <div className="quiz">
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.type === "multiple" &&
            currentQuestion.options.map((opt) => (
              <label key={opt}>
                <input
                  type="radio"
                  value={opt}
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                />
                {opt}
              </label>
            ))}

          {currentQuestion.type === "truefalse" && (
            <>
              <label>
                <input
                  type="radio"
                  value="Verdadeiro"
                  checked={selected === "Verdadeiro"}
                  onChange={() => setSelected("Verdadeiro")}
                />
                Verdadeiro
              </label>
              <label>
                <input
                  type="radio"
                  value="Falso"
                  checked={selected === "Falso"}
                  onChange={() => setSelected("Falso")}
                />
                Falso
              </label>
            </>
          )}
          <button onClick={handleAnswer}>Responder</button>
        </div>
      ) : (
        <div className="result">
          <h2>Você acertou {score} de {questions.length} perguntas!</h2>
          <p>{score === questions.length ? "Perfeita!" : "Nada mal, mas dá pra melhorar 😅"}</p>
          <button onClick={() => window.location.reload()}>Tentar novamente</button>
        </div>
      )}
    </div>
  );
}

export default App;
