import axios from 'axions';

const API_URL = 'http://localhost:5000/api/groups';


export const createGroup = async (name, courseId, memberIds) => {
    try {
      const response = await axios.post(`${API_URL}/create`, { name, courseId, memberIds });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };



  export const addUserToGroup = async (groupId, userId) => {
    try {
      const response = await axios.post(`${API_URL}/${groupId}/adduser`, { userId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export const addStudyMaterial = async (groupId, title, content, uploadedBy) => {
    try {
      const response = await axios.post(`${API_URL}/${groupId}/addStudyMaterial`, { title, content, uploadedBy });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export const getGroups = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };