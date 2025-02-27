'use client';

import Image from "next/image";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PlayCircleFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function PlayButton({ audioContext, setAudioContext, pitch }) {
  const [oscillator, setOscillator] = useState(null);
  const [playing, setPlaying] = useState(false);

  function playSound(context) {
    const newOscillator = context.createOscillator();
    newOscillator.type = "sine";
    newOscillator.frequency.setValueAtTime(pitch, context.currentTime);
    newOscillator.connect(context.destination);
    setOscillator(context.createOscillator());
    newOscillator.start();
    setPlaying(true);
    setTimeout(() => {
      newOscillator.stop()
      setPlaying(false);
    }, 500);
  }

  function handlePlay() {
    if (playing)
      return;
    if (!audioContext) {
      const newAudioContext = new AudioContext();
      setAudioContext(newAudioContext);
      playSound(newAudioContext);
    } else {
      playSound(audioContext);
    }
  }

  return (
    <Button variant="primary" size="lg" onClick={handlePlay} style={{ margin: "5px" }}>
      <PlayCircleFill style={{display: "inline", margin: "5px"}}/>
    </Button>
  );

}

function ChoiceButton({ label, choice, correctAnswer, handleClick }) {
  let variant = "primary";
  const isCorrect = (choice === correctAnswer);

  if (choice && correctAnswer == label)
    variant = "success";
  else if (choice == label)
    variant = "danger";

  return (
    <Button variant={variant} size="lg" onClick={() => handleClick(label)} disabled={choice} >
      {label}
    </Button>
  );
}

function Game() {
  const [audioContext, setAudioContext] = useState(null);

  const [pitches, setPitches] = useState([
    getRandomPitch(),
    getRandomPitch()
  ]);

  const correctAnswer = getCorrectAnswer(pitches);
  console.log("correctAnswer: ", correctAnswer);

  const [choice, setChoice] = useState(null);
  const [correct, setCorrect] = useState(false);

  console.log(pitches);

  function evaluateAnswer(answer) {
    setChoice(answer);
    console.log("answer: ", answer);
  }

  function reset() {
    setPitches([getRandomPitch(), getRandomPitch()]);
    setChoice(null);
    setCorrect(false);
  }

  return (
    <>
      <PlayButton audioContext={audioContext} setAudioContext={setAudioContext} pitch={pitches[0]}/>
      <PlayButton audioContext={audioContext} setAudioContext={setAudioContext} pitch={pitches[1]}/>


      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <ChoiceButton label="Lower" choice={choice} correctAnswer={correctAnswer} handleClick={evaluateAnswer} />
        <ChoiceButton label="Same" choice={choice} correctAnswer={correctAnswer} handleClick={evaluateAnswer} />
        <ChoiceButton label="Higher" choice={choice} correctAnswer={correctAnswer} handleClick={evaluateAnswer} />
      </div>


      { choice && <Banner reset={reset} /> }

    </>
  );
}

function Banner({ reset }) {
  return (
    <Button variant="primary" size="lg" onClick={() => reset()}>
      Next
    </Button>
  );
}

export default function Home() {

  return (
    // <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start justify-center">
      <>
    <Container>
        
      <Row className="justify-content-md-center">
        <Col md="auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-grey tracking-tight mb-8">Toney</h1>
        <p className="text-lg sm:text-xl lg:text-2xl font-medium mb-6 text-grey">Ear trainer for the tone deaf</p>
        <p>TODO: Write instructions</p>
            <Game />
        </Col>
      </Row>
    </Container>
    {/* </main> */}
    </>
  );
}

function getRandomPitch() {
  const pitchFreqTable = [
    261.626, // C4
    277.183, // C#4
    293.665, // D4
    311.127, // D#4
    329.628, // E4
    349.228, // F4
    369.994, // F#4
    391.995, // G4
    415.305, // G#4
    440.000, // A4
    466.164, // A#4
    493.883, // B4
  ];
  return pitchFreqTable[Math.floor(Math.random()*pitchFreqTable.length)];
}

function getCorrectAnswer(pitches) {
    if (pitches[0] === pitches[1]) {
      return "Same";
    } else if (pitches[0] < pitches[1]) {
      return "Higher";
    } else {
      return "Lower";
    }
}
