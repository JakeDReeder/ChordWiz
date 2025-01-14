// Reexport the native module. On web, it will be resolved to MyAudioModule.web.ts
// and on native platforms to MyAudioModule.ts
export { default } from './MyAudioModule';
export { default as MyAudioModuleView } from './MyAudioModuleView';
export * from  './MyAudioModule.types';
