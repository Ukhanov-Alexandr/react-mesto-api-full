import { data } from "autoprefixer";
// import { apiConfig } from './constants'

const apiConfig = {
  url: "https://api.mesto.ukh.nomoredomains.club",
  headers: {
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk0MTU4ODViOWZjNzBhM2VhM2Y2N2UiLCJpYXQiOjE2NzA2NDkyNzEsImV4cCI6MTY3MTI1NDA3MX0.1bkFJYz_GqtXr29qMHCZI9fOPu5UmmLiSqdKqt_3RWU",
    "Content-Type": "application/json",
  },
};

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  async _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const errorCode = res.status;
    const err = await res.json();
    err.errorCode = errorCode;
    return Promise.reject(err);
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  patchProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  setlikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  unlikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  setNewAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api(apiConfig);

export default api;
