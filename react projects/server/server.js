import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/geogame")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  accuracy: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Location = mongoose.model("Location", locationSchema);


app.post("/locations", async (req, res) => {
  try {
    const { latitude, longitude, accuracy } = req.body;

    const newLocation = new Location({
      latitude,
      longitude,
      accuracy,
    });

    await newLocation.save();

    res.status(201).json({
      message: "Location saved",
      data: newLocation,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/locations", async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
});

// 5. Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});