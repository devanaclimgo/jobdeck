const API_URL = "http://localhost:3000";

export async function getJobs() {
  return fetch(`${API_URL}/api/v1/jobs`, {
    credentials: "include",
  });
}

export async function createJob(job: any) {
  return fetch(`${API_URL}/api/v1/jobs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job }),
  });
}

export async function updateJob(id: string, job: any) {
  return fetch(`${API_URL}/api/v1/jobs/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job }),
  });
}

export async function deleteJob(id: string) {
  return fetch(`${API_URL}/api/v1/jobs/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}