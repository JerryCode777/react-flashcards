import FlashcardList from "./components/FlashcardList";

export default function App() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-accent">
        Flashcard App
      </h1>
      <FlashcardList />
    </div>
  );
}