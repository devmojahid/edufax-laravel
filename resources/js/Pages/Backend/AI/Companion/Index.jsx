import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Link } from "@inertiajs/react";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("Newest");
  const [filteredCompanions, setFilteredCompanions] = useState([]);

  const categories = [
    "Newest",
    "Musicians",
    "Famous People",
    "Animals",
    "Philosophy",
    "Scientists",
    "Games",
    "Movies & TV",
  ];

  const allCompanions = [
    {
      id: 1,
      name: "Albert Einstein",
      role: "Theoretical physicist",
      image: "/placeholder.svg?height=200&width=200",
      category: "Scientists",
      bio: "Renowned physicist who developed the theory of relativity.",
    },
    {
      id: 2,
      name: "Marie Curie",
      role: "Physicist and chemist",
      image: "/placeholder.svg?height=200&width=200",
      category: "Scientists",
      bio:
        "Pioneer in radioactivity research and the first woman to win a Nobel Prize.",
    },
    {
      id: 3,
      name: "Leonardo da Vinci",
      role: "Polymath",
      image: "/placeholder.svg?height=200&width=200",
      category: "Famous People",
      bio:
        "Italian Renaissance polymath: painter, sculptor, architect, and engineer.",
    },
    {
      id: 4,
      name: "William Shakespeare",
      role: "Playwright and poet",
      image: "/placeholder.svg?height=200&width=200",
      category: "Famous People",
      bio:
        "English playwright, poet, and actor, widely regarded as the greatest writer in the English language.",
    },
    {
      id: 5,
      name: "Aristotle",
      role: "Philosopher",
      image: "/placeholder.svg?height=200&width=200",
      category: "Philosophy",
      bio:
        "Greek philosopher and scientist who made significant contributions to logic, metaphysics, mathematics, physics, biology, botany, ethics, politics, agriculture, medicine, dance, and theatre.",
    },
    {
      id: 6,
      name: "Isaac Newton",
      role: "Physicist and mathematician",
      image: "/placeholder.svg?height=200&width=200",
      category: "Scientists",
      bio:
        "English physicist and mathematician who laid the foundations of classical mechanics.",
    },
    {
      id: 7,
      name: "Ludwig van Beethoven",
      role: "Composer and pianist",
      image: "/placeholder.svg?height=200&width=200",
      category: "Musicians",
      bio:
        "German composer and pianist who was a crucial figure in the transition between the Classical and Romantic eras in Western classical music.",
    },
    {
      id: 8,
      name: "Charles Darwin",
      role: "Naturalist and biologist",
      image: "/placeholder.svg?height=200&width=200",
      category: "Scientists",
      bio:
        "English naturalist, geologist and biologist, best known for his contributions to the science of evolution.",
    },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "Newest") {
      setFilteredCompanions(allCompanions);
    } else {
      setFilteredCompanions(
        allCompanions.filter((companion) => companion.category === category)
      );
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allCompanions.filter(
      (companion) =>
        companion.name.toLowerCase().includes(searchTerm) ||
        companion.role.toLowerCase().includes(searchTerm)
    );
    setFilteredCompanions(filtered);
  };

  useEffect(() => {
    setFilteredCompanions(allCompanions);
  }, []);

  return (
    <AdminLayout>
      <div className="flex h-full">
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search companions..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleSearch}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCompanions.map((companion) => (
              <Link
                href={`/ai/companion/${companion.id}`}
                key={companion.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              >
                <img
                  src={companion.image}
                  alt={companion.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">
                    {companion.name}
                  </h3>
                  <p className="text-gray-600">{companion.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}
