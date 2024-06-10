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
            className="mcmeans-headshot"
            src='/images/mcmeans-headshot.jpeg'
            width={200}
            height={200}
          />
          <div className="name-card">
            <text>Luke McMeans</text>
            <text>Aspring Software Engeineer</text>
            <text>
              Student at the University of Virginia 
              <Image
                className="uvaLogo"
                width={20}
                height={20}
              />
            </text>
            <text>-Computer Sciecne Major</text>
            <text>-Data Science Minor</text>
          </div>
        </div>
        <text>
          Enthusiastic computer science student with a strong foundation in software development, programming languages, data structures, and mathematics. Committed to providing detail-driven work while staying efficient and accurate. Proven history of organization, teamwork, and management both in and outside the classroom. Aspires to utilize abilities while further developing skills and gaining real-world experience, contributing to the success of a dynamic software development team.
        </text>
      </div>
    </Layout>
  );
}