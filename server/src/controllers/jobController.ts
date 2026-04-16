import { Response } from 'express';
import Job from '../models/Job';
import User from '../models/User';
import sendEmail from '../utils/sendEmail';
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

export const sendReminder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user?.id });
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    const user = await User.findById(req.user?.id).select('email name');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await sendEmail({
      to: user.email,
      subject: `Follow-up reminder: ${job.role} at ${job.company}`,
      html: `
        <h2>Follow-up Reminder — DevTrack</h2>
        <p>Hi ${user.name},</p>
        <p>Time to follow up on your application for <strong>${job.role}</strong> at <strong>${job.company}</strong>.</p>
        <table style="border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:4px 12px 4px 0;color:#64748b">Status</td><td><strong>${job.status}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#64748b">Applied</td><td>${new Date(job.appliedDate).toLocaleDateString()}</td></tr>
          ${job.jobUrl ? `<tr><td style="padding:4px 12px 4px 0;color:#64748b">URL</td><td><a href="${job.jobUrl}">${job.jobUrl}</a></td></tr>` : ''}
          ${job.notes ? `<tr><td style="padding:4px 12px 4px 0;color:#64748b">Notes</td><td>${job.notes}</td></tr>` : ''}
        </table>
        <p style="color:#64748b;font-size:14px">Sent from DevTrack</p>
      `,
    });

    res.json({ message: 'Reminder sent' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send reminder' });
  }
};
