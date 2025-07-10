import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Order from "@/models/Order";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid data' });
    }

    // calculate amount using items
    const amount = await items.reduce(async (acc, item) => {
        const product = await Product.findById(item.product)
        return await acc + product.offerPrice * item.quantity
    },0);


      await Order.create({
      userId,
      address,
      items,
      amount: amount + Math.floor(amount * 0.02),
      date: new Date()
    });
    
    await inngest.send({
        name: 'order/created',
        data:{
            userId,
            address,
            items,
            amount: amount + Math.floor(amount * 0.02),
            date: Date.now()
        }
    })

    //clear user cart
    const user = await User.findById(userId)
    user.cartItems = {}
    await user.save()

    return NextResponse.json({success: true, message:'Order Placed'})

  } catch (error) {
    console.log(error)
    return NextResponse.json({success: false, message:error.message})
  }
}





// import { inngest } from "@/config/inngest";
// import Product from "@/models/Product";
// import User from "@/models/User";
// import Order from "@/models/Order"; // ✅ Make sure you have this model created
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { userId } = getAuth(request);
//     const { address, items } = await request.json();

//     // ✅ Validate request body
//     if (!address || !Array.isArray(items) || items.length === 0) {
//       return NextResponse.json({ success: false, message: "Invalid data" });
//     }

//     // ✅ Calculate amount
//     let amount = 0;
//     for (const item of items) {
//       const product = await Product.findById(item.product);
//       if (!product) {
//         return NextResponse.json({ success: false, message: "Invalid product" });
//       }
//       amount += product.offerPrice * item.quantity;
//     }

//     const finalAmount = amount + Math.floor(amount * 0.02); // add 2% fee

//     // ✅ Save order in DB
//     await Order.create({
//       userId,
//       address,
//       items,
//       amount: finalAmount,
//       date: new Date()
//     });

//     // ✅ Send to inngest
//     await inngest.send({
//       name: "order/created",
//       data: {
//         userId,
//         address,
//         items,
//         amount: finalAmount,
//         date: Date.now()
//       }
//     });

//     // ✅ Clear user's cart
//     const user = await User.findById(userId);
//     user.cartItems = {};
//     await user.save();

//     return NextResponse.json({ success: true, message: "Order Placed" });
//   } catch (error) {
//     console.error("Order error:", error);
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }
