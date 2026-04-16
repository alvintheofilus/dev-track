import { Router } from 'express';
import { getJobs, createJob, updateJob, deleteJob, getStats, sendReminder } from '../controllers/jobController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// All job routes require auth
router.use(protect);

router.get('/stats', getStats);   // must be before /:id
router.get('/', getJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.post('/:id/remind', sendReminder);

export default router;
