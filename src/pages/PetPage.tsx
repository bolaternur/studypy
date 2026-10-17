import { PetCompanion } from '../components/PetCompanion';
import { useAuth } from '../contexts/AuthContext';
export function PetPage() {
  const {currentUser}=useAuth();
  return <div className="page-container program-page"><h1>Питомец</h1><p className="muted max-w-xl mt-4">Необязательный игровой спутник. Его характеристики и игровой уровень не оценивают знание Python.</p>{currentUser?<><p className="mt-6">Открой панель питомца кнопкой внизу. На учебных экранах она скрыта.</p><PetCompanion/></>:<button className="primary-button mt-6" onClick={()=>window.dispatchEvent(new Event('open-auth-modal'))}>Войти, чтобы открыть питомца</button>}</div>;
}
