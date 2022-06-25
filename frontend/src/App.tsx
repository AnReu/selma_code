import React from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './features/search/SearchPage';
import StoreSnackbar from './features/snackbar/StoreSnackbar';
import ResultsPage from './ResultsPage';
import HomePage from './HomePage';

const config = {
  loader: { load: ['[tex]/html'] },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
};

export default function App() {
  return (
    <RecoilRoot>
      <RecoilizeDebugger />
      <React.Suspense fallback={<div>Loading...</div>}>
        <MathJaxContext config={config}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="results" element={<ResultsPage />} />
          </Routes>
          <StoreSnackbar />
        </MathJaxContext>
      </React.Suspense>
    </RecoilRoot>
  );
}
