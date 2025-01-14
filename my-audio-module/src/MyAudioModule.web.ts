import { registerWebModule, NativeModule } from 'expo';

import { MyAudioModuleEvents } from './MyAudioModule.types';

class MyAudioModule extends NativeModule<MyAudioModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(MyAudioModule);
