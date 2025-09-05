import imagekit from "../configs/imageKit.js";
import User from "../models/User.js";
import fs from "fs";
import Car from "../models/Car.js";

// API to change user role
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({
      success: true,
      message: "Role updated to owner, Now you can list cars",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// API to list car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    // Upload Image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // Optimization through imagekit URL transformation
    var optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" }, // Resize to a max width of 1280px
        { quality: "auto" }, // Auto quality based on network
        { format: "webp" }, // Convert to modern format
      ],
    });

    const image = optimizedImageURL;
    await Car.create({ ...car, owner: _id, image });

    res.json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
