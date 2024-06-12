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
        <footer className="all-socials">
          <a href="mailto:elukemcmeans@gmail.com" target="_blank" rel="noopener noreferrer">
            <Image 
              className="emailIcon-dark"
              src='/images/dark-mode/emailIcon-dark.png'
              width={16}
              height={16}
            />
            <text>elukemcmeans@gmail.com</text>
          </a>
          <a href="https://www.linkedin.com/in/luke-mcmeans/" target="_blank" rel="noopener noreferrer">
            <Image 
              className="linkedinLogo-dark"
              src='/images/dark-mode/linkedinLogo-dark.png'
              width={16}
              height={16}
            />
            <text>in/luke-mcmeans</text>
          </a>
          <a href="https://github.com/McMeans" target="_blank" rel="noopener noreferrer">
            <Image 
              className="githubLogo-dark"
              src='/images/dark-mode/githubLogo-dark.png'
              width={16}
              height={16}
            />
            <text>@McMeans</text>
          </a>
        </footer>
      </div>
      <h1>Projects</h1>
      <div className="projects">
        <div className="project-tab">
          <text className="project-title">Loggd</text>
          <Image
            className="project-photo"
            src="/images/project-photos/loggdScreenshot.png"
            width={0}
            height={0}
            layout="responsive"
          />
          <text className="description">
            This Google Chrome Extension redirects the user to the page of the movie they input. 
            They have the ability to navigate to either the Letterboxd, IMDb, TMDB, Rotten Tomatoes, or
            Metacritic page for their movie. I constructed the frontend of this project and prompt-engineered 
            the initial backend with GPT 3.5. Any instance of maintenance has been handled by me. Published 
            August 2023; last updated June 2024. Safari Extension coming soon.
          </text>
          <div className="hotlinks">
          <a className="title" href="https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm" target="_blank" rel="noopener noreferrer">
              <Image
                className="loggdLogo"
                src='/images/loggdLogo.png'
                width={30}
                height={30}
              />
              ← Chrome Download
            </a>
            {/*<a className="title" href="https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm" target="_blank" rel="noopener noreferrer">
              <Image
                className="loggdLogo"
                src='/images/loggdLogo.png'
                width={30}
                height={30}
              />
              ← Safari Download
            </a>*/}
            <a className="title" href="https://github.com/McMeans/loggd" target="_blank" rel="noopener noreferrer">
              <Image
                className="githubRedirect"
                src='/images/dark-mode/githubLogo-dark.png'
                width={30}
                height={30}
              />
              ← GitHub Page
            </a>
          </div>
        </div>
        <div className="project-tab" id="cville-top8s">
          <text className="project-title">Charlottesville Top8s</text>
          <Image
            className="project-photo"
            src="/images/project-photos/cvilletop8sScreenshot.png"
            width={0}
            height={0}
            layout="responsive"
          />
          <text className="description">
            Built for the Charlottesville Super Smash Brothers Community and club at UVA, 
            this website generates Top 8 graphics for tournament results inputted by the user.
            Users are able to display each player's name, X/Twitter handle, primary character, 
            and secondary characters, with the ability to upload a custom photo if desired.
            Templates were designed for each of the weekly tournaments in the area. This 
            program was built using the Django framework and Pillow. Published June 2024.
          </text>
          <div className="hotlinks">
            <a className="title" href="https://charlottesville-top8s-50b4ab9ef36b.herokuapp.com/" target="_blank" rel="noopener noreferrer">
              <Image
                className="cvilletop8sLogo"
                src='/images/cvilletop8sLogo.png'
                width={30}
                height={30}
              />
              ← Click to Visit
            </a>
            <a className="title" href="https://github.com/McMeans/charlottesville-top8s" target="_blank" rel="noopener noreferrer">
              <Image
                className="githubRedirect"
                src='/images/dark-mode/githubLogo-dark.png'
                width={30}
                height={30}
              />
              ← GitHub Page
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}