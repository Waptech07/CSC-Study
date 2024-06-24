import React, { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { AiOutlineMessage, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import responses from "./Data/ChatBot"; // Assuming responses and options are imported from a separate file

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isBot: false }]);
      setInput("");
      // Simulate bot response
      setTimeout(() => {
        const foundResponse = responses.find((response) =>
          response.keywords.some((keyword) =>
            input.toLowerCase().includes(keyword)
          )
        );
        if (foundResponse) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: foundResponse.response, isBot: true },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: "I'm sorry, I didn't understand that. Could you please rephrase?",
              isBot: true,
            },
          ]);
        }
      }, 1000);
    }
    e.preventDefault();
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Assuming options are managed similarly to responses
  const options = [
    { text: "Account", value: "account" },
    { text: "Contact", value: "contact" },
    { text: "Support", value: "support" },
  ];

  const handleOptionClick = (value) => {
    switch (value) {
      case "account":
        setMessages([...messages, { text: value, isBot: false }]);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "To access your account or sign up for a new account, please visit our website and navigate to the account page.",
            isBot: true,
          },
        ]);
        break;
      case "contact":
        setMessages([...messages, { text: value, isBot: false }]);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "You can contact our support team via email at support@example.com or by calling +1-123-456-7890.",
            isBot: true,
          },
        ]);
        break;
      case "support":
        setMessages([...messages, { text: value, isBot: false }]);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "For support, you can visit our help center on our website or contact our support team directly.",
            isBot: true,
          },
        ]);
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white shadow-2xl rounded-lg overflow-hidden w-80 h-96 flex flex-col border border-gray-200"
          >
            <div className="p-4 overflow-y-auto relative">
              {messages.map((message, index) => (
                <div
                  className={`mb-2 ${
                    message.isBot ? "text-left" : "text-right"
                  }`}
                >
                  <div
                    key={index}
                    className={`mb-2 p-3 inline-block rounded-lg max-w-[85%] break-words ${
                      message.isBot ? "bg-gray-100" : "bg-blue-500 text-white"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <form
              onSubmit={handleSendMessage}
              className="border-t p-3 flex items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg p-2 mr-1 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-800
                focus:outline-none transform transition-transform duration-300"
              >
                <FaPaperPlane className="text-lg" />
              </button>
            </form>
            <div className="px-3 pb-1">
              <p className="text-gray-600 mb-2">Or choose from options:</p>
              <div className="flex flex-wrap items-center">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option.value)}
                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full shadow-sm mr-2 mb-2 hover:bg-gray-300 focus:outline-none"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={toggleChatbot}
        className="fixed right-1 bottom-1 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none transform hover:scale-105 transition-transform duration-300"
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMessage size={24} />}
      </button>
    </div>
  );
};

export default Chatbot;
