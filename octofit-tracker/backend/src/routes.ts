import { Router } from 'express';
import { ActivityModel, TeamModel, UserModel, WorkoutModel } from './models.js';

const router = Router();

router.get('/health', (_request, response) => {
  response.json({ status: 'ok', database: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db' });
});

router.get('/users', async (_request, response, next) => {
  try { response.json(await UserModel.find().sort({ username: 1 })); } catch (error) { next(error); }
});

router.post('/users', async (request, response, next) => {
  try { response.status(201).json(await UserModel.create(request.body)); } catch (error) { next(error); }
});

router.get('/teams', async (_request, response, next) => {
  try { response.json(await TeamModel.find().populate('members', 'username email')); } catch (error) { next(error); }
});

router.post('/teams', async (request, response, next) => {
  try { response.status(201).json(await TeamModel.create(request.body)); } catch (error) { next(error); }
});

router.get('/activities', async (request, response, next) => {
  try {
    const filter = typeof request.query.userId === 'string' ? { userId: request.query.userId } : {};
    response.json(await ActivityModel.find(filter).populate('userId', 'username').sort({ completedAt: -1 }));
  } catch (error) { next(error); }
});

router.post('/activities', async (request, response, next) => {
  try { response.status(201).json(await ActivityModel.create(request.body)); } catch (error) { next(error); }
});

router.get('/leaderboard', async (_request, response, next) => {
  try {
    response.json(await ActivityModel.aggregate([
      { $group: { _id: '$userId', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, userId: '$_id', username: '$user.username', points: 1, activities: 1 } },
    ]));
  } catch (error) { next(error); }
});

router.get('/workouts', async (request, response, next) => {
  try {
    const filter = typeof request.query.difficulty === 'string' ? { difficulty: request.query.difficulty } : {};
    response.json(await WorkoutModel.find(filter).sort({ title: 1 }));
  } catch (error) { next(error); }
});

router.post('/workouts', async (request, response, next) => {
  try { response.status(201).json(await WorkoutModel.create(request.body)); } catch (error) { next(error); }
});

export default router;