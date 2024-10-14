import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const ChatForm = () => {
  const [message, setMessage] = useState({
    message: "",
    author: "",
  });

  const changeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new URLSearchParams();
      data.set("message", message.message);
      data.set("author", message.author);

      await fetch("http://146.185.154.90:8000/messages", {
        method: "POST",
        body: data,
      });

      setMessage({
        message: "",
        author: "",
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form onSubmit={sendMessage}>
      <Form.Group className="mb-3 mt-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Автор"
          name="author"
          id="author"
          value={message.author}
          onChange={changeMessage}
        />
      </Form.Group>
      <Form.Group className="mb-3 mt-3">
        <Form.Label>Message</Form.Label>
        <Form.Control
          type="text"
          name="message"
          id="message"
          placeholder="Сообщение"
          value={message.message}
          onChange={changeMessage}
        />
      </Form.Group>
      <Button type="submit" variant="primary" style={{ marginRight: "440px" }}>
        Send
      </Button>
    </Form>
  );
};

export default ChatForm;
