import { Router } from 'express';
import { getJobs, createJob, updateJob, deleteJob, getStats } from '../controllers/jobController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// All job routes require auth
router.use(protect);

router.get('/stats', getStats);   // must be before /:id
router.get('/', getJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
