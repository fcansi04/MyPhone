import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const POST = async (request) => {
  const session = await getServerSession(authOptions);

  try {
    await connectToDB();
    const { productID, quantity } = await request.json();
    const theuser = await User.findOne({ email: session?.user.email });

    const existingCard = await theuser.sepet.find(
      (item) => item.product.toString() === productID
    );

    if (existingCard) {
      existingCard.quantity += 1;
      await theuser.save();
      return new Response("quantity updated", { status: 200 });
    } else {
      await theuser.sepet.push({ product: productID, quantity: quantity });
      await theuser.save();

      return new Response("succedd at api card", { status: 200 });
    }
  } catch (error) {
    return new Response("failed at api card", { status: 500 });
  }
};
