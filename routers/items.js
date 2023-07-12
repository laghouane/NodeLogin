const express = require("express");
const item = require("../models/item");
const { mongoose } = require("mongoose");
const { protect } = require("../middlewares/auth.middleware");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const path = require("path");
// GET /api/v1/items
router.get("/", protect, async (req, res) => {
  try {
    console.log(req.user)
    const result = await item.find(req.query).populate("owner");
    res.status(200).json({ ok: true, data: result });
  } catch (err) {
    res.status(404).json({ ok: false, data: err });
  }
});

// POST /api/v1/items
router.post( "/", protect, asyncHandler(async (request, response) => {
    const createItemResponse = async (payload) => {
      const createdItem = await item
        .create(payload)
        .then((createdItem) => createdItem.populate("owner"));

      return response.status(200).json({ ok: true, data: createdItem });
    };
    const file = request.files?.image;

    if (!file) {
      await createItemResponse(request.body);
      return;
    }

    if (!request.body.name)
      return response
        .status(400)
        .json({ ok: false, message: "Please add a name" });

    if (!file.mimetype.startsWith("image"))
      return response
        .status(400)
        .json({ ok: false, message: "Please upload an image file" });

    file.name = `photo_${request.body.name}${path.parse(file.name).ext}`;
    const targetFileUploadedPath = `uploads/${file.name}`;
    file.mv(targetFileUploadedPath, async (error) => {
      if (error) {
        console.error(error);
        return response
          .status(500)
          .json({ ok: false, message: "Problem with file upload" });
      }

      await createItemResponse({
        ...request.body,
        image: targetFileUploadedPath,
      });
      return;
    });
  })
);

// GET /api/v1/items/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const result = await item.findById(req.params.id);
    res.status(200).json({ ok: true, data: result });
  } catch (err) {
    res.status(404).json({ ok: false, data: err });
  }
});

// PUT /api/v1/items/:id
router.put("/:id",protect, async (req, res) => {
  try {
    const result = await item.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ ok: true, data: result });
  } catch (err) {
    if (err.properties)
      res.status(400).json({ ok: false, data: err.properties });
    // else
    else res.status(404).json({ ok: false, data: err });
  }
});

// DELETE /api/v1/items/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const result = await item.findByIdAndDelete(req.params.id);
    res.status(200).json({ ok: true, data: result });
  } catch (err) {
    res.status(404).json({ ok: false, data: err });
  }
});

module.exports = router;
