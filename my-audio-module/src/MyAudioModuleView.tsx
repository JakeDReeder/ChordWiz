import { requireNativeView } from 'expo';
import * as React from 'react';

import { MyAudioModuleViewProps } from './MyAudioModule.types';

const NativeView: React.ComponentType<MyAudioModuleViewProps> =
  requireNativeView('MyAudioModule');

export default function MyAudioModuleView(props: MyAudioModuleViewProps) {
  return <NativeView {...props} />;
}
