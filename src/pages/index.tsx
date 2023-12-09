import { useEffect, useRef, useState } from "react";
import RemotePeer from "@/component/RemotePeer/RemotePeer";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { FaVideo, FaMicrophone, FaTimes, FaCircle, FaSquare } from 'react-icons/fa';
import axios from 'axios'; // Import Axios for making HTTP requests
import {
  useLocalAudio,
  useLocalPeer,
  useLocalVideo,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";

type Props = {
  token: string;
};

export default function Home({ token }: Props) {
  const { joinRoom, state } = useRoom({
    onJoin: (room) => {
      console.log("onJoin", room);
    },
    onPeerJoin: (peer) => {
      console.log("onPeerJoin", peer);
    },
    onLeave: (room)=>{
      console.log("leave room")
    }
  });

  const { enableVideo, disableVideo, isVideoOn, stream } = useLocalVideo();
  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio();

  const { peerIds } = usePeerIds();

  const videoRef = useRef<HTMLVideoElement>(null);

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const startRecording = async () => {
    try {
      await axios.post('http://localhost:5000/api/startRecording', {
        roomId: 'hdi-zzvf-sgm', // Replace with your room ID
        token: token, // Replace with your token
      });
      console.log("recording started");
      
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = async (shouldContribute:boolean) => {
    setShowConfirmation(false);

    if (shouldContribute) {
      // Handle contribution to the enhas platform here
      console.log('User wants to contribute to enhas platform');
    }

    try {
      await axios.post('http://localhost:5000/api/stopRecording', {
        roomId: 'hdi-zzvf-sgm',
      });
      console.log('recording stopped');
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 font-mono text-sm bg-gray-900">
      {/* <div className="z-10 max-w-5xl w-full items-center justify-between">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code>Hello Huddle01</code>
        </p>
      </div>
 */}
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        {isVideoOn && (
          <video
            ref={videoRef}
            className="w-1/2 mx-auto border-2 rounded-xl border-blue-400"
            autoPlay
            muted
          />
        )}
      </div>

      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <button
          type="button"
          className="bg-green-500 p-2 mx-2 flex items-center justify-center text-white"
          onClick={async () => {
            await joinRoom({
              roomId: "hdi-zzvf-sgm",
              token,
            });
          }}
        >
          <FaVideo className="w-6 h-6 mr-2" />
          Join Room
        </button>

        <button
          type="button"
          className="bg-green-500 p-2 mx-2 flex items-center justify-center text-white"
          onClick={startRecording}
        >
          <FaCircle className="w-6 h-6 mr-2" />
          Start Recording
        </button>
        <button
          type="button"
          className="bg-green-500 p-2 mx-2 flex items-center justify-center text-white"
          onClick={stopRecording}
        >
          <FaSquare className="w-6 h-6 mr-2" />
          Stop Recording
        </button>
        <button
          type="button"
          className={`bg-green-500 p-2 mx-2 flex items-center justify-center text-white ${isVideoOn ? 'bg-red-500' : ''}`}
          onClick={async () => {
            isVideoOn ? await disableVideo() : await enableVideo();
          }}
        >
          {isVideoOn ? <FaTimes className="w-6 h-6 mr-2" /> : <FaVideo className="w-6 h-6 mr-2" />}
          {isVideoOn ? 'Disable Video' : 'Enable Video'}
        </button>
        <button
          type="button"
          className={`bg-green-500 p-2 mx-2 flex items-center justify-center text-white ${isAudioOn ? 'bg-red-500' : ''}`}
          onClick={async () => {
            isAudioOn ? await disableAudio() : await enableAudio();
          }}
        >
          {isAudioOn ? <FaTimes className="w-6 h-6 mr-2" /> : <FaMicrophone className="w-6 h-6 mr-2" />}
          {isAudioOn ? 'Disable Audio' : 'Enable Audio'}
        </button>
      </div>

      <div className="mt-4 mb-32 grid gap-2 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {peerIds.map((peerId) =>
          peerId ? <RemotePeer key={peerId} peerId={peerId} /> : null
        )}
      </div>

      {showConfirmation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md">
          <p className="mb-4 text-lg">Do you want to contribute to enhance platform by adding transcript to database?</p>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-green-500 p-2 mx-2 flex items-center justify-center text-white"
              onClick={() => handleConfirmation(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className="bg-red-500 p-2 mx-2 flex items-center justify-center text-white"
              onClick={() => handleConfirmation(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export const getServerSideProps = async () => {
  const accessToken = new AccessToken({
    apiKey: "rq2-dOHM3tBTAPrbQ23UT_k9ere3u1lH",
    roomId: "hdi-zzvf-sgm",
    role: Role.HOST,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
    options: {
      metadata: {
        walletAddress: "0x29f54719E88332e70550cf8737293436E9d7b10b",
      },
    },
  });

  const token = await accessToken.toJwt();
  return {
    props: { token },
  };
};
