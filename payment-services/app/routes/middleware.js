const crypto = require("crypto");

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify and decode the token (you should use a secret key or some other method to securely verify tokens)
  const combinedData = process.env.SECRET_KEY;
  const authHash = crypto
    .createHash("sha256")
    .update(combinedData)
    .digest("hex");
  if (authHash != token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

module.exports = authMiddleware;
