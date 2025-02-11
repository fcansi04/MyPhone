import { connectToDB } from "@/utils/database";
import Product from "@/models/product";

export const GET = async (request, context) => {
  try {
    await connectToDB();
    const { id } = await context.params;

    const product = await Product.findOne({ _id: id });
    if (!product) {
      return new Response("single produt not found", { status: 404 });
    }
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch on single product", { status: 500 });
  }
};
