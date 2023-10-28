import Swal from "sweetalert2"
import axios from 'axios';

export const API_BASE_URL = 'http://localhost:6543'

export const getHeaders = () => {
    const token = localStorage.getItem('token');
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    };

export const showAlert = (icon, title, html) => {
  Swal.fire({
      icon,
      title,
      html,
    });
   };

export const fetchLists = async (setCards) => {
try {
  const response = await axios.get(`${API_BASE_URL}/api/v1/lists`, getHeaders());

  if (response.data && response.data.success) {
    const lists = response.data.data;

    if (Array.isArray(lists)) {
      const cards = lists.map((list) => ({
        id: list._id,
        username: list.username,
        title: list.list,
        priority: list.property,
        status: list.status,
        dueDate: list.dueDate, 
        date: list.date, 
      }));

      setCards(cards);
    } else {
      console.error('Invalid response structure - expected an array:', lists);
    }
  } else {
    console.error('Invalid response structure - missing success property or success is not true:', response.data);
  }
} catch (error) {
  console.error('Error fetching lists:', error.message);
}};
  
  
  

