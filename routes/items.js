const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// 1. Add a found item
router.post('/add/', async (req, res) => {
  try {
    const { itemName, description, locationFound, claimed } = req.body;
    const newItem = new Item({ itemName, description, locationFound, claimed });

    await newItem.save();
    res.status(201).json(newItem,{message: "Items Added Successfully"});
  } catch (error) {
    res.status(500).json({ message: 'Failed to add the item', error });
  }
});

// 2. View all unclaimed items
router.get('/unclaimed', async (req, res) => {
  try {
    const unclaimedItems = await Item.find({ claimed: false });
    res.status(200).json(unclaimedItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch unclaimed items', error });
  }
});

// 3. View a single item by ID
router.get('/view/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// 4. Update an item’s details or mark as claimed
router.put('/edit/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Updated Successfully', updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update the item', error });
  }
});


// 5. Delete old/irrelevant entries
router.delete('/remove/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete the item', error });
  }
});

module.exports = router;
