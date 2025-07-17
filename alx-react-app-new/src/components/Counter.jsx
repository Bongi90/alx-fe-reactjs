import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: '2px solid #ccc', padding: '20px', maxWidth: '300px', margin: '20px auto', textAlign: 'center', borderRadius: '8px' }}>
      <h2>Simple Counter</h2>
      <p style={{ fontSize: '24px' }}>Current Count: {count}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setCount(count + 1)} style={{ padding: '10px' }}>Increment</button>
        <button onClick={() => setCount(count - 1)} style={{ padding: '10px' }}>Decrement</button>
        <button onClick={() => setCount(0)} style={{ padding: '10px' }}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
