export const BASE_URL = "https://api.mesto.ukh.nomoredomains.club";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => res.json())
    .then((data) => {
        // console.log(data.token)
      if (data) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res.json());
      return res.json()
    })
    .then((data) => {
      console.log(data);
      return data;
    })
  } 

