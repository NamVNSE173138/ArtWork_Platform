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

export const updateUser = (id, data) => {
  return fetch(`http://localhost:5000/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(responseData => {
      console.log("Update successful", responseData);
    })
    .catch(error => {
      console.error('There was a problem with the updateUser request:', error);
    });
}

export const deleteUser = (id) => {
  return fetch(`http://localhost:5000/users/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
}

export const getArtwork = () => {
  return fetch("http://localhost:5000/artworks").then((res) => res.json());
}

export const deleteArtwork = (id) => {
  return fetch(`http://localhost:5000/artworks/${id}`, {
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
