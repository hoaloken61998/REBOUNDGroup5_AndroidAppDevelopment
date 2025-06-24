const express = require("express");
const {
  getAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  deleteAddress,
  getAddressByUserId // ✅ thêm dòng này
} = require("../controllers/addressController");

const router = express.Router();

router.get("/", getAddresses);
router.get("/:id", getAddressById);
router.post("/", addAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);
router.get("/user/:userId", getAddressByUserId);
module.exports = router;
