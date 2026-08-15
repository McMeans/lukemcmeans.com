import PageTransition from '../../../components/PageTransition';
import ResumeFrame from '../../../components/ResumeFrame';

export const metadata = {
  title: 'Resume - Luke McMeans',
};

export default function ResumePage() {
  return (
    <PageTransition>
      <ResumeFrame />
    </PageTransition>
  );
}
