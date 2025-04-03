function authenticateToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Token ausente" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ error: "Token inválido" });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
