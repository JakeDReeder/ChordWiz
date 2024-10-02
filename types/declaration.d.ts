// declaration.d.ts
declare module "react-native-audio-analyzer" {
  interface AudioAnalyzerOptions {
    fftSize?: number;
    smoothingTimeConstant?: number;
  }

  export default class AudioAnalyzer {
    constructor(options: AudioAnalyzerOptions);
    analyzeAudio(data: string): { volume: number };
  }
}
