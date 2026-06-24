// // Email validation regex
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // Validate email format
// const validateEmail = (email) => {
//   if (!email || typeof email !== 'string') {
//     return false;
//   }
//   return emailRegex.test(email.trim());
// };

// // Validate password strength
// // Minimum 6 characters, at least one uppercase, one lowercase, and one number
// const validatePassword = (password) => {
//   if (!password || typeof password !== 'string') {
//     return false;
//   }

//   // Check minimum length
//   if (password.length < 6) {
//     return false;
//   }

//   // You can add more complex validation if needed
//   return true;
// };

// // Middleware for validating registration input
// const validateRegisterInput = (req, res, next) => {
//   const { name, email, password, confirmPassword } = req.body;

//   // Check if all required fields are provided
//   if (!name || !email || !password) {
//     return res.status(400).json({
//       message: 'All fields (name, email, password) are required',
//     });
//   }

//   // Validate email format
//   if (!validateEmail(email)) {
//     return res.status(400).json({
//       message: 'Please provide a valid email address',
//     });
//   }

//   // Validate password strength
//   if (!validatePassword(password)) {
//     return res.status(400).json({
//       message: 'Password must be at least 6 characters long',
//     });
//   }

//   // Trim and lowercase email
//   req.body.email = email.toLowerCase().trim();

//   next();
// };

// // Middleware for validating login input
// const validateLoginInput = (req, res, next) => {
//   const { email, password } = req.body;

//   // Check if all required fields are provided
//   if (!email || !password) {
//     return res.status(400).json({
//       message: 'Email and password are required',
//     });
//   }

//   // Validate email format
//   if (!validateEmail(email)) {
//     return res.status(400).json({
//       message: 'Please provide a valid email address',
//     });
//   }

//   // Trim and lowercase email
//   req.body.email = email.toLowerCase().trim();

//   next();
// };

// module.exports = {
//   validateRegisterInput,
//   validateLoginInput,
//   validateEmail,
//   validatePassword,
// };
