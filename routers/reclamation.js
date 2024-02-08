const express = require("express");
const reclamation = require("../models/reclamation");
const { mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {protect}=require('../middlewares/auth.middleware')
const router = express.Router();

// GET /api/v1/reclamations
router.get("/", protect , async (req, res) => {
  try {
    const result = await reclamation.find(req.query);
    res.status(200).json({ ok: true, data: result });
  } catch (err) {
    res.status(404).json({ ok: false, data: err });
  }
});
// POST /api/v1/reclamations
router.post("/", protect, asyncHandler(async (request, response) => {
    const { user, ...requestBody } = request.body;
    

    const reclamation = await (
      await reclamationModel.create({ ...requestBody, user })
    ).populate("user");

    response.status(201).json({
      status: "success",
      data: reclamation,
    });
  })
);

// GET /api/v1/reclamations/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const result = await reclamation.findById(req.params.id);
    res.status(200).json({ ok: true, data: result });
  } catch (err) {
    res.status(404).json({ ok: false, data: err });
  }
});

// PUT /api/v1/reclamations/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const result = await reclamation.findOneAndUpdate(
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

// PATCH /api/v1/reclamations/:id
router.patch("/:id", protect, async (req, res) => {
  try {
    const result = await reclamation.findbyIdAndUpdate(
      req.params.id,
      { status: req.body.status },
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

// DELETE /api/v1/reclamations/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const result = await reclamation.findByIdAndDelete(req.params.id);
    res.status(200).json({ ok: true, data: result });
  } catch (err) {
    res.status(404).json({ ok: false, data: err });
  }
});

module.exports = router;
