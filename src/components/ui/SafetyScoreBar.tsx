// src/components/ui/SafetyScoreBar.tsx
import React from 'react';
import './SafetyScoreBar.css';

interface Props {
  score: number; // 0 - 100
}

export const SafetyScoreBar: React.FC<Props> = ({ score }) => {
  const clamped = Math.max(0, Math.min(100, score));
  const barColor = clamped >= 70 ? 'olive' : clamped >= 40 ? 'beige-amber' : 'beige';
  return (
    <div className="safety-score-bar">
      <div
        className={`safety-score-fill safety-${barColor}`}
        style={{ width: `${clamped}%` }}
      />
      <span className="safety-score-label">{clamped}</span>
    </div>
  );
};
