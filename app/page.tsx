import Image from "next/image";
import Navbar from "./navbar.js";

export default function Home() {
  return (
    <div className="whole-page">
        <Navbar />
        <main className="content">
            Hello
        </main>
    </div>
  );
}