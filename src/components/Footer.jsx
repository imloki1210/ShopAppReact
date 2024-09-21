import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-2">SUBSCRIBE</h4>
            <p className="mb-4">Stay updated with our latest news and offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 p-2 rounded-l-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold">CONTACT US</h4>
            <p>Phone: 9999999999</p>
            <p>Email: yehbhinhipata@gmail.com</p>
            <h4 className="mt-4 text-lg font-semibold">CURRENCY</h4>
            <p className="flex items-center">
              <img
                src="ind.png"
                alt="INDIAN CURRENCY"
                className="w-6 h-6 mr-2"
              />
              IND
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold">OTHER</h4>
            <ul className="mt-2 p-0">
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Stories</li>
              <li className="hover:underline cursor-pointer">Boutiques</li>
              <li className="hover:underline cursor-pointer">Contact Us</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">LINKS</h4>
            <ul className="mt-2 p-0">
              <li className="hover:underline cursor-pointer">Orders & Shipping</li>
              <li className="hover:underline cursor-pointer">Join/Login as a Seller</li>
              <li className="hover:underline cursor-pointer">Payment & Pricing</li>
              <li className="hover:underline cursor-pointer">Return & Refunds</li>
              <li className="hover:underline cursor-pointer">FAQs</li>
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
              <li className="hover:underline cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">FOLLOW US</h4>
            <div className="flex mt-2">
              <img
                src="Instagramicon.png"
                alt="Instagram"
                className="w-6 h-6 mr-4"
              />
              <img
                src="LinkedIn.png"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold">PAYMENT METHODS</h4>
              <p>We accept Google Pay and other popular payment methods.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 py-4 text-center">
        <p>© {new Date().getFullYear()} Created by aman, for now....</p>
      </div>
    </footer>
  );
};

export default Footer;
