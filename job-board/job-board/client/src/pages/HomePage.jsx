import JobList from '../components/JobList';
import { jobs } from '../lib/fake-data';
import { getJobs } from '../lib/graphql/queries';
import { useEffect, useState } from 'react';
 
 getJobs().then((jobs) => console.log('jobs:', jobs));

function HomePage() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  console.log('[HomePage] jobs:', jobs);
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
