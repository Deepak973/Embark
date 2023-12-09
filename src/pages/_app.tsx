import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { HuddleClient, HuddleProvider } from "@huddle01/react";

const huddleClient = new HuddleClient({
  projectId: "cFT6ZoyZUQlmvyQJ3bLmoiz5NAHkX9MB",
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  console.log("render");

  return (
    <HuddleProvider client={huddleClient}>
      <Component {...pageProps} />
    </HuddleProvider>
  );
}
