import Layout from "./layout.js";
import Image from "next/image";

export default function HomePage() {
  return (
    <Layout>
      <title>Luke McMeans - Resume</title>
      <h1>
        Resume 
        <a href="/LukeMcMeans_Resume.pdf" download="/LukeMcMeans_Resume.pdf">
          <Image
            className="download-icon"
            src="/images/dark-mode/downloadIcon-dark.png"
            width={30}
            height={30}
          />
        </a>
      </h1>
      <iframe src="/LukeMcMeans_Resume.pdf" allowfullscreen/>
    </Layout>
  );
}