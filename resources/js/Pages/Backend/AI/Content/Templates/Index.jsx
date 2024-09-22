import AdminLayout from "@/Layouts/Admin/AdminLayout";
import React, { useState, useEffect } from "react";

const templates = [
  {
    id: 1,
    type: "blog",
    title: "Blog Section",
    description: "Write a blog section with the key points of your article",
    wordsGenerated: 4137934,
    icon: "📝",
  },
  {
    id: 2,
    type: "blog",
    title: "Blog Ideas",
    description: "Generate blog ideas for your next post",
    wordsGenerated: 518218,
    icon: "💡",
  },
  {
    id: 3,
    type: "blog",
    title: "Blog Title",
    description: "Generate blog title for your next post",
    wordsGenerated: 86246,
    icon: "🏷️",
  },
  {
    id: 4,
    type: "blog",
    title: "Blog Intro",
    description: "Generate blog intro for your next post",
    wordsGenerated: 3639,
    icon: "🎬",
  },
  {
    id: 5,
    type: "blog",
    title: "Blog Conclusion",
    description: "Generate blog conclusion for your next post",
    wordsGenerated: 2285,
    icon: "🏁",
  },
  {
    id: 6,
    type: "blog",
    title: "Blog Tags",
    description: "Generate blog tags for your next post",
    wordsGenerated: 31601,
    icon: "🔖",
  },
  {
    id: 7,
    type: "blog",
    title: "Blog Summary",
    description: "Generate blog summary for your next post",
    wordsGenerated: 12967,
    icon: "📊",
  },
  {
    id: 8,
    type: "email",
    title: "Confirmation Email",
    description: "Generate a confirmation email template",
    wordsGenerated: 26796,
    icon: "✉️",
  },
];

const TemplateCard = ({ template }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
    <div className="p-5 bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">{template.title}</h3>
        <span className="text-3xl">{template.icon}</span>
      </div>
    </div>
    <div className="p-5">
      <p className="text-gray-600 mb-4">{template.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {template.wordsGenerated.toLocaleString()} Words
        </span>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
          Use Template
        </button>
      </div>
    </div>
  </div>
);

const EnhancedTemplateManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredTemplates, setFilteredTemplates] = useState(templates);

  useEffect(() => {
    const filtered = templates.filter(
      (template) =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeTab === "all" || template.type === activeTab)
    );
    setFilteredTemplates(filtered);
  }, [searchTerm, activeTab]);

  return (
    <AdminLayout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            All Templates
          </h1>
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 text-gray-700"
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              "all",
              "blog",
              "email",
              "social",
              "video",
              "website",
              "general",
              "fun",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-purple-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EnhancedTemplateManager;
