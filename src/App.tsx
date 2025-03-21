import OneShotBoot from './assets/components/BootScreen';
import './index.css';

function App() {
  const onComplete = () => {
    console.log('asd');
  };
  return <OneShotBoot onComplete={onComplete} />;
}

export default App;
