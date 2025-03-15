// request permissions to use device microphone.

import { ExpoAudioStreamModule } from "@siteed/expo-audio-studio";

const requestPermissions = async () => {
  const { granted } = await ExpoAudioStreamModule.requestPermissionsAsync();
  if (granted) {
    console.log("Microphone permissions granted");
  } else {
    console.log("Microphone permissions denied");
  }
};

requestPermissions();
