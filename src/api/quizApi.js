import apiInstance from "./apiInstance";

const quizApi = {
  getAll: () => {
    return apiInstance.get(`/api.php?amount=10`)
  }
}

export default quizApi