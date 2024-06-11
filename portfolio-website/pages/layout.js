import Navbar from "./navbar.js";

export default function Layout({ children }){
  return (
    <div className="whole-page">
      <link rel="icon" href="/public/favicon.ico" type="image/x-icon"></link>
      <Navbar />
      <div className="background">
        <main className="content">
          <div className="gap"></div>
          {children}
        </main>
      </div>
      <div className="bottom-footer">
        <div className="separator"></div>
        <footer>
            <p>Created by Luke McMeans (2024)</p>
            <p>Built using <a href="https://nextjs.org/" target="_blank">Next.js</a></p>
        </footer>
      </div>
    </div>
  );
};
