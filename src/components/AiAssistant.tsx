import { useState } from 'react';
import { useThreatStore } from '../store/useThreatStore';
import { streamOpenAIResponse } from '../utils/aiStreamUtil';
import styles from './AiAssistant.module.css';

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const threats = useThreatStore(s => s.rawThreats);
  const selected = threats.slice(0, 1); // 👈 Replace later with selected threats

  const handleAsk = async () => {
    setResponse('');
    setLoading(true);

    const stream = await streamOpenAIResponse(input, (token) => {
      setResponse((prev) => prev + token);
    });

    await stream;
    setLoading(false);
  };

  return (
    <div className={styles.assistantRoot}>
      {open ? (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span>🤖 Agentic AI Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className={styles.contextBox}>
            {selected[0] ? (
              <>
                <strong>{selected[0].summary}</strong>
                <p>Severity: {selected[0].severity}</p>
                <p>Category: {selected[0].category}</p>
              </>
            ) : (
              <em>No threat selected</em>
            )}
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. What does this alert mean?"
          />
          <button onClick={handleAsk} disabled={loading || !input}>
            {loading ? 'Thinking...' : 'Ask'}
          </button>

          <div className={styles.responseBox}>
            { response }
          </div>
        </div>
      ) : (
        <button className={styles.toggle} onClick={() => setOpen(true)}>
          🤖 Ask AI
        </button>
      )}
    </div>
  );
}
