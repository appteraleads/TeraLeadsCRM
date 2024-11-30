import React, { useState, useEffect, useRef } from 'react';
import { TelnyxRTC } from '@telnyx/webrtc';
import { Button, Input } from 'antd';


const Test = () => {
  const client = useRef(null);
  const audioElementRef = useRef(null);
  const ringtoneRef = useRef(new Audio('/ringtone.mp3')); 
  const [destinationNumber, setDestinationNumber] = useState('');
  const [call, setCall] = useState(null);
  const [callState, setCallState] = useState('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [timer, setTimer] = useState(null);

  // Test the ringtone
  const testAudio = () => {
    ringtoneRef.current.play().catch(error => console.error('Error playing the sound:', error));
  };
  useEffect(() => {
    // ringtoneRef.current.play();
    client.current = new TelnyxRTC({
      login: 'teracrmdev',
      password: 'Teraleads123!',
      websocketHost: "wss://rtc.telnyx.com/call",
    });

    client.current.connect();

    client.current.on('telnyx.ready', () => {
      console.log('Telnyx client ready');
    });

    client.current.on('telnyx.error', error => {
      console.error('Telnyx client error:', error);
    });

    client.current.on('telnyx.notification', notification => {
      switch (notification.type) {
        case 'callUpdate':
          if (notification.call.state === 'ringing') {
            setCall(notification.call);
            setCallState('Calling...');            
          } else if (notification.call.state === 'active') {
            setCallState('Active');
            audioElementRef.current.srcObject = notification.call.remoteStream;
            startTimer();
            ringtoneRef.current.pause();
            ringtoneRef.current.currentTime = 0; // Reset the audio for the next call
          } else if (notification.call.state === 'hangup') {
            cleanUpCall();
          }
          break;
        default:
          break;
      }
    });

    return () => {
      client.current.disconnect();
    };
  }, []);

  const makeCall = () => {
    if (destinationNumber.trim()) {
      const newCall = client.current.newCall({
        destinationNumber,
        callerNumber: '+13083050002',
        options: {
          audio: true,
          video: false
        }
      });
      testAudio()
      setCall(newCall);
      setCallState('Calling...');
    }
  };

  const hangUp = () => {
    if (call) {
      call.hangup();
      cleanUpCall();
    }
  };

  const cleanUpCall = () => {
    stopTimer();
    setCall(null);
    setCallState('idle');
    setCallDuration(0);
    ringtoneRef.current.pause();
    ringtoneRef.current.currentTime = 0; // Ensure the ringtone is reset
  };

  const startTimer = () => {
    setTimer(setInterval(() => {
      setCallDuration(prevDuration => prevDuration + 1);
    }, 1000));
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const dialPadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  const onDial = (number) => {
    setDestinationNumber(prevNumber => prevNumber + number);
  };

  return (
    <div className="container">
      <Input
        className="input"
        value={destinationNumber}
        onChange={(e) => setDestinationNumber(e.target.value)}
        placeholder="Enter number"
        maxLength={15}
      />
      <div className="dial-pad">
        {dialPadNumbers.map(number => (
          <Button key={number} onClick={() => onDial(number)} className="button">
            {number}
          </Button>
        ))}
      </div>
      <div className="call-actions">
        {callState === 'idle' && (
          <Button type="primary" className="large-button" onClick={makeCall}>
            Call
          </Button>
        )}
        {callState === 'Calling...' && (
          <>
            <Button className="large-button" disabled>
              {callState}
            </Button>
            <Button type="primary" danger className="large-button" onClick={hangUp}>
              Hang Up
            </Button>
          </>
        )}
        {callState === 'Active' && (
          <Button type="primary" danger className="large-button" onClick={hangUp}>
            Hang Up ({formatDuration(callDuration)})
          </Button>
        )}
      </div>
      <audio ref={audioElementRef} autoPlay className="audio" />
    </div>
  );
};

export default Test;