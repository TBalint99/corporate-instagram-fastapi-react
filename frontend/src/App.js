import './App.css';
import { motion } from "framer-motion"

function App() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold text-center"
    >Hello world!</motion.div>
  );
}

export default App;
