import React from 'react';

export default function ScreenshotButton() {
  const capture = async () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    try {
      const data = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = data;
      a.download = `portfolio-shot-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.error('Capture failed', e);
    }
  };
  return (
    <button onClick={capture} className="text-white/80 hover:text-white px-3 py-1 rounded-md border border-white/10 hover:border-white/20">
      Snapshot
    </button>
  );
}

