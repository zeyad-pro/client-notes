"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";
import { HexColorPicker } from "react-colorful";

const UpdateNote = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff");

  const { user } = useAuth();

  // 🟢 التوكن
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);

    const getNote = async () => {
      try {
        const res = await fetch(`http://localhost:3001/notes/${id}`, {
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
      const res = await fetch(`http://localhost:3001/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // هنا التعديل
        },
        body: JSON.stringify(note),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Note updated successfully");
        router.push("/notes");
      } else {
        toast.error(data.error || "Failed to update note");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading)
    return (
      <h1 className="text-center mt-10 text-xl min-h-screen flex justify-center items-center">
        Loading...
      </h1>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          ✏️ Update Note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />

          <textarea
            rows="5"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          ></textarea>

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

            {/* 🟢 بالتة الألوان */}
            {/*  */}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/notes")}
              className="w-1/2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-xl shadow-md transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNote;
