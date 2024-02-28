const express = require("express");
const router = express.Router();

router.get("/all-questions", (req, res) => {
  res.send("all question");
});
module.exports = router;

const {
  singleQuestion,
  allQuestions,
  question,
} = require("../controller/questionController");
// const postAnswer = require("../controller/answerController");

// question routes
router.post("/ask", question);

//
router.get("/get-all", allQuestions);

router.get("/question/:questionid", singleQuestion);

module.exports = router;
