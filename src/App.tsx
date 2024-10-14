import "./App.css";
import Chat from './components/Chat/Chat.tsx';
import ChatForm from './components/ChatForm/ChatForm.tsx';

const App = () => {
  return (
    <div className="App">
      <Chat/>
      <ChatForm/>
    </div>
  )
}

export default App;
