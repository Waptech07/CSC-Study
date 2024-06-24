const responses = [
  {
    keywords: ["hello", "hi", "hey"],
    response: "Hello, How are you doing?",
  },
  {
    keywords: ["and you?", "and u?", "and you", "and u", "nd u", "nd you"],
    response: "I am alright, Thanks",
  },
  {
    keywords: ["i'm good", "i am good", "i am okay", "nice", "good", "i am doing"],
    response: "That's nice",
  },
  {
    keywords: ["Thanks", "Thank you"],
    response: "You are welcome😊",
  },
  {
    keywords: ["contact", "reach out", "support"],
    response:
      'You can contact support by clicking on the "Contact Us" link at the bottom of the page and filling out the form, or by emailing support@csc-study.vercel.app.',
  },
  {
    keywords: ["pricing", "cost", "rates"],
    response:
      "For pricing information, please visit our pricing page on our website.",
  },
  {
    keywords: ["features", "functionality", "capabilities"],
    response:
      "Our platform includes a variety of features such as user authentication, data analytics, and third-party integrations.",
  },
  {
    keywords: ["partnership", "collaboration", "join forces"],
    response:
      "We are open to partnership opportunities. Please reach out to our partnership team for further discussion.",
  },
  {
    keywords: ["demo", "trial", "test"],
    response:
      "You can request a demo or sign up for a free trial on our website to explore our product.",
  },
  {
    keywords: ["feedback", "suggestions", "improvements"],
    response:
      "We appreciate your feedback! Please send us your suggestions and ideas to help us improve our services.",
  },
  {
    keywords: ["sign in", "login", "signin"],
    response:
      'Click on the "Login" button at the top right corner of the homepage. Input the required details i.e username or email and password, then click on the login button to submit your details.',
  },
  {
    keywords: ["privacy", "security", "data protection"],
    response:
      "Protecting your privacy and data security is our top priority. We adhere to strict privacy policies and use encryption to secure your data.",
  },
  // New questions and responses
  {
    keywords: ["register", "sign up", "create account"],
    response:
      'Click on the "Sign Up" button at the top right corner of the homepage. Fill in your details, including username, email, and password, and follow the instructions to complete the registration process.',
  },
  {
    keywords: ["reset password", "forgot password"],
    response:
      'Click on "Forgot Password" on the login page, enter your registered email address, and follow the instructions sent to your email to reset your password.',
  },
  {
    keywords: ["courses", "access courses", "enrolled courses"],
    response:
      'Once logged in, click on "My Courses" in the dashboard to view and access your enrolled courses.',
  },
  {
    keywords: ["materials", "course materials", "download course materials", "course downloads", "download"],
    response:
      "Yes, course materials like PDF documents, videos, and presentations can be downloaded from the course content page.",
  },
  {
    keywords: ["assignment", "submit assignments", "assignment submission"],
    response:
      'Navigate to the specific course, click on the "Assignments" tab, and follow the instructions to upload and submit your assignments.',
  },
  {
    keywords: ["interact with students", "discussion forums", "interact", "discussion"],
    response:
      "Yes, you can interact with other students through the discussion forums available in each course.",
  },
  {
    keywords: ["update profile information", "profile update", "profile", "update"],
    response:
      'Go to your dashboard, click on "Profile," and you will be able to update your personal information, email, and password.',
  },
  {
    keywords: ["payment methods", "payment options", "payment"],
    response:
      "We accept various payment methods, including credit/debit cards and PayPal.",
  },
];

export default responses;