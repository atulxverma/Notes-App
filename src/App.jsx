import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { DragDropContext } from "@hello-pangea/dnd";
import NotesGrid from "./components/NotesGrid";
import NoteForm from "./components/NoteForm";
import ThemeToggle from "./components/ThemeToggle";



function App() {
  const [task, setTask] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [undoTask, setUndoTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Window resize for confetti
  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setTask(JSON.parse(saved));
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(task));
  }, [task]);

  // Add new note
  const addNote = (note) => {
    setTask([...task, note]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Delete note with undo
  const deleteNote = (index) => {
    const removed = task[index];
    setUndoTask({ ...removed, index });
    const copyTask = [...task];
    copyTask.splice(index, 1);
    setTask(copyTask);
    setTimeout(() => setUndoTask(null), 5000);
  };

  const undoDelete = () => {
    if (undoTask) {
      const copyTask = [...task];
      copyTask.splice(undoTask.index, 0, undoTask);
      setTask(copyTask);
      setUndoTask(null);
    }
  };

  // Toggle pin
  const togglePin = (index) => {
    const copyTask = [...task];
    copyTask[index].pinned = !copyTask[index].pinned;
    copyTask.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    setTask(copyTask);
  };

  // Drag & Drop
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(task);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTask(items);
  };

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row transition-all duration-500 relative ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black"
      }`}
    >
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
        />
      )}

      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <NoteForm darkMode={darkMode} addNote={addNote} />

      <DragDropContext onDragEnd={onDragEnd}>
        <NotesGrid
          darkMode={darkMode}
          notes={task}
          deleteNote={deleteNote}
          togglePin={togglePin}
          undoTask={undoTask}
          undoDelete={undoDelete}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </DragDropContext>
    </div>
  );
}

export default App;

