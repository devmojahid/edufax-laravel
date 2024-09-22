import React, { useState } from "react";
import { Send } from "lucide-react";
import { router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";

export default function SingleCompanionPage({ companion }) {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const selectedCompanion = {
    id: 1,
    name: "Albert Einstein",
    role: "Theoretical physicist",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Renowned physicist who developed the theory of relativity.",
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([
        ...chatHistory,
        { sender: "User", message: chatMessage },
      ]);
      // Here you would typically send the message to your backend
      // and then update the chat history with the companion's response
      // For now, we'll just simulate a response
      setTimeout(() => {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            sender: companion.name,
            message: `Thanks for your message: "${chatMessage}"`,
          },
        ]);
      }, 1000);
      setChatMessage("");
    }
  };

  return (
    <AdminLayout>
      <aside className="border border-gray-200 flex flex-col w-full h-full">
        <div className="p-2 border-b flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={selectedCompanion.image}
              alt={selectedCompanion.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {selectedCompanion.name}
              </h2>
              <p className="text-sm text-gray-600">{selectedCompanion.role}</p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700"></button>
        </div>
        <div className="flex-grow overflow-auto p-6">
          <div className="flex flex-col space-y-4">
            {/* System Input */}
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-lg mb-4 w-4/5">
                <p className="text-gray-700 font-medium">
                  System: Hello! I'm {selectedCompanion.name}. How can I assist
                  you today?
                </p>
              </div>
            </div>

            {/* User Input */}
            <div className="flex justify-end">
              <div className="bg-blue-100 p-4 rounded-lg mb-4 w-4/5">
                <p className="text-gray-700 font-medium">
                  You: I'm looking for some assistance with my account.
                </p>
              </div>
            </div>
          </div>
          {/* Chat messages would go here */}
        </div>
        <div className="p-6 border-t">
          <div className="flex items-center">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow p-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-200">
              <Send size={20} />
            </button>
          </div>
        </div>
      </aside>
    </AdminLayout>
  );
}
