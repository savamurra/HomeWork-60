import { useEffect, useState } from "react";
import { Message } from "../../.types";
import "./Chat.css";
import { ListGroup } from "react-bootstrap";

const Chat = () => {
  const [lastDataTime, setLastDataTime] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([
    {
      message: "",
      author: "",
      datetime: "",
      _id: "",
    },
  ]);

  const fetchData = async (url: string) => {
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
          });
          if (newMessages.length > 0) {
            setLastDataTime(newMessages[newMessages.length - 1].datetime);
            setChat((prevState) => [...prevState, ...newMessages]);
          }
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    void fetchData("http://146.185.154.90:8000/messages");

    const interval = setInterval(() => {
      if (lastDataTime) {
        void fetchData(
          `http://146.185.154.90:8000/messages?datetime=${lastDataTime}`,
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [lastDataTime]);

  return (
    <div className="chatWindow">
      <h1
        style={{
          textTransform: "uppercase",
          textAlign: "center",
          fontSize: "24px",
          padding: "10px",
        }}
      >
        Mobile Chat
      </h1>
      {chat
        .slice()
        .reverse()
        .map((item) => (
          <ListGroup
            key={item._id + crypto.randomUUID()}
            style={{ padding: "10px", borderRadius: "5px" }}
          >
            <ListGroup.Item>
              <strong>{item.author}</strong>
            </ListGroup.Item>
            <ListGroup.Item className={"d-flex justify-content-between"}>
              {item.message}{" "}
              <span
                style={{
                  borderLeft: "2px solid #eee",
                  paddingLeft: "10px",
                  fontSize: "12px",
                }}
              >
                {new Date(item.datetime).toLocaleString()}
              </span>
            </ListGroup.Item>
          </ListGroup>
        ))}
    </div>
  );
};

export default Chat;
