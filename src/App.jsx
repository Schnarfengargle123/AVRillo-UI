import { useEffect, useState } from 'react';
import './App.css'

export default function App() {
  // Could also use `useReducer` to consolidate overall form state.
  const [username, setUsername] = useState();
  const [message, setMessage] = useState();
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [latestMessage, setLatestMessage] = useState();

  const API = 'https://ceua9.ciroue.com/api';

  useEffect(() => {
    console.log("username: ", username);
    console.log("message: ", message);
    console.log("isMessageSent: ", isMessageSent);
    console.log("latestMessage: ", latestMessage);
  }, [username, message, isMessageSent, latestMessage]);

  const handleUsername = (e) => setUsername(e.target.value);
  const handleMessage = (e) => setMessage(e.target.value);
  const handleLatestMessage = (e) => {
    fetch(`${API}/messages`).then(res => res.json()).then(data => setLatestMessage(data));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length < 3) {
      alert("Username must be at least 3 characters.");
    } else if (!message.length) {
      alert("Please enter a message.");
    } else {
      setIsMessageSent(true);

      const userMessage = { username, message };
      console.log("userMessage: ", userMessage);

      fetch(`${API}/messages`, { method: 'POST', headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(userMessage) }).then(res => res.json()
      ).then(data => console.log(data)).catch(err => console.log(err));

      setUsername();
      setMessage();
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <Input name="Name" type="text" onChange={handleUsername} />

        <textarea onChange={handleMessage} />
        <br />
        <input type="submit" />
      </form>

      {isMessageSent && <h2>Thank you for your message. We will be in touch shortly!</h2>}

      <button onClick={handleLatestMessage}>View Sent Message</button>

      <div>
        <h2>{latestMessage && latestMessage.name}</h2>
        <h2>{latestMessage && latestMessage.message}</h2>
      </div>
    </main>
  )
}

const Input = ({ name, onChange, type }) => <div>
  <label>{name}</label>
  <br />
  <input type={type} onChange={onChange} />
</div>

