import { connectToDB } from "@/utils/database";
import Product from "@/models/product";

export const POST = async (request, response) => {
  try {
    await connectToDB();
    const deletedProductID = await request.json();
    await Product.findByIdAndDelete(deletedProductID);
    return new Response("product deleted", { status: 200 });
  } catch (error) {
    return new Response("product deletion failed", { status: 500 });
  }
};
