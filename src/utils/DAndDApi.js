class DAndDApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _request(config) {
    return fetch(`${this._baseUrl}${config.endpoint}`, config.requestOptions)
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        return data;
      })
      .catch((err) => console.error("Error: ", err));
  }

  getMonsterCards(page) {
    const config = {
      endpoint: `/monsters/?page=${page}`,
      requestOptions: {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    };

    return this._request(config);
  }

  getMonsterCardsByName(name) {
    const config = {
      endpoint: `/monsters/?name__iexact=${name}`,
      requestOptions: {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    };

    return this._request(config);
  }

  getClasses() {
    const config = {
      endpoint: `/classes`,
      requestOptions: {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    };

    return this._request(config);
  }

  getRaces() {
    const config = {
      endpoint: `/races`,
      requestOptions: {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    };

    return this._request(config);
  }

  waitForSpinnerElement() {
    return new Promise((resolve) => {
      const checkSpinner = () => {
        const spinnerElement = document.querySelector('.spinner');
        if(spinnerElement) {
          resolve(spinnerElement);
        } else {
          setTimeout(checkSpinner, 100);
        }
      };
      checkSpinner();
    })
  }

  async getUserInfo() {
    let spinnerElement = await this.waitForSpinnerElement().catch(() => null);
    if(spinnerElement) {
      renderLoading(true, spinnerElement);
    }
    
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      if(spinnerElement) {
        renderLoading(false, spinnerElement)
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(`Error: ${err}`)
      if(spinnerElement) {
        renderLoading(false, spinnerElement)
      }
    })
    .finally(() => {
      if(spinnerElement) {
        renderLoading(false, spinnerElement)
      }
    });
  }

  editUser(name, about) {
    const config = {
      endpoint: '/users/me',
      requestOptions: {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      }
    };

    return this._request(config);
  }

  addNewCard(name, link) {
    const config = {
      endpoint: '/cards',
      requestOptions: {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link,
          likes: []
        })
      }
    };

    return this._request(config);
  }

  removeCard(cardId) {
    const config = {
      endpoint: `/cards/${cardId}`,
      requestOptions: {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      }
    };

    return this._request(config);
  }

  addLike(cardId) {
    const config = {
      endpoint: `/cards/likes/${cardId}`,
      requestOptions: {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      }
    };

    return this._request(config);
  }

  removeLike(cardId) {
    const config = {
      endpoint: `/cards/likes/${cardId}`,
      requestOptions: {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      }
    };

    return this._request(config);
  }

  updateAvatar(avatarUrl) {
    const config = {
      endpoint: '/users/me/avatar',
      requestOptions: {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: avatarUrl
        })
      }
    };

    return this._request(config);
  }
}

function renderLoading(isLoading, spinnerElement) {
  if(isLoading) {
    spinnerElement.classList.add('spinner_visible');
  } else {
    spinnerElement.classList.remove('spinner_visible');
  }
}

const api = new DAndDApi({
  baseUrl : 'https://api.open5e.com/v1',
  // baseUrl : 'https://www.dnd5eapi.co/api',
})

export default api;
