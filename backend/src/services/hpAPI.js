import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.API_BASE_URL;

export async function getCharacters() {
  const { data } = await axios.get(`${BASE_URL}/characters`);
  return data;
}
