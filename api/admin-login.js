export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  try {

    // parse body safely
    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const password = body?.password;

    if (!password) {
      return res.status(400).json({ success: false });
    }

    // compare with env variable
    if (password === process.env.ADMIN_PASSWORD) {
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false });

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ success: false });
  }

}