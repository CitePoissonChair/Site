import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Prestations } from './pages/Prestations';
import { BuddySystem1 } from './pages/BuddySystem1';
import { StationSoleilBleu } from './pages/StationSoleilBleu';
import { Photos } from './pages/Photos';
import { Captations } from './pages/Captations';
import { Clips } from './pages/Clips';
import { Revues } from './pages/Revues';
import { Ecrits } from './pages/Ecrits';
import { APropos } from './pages/APropos';
import { NotFound } from './pages/NotFound';
import { BuddySystem2 } from './pages/BuddySystem2';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prestations" element={<Prestations />} />
        <Route path="/buddy-1" element={<BuddySystem1 />} />
        <Route path="/buddy-2" element={<BuddySystem2 />} />
        <Route path="/projet/station-soleil-bleu" element={<StationSoleilBleu />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/captations" element={<Captations />} />
        <Route path="/clips" element={<Clips />} />
        <Route path="/revues" element={<Revues />} />
        <Route path="/ecrits" element={<Ecrits />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
