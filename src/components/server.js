import express from "express";
import cors from "cors";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();
app.use(cors());

const ATCODER_URL = "https://atcoder.jp/contests/";

app.get("/atcoder-contests", async (req, res) => {
    try {
        const { data } = await axios.get(ATCODER_URL);
        const $ = cheerio.load(data);
        const contests = [];

        $("#contest-table-upcoming tbody tr").each((index, element) => {
            const columns = $(element).find("td");
            
            let name = $(columns[1]).text().trim();
            let start_time = $(columns[0]).text().trim();
            let duration = $(columns[2]).text().trim();

            // Remove unwanted special characters from the name
            name = name.replace(/[\s\n\t◉ⒶⒽ]/g, " ").trim();

            if (name && start_time) {
                contests.push({ site: "AtCoder", name, start_time, duration });
            }
        });

        res.json(contests);
    } catch (error) {
        console.error("❌ Error fetching AtCoder contests:", error);
        res.status(500).json({ error: "Failed to fetch contests" });
    }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));

export default function handler(req, res) {
    res.json({ message: "Hello from Vercel Serverless!" });
}
