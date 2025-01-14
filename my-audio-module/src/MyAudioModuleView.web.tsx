import * as React from 'react';

import { MyAudioModuleViewProps } from './MyAudioModule.types';

export default function MyAudioModuleView(props: MyAudioModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
