import { toast } from "react-toastify";
const userToken = localStorage.getItem("USER");

export const getAllFollows = () => {
  return fetch(`http://localhost:5000/follows`).then((res) => res.json());
}

export const getFollowersById = (id) => {
  return fetch(`http://localhost:5000/follows/follower/${id}`).then((res) => res.json());
}

export const getFollowingById = (id) => {
  return fetch(`http://localhost:5000/follows/following/${id}`).then((res) => res.json());
}

export const createFollower = (id) => {
  return fetch(`http://localhost:5000/follows/${id}`, {
    method: 'POST',
    headers: {
      token: userToken,
    },
  }).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
    .then(responseData => {
      console.log("Create successful", responseData);
    })
    .catch(error => {
      console.error('There was a problem with the createReport request:', error);
    });
}


export const deleteFollower = (id) => {
  return fetch(`http://localhost:5000/follows/${id}`, {
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