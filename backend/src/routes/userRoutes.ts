import { Router, Request, Response } from "express";
const router = Router();

// GET /api
router.get("/", (req: Request, res: Response) => {
  console.log('GET request received at /api');
  res.send('Hello from GET /api');
});

// POST /api
router.post("/register", async (req: any, res: any) => {
  try {
    const { username } = req.body;

    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Username is required" });
    }

    // Mock database operation
    const newUser = { id: "some-mock-id", username };
    return res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;