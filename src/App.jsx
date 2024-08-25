import { useState } from 'react';
import Question from './components/Question';
import questions from './questions';
import './App.css';

function App() {
  const [gameActive, setGameActive] = useState(false);

  if (gameActive) {
    return <Question questions={questions} />;
  } else {
    return (
      <div>
        <h1>Question App</h1>
        <ul>
          <li>Test 10 sorudan oluşmaktadır.</li>
          <li>Her soru için 30 saniyeniz vardır.</li>
          <li>Soru ekrana geldikten 4 saniye sonra şıkları görebilirsiniz ve geri sayım başlar.</li>
          <li>Tüm sorular bitince doğru cevap sayınız sonuç ekranında gösterilecektir.</li>
        </ul>
        <button id='start' onClick={() => setGameActive(true)}>Teste Başla</button>
      </div>
    );
  }
}

export default App;
