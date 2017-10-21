import axios from 'axios';

const initalState = {
  houses: [],
  loadingHouses: false,
  favoriteHouses: [],
  loadingFavorites: false
};

const GET_HOUSES = 'GET_HOUSES';
const GET_FAVORITES = 'GET_FAVORITES';

export default function reducer(state = initalState, action) {
  switch (action.type) {
    case `${GET_HOUSES}_PENDING`:
      return Object.assign({}, state, { loadingHouses: true });
    case `${GET_HOUSES}_FULFILLED`:
      return Object.assign({}, state, { loadingHouses: false, houses: action.payload });
    case `${GET_FAVORITES}_PENDING`:
      return Object.assign({}, state, { loadingFavorites: true });
    case `${GET_FAVORITES}_FULFILLED`:
      return Object.assign({}, state, { loadingFavorites: false, favoriteHouses: action.payload });
    default:
      return state;
  }
}

export function getHouses() {
  return {
    type: GET_HOUSES,
    payload: axios.get('/api/properties')
      .then(houses => houses.data
      )
  };
}

export function getFavorites() {
  return {
    type: GET_FAVORITES,
    payload: axios.get('/api/favoritesid')
      .then(favorites => favorites.data
      )
  };
}

export function favoriteHouse(houseId) {
  return {
    type: GET_FAVORITES,
    payload: axios.post(`/api/favorites/${houseId}`).then(favHouses => favHouses.data)
  };
}

export function unfavoriteHouse(houseId) {
  return {
    type: GET_FAVORITES,
    payload: axios.delete(`/api/favorites/${houseId}`).then(favHouses => favHouses.data)
  };
}
