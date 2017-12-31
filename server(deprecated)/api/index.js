import express from 'express';
const router = express.Router();

import createEvent from './createEvent';
import searchPerson from './searchPerson';
import checkinPerson from './checkinPerson';

// GET ~/api
router.get('/', (req, res)=>{
  res.send('You are connected to etherbrite api');
});

// POST ~/api/createEvent
router.post('/createEvent', createEvent);

// GET ~/api/search/:address
router.get('/search/:address', searchPerson);

// PUT ~/api/checkin/:address
router.put('/checkin/:address', checkinPerson);

export default router;