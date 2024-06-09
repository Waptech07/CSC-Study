import React, { useState } from "react";
import { AiOutlineMessage, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
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
  };

  const responses = [
    {
      keywords: ["hello", "hi", "hey", "yo", "yoo"],
      response:
        "Hello, How are you doing?",
    },
    {
      keywords: ["i'm good", "i am good", "i am okay", "nice", "good"],
      response:
        "Nice one",
    },
    {
      keywords: ["services", "what do you offer", "types of services"],
      response:
        "We offer a wide range of services including web development, mobile app development, and UI/UX design.",
    },
    {
      keywords: ["contact", "reach out", "support"],
      response:
        "You can contact our support team via email at support@example.com or by calling +1-123-456-7890.",
    },
    {
      keywords: ["pricing", "cost", "rates"],
      response:
        "For pricing information, please visit our pricing page on our website.",
    },
    {
      keywords: ["features", "functionality", "capabilities"],
      response:
        "Our platform includes a variety of features such as user authentication, data analytics, and third-party integrations.",
    },
    {
      keywords: ["partnership", "collaboration", "join forces"],
      response:
        "We are open to partnership opportunities. Please reach out to our partnership team for further discussion.",
    },
    {
      keywords: ["demo", "trial", "test"],
      response:
        "You can request a demo or sign up for a free trial on our website to explore our product.",
    },
    {
      keywords: ["feedback", "suggestions", "improvements"],
      response:
        "We appreciate your feedback! Please send us your suggestions and ideas to help us improve our services.",
    },
    {
      keywords: ["account", "login", "signup"],
      response:
        "To access your account or sign up for a new account, please visit our website and navigate to the account page.",
    },
    {
      keywords: ["privacy", "security", "data protection"],
      response:
        "Protecting your privacy and data security is our top priority. We adhere to strict privacy policies and use encryption to secure your data.",
    },
    {
      keywords: ["shipping", "delivery", "tracking"],
      response:
        "For information regarding shipping, delivery times, and order tracking, please visit the shipping section on our website.",
    },
  ];

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
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 p-3 rounded-lg ${
                    message.isBot
                      ? "bg-gray-100 text-left self-start"
                      : "bg-blue-500 text-white text-right self-end"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="border-t p-4 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600
                focus:outline-none transform transition-transform duration-300"
              >
                Send
              </button>
            </div>
            {/* <div className="p-4">
              <p className="text-gray-600 mb-2">Or choose from options:</p>
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.value)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full shadow-sm mr-2 mb-2 hover:bg-gray-300 focus:outline-none"
                >
                  {option.text}
                </button>
              ))}
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={toggleChatbot}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none transform hover:scale-105 transition-transform duration-300"
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMessage size={24} />}
      </button>
    </div>
  );
};

export default Chatbot;
