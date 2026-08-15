import Image from 'next/image';
import PageTransition from '../../../components/PageTransition';
import { PROJECTS } from '../../../content/projects.js';

export const metadata = {
  title: 'Projects - Luke McMeans',
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      {PROJECTS.map((project, index) => (
        <div key={project.slug} className={`activity-tab ${project.slug}`}>
          <div className="activity-title">
            <Image
              className={`project-image${project.mono ? ' mono-logo' : ''}`}
              src={project.image}
              width={40}
              height={40}
              alt=""
              priority={index === 0}
            />
            <span>{project.title}</span>
          </div>
          <span className="description">
            {project.description}
          </span>
          <div className="home-actions">
            <a className="glass-btn home-resume" href={project.action.href} target="_blank" rel="noopener noreferrer">{project.action.label}</a>
            <div className="socials">
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Image
                  className="social-index"
                  src="/images/socials/github.png"
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      ))}
    </PageTransition>
  );
}
