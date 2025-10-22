import { Trash2, Pin } from "lucide-react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function NoteCard({ note, index, togglePin, deleteNote, provided }) {
  return (
    <motion.div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, rotate: Math.random() * 6 - 3 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`relative rounded-2xl h-48 w-56 shadow-xl hover:scale-105 transition-all duration-300 hover:shadow-cyan-500/40`}
      style={{
        backgroundColor: note.color,
        marginTop: `${Math.random() * -10}px`,
        marginLeft: `${Math.random() * -10}px`,
        zIndex: note.pinned ? 50 : index,
      }}
    >
      {/* Pin Button */}
      <button
        onClick={() => togglePin(index)}
        className={`absolute top-2 left-2 rounded-full p-1 transition-all duration-300 z-20 ${
          note.pinned ? "bg-green-500 hover:bg-green-400" : "bg-yellow-400 hover:bg-yellow-300"
        }`}
      >
        <Pin size={16} className={note.pinned ? "rotate-45" : ""} />
      </button>

      {/* Delete Button */}
      <button
        onClick={() => deleteNote(index)}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-400 transition-all duration-300 hover:rotate-90 z-20"
      >
        <Trash2 size={16} />
      </button>

      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={false} className="h-full w-full p-5 flex flex-col">
        <span className="absolute bottom-2 left-2 text-xl">{note.emoji}</span>
        <h2 className="font-bold text-lg mt-3 mb-2 break-words">{note.title}</h2>
        <p className="text-sm break-words">{note.detail}</p>
      </Tilt>
    </motion.div>
  );
}
