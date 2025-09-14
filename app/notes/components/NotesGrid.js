import NoteCard from "./NoteCard";
import LoadingSkeleton from "./LoadingSkeleton";

export default function NotesGrid({ notes, loading }) {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 p-4">
      {loading ? (
        Array.from({ length: 4 }).map((_, i) => <LoadingSkeleton key={i} />)
      ) : notes.length === 0 ? (
        <div className="col-span-4 text-center text-gray-600 text-lg font-semibold">
          No notes else
        </div>
      ) : (
        notes.map((note) => <NoteCard key={note._id} note={note} />)
      )}
    </div>
  );
}
