var express = require('express');
var router = express.Router();

/* GET users listing. */
// http://localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// module.exports = router;


// const express = require('express');
// const router = express.Router();

const { validateModel } = require('../utils/route-utilities');

router.get('/:id', async (req, res) => {
  try {
    const user = await validateModel('user', req.params.id);
    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

module.exports = router;

// http://localhost:3000/users/1
// success response:
// {
//     "id": 1,
//     "name": "Alice",
//     "createdAt": "2025-06-28T03:11:30.003Z"
// }

// http://localhost:3000/users/2
// {
//     "message": "user id (2) not found."
// }

// http://localhost:3000/users/abc

// {
//     "message": "user id (abc) is invalid."
// }