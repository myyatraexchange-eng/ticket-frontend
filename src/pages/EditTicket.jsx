// Get single ticket (Private)
router.get("/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user._id });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ticket" });
  }
});

// Update ticket (Private)
router.patch("/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Failed to update ticket" });
  }
});
