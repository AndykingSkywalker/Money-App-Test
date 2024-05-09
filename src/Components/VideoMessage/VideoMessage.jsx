import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const VideoMessage = () => {
    const [recordedVideos, setRecordedVideos] = useState([]);
    const [countdown, setCountdown] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const videoRef = useRef();
    const countdownRef = useRef();

    const handleVideoRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const mediaRecorder = new MediaRecorder(stream);
            const chunks = [];

            // Set the source of the video element to the stream
            videoRef.current.srcObject = stream;
            videoRef.current.play();

            // Start the countdown and recording
            setCountdown(10);
            setIsRecording(true);
            countdownRef.current = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            mediaRecorder.addEventListener('dataavailable', (event) => {
                chunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                const blob = new Blob(chunks, { type: 'video/mp4' });
                const videoUrl = URL.createObjectURL(blob);
                setRecordedVideos((prevVideos) => [...prevVideos, videoUrl]);

                // Reset the source of the video element
                videoRef.current.srcObject = null;

                // Stop the countdown and recording
                clearInterval(countdownRef.current);
                setCountdown(null);
                setIsRecording(false);
            });

            mediaRecorder.start();

            setTimeout(() => {
                mediaRecorder.stop();
                stream.getTracks().forEach((track) => track.stop());
            }, 10000); // Stop recording after 10 seconds
        } catch (error) {
            console.error('Error recording video:', error);
        }
    };

    // Clean up the countdown interval when the component unmounts
    useEffect(() => {
        return () => {
            clearInterval(countdownRef.current);
        };
    }, []);

    return (
        <Container>
        <Row className="justify-content-center mb-4">
            <br/>
        <Button style={{
                 backgroundColor: '#a87388', 
                 color: 'white',
                 borderColor: "black",
                 padding: '10px',
                 textAlign: 'center',
                 display: 'inline-block',
                 fontSize: '14px',
                 margin: '4px 2px',
                 borderRadius: '10px',
              }} onClick={handleVideoRecording}>Record Video</Button>
        </Row>
        <Row className="justify-content-center mb-4">
            {countdown !== null && <h2>Time remaining: {countdown}</h2>}
            <div style={{ 
                position: 'relative', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'flex-end', 
                width: '100%', 
                height: '240px' 
            }}>
                <video ref={videoRef} width="320" height="240" />
                {isRecording && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                        }}
                    />
                )}
            </div>
        </Row>
        <Row xs={1} md={3} className="g-4">
            {recordedVideos.map((videoUrl, index) => (
                <Col>
                    <Card>
                        <Card.Body>
                            <video key={index} src={videoUrl} controls width="100%" />
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
    );
};

export default VideoMessage;