module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || "mongodb://localhost:27017/debtmanagement",
  optionsDB: { useNewUrlParser: true, useUnifiedTopology: true },
  SECRET_TOKEN: "$uNicat20li128YY99nt$$",
  corsOptions: {
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
};
