import { toast } from "react-toastify";

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

export const getUserId = (id) => {
  return fetch(`http://localhost:5000/users/${id}`).then((res) => res.json());
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
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response is not OK!');
      }
      return res.json();
    })
    .then(() => {
      toast.success("User Deleted!!!");
    })
    .catch(error => {
      toast.error(error);
    })
}

export const getArtwork = () => {
  return fetch("http://localhost:5000/artworks").then((res) => res.json());
}

export const getArtworkId = (id) => {
  return fetch(`http://localhost:5000/artworks/${id}`).then((res) => res.json());
}

export const updateArtwork = (id, data) => {
  return fetch(`http://localhost:5000/artworks/${id}`, {
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

export const deleteArtwork = (id) => {
  return fetch(`http://localhost:5000/artworks/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) {
        toast.error('Network response is not OK!');
      } else {
        toast.success("Artwork Deleted!!!");
      }
      return res.json();
    })
}

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
