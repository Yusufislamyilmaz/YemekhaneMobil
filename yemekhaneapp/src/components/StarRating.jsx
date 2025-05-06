// src/components/StarRating.jsx
import { useMemo } from 'react';

export default function StarRating({ rating, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {useMemo(
        () =>
          [...Array(5)].map((_, i) => {
            const filled = i < rating;
            return (
              <span
                key={i}
                onClick={() => onChange(i + 1)}
                style={{
                  cursor: 'pointer',
                  fontSize: 24,
                  color: filled ? '#f5a623' : '#ddd',
                }}
              >
                ★
              </span>
            );
          }),
        [rating]
      )}
    </div>
  );
}
