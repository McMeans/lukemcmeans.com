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
      <title>Experience - Luke McMeans</title>
      <div className="activity-tab timmons">
        <Image
            className="company-image mono-logo"
            src='/images/project-experience/timmons.png'
            width={30*(2000/548)}
            height={30}
        />
        <text className="activity-title">
            Software Engineer
        </text>
        <span className="activity-date">01/2026 - Present</span>
        <ul className="tasks">
            <li>Own technical leadership across 4 client projects, driving active development and modernization efforts</li>
            <li>Orchestrated AI agents to implement tickets, raising merged PRs from ~1–5 to 7–10 weekly after review</li>
            <li>Expanding Playwright E2E coverage from ~35% of critical user flows on an active client project</li>
            <li>Leading .NET 6 to .NET 10 modernization, including broader project architecture upgrades on .NET 10</li>
            <li>Enhancing a company-wide feedback platform and integrating it into projects beyond Basecamp/spreadsheets</li>
        </ul>
        <text className="activity-title">
            Software Engineering Intern
        </text>
        <span className="activity-date">05/2025 - 12/2025</span>
        <ul className="tasks">
            <li>Designed DB tables, CRUD APIs, and React UI to assign 500+ client employees in-app vs manual spreadsheets</li>
            <li>Added in-app real-time area calculations, speeding demos by cutting ArcGIS Online round-trips</li>
            <li>Collaborated with solutions architects and senior developers on the React turnkey template for new projects</li>
            <li>Led stakeholder demos that secured client approval to advance features into UAT for release</li>
        </ul>
      </div>
      <div className="activity-tab carahsoft">
        <Image
            className="company-image mono-logo"
            src='/images/project-experience/carahsoft.png'
            width={25*(826/171)}
            height={25}
        />
        <text className="activity-title">
            Software Development Intern
        </text>
        <span className="activity-date">06/2024 - 08/2024</span>
        <ul className="tasks">
            <li>Developed REST API database functions to view, create, and manage care packages for 5000+ vendors</li>
            <li>Created an xUnit project with over 30 tests to reinforce an automated care package delivery service</li>
            <li>Converted 100+ API client functions to asynchronous for enhanced response time and scalability</li>
            <li>Collaborated with teams of 4–8 to provide refactoring and debugging support, ensuring efficient code</li>
        </ul>
      </div>
      <div className="activity-tab tln">
        <Image
            className="company-image mono-logo"
            src='/images/project-experience/tln.png'
            width={30*(1079/527)}
            height={30}
        />
        <text className="activity-title">
            Vice President of Video Editing
        </text>
        <span className="activity-date">02/2021 - 09/2021</span>
        <ul className="tasks">
            <li>Boosted efficiency by over 50% using video editing software expertise to produce high-quality content</li>
            <li>Supervised the work of 4 incoming trainees, providing guidance to maintain production value</li>
            <li>Trusted with publishing over 20 finalized videos across the brand’s social media and podcast platforms</li>
        </ul>
      </div>
    </motion.div>
  );
}