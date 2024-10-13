import { useEffect, useState } from 'react';
import { Message } from '../../.types';
import './Chat.css'
import { ListGroup } from 'react-bootstrap';

const Chat = () => {
  const [lastDataTime, setLastDataTime] = useState<string>('');
  const [chat, setChat] = useState<Message[]>([
    {
      message: '',
      author: '',
      datetime: '',
      _id: '',
    }
  ]);


  const fetchT = async (url: string) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const allMessages = await response.json();
        if (allMessages.length > 0) {
          const newMessages = allMessages.filter((msg: Message) => {
            for (let i = 0; i < chat.length; i++) {
              if (chat[i]._id === msg._id) {
                return false;
              }
            }
            return true;
          })
          if (newMessages.length > 0) {
            setLastDataTime(newMessages[newMessages.length - 1].datetime);
            setChat((prevChat) => [...prevChat, ...newMessages]);
          }
        }
      }
    } catch (error) {
      alert(error);
    }

  };

  useEffect(() => {
    void fetchT('http://146.185.154.90:8000/messages');

    const interval = setInterval(() => {
      if (lastDataTime) {
        void fetchT(`http://146.185.154.90:8000/messages?datetime=${lastDataTime}`);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchT, lastDataTime]);



  return (
    <div className="chatWindow">
      <h1>Mobile Chat</h1>
      <ListGroup>
        {chat.slice().reverse().map(item => (
          <div key={item._id + crypto.randomUUID()}>
            <ListGroup.Item>
              <strong>{item.author}</strong>
            </ListGroup.Item>
            <ListGroup.Item className={'d-flex justify-content-between'}>
              {item.message} <span>{new Date(item.datetime).toLocaleTimeString()}</span>
            </ListGroup.Item>
          </div>
        ))}
      </ListGroup>
    </div>
  );
};

export default Chat;