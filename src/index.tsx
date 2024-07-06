import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil'; // Import RecoilRoot từ thư viện recoil
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot> {/* Bọc ứng dụng trong RecoilRoot */}
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
