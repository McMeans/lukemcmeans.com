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
            width={250}
            height={250}
          />
          <div className="name-card">
            <text className="name">Luke McMeans</text>
            <text className="title">Aspiring Software Engineer</text>
            <text className="title">
              Student at the University of Virginia 
              <Image
                className="uvaLogo"
                src='/images/uvaLogo.png'
                width={28}
                height={28}
              />
            </text>
            <text className="major-minor">Computer Science Major</text>
            <text className="major-minor">Data Science Minor</text>
          </div>
        </div>
        <text className="description">
          Enthusiastic computer science student with a strong foundation 
          in software development, programming languages, data structures, 
          and mathematics. Committed to providing detail-driven work while 
          staying efficient and accurate. Proven history of organization, 
          teamwork, and management both in and outside the classroom. Aspires 
          to utilize abilities while further developing skills and gaining 
          real-world experience, contributing to the success of a dynamic 
          software development team.
        </text>
      </div>
      <h1>Projects</h1>
      <div className="projects">
        <div className="project-tab">
          <text className="project-title">Loggd</text>
          {/* TODO: ADD IMAGES*/}
          <text className="description">
            A Google Chrome Extension that brings the user to the IMDB, Letterboxd, 
            Rotten Tomatoes, or Metacritic page of a movie they input. I constructed
            the frontend while prompt-engineering the initial backend using GPT 3.5. Published August 2023.
          </text>
          <div className="hotlinks">
            <text className="title">{/* ADD <a> */} ⬅️ Click to Download</text>
            <text className="title">{/* ADD <a> */} ⬅️ GitHub Page</text>
          </div>
        </div>
        <div className="project-tab" id="cville-top8s">
          <text className="project-title">Charlottesville Top8s</text>
          {/* TODO: ADD IMAGES*/}
          <text className="description">
            Built for the Charlottesville Smash Community and club at UVA, this website 
            constructs Top 8 graphics for tournament results that are inputted by the user.
            Built using the Django framework and Pillow. Published June 2024.
          </text>
          <div className="hotlinks">
            <text className="title">{/* ADD <a> */} ⬅️ Click to Visit</text>
            <text className="title">{/* ADD <a> */} ⬅️ GitHub Page</text>
          </div>
        </div>
      </div>
    </Layout>
  );
}