import jwt from "jsonwebtoken";

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Verify the token using your Keycloak public key (or secret if using symmetric key)
  jwt.verify(token, process.env.KEYCLOAK_PUBLIC_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  });
};

// Protect your endpoints by using the verifyToken middleware
app.get("/news", verifyToken, (req, res) => {
  const news = db.prepare("SELECT * FROM news").all();
  res.json(news);
});
