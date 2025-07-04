import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendWsMessage } from '@renderer/store/webSocketSlice';

const config = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};

export const useWebRTC = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { socketId } = useSelector((state) => state.webSocket);

  useEffect(() => {
    console.log('socketid onchange', socketId);
  }, [socketId]);
  // @ts-ignore
  const peerConnection = useRef<RTCPeerConnection>();

  const createPeerConnection = (isInitiator): Promise<RTCPeerConnection> => {
    return new Promise((resolve, reject) => {
      if (peerConnection.current) {
        resolve(peerConnection.current);
      } else {
        try {
          const pc = new RTCPeerConnection(config);

          pc.onicecandidate = (event) => {
            if (event.candidate) {
              dispatch(
                // @ts-ignore
                sendWsMessage({
                  socketId,
                  data: {
                    timestamp: Date.now(),
                    from: socketId,
                    to: 'all',
                    type: 'candidate',
                    isInitiator,
                    candidate: event.candidate,
                  },
                }),
              );
            }
          };
          pc.ontrack = (event) => {
            console.log('peerconnection ontrack');
            handleStream(event.streams[0]);
          };

          let dataChannel;
          if (isInitiator) {
            dataChannel = pc.createDataChannel('share-screen');
            setupDataChannel(dataChannel);
          } else {
            pc.ondatachannel = (event) => {
              dataChannel = event.channel;
              setupDataChannel(dataChannel);
            };
          }

          pc.onconnectionstatechange = () => {
            console.log('onconnectionstatechange', pc.connectionState);
          };

          pc.onsignalingstatechange = () => {
            console.log('onsignalingstatechange', pc.signalingState);
          };

          pc.oniceconnectionstatechange = () => {
            console.log('oniceconnectionstatechange', pc.iceConnectionState);
          };

          pc.onicegatheringstatechange = () => {
            console.log('onicegatheringstatechange', pc.iceGatheringState);
          };

          resolve(pc);
        } catch (error) {
          console.log('failed to create peerConnection');
          reject(error);
        }
      }
    });
  };

  const setupDataChannel = (channel: RTCDataChannel) => {
    channel.onopen = () => {
      console.log('dataChannel opened');
    };
    channel.onclose = () => {
      console.log('dataChannel closed');
    };
    channel.onmessage = (message) => {
      console.log('dataChannel message', message);
    };
    channel.onerror = (error) => {
      console.log('dataChannel error', error);
    };
  };

  const getMediaStream = async (pc: RTCPeerConnection) => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: 1920,
          height: 1080,
          frameRate: 60,
        },
      });

      handleStream(stream);

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
    } catch (error) {
      console.log('failed to getMediaStream', error);
    }
  };

  const handleJoinedRoom = async () => {
    try {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      console.log({ socketId });

      dispatch(
        // @ts-ignore
        sendWsMessage({
          socketId,
          data: {
            timestamp: Date.now(),
            from: socketId,
            to: 'all',
            type: 'offer',
            offer: peerConnection.current.localDescription,
          },
        }),
      );
    } catch (error) {
      console.log('failed to create offer', error);
    }
  };

  const handleReceiveOffer = async (data) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));

    try {
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      dispatch(
        sendWsMessage({
          socketId,
          data: {
            timestamp: Date.now(),
            from: socketId,
            to: 'all',
            type: 'answer',
            answer: peerConnection.current.localDescription,
          },
        }),
      );
    } catch (error) {
      console.log('failed to create answer');
    }
  };

  const handleReceiveAnswer = async (data) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
  };

  const handleCandidate = async (data) => {
    try {
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
    } catch (error) {
      console.log('failed to add candidate');
    }
  };

  const handleStream = (stream) => {
    const videoEl = document.getElementById('video-stream') as HTMLVideoElement;
    videoEl.style.width = '600px';
    videoEl.style.height = '400px';
    videoEl.style.border = '1px dashed #000';
    videoEl.style.objectFit = 'contain';
    videoEl.style.objectPosition = 'center';

    videoEl.srcObject = stream;
  };

  const startShareScreen = async (isInitiator) => {
    try {
      const pc = await createPeerConnection(isInitiator);
      peerConnection.current = pc;
      await getMediaStream(pc);
    } catch (error) {
      console.log('startScreenShare error', error);
    }
  };

  return {
    startShareScreen,
    handleJoinedRoom,
    handleReceiveOffer,
    handleReceiveAnswer,
    handleCandidate,
  };
};
