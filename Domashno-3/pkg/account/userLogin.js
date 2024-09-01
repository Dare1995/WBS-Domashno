const LoginAttempt = require("./loginAttempt");

const userLoginAttempt = async (email, status, ipAddress) => {
  try {
    const attempt = new LoginAttempt({
      email,
      status,
      ipAddress,
    });
    await attempt.save();
  } catch (error) {
    console.error("Failed to log login attempt:", error);
  }
};

module.exports = {
  userLoginAttempt,
};