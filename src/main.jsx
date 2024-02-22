import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { TripProvider } from './context/trip-context';
import { TripWeatherProvider } from './context/trip-weather-context';
import { App } from './components/app/app';
import { clientGoogleId } from './utils';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TripWeatherProvider>
    <TripProvider>
      <GoogleOAuthProvider clientId={clientGoogleId}>
        <App />
      </GoogleOAuthProvider>
    </TripProvider>
  </TripWeatherProvider>,
);
