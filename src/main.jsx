import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FormProvider } from './context/form-context';
import { WeatherProvider } from './context/weather-during-trip';
import { App } from './components/app/app';
import './index.css';

const clientId =
  '300371647083-q22ar3j70r35f6kch3fl465qmvk3prka.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <WeatherProvider>
    <FormProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </FormProvider>
  </WeatherProvider>,
);
