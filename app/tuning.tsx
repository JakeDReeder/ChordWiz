import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import pitchfinder from "pitchfinder";
import { NativeEventEmitter, NativeModules } from "react-native";
import LiveAudioStream from "react-native-live-audio-stream";
import { Buffer } from "buffer";
import {
  ACCIDENTAL_MODE,
  getPitchedNote,
  IPitchedNote,
} from "@/services/pitch.service";

const { LiveAudioStream: LiveAudioStreamModule } = NativeModules;

if (!LiveAudioStreamModule) {
  console.warn("LiveAudioStream native module is not properly linked.");
}

// Initialize Event Emitter
const liveAudioEmitter = new NativeEventEmitter(LiveAudioStreamModule);

const UPDATE_FRAME_RATE = 1000 / 30;
const DEFAULT_NOTE: IPitchedNote = {
  accidental: "natural",
  cents: 0,
  frequency: 440,
  note: "A",
  octave: 4,
};
const GOOD_RGBA = "rgba(0,255,125,.6)";
const BAD_RGBA = "rgba(255,0,50,.6)";
const TARGET_BG_COLOR = "rgb(200,200,200)";
const TARGET_BG_COLOR_DARK = "rgba(255,255,255,.2)";
const TARGET_SIZE = 200;
const BG_COLOR = "rgb(250,250,255)";
const BG_COLOR_DARK = "rgb(20,20,20)";
const TEXT_COLOR = "rgb(0,0,0)";
const TEXT_COLOR_DARK = "rgb(240,240,240)";

const PitchFinder = pitchfinder.YIN();

function ThemedText({
  children,
  style,
  ...attributes
}: React.PropsWithChildren<{ style?: any }>): JSX.Element {
  const scheme = useColorScheme();
  return (
    <Text
      style={[
        {
          color: scheme === "dark" ? TEXT_COLOR_DARK : TEXT_COLOR,
        },
        style,
      ]}
      {...attributes}
    >
      {children}
    </Text>
  );
}

const TunerApp: React.FC = () => {
  const scheme = useColorScheme();
  const frequency = useRef<number | null>(null);
  const xAnimation = useRef(new Animated.Value(0)).current;
  const yAnimation = useRef(new Animated.Value(0)).current;
  const colorAnimation = useRef(new Animated.Value(0)).current;
  const [accidentalMode, setAccidentalMode] = useState<ACCIDENTAL_MODE>(
    ACCIDENTAL_MODE.SHARP
  );
  const [currentFrequency, setCurrentFrequency] = useState<number>(
    DEFAULT_NOTE.frequency
  );

  const onPressAccidentalToggleButton = () => {
    setAccidentalMode((prevMode: ACCIDENTAL_MODE) =>
      prevMode === ACCIDENTAL_MODE.SHARP
        ? ACCIDENTAL_MODE.FLAT
        : ACCIDENTAL_MODE.SHARP
    );
  };

  useEffect(() => {
    const setup = async () => {
      if (Platform.OS === "android") {
        const hasRecordAudioPermissions = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        if (!hasRecordAudioPermissions) {
          await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
        }
      }

      LiveAudioStream.init({
        sampleRate: 44100,
        channels: 1,
        bitsPerSample: 8,
        audioSource: 9,
        bufferSize: 8192,
        wavFile: "",
      });

      LiveAudioStream.on("data", (data: string) => {
        const chunk = Float32Array.from(Buffer.from(data, "base64"));
        const pitch = PitchFinder(chunk);
        frequency.current = pitch ?? null;
      });

      LiveAudioStream.start();
    };

    setup();
    return () => {
      LiveAudioStream.stop();
    };
  }, []);

  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(Date.now());
  const update = useCallback(() => {
    const now = Date.now();
    const delta = now - lastUpdateRef.current;
    if (delta > UPDATE_FRAME_RATE) {
      if (frequency.current != null && frequency.current < 10000) {
        setCurrentFrequency(frequency.current);
      }
      lastUpdateRef.current = now;
    }
    rafRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  const currentNote = getPitchedNote(currentFrequency, accidentalMode);
  const normalize = Math.abs(currentNote.cents) / 50;
  const interp = currentNote.cents / 50;
  let xAnimationToValue = 0;
  let yAnimationToValue = 0;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  if (width < height) {
    yAnimationToValue = (-interp * height) / 2;
  } else {
    xAnimationToValue = (interp * width) / 2;
  }

  Animated.timing(xAnimation, {
    toValue: xAnimationToValue,
    duration: 200,
    useNativeDriver: true,
  }).start();
  Animated.timing(yAnimation, {
    toValue: yAnimationToValue,
    duration: 200,
    useNativeDriver: true,
  }).start();
  Animated.timing(colorAnimation, {
    toValue: normalize,
    duration: 200,
    useNativeDriver: true,
  }).start();

  const color = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [GOOD_RGBA, BAD_RGBA],
  });

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        backgroundColor: scheme === "dark" ? BG_COLOR_DARK : BG_COLOR,
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <ThemedText
        style={{
          fontSize: 16,
          fontWeight: "300",
          textAlign: "center",
          position: "absolute",
          bottom: 0,
          padding: 32,
        }}
      >
        {Math.round(currentFrequency)}Hz
      </ThemedText>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          backgroundColor:
            scheme === "dark" ? TARGET_BG_COLOR_DARK : TARGET_BG_COLOR,
          borderRadius: TARGET_SIZE,
          height: TARGET_SIZE,
          width: TARGET_SIZE,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: color,
            borderRadius: TARGET_SIZE,
            height: TARGET_SIZE,
            left: 0,
            position: "absolute",
            top: 0,
            transform: [{ translateX: xAnimation }, { translateY: yAnimation }],
            width: TARGET_SIZE,
          }}
        />
        <ThemedText style={{ fontSize: 96 }}>{currentNote.note}</ThemedText>
        <TouchableOpacity onPress={onPressAccidentalToggleButton}>
          <ThemedText style={{ fontSize: 24 }}>
            {currentNote.accidental === "sharp"
              ? "♯"
              : currentNote.accidental === "flat"
              ? "♭"
              : ""}
          </ThemedText>
        </TouchableOpacity>
        <ThemedText style={{ fontSize: 24, fontWeight: "300" }}>
          {currentNote.octave}
        </ThemedText>
        <ThemedText style={{ fontSize: 16 }}>{currentNote.cents}</ThemedText>
      </View>
    </SafeAreaView>
  );
};

export default TunerApp;
