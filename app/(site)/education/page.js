import Image from 'next/image';
import PageTransition from '../../../components/PageTransition';
import { EDUCATION } from '../../../content/education.js';

export const metadata = {
  title: 'Education - Luke McMeans',
};

export default function EducationPage() {
  return (
    <PageTransition>
      <div className="activity-tab uva">
        <Image
          className="company-image mono-logo"
          src={EDUCATION.image}
          width={EDUCATION.width}
          height={EDUCATION.height}
          alt=""
          priority
        />
        <span className="activity-title">
          {EDUCATION.title}
        </span>
        <div className="minor">{EDUCATION.minor}</div>
        <div className="activity-date">{EDUCATION.date}</div>
        <ul className="tasks">
          {EDUCATION.tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
          <li>Relevant Coursework:
            <ul>
              {EDUCATION.coursework.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </PageTransition>
  );
}
