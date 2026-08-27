import axios from "axios";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "http://127.0.0.1:8000/chat",
      { message },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      success: true,
      reply: response.data.reply,
    });
  } catch (error) {
    console.error("Python API error:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      reply: "Sorry, the AI service is unavailable.",
    });
  }
};
// import axios from "axios";

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;

//     const response = await axios.post("http://localhost:8000/chat", {
//       message,
//     });

//     res.json({ reply: response.data.reply });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "AI service failed" });
//   }
// };