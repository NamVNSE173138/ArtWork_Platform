export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getUser = () => {
  return fetch("http://localhost:5000/users").then((res) => res.json());
}

export const deleteUser = (id) => {
  return fetch(`http://localhost:5000/users/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
}

export const getArtwork = () => {
  return fetch("http://localhost:5000/artwork").then((res) => res.json());
}

export const deleteArtwork = (id) => {
  return fetch(`http://localhost:5000/artwork/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
}

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
