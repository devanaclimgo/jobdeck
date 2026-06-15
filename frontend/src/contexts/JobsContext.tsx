import { createContext } from "react";
import type { Job, JobStatus } from "../lib/types";
import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import {
  createJob,
  getJobs,
  updateJob as updateJobRequest,
  deleteJob as deleteJobRequest,
} from "../api/job-routes/routes";

export type JobInput = Omit<Job, "id" | "createdAt" | "updatedAt">;

type JobsContextValue = {
  jobs: Job[];
  loading: boolean;
  addJob: (input: JobInput) => Promise<Job>;
  updateJob: (id: string, input: JobInput) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  moveJob: (id: string, status: JobStatus) => Promise<void>;
};

const JobsContext = createContext<JobsContextValue | null>(null);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await getJobs();

        if (!response.ok) throw new Error();

        const data = await response.json();

        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  const addJob = useCallback(async (input: JobInput) => {
    const response = await createJob(input);

    if (!response.ok) {
      throw new Error("Failed to create job");
    }

    const job = await response.json();

    setJobs((prev) => [job, ...prev]);

    return job;
  }, []);

  const updateJob = useCallback(async (id: string, input: JobInput) => {
    const response = await updateJobRequest(id, input);

    if (!response.ok) {
      throw new Error("Failed to update job");
    }

    const updatedJob = await response.json();

    setJobs((prev) => prev.map((job) => (job.id === id ? updatedJob : job)));
  }, []);

  const deleteJob = useCallback(async (id: string) => {
    const response = await deleteJobRequest(id);

    if (!response.ok) {
      throw new Error("Failed to delete job");
    }

    setJobs((prev) => prev.filter((job) => job.id !== id));
  }, []);

  const moveJob = useCallback(
    async (id: string, status: JobStatus) => {
      const job = jobs.find((j) => j.id === id);

      if (!job) return;

      const response = await updateJobRequest(id, {
        ...job,
        status,
      });

      if (!response.ok) {
        throw new Error("Failed to move job");
      }

      const updatedJob = await response.json();

      setJobs((prev) => prev.map((job) => (job.id === id ? updatedJob : job)));
    },
    [jobs],
  );

  const value = useMemo<JobsContextValue>(
    () => ({ jobs, loading, addJob, updateJob, deleteJob, moveJob }),
    [jobs, loading, addJob, updateJob, deleteJob, moveJob],
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error("useJobs must be used within a JobsProvider");
  return ctx;
}
