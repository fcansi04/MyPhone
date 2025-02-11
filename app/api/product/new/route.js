import { connectToDB } from "@/utils/database";
import Product from "@/models/product";

export const POST = async (req, res) => {
  const { name, image, description, price } = await req.json();

  try {
    await connectToDB();
    const newPoduct = await Product.create({
      name,
      image,
      description,
      price,
    });
    return new Response(JSON.stringify(newPoduct), { status: 201 });
  } catch (error) {
    return new Response("failed to create a new product", { status: 500 });
  }
};
