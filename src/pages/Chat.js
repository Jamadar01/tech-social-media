import { useState, useEffect } from 'react';
import { accessChat, sendMessage, fetchMessages, fetchChats, createGroupChat } from '../api/api';
import { useUser } from '../context/UserContext';
import { useSocket } from '../context/SocketContext';

const Chat = () => {
  const { user } = useUser();
  const { socket } = useSocket();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserChats();
    }
  }, [user]);

  const fetchUserChats = async () => {
    try {
      const res = await fetchChats(user._id);
      setChats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectChat = async (chat) => {
    setCurrentChat(chat);
    try {
      const res = await fetchMessages(chat._id);
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const res = await sendMessage({ chatId: currentChat._id, sender: user._id, content: newMessage });
      setMessages([...messages, res.data]);
      socket.emit('send_message', res.data);
      setNewMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    try {
      const res = await createGroupChat({ users: [user._id], name: groupName });
      setChats([...chats, res.data]);
      setGroupName('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', (newMsg) => {
      if (currentChat && currentChat._id === newMsg.chatId) {
        setMessages((prev) => [...prev, newMsg]);
      }
    });
  }, [socket, currentChat]);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Left Sidebar - Chats */}
      <div>
        <h3>Your Chats</h3>
        {chats.map((chat) => (
          <div key={chat._id} onClick={() => selectChat(chat)} style={{ border: '1px solid gray', margin: '5px', padding: '5px', cursor: 'pointer' }}>
            {chat.isGroupChat ? chat.name : 'Direct Chat'}
          </div>
        ))}

        <div style={{ marginTop: '20px' }}>
          <input
            placeholder="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button onClick={handleCreateGroup}>Create Group</button>
        </div>
      </div>

      {/* Right Panel - Messages */}
      <div>
        {currentChat ? (
          <div>
            <h3>Chatting in: {currentChat.isGroupChat ? currentChat.name : 'Direct Chat'}</h3>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid black', padding: '10px' }}>
              {messages.map((msg) => (
                <div key={msg._id} style={{ marginBottom: '10px' }}>
                  <b>{msg.sender.username || 'You'}:</b> {msg.content}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage}>
              <input
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        ) : (
          <h4>Select a chat to start messaging!</h4>
        )}
      </div>
    </div>
  );
};

export default Chat;
