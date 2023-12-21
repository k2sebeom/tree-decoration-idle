import 'react-scripts';

type ActiveChangeCallback = (status: boolean) => void;

interface ContextApi {
    onActiveChange: (callback: ActiveChangeCallback) => void;
}

declare global {
  interface Window {
    context: ContextApi;
  }
}