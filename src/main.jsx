import ReactDOM from 'react-dom/client';
import { FormProvider } from './context/form-context';
import { WeatherProvider } from './context/weather-during-trip';
import { App } from './components/app/app';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <WeatherProvider>
    <FormProvider>
      <App />
    </FormProvider>
  </WeatherProvider>,
);
