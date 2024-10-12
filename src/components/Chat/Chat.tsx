import { useEffect, useState } from 'react';
import { Message } from '../../.types';
import './Chat.css'

const Chat = () => {
  const [chat, setChat] = useState<Message[]>([
    {
      message: '',
      author: '',
      datetime: '',
      _id: '',
    }
  ]);

  const fetchT = async (url: string) => {
    const message = await fetch(url);
    if (message.ok) {
      const mes = await message.json();
      setChat(mes);
    }
  }

  useEffect(() => {
  void fetchT('http://146.185.154.90:8000/messages')
  }, []);

  console.log(chat)

  return (
    <div className='chatWindow'>
      <h1>Mobile Chat</h1>

      {chat.map(item => (
        <div key={item._id}>
          <h3>{item.author}</h3>
          <p>{item.message}</p>
          <p>{new Date(item.datetime).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;