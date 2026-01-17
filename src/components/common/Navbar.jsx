import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="p-4 border-b flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/theory">Theory</Link>
      <Link to="/simulate">Simulation</Link>
    </div>
  );
}
