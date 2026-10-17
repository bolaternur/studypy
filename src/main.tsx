import {StrictMode, useEffect} from 'react';
import { installInteractionSounds } from './utils/sounds';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function InteractionFeedback() {
  useEffect(() => installInteractionSounds(), []);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InteractionFeedback />
    <App />
  </StrictMode>,
);
