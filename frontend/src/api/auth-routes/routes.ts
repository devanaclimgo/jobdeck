const API_URL = "http://localhost:3000";

export async function signIn(email: string, password: string) {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  });
}

export async function signUp(name: string, email: string, password: string) {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        name,
        email,
        password,
      },
    }),
  });
}

export async function logout() {
  return fetch(`${API_URL}/logout`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function me() {
  return fetch(`${API_URL}/api/v1/me`, {
    credentials: "include",
  });
}
