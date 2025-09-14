import { HexColorPicker } from "react-colorful";

export default function AddNoteModal({
  setAddForm,
  title,
  setTitle,
  content,
  setContent,
  color,
  setColor,
  handleSubmit,
}) {
  return (
    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative h-4/5 overflow-y-auto bg-white/80 w-full max-w-lg p-8 rounded-3xl shadow-2xl transform transition-all duration-300 scale-90 opacity-0 animate-modal">
        <button
          onClick={() => setAddForm(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Add New Note
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-500 rounded-full focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              className="w-full px-4 py-3 border-2 border-gray-500 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Enter note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Choose Color
            </label>
            <HexColorPicker
              color={color}
              onChange={setColor}
              className="rounded-xl shadow-lg"
            />
            <p className="mt-2 text-gray-700 font-medium">Selected: {color}</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full w-full shadow-md transition"
            >
              Add Note
            </button>
          </div>
        </form>

        <style jsx>{`
          @keyframes modalShow {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-modal {
            animation: modalShow 0.25s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
}
