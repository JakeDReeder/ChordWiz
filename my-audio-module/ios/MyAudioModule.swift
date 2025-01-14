import ExpoModulesCore
import AVFoundation

public class MyAudioModule: Module {
  private var audioEngine: AVAudioEngine?

  public func definition() -> ModuleDefinition {
    Name("MyAudioModule")

    Events("onAudioData")

    AsyncFunction("startRecording") {
      self.startAudioRecording()
    }

    AsyncFunction("stopRecording") {
      self.audioEngine?.stop()
      self.audioEngine = nil
    }
  }

  private func startAudioRecording() {
    audioEngine = AVAudioEngine()
    let inputNode = audioEngine?.inputNode
    let format = inputNode?.outputFormat(forBus: 0)

    inputNode?.installTap(onBus: 0, bufferSize: 1024, format: format) { buffer, time in
      let audioBuffer = buffer.floatChannelData?[0] ?? []
      let audioData = Array(UnsafeBufferPointer(start: audioBuffer, count: Int(buffer.frameLength)))
      let rms = sqrt(audioData.map { $0 * $0 }.reduce(0, +) / Float(audioData.count))

      self.sendEvent("onAudioData", ["rms": rms])
    }

    do {
      try audioEngine?.start()
    } catch {
      print("Failed to start audio engine: \(error.localizedDescription)")
    }
  }
}
