import { connectToDB } from "@/utils/database";
import Product from "@/models/product";
import User from "@/models/user";

export const GET = async (request, context) => {
  try {
    await connectToDB();
    const { id } = await context.params;
    const user = await User.findOne({ _id: id }).populate({
      path: "sepet.product",
      model: "Product", // Ensure this matches the model name for your products
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user.sepet), { status: 200 });
  } catch (error) {
    return new Response("failed to get the product in cards", { status: 500 });
  }
};
