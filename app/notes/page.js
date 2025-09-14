"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import NotesGrid from "./components/NotesGrid";
import AddNoteModal from "./components/AddNoteModal";

export default function NotesPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [onClick, setOnClick] = useState(false);
  const [addform, setAddForm] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (!storedToken) {
      router.push("/login");
      return;
    }

    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/notes", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const data = await res.json();

        const decoded = jwtDecode(storedToken);
        const userNotes = data.date.filter(
          (note) => note.userid === decoded.id
        );

        setNotes(userNotes || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchNotes();
  }, [router, onClick]);

  const userId = user ? jwtDecode(user.token).id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const note = { userid: userId, title, description: content, color };

    const res = await fetch(`http://localhost:3001/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Note created");
      setAddForm(false);
      setOnClick(!onClick);
    } else {
      toast.error(data.error);
    }
  };

  return (
    <div className="p-6 min-h-screen relative">
      <h1 className="text-2xl font-bold text-center mb-5">Your Notes</h1>

      <NotesGrid notes={notes} loading={loading} />

      {/* زرار الإضافة */}
      <button
        className="bg-[#0026ff] cursor-pointer fixed bottom-15 right-15 text-white font-bold w-8 shadow-blue-600 hover:shadow-lg shadow-sm duration-200 text-2xl scale-150 rounded-full"
        onClick={() => setAddForm(!addform)}
      >
        {addform ? "" : "+"}
      </button>

      {addform && (
        <AddNoteModal
          setAddForm={setAddForm}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          color={color}
          setColor={setColor}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
