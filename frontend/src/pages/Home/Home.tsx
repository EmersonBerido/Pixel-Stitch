import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-pink-800">Welcome to Pixel Stitch!</h1>
      <p className="text-lg text-gray-700 mb-4">Create and share pixel art with ease.</p>
      <button 
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      onClick={() => navigate("/create-tapestry")}
      >
        Create New Tapestry
      </button>
    </div>
  );
}