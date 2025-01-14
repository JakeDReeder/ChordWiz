import { NativeModule, requireNativeModule } from 'expo';

import { MyAudioModuleEvents } from './MyAudioModule.types';

declare class MyAudioModule extends NativeModule<MyAudioModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<MyAudioModule>('MyAudioModule');
