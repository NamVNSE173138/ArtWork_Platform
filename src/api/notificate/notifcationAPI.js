import { toast } from "react-toastify";

export const getReportWithUserAndArtwork = () => {
  return fetch(`http://localhost:5000/notifications/user/artwork`).then((res) => res.json());
}

export const getAllNotification = () => {
  return fetch(`http://localhost:5000/notifications`).then((res) => res.json());
}

export const getReportId = (id) => {
  return fetch(`http://localhost:5000/notifications/${id}`).then((res) => res.json());
}

export const createReport = (data) => {
  return fetch("http://localhost:5000/notifications", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
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

export const updateReport = (id, data) => {
  return fetch(`http://localhost:5000/notifications/${id}`, {
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

export const deleteReport = (id) => {
  return fetch(`http://localhost:5000/notifications/${id}`, {
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