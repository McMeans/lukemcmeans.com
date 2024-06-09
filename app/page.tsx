import Image from "next/image";
import Navbar from "./navbar.js";

export default function Home() {
  return (
    <div>
        <Navbar />
        <div id="body">
            Hello
        </div>
    </div>
  );
}