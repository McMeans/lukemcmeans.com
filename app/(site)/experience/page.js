import { Fragment } from 'react';
import Image from 'next/image';
import PageTransition from '../../../components/PageTransition';
import { EXPERIENCE } from '../../../content/experience.js';

export const metadata = {
  title: 'Experience - Luke McMeans',
};

export default function ExperiencePage() {
  return (
    <PageTransition>
      {EXPERIENCE.map((job, index) => (
        <div key={job.slug} className={`activity-tab ${job.slug}`}>
          <Image
            className="company-image mono-logo"
            src={job.image}
            width={job.width}
            height={job.height}
            alt=""
            priority={index === 0}
          />
          {job.roles.map((role) => (
            <Fragment key={role.title}>
              <span className="activity-title">
                {role.title}
              </span>
              <span className="activity-date">{role.date}</span>
              <ul className="tasks">
                {role.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </Fragment>
          ))}
        </div>
      ))}
    </PageTransition>
  );
}
