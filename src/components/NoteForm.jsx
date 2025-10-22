import { useState, useRef, useEffect } from "react";
import { PlusCircle, Palette, StickyNote } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { HexColorPicker } from "react-colorful";

export default function NoteForm({ darkMode, addNote }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("📝");
  const [selectedColor, setSelectedColor] = useState("#fcd34d");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const emojiPickerRef = useRef();
  const colorPickerRef = useRef();

  // Close pickers on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const submitBtn = (e) => {
    e.preventDefault();
    if (!title.trim() || !detail.trim()) return;

    const newNote = {
      title,
      detail,
      color: selectedColor,
      id: Date.now(),
      pinned: false,
      emoji: selectedEmoji,
    };

    addNote(newNote);
    setTitle("");
    setDetail("");
    setSelectedEmoji("📝");
    setSelectedColor("#fcd34d");
  };

  return (
    <form
      onSubmit={submitBtn}
      className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-4 p-6 sm:p-14 relative"
    >
      <div className="flex items-center gap-3 mb-2">
        <StickyNote className="text-cyan-400" size={32} />
        <h1 className="text-3xl sm:text-4xl font-bold text-center">Add a New Note</h1>
      </div>

      <input
        className={`h-12 w-full max-w-md rounded-xl px-4 py-2 border bg-transparent focus:outline-none focus:ring-2 resize-none transition-all duration-300 ${
          darkMode
            ? "text-white border-gray-600 focus:ring-cyan-500"
            : "text-black border-gray-400 focus:ring-cyan-600"
        }`}
        type="text"
        placeholder="Enter note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className={`h-32 w-full max-w-md rounded-xl px-4 py-2 border bg-transparent focus:outline-none focus:ring-2 resize-none transition-all duration-300 ${
          darkMode
            ? "text-white border-gray-600 focus:ring-cyan-500"
            : "text-black border-gray-400 focus:ring-cyan-600"
        }`}
        placeholder="Write your note details..."
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      ></textarea>

      <div className="flex gap-2 items-center w-full max-w-md relative">
        {/* Emoji Picker */}
        <div className="relative" ref={emojiPickerRef}>
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="px-4 py-2 rounded-xl border hover:bg-gray-700 transition-all flex items-center gap-1 z-10"
          >
            <span className="text-xl">{selectedEmoji}</span> Emoji
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2 z-50">
              <EmojiPicker
                onEmojiClick={(e) => {
                  setSelectedEmoji(e.emoji);
                  setShowEmojiPicker(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Color Picker */}
        <div className="relative" ref={colorPickerRef}>
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="px-4 py-2 rounded-xl border hover:bg-gray-700 transition-all flex items-center gap-1 z-10"
          >
            <Palette size={18} /> Pick Color
          </button>
          {showColorPicker && (
            <div className="absolute bottom-full mb-2 z-50">
              <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition-all duration-300 hover:scale-105"
        >
          <PlusCircle size={20} /> Add Note
        </button>
      </div>
    </form>
  );
}
