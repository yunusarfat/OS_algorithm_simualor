import TheoryForm from "../components/theory/TheoryForm";
import TheoryList from "../components/theory/TheoryList";

export default function Theory() {
  return (
    <div className="p-4 space-y-4">
      <TheoryForm />
      <TheoryList />
    </div>
  );
}
