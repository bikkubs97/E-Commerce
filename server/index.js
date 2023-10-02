import express from "express";
import { readFile, writeFile } from "fs/promises"; 
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//Get products data

app.get("/products", async (req, res) => {
  try {
    // Read the contents of products.json
    const filePath = new URL("Data/products.json", import.meta.url);
    const data = await readFile(filePath, "utf8");
    // Parse JSON and send as response
    const products = JSON.parse(data);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Post purchases data

app.post("/purchases", async (req, res) => {
  try {
    // Read the existing purchases data from purchases.json
    const existingData = await readFile("Data/purchases.json", "utf-8");

    // Parse the existing data as JSON
    const purchases = JSON.parse(existingData);

    // Add the new purchase data from the POST request to the purchases array
    const newPurchase = {
      ...req.body,
      date: new Date().toISOString(),
    };

    // Push the new purchase data into the purchases array
    purchases.push(newPurchase);
    // Write the updated purchases array back to purchases.json
    await writeFile(
      "Data/purchases.json",
      JSON.stringify(purchases, null, 2),
      "utf-8"
    );
    res.status(201).json({ message: "Purchase recorded successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server on port 8080
app.listen(8080, () => {
  console.log("Server is listening on port 8080!");
});
