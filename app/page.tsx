import Image from "next/image";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PlayCircleFill } from 'react-bootstrap-icons';

function tonePlayer() {
  const audioCtx = new AudioContext();
  const oscillator = audioCtx.createOscillator();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  oscillator.start();
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
        <p>Instructions go here</p>
        <Button variant="primary" size="lg" onclick={tonePlayer()}><PlayCircleFill color="black" style={{display: "inline", margin: "5px"}}/>Start</Button>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button variant="primary" size="lg">Higher</Button>
          <Button variant="primary" size="lg">Same</Button>
          <Button variant="primary" size="lg">Lower</Button>
        </div>
        </Col>
      </Row>
    </Container>
    {/* </main> */}
    </>
  );
}
