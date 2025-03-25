import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
    console.log(formData);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 via-teal-100 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-indigo-600 text-center mb-6">
          Contact Us
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12">
          We’d love to hear from you! Reach out with any questions or inquiries, and we’ll get back to you as soon as possible.
        </p>

        {/* Contact Details and Contact Form Stacked Vertically */}
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-16">
          {/* Contact Details Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Details</h3>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Email:</strong> info@fitsync.com
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Phone:</strong> +123 456 7890
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Address:</strong> 123 Fitness Street, Wellness City, 12345
            </p>

            <div className="mt-6 text-lg text-gray-600">
              <p className="font-semibold mb-2">Follow us on Social Media</p>
              <div className="flex gap-4 mt-2">
                <a href="#" className="text-indigo-600 hover:text-indigo-800">Facebook</a>
                <a href="#" className="text-indigo-600 hover:text-indigo-800">Instagram</a>
                <a href="#" className="text-indigo-600 hover:text-indigo-800">Twitter</a>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg text-gray-700 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;