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

function Game() {
  const [audioContext, setAudioContext] = useState(null);

  const [pitches, setPitches] = useState([
    getRandomPitch(),
    getRandomPitch()
  ]);

  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  console.log(pitches);

  function evaluateAnswer(answer) {
    if (answered)
      return;

    let correctAnswer;

    if (pitches[0] === pitches[1]) {
      correctAnswer = "Same";
    } else if (pitches[0] < pitches[1]) {
      correctAnswer = "Higher";
    } else {
      correctAnswer = "Lower";
    }
    console.log("correctAnswer: ", correctAnswer);
    console.log("answer: ", answer);
    setCorrect(correctAnswer===answer);
    setAnswered(true);
  }

  function reset() {
    setPitches([getRandomPitch(), getRandomPitch()]);
    setAnswered(false);
    setCorrect(false);
  }

  return (
    <>
      <PlayButton audioContext={audioContext} setAudioContext={setAudioContext} pitch={pitches[0]}/>
      <PlayButton audioContext={audioContext} setAudioContext={setAudioContext} pitch={pitches[1]}/>


      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <Button variant="primary" size="lg" onClick={() => evaluateAnswer("Lower")}>
          Lower
        </Button>
        <Button variant="primary" size="lg" onClick={() => evaluateAnswer("Same")}>
          Same
        </Button>
        <Button variant="primary" size="lg" onClick={() => evaluateAnswer("Higher")}>
          Higher
        </Button>
      </div>


      {
        answered && (
          (correct && <Banner isCorrect={true} reset={reset}/>) ||
          (!correct && <Banner isCorrect={false} reset={reset}/>)
        )
      }

    </>
  );
}

function Banner({ isCorrect, reset}) {
  let text;
  let variant;
  if (isCorrect) {
    text = "Correct";
    variant = "success";
  } else {
    text = "Incorrect";
    variant = "danger";
  }
  return (
    <>
      <Alert variant={variant}>
        {text}
      </Alert>
      <Button variant="primary" size="lg" onClick={() => reset()}>
        Next
      </Button>
    </>
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

