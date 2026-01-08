import axios from 'axios';

export async function ask(question) {
  const { data } = await axios.post('/chat', { question });
  return data.answer;
}
