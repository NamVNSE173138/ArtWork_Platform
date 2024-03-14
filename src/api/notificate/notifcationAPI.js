import { toast } from "react-toastify";
import axios from "axios";

const userToken = localStorage.getItem("USER");

export const getAllNotification = () => {
  return fetch(`http://localhost:5000/notifications`).then((res) => res.json());
}

export const markNotificationAsRead = async (id) => {
  try {
    const response = await axios.patch(`http://localhost:5000/notifications/${id}`);
    console.log('Notification marked as read:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

export const getNotificationById = (id) => {
  return fetch(`http://localhost:5000/notifications/${id}`).then((res) => res.json());
}

export const createNotification = (data) => {
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

export const deleteNotification = (id) => {
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

export const requestNotification = (id) => {
  return fetch(`http://localhost:5000/notifications/request/${id}`, {
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

export const declineNotification = (id) => {
  return fetch(`http://localhost:5000/notifications/decline/${id}`, {
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


export const approveNotification = (id) => {
  return fetch(`http://localhost:5000/notifications/approve/${id}`, {
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

