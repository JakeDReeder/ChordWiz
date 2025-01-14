package expo.modules.myaudiomodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.media.AudioRecord
import android.media.MediaRecorder
import android.media.AudioFormat
import kotlinx.coroutines.*

class MyAudioModule : Module() {
  private var audioRecord: AudioRecord? = null
  private var isRecording = false

  override fun definition() = ModuleDefinition {
    Name("MyAudioModule")

    Events("onAudioData")

    AsyncFunction("startRecording") {
      startAudioRecording()
    }

    AsyncFunction("stopRecording") {
      isRecording = false
      audioRecord?.stop()
      audioRecord?.release()
      audioRecord = null
    }
  }

  private fun startAudioRecording() {
    val bufferSize = AudioRecord.getMinBufferSize(
      44100,
      AudioFormat.CHANNEL_IN_MONO,
      AudioFormat.ENCODING_PCM_16BIT
    )

    audioRecord = AudioRecord(
      MediaRecorder.AudioSource.MIC,
      44100,
      AudioFormat.CHANNEL_IN_MONO,
      AudioFormat.ENCODING_PCM_16BIT,
      bufferSize
    )

    audioRecord?.startRecording()
    isRecording = true

    GlobalScope.launch(Dispatchers.IO) {
      val buffer = ByteArray(bufferSize)
      while (isRecording) {
        val read = audioRecord?.read(buffer, 0, buffer.size) ?: 0
        if (read > 0) {
          val audioData = buffer.map { it.toFloat() / 32768.0f }
          val rms = kotlin.math.sqrt(audioData.map { it * it }.sum() / audioData.size)

          sendEvent("onAudioData", mapOf("rms" to rms))
        }
      }
    }
  }
}
