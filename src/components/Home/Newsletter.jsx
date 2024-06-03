import React from "react";
import { TextField, Button } from "@mui/material";

const Newsletter = () => {
  return (
    <>
      <section className="mb-16">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg text-left border-2 p-10 md:m-0 mx-5">
            <h2 className="text-4xl font-bold mb-4 capitalize text-gray-800">
              Subscribe to our Newsletter
            </h2>
            <p className="mb-4 text-gray-500">
              Subscribe to our newsletter to stay updated with our latest
              courses and offers.
            </p>
            <div className="flex flex-row items-center w-full">
              <TextField
                type="email"
                label="Enter your email"
                variant="outlined"
                fullWidth
                className="bg-white rounded-r-none"
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="text-white h-14 px-8 py-3 rounded-l-none"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
