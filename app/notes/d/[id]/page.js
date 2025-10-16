"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";
import { HexColorPicker } from "react-colorful";

const Deletenote = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff");
const api = "https://notes-server-6r1w.onrender.com/";
  const { user } = useAuth();

  // 🟢 التوكن
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);

    const getNote = async () => {
      try {
        const res = await fetch(`${api}/notes/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${savedToken}`,
          },
        });
        const data = await res.json();
        setLoading(false);
        if (data.success) {
          setTitle(data.data.title);
          setDescription(data.data.description);
          // setColor(data.data.color);
        } else {
          toast.error("Note not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch note");
        setLoading(false);
      }
    };

    if (id && savedToken) getNote();
  }, [id]);

  // 🟢 تعديل النوت
  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = { title, description, color };

    try {
      const res = await fetch(`${api}/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // هنا التعديل
        },
        body: JSON.stringify(note),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Note Deleted successfully");
        router.push("/notes");
      } else {
        toast.error(data.error || "Failed to Delete note");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // if (loading)
  //   return (
  //     <h1 className="text-center mt-10 text-xl min-h-screen flex justify-center items-center">
  //       Loading...
  //     </h1>
  //   );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 text-4xl flex-col">
      do you sure you want to delete this note?
      <div className="flex gap-4 mt-4">
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          YES
        </button>
        <button
          onClick={() => router.push("/notes")}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          NO
        </button>
      </div>
    </div>
  );
};

export default Deletenote;
