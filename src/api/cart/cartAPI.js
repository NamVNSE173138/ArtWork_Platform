import { toast } from "react-toastify";
import axios from "axios";

export const getCartItemById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/carts/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error!!!', error);
    throw error;
  }
};

export const addToCart = (data) => {
  return fetch(`http://localhost:5000/carts`, {
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
      console.error('There was a problem with the createCart request:', error);
    });
}

export const deleteCartItem = (id) => {
  return fetch(`http://localhost:5000/carts/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response is not OK!');
      }
      return res.json();
    })
    .then(() => {
      toast.success("Item Deleted!!!");
    })
    .catch(error => {
      toast.error(error);
    })
}