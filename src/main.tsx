import {createRoot} from 'react-dom/client';
import {BeaconPage} from './components/BeaconPage.tsx';
import './index.css';

// The Beacon (link-in-bio) is the only page: every path renders it.
createRoot(document.getElementById('root')!).render(<BeaconPage />);
