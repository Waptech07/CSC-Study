import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import faqs from "./Data/Faqs";

const FAQs = () => {
  const [visibleFAQs, setVisibleFAQs] = useState(6);
  const loadMoreFAQs = () => setVisibleFAQs((prev) => prev + 6);

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {faqs.slice(0, visibleFAQs).map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border-b border-gray-200`}
            >
              <Accordion
                sx={{
                  bgcolor: `${
                    index % 2 === 0 ? "rgb(147, 197, 253)" : "white"
                  }`,
                  borderRadius: "20px",
                  m: 1,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h2 className="font-semibold text-lg text-black">
                    {faq.question}
                  </h2>
                </AccordionSummary>
                <AccordionDetails>
                  <p className="text-base text-gray-700">{faq.answer}</p>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </div>
        {visibleFAQs < faqs.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreFAQs}
              className="rounded-lg px-5 py-2 bg-blue-600 text-white hover:bg-blue-800 transition duration-300"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQs;
