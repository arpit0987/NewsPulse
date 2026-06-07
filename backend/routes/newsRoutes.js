const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add News
router.post("/add", authMiddleware, (req, res) => {
  const { title, content, author } = req.body;

  const sql =
    "INSERT INTO news(title, content, author) VALUES (?, ?, ?)";

  db.query(
    sql,
    [title, content, author],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "News Added Successfully"
      });
    }
  );
});

// Get All News
router.get("/", (req, res) => {
  const sql = "SELECT * FROM news ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// Get Single News
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM news WHERE id = ?";

  db.query(
    sql,
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    }
  );
});

module.exports = router;