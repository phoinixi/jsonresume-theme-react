import { Resume } from './components/Resume';
import type { ResumeSchema } from './types/resumeSchema';

interface AppProps {
  resume: ResumeSchema;
}

function App({ resume }: AppProps) {
  return (
    <div className="min-h-screen bg-surface text-foreground">
      <Resume resume={resume} />
    </div>
  );
}

export default App;
