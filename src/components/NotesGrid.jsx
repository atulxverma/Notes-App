import { StickyNote } from "lucide-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { AnimatePresence } from "framer-motion";
import NoteCard from "./NoteCard";

export default function NotesGrid({
  darkMode,
  notes,
  deleteNote,
  togglePin,
  undoTask,
  undoDelete,
  searchQuery,
  setSearchQuery,
}) {
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.detail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`lg:w-1/2 p-6 sm:p-10 flex flex-col rounded-t-3xl lg:rounded-none overflow-y-auto transition-all duration-500 ${
        darkMode ? "bg-gray-900/40 backdrop-blur-xl" : "bg-gray-200/60 backdrop-blur-xl"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <StickyNote className="text-cyan-400" />{" "}
        <h1 className="font-bold text-3xl flex-1">Your Notes</h1>
        <input
          type="text"
          placeholder="Search..."
          className={`px-3 py-1 mr-5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 w-40 sm:w-52 ${
            darkMode
              ? "border-gray-400 bg-gray-800 text-white placeholder-gray-400 focus:ring-cyan-500"
              : "border-gray-400 bg-white text-black placeholder-gray-500 focus:ring-cyan-600"
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {undoTask && (
        <div className="mb-4 p-2 bg-yellow-400 rounded-lg flex justify-between items-center max-w-md">
          <span>Note deleted</span>
          <button onClick={undoDelete} className="font-bold underline text-black">
            Undo
          </button>
        </div>
      )}

      {filteredNotes.length === 0 ? (
        <p className="text-gray-400 mt-10 text-center">No notes found 📝</p>
      ) : (
        <Droppable droppableId="notes" direction="horizontal">
          {(provided) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <AnimatePresence>
                {filteredNotes.map((note, index) => (
                  <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                    {(provided) => (
                      <NoteCard
                        note={note}
                        index={index}
                        togglePin={togglePin}
                        deleteNote={deleteNote}
                        provided={provided} // pass draggable props
                      />
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
}
