import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '../../src/contexts/AuthContext';
import { PetCompanion } from '../../src/components/PetCompanion';
import '../../src/index.css';

createRoot(document.getElementById('pet-root')!).render(<AuthProvider><PetCompanion /></AuthProvider>);
(window as any).__petQaReady = true;
