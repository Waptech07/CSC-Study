import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineMap,
  MdOutlinePhone,
} from "react-icons/md";
import contactImg from "../assets/contact.jpg";
import Footer from "../components/Footer";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
    console.log(formData);
  };

  return (
    <section className="bg-white">
      <div>
        <div className="flex lg:flex-row flex-col justify-center items-center gap-5 lg:px-40 px-10 pt-20 pb-40">
          <motion.div className="lg:w-1/2 w-full">
            <img src={contactImg} alt="Contact Us" className="rounded-xl" />
          </motion.div>
          <motion.div className="lg:w-1/2 w-full space-y-5">
            <h2 className="lg:text-4xl text-2xl lg:font-extrabold font-medium">
              Our Branches
            </h2>
            <p className="text-gray-400 text-base font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum deserunt distinctio, quo necessitatibus cumque adipisci
              optio harum impedit itaque quas?
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-green-200 p-2 text-green-500 hover:bg-green-800 hover:text-white transition-all duration-500">
                  <MdOutlineLocationOn className="text-3xl" />
                </div>
                <p className="text-lg text-gray-400 font-semibold">
                  Lagos, Nigeria
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-orange-200 p-2 text-orange-500 hover:bg-orange-600 hover:text-white transition-all duration-500">
                  <MdOutlineLocationOn className="text-3xl" />
                </div>
                <p className="text-lg text-gray-400 font-semibold">
                  Abuja, Nigeria
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-blue-200 p-2 text-blue-500 hover:bg-blue-800 hover:text-white transition-all duration-500">
                  <MdOutlineLocationOn className="text-3xl" />
                </div>
                <p className="text-lg text-gray-400 font-semibold">
                  Ogun, Nigeria
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-gray-100 lg:px-20 lg:py-20 px-2 py-10"
        >
          <div className="mb-4">
            <h2 className="text-4xl font-bold">Get In Touch</h2>
            <p className="mt-2 font-medium text-gray-500">
              We'd love to hear from you! Get in touch with us for any queries
              or support.
            </p>
          </div>
          <div className="flex lg:flex-row flex-col gap-8 px-4">
            <motion.div className="lg:w-2/5 flex flex-col gap-5">
              <div className="rounded-md bg-white lg:p-5 p-10">
                <div className="flex lg:flex-row flex-col items-center justify-start gap-5">
                  <div className="rounded bg-blue-100 p-3 text-blue-500 hover:bg-blue-800 hover:text-white transition-all duration-500">
                    <MdOutlineMap className="text-5xl" />
                  </div>
                  <div className="lg:text-left">
                    <h4 className="text-sm text-gray-500 font-medium uppercase">
                      Address
                    </h4>
                    <p className="text-lg lg:w-3/4 text-gray-800 font-medium">
                      2/4 Alagbole Road, Ojodu Berger, Lagos State.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-white lg:p-5 p-10">
                <div className="flex lg:flex-row flex-col items-center justify-start gap-5">
                  <div className="rounded bg-orange-100 p-3 text-orange-500 hover:bg-orange-600 hover:text-white transition-all duration-500">
                    <MdOutlineEmail className="text-5xl" />
                  </div>
                  <div className="lg:text-left">
                    <h4 className="text-sm text-gray-500 font-medium uppercase">
                      Email
                    </h4>
                    <p className="text-lg lg:w-3/4 text-gray-800 font-medium">
                      abdulfataiyakub07@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-white lg:p-5 p-10">
                <div className="flex lg:flex-row flex-col items-center justify-start gap-5">
                  <div className="rounded bg-green-100 p-3 text-green-500 hover:bg-green-800 hover:text-white transition-all duration-500">
                    <MdOutlinePhone className="text-5xl" />
                  </div>
                  <div className="lg:text-left">
                    <h4 className="text-sm text-gray-500 font-medium uppercase">
                      Phone
                    </h4>
                    <p className="text-lg lg:w-3/4 text-gray-800 font-medium">
                      +2348091432824
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div className="lg:w-3/5">
              <Card className="shadow-lg">
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex lg:flex-row flex-col gap-3">
                      <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <TextField
                      label="Subject"
                      variant="outlined"
                      fullWidth
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Message"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <div className="flex justify-end items-end">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="lg:w-40 w-full"
                      >
                        Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
        <div className="rounded-lg bg-white lg:p-5 p-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31714.219109519497!2d3.3333125!3d6.5965145999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5e2f2b9a629%3A0x89f8f82bdff0a1e5!2sOjodu%20Berger%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1621784633403!5m2!1sen!2sus"
            width="100%"
            height="500"
            allowFullScreen={true}
            loading="lazy"
            title="Google Maps Location"
            className="rounded-md"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
