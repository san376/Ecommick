// app/about/page.tsx
"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";

export default function AboutPage() {
    const { isSignedIn, user } = useUser();

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12 -mt-2">
                <div className="max-w-3xl text-center">
                    {/* <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1> */}
                    <p className="text-lg text-gray-600 mb-6">
                        Welcome to <span className="font-semibold">Ecommick</span>, your trusted
                        online shopping destination. We bring you a wide range of high-quality
                        products at affordable prices, delivered right to your doorstep.
                    </p>

                    <p className="text-lg text-gray-600 mb-6">
                        Our mission is to make online shopping simple, secure, and enjoyable for
                        everyone. From fashion and electronics to home essentials, we carefully
                        select every product to ensure quality and customer satisfaction.
                    </p>

                    <p className="text-lg text-gray-600 mb-6">
                        {isSignedIn ? (
                            <>
                                Thanks for being with us,{" "}
                                <span className="font-semibold">{user?.firstName}</span>
                            </>
                        ) : (
                            "Sign in to enjoy personalized recommendations and exclusive offers."
                        )}
                    </p>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Why Choose Us?</h2>
                        <ul className="text-gray-600 list-disc list-inside text-left space-y-2">
                            <li>✨ Wide product range with top quality</li>
                            <li>🚚 Fast & reliable delivery</li>
                            <li>🔒 Secure payments with Razorpay</li>
                            <li>💬 24/7 customer support</li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-10 p-6 bg-white rounded-2xl shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Contact Us</h2>
                        <p className="text-gray-600">📞 Phone: <span className="font-medium">+1 (555) 123-4567</span></p>
                        <p className="text-gray-600">📧 Email: <span className="font-medium">Ecommick@gmail.com</span></p>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}
