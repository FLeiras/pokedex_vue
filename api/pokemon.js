import axios from "axios";

export default async function handler(req, res) {
  const { path } = req.query;
  const url = `https://pokeapi.co/api/v2${path}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from PokeAPI" });
  }
}
