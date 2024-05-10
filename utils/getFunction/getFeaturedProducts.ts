import axios from "axios";

export async function getAllFeaturedProducts() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/products/featured`);
  if(response.status !== 200) {
    throw new Error("Failed to fetch products");
  }
  const data = response.data;
  console.log(data)
  return data;
}