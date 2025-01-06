import Image from "next/image";
import { motion } from 'framer-motion';
import { variants } from '../utils/variants.js';

export default function HomePage() {
  return (
    <motion.div
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
      <title>Projects - Luke McMeans</title>
      <div className="activity-tab loggd">
        <div className="activity-title">
            <Image
                className="project-image"
                src='/images/project-experience/loggd.png'
                width={40}
                height={40}
            />
            <p>Loggd</p>
        </div>
        <text className="description">
            This web extension redirects the user to the page of the movie they input. 
            They have the ability to navigate to either the Letterboxd, IMDb, TMDB, Rotten Tomatoes, or
            Metacritic page for their movie. I constructed the frontend of this project and prompt-engineered 
            the initial backend with GPT 3.5. Any instance of maintenance has been handled by me. Compatible 
            with <a className="chromium" href="https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium"
            target="_blank" rel="noopener noreferrer">Chromium-based browsers</a> and Firefox. Published 
            August 2023; last updated June 2024.
        </text>
        <a className="project-link" href="/loggd-redirect" target="_blank" rel="noopener noreferrer">Download</a>
        <a className="project-link" href="https://github.com/McMeans/loggd" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
      <div className="activity-tab top8s">
        <div className="activity-title">
            <Image
                className="project-image"
                src='/images/project-experience/top8s.png'
                width={40}
                height={40}
            />
            <p>Charlottesville Top8s</p>
        </div>
        <text className="description">
            Built for the Charlottesville Super Smash Brothers Community and club at UVA, 
            this website generates Top 8 graphics for tournament results inputted by the user.
            Users are able to display each player's name, X/Twitter handle, primary character, 
            and secondary characters, with the ability to upload a custom photo if desired.
            Templates were designed for each of the weekly tournaments in the area. This 
            program was built using the Django framework and Pillow. Published June 2024.
        </text>
        <a className="project-link" href="/top8s" target="_blank" rel="noopener noreferrer">Visit</a>
        <a className="project-link" href="https://github.com/McMeans/charlottesville-top8s" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </motion.div>
  );
}