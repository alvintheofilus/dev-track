import { Response } from 'express';
import Job from '../models/Job';
import { AuthRequest } from '../types';

export const getJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find({ userId: req.user?.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.create({ ...req.body, userId: req.user?.id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user?.id });
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const [total, byStatus] = await Promise.all([
      Job.countDocuments({ userId }),
      Job.aggregate([
        { $match: { userId: userId } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    const stats = { total, applied: 0, interview: 0, offer: 0, rejected: 0 };
    byStatus.forEach(({ _id, count }: { _id: string; count: number }) => {
      if (_id in stats) (stats as Record<string, number>)[_id] = count;
    });

    const interviewRate = total > 0 ? ((stats.interview + stats.offer) / total) * 100 : 0;
    const offerRate = total > 0 ? (stats.offer / total) * 100 : 0;

    res.json({ ...stats, interviewRate: +interviewRate.toFixed(1), offerRate: +offerRate.toFixed(1) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
