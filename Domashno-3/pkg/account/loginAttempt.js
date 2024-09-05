const mongoose = require("mongoose");

const loginAttemptSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILURE'],
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const LoginAttempt = mongoose.model("LoginAttempt", loginAttemptSchema);


// // TIMESTAMP funkcija
// loginAttemptSchema.pre("save", (next) => {
//   console.log("Saved Data");
//   next();
// })

module.exports = LoginAttempt;