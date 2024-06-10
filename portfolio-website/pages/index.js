import Layout from "./layout.js";
import Image from "next/image";
import Link from 'next/link';

export default function HomePage() {
  return (
    <Layout>
      <title>Luke McMeans - Home</title>
      <div className="home-header">
        <div className="home-name">
          <Image
            className="mcmeansLogo-dark"
            src='/images/mcmeans-headshot.jpeg'
            width={200}
            height={200}
          />
          <div className="name-card">

          </div>
        </div>
      </div>
    </Layout>
  );
}