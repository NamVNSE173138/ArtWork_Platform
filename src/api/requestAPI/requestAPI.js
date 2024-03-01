import { toast } from "react-toastify";

export const getRequest = () => {
  return fetch("http://localhost:5000/requests").then((res) => res.json());
}

export const getRequestId = (id) => {
  return fetch(`http://localhost:5000/requests/${id}`).then((res) => res.json());
}

export const countRequest = () => {
  return fetch("http://localhost:5000/requests/count").then((res) => res.json());
}

export const updateRequest = (id, data) => {
  return fetch(`http://localhost:5000/requests/${id}`, {
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

export const deleteRequest = (id) => {
  return fetch(`http://localhost:5000/requests/${id}`, {
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