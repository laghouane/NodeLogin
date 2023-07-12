const express = require("express");
const order = require("../models/order");
const { mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {protect}=require('../middlewares/auth.middleware')
const router = express.Router();

// GET /api/v1/orders
router.get("/", protect , async (req, res) => {
  try {
    const result = await order.find(req.query);
    res.status(200).json({ ok: true, data: result });
  } catch (err) {
    res.status(404).json({ ok: false, data: err });
  }
});

const syncItemsAndGetTotalPrices = async (purchases) => {
  const stock = await item.find({
    _id: { $in: purchases.map((p) => p.item) },
  });

  let total = 0;
  stock.forEach(async (item) => {
    const targetPurchase = purchases.find(
      (p) => p.item === item._id.toString()
    );
    const nextQuantity = item.quantity - targetPurchase.quantity;
    total += item.price * targetPurchase.quantity;
    await item.findByIdAndUpdate(
      targetPurchase.item,
      { quantity: nextQuantity },
      { runValidators: true }
    );
  });

  return { total };
};
// POST /api/v1/orders
router.post("/", protect, asyncHandler(async (request, response) => {
    const { client, purchases, ...requestBody } = request.body;
    const { total } = await syncItemsAndGetTotalPrices(purchases);

    const order = await (
      await OrderModel.create({ ...requestBody, total, client, purchases })
    ).populate("client purchases.item");

    response.status(201).json({
      status: "success",
      data: order,
    });
  })
);

// GET /api/v1/orders/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const result = await order.findById(req.params.id);
    res.status(200).json({ ok: true, data: result });
  } catch (err) {
    res.status(404).json({ ok: false, data: err });
  }
});

// PUT /api/v1/orders/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const result = await order.findOneAndUpdate(
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

// PATCH /api/v1/orders/:id
router.patch("/:id", protect, async (req, res) => {
  try {
    const result = await order.findbyIdAndUpdate(
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

// DELETE /api/v1/orders/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const result = await order.findByIdAndDelete(req.params.id);
    res.status(200).json({ ok: true, data: result });
  } catch (err) {
    res.status(404).json({ ok: false, data: err });
  }
});

module.exports = router;
