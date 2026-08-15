export const PROJECTS = [
  {
    slug: 'loggd',
    title: 'Loggd',
    image: '/images/project-experience/loggd.png',
    mono: true,
    action: { href: '/loggd-redirect', label: 'Download' },
    github: 'https://github.com/McMeans/loggd',
    description: (
      <>
        This web extension redirects the user to the page of the movie they input.
        They have the ability to navigate to either the Letterboxd, IMDb, TMDB, Rotten Tomatoes, or
        Metacritic page for their movie. I constructed the frontend of this project and prompt-engineered
        the initial backend with GPT 3.5. Any instance of maintenance has been handled by me. Compatible
        with <a href="https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium"
          target="_blank" rel="noopener noreferrer">Chromium-based browsers</a> and Firefox. Published
        August 2023; last updated June 2024.
      </>
    ),
  },
  {
    slug: 'top8s',
    title: 'Charlottesville Top8s',
    image: '/images/project-experience/top8s.png',
    mono: false,
    action: { href: '/top8s', label: 'Visit' },
    github: 'https://github.com/McMeans/charlottesville-top8s',
    description: (
      <>
        Built for the Charlottesville Super Smash Brothers Community and club at UVA,
        this website generates Top 8 graphics for tournament results inputted by the user.
        Users are able to display each player's name, X/Twitter handle, primary character,
        and secondary characters, with the ability to upload a custom photo if desired.
        Templates were designed for each of the weekly tournaments in the area. This
        program was built using the Django framework and Pillow. Published June 2024.
      </>
    ),
  },
];
