const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./User');

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: 'Registered!' });
  } catch (e) {
    res.status(400).json({ error: 'Username taken' });
  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await user.comparePassword(req.body.password)))
    return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  res.json({ token, username: user.username });
});

module.exports = router;
