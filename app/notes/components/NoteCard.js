import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { format } from "timeago.js";

export default function NoteCard({ note }) {
  const getTextColor = (bgColor) => {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "text-black" : "text-white";
  };

  const textColor = getTextColor(note.color);

  return (
    <div
      style={{ backgroundColor: note.color }}
      className="rounded-2xl shadow-lg h-60 transition-transform transform hover:shadow-2xl duration-300"
    >
      <div className="bg-black/20 mb-2 rounded-t-2xl w-full h-8 flex items-center justify-between px-2">
        <h1 className={`${textColor}`}>{format(note.date)}</h1>
        <div className="flex gap-2 items-center justify-between">
          <a href={`/notes/${note._id}`}>
            <CiEdit
              className={`cursor-pointer ${textColor} hover:scale-130 duration-100`}
              size={27}
            />
          </a>
          <a href={`/notes/d/${note._id}`}>
            <FaRegTrashCan
              className="cursor-pointer text-red-500 hover:scale-130 duration-100"
              size={20}
            />
          </a>
        </div>
      </div>
      <div className={`p-4 ${textColor}`}>
        <h2 className="text-xl font-bold truncate">{note.title}</h2>
        <p className="break-words whitespace-pre-wrap text-sm">
          {note.description}
        </p>
      </div>
    </div>
  );
}
