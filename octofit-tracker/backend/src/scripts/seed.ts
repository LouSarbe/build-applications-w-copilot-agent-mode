import mongoose from 'mongoose';
import { ActivityModel, TeamModel, UserModel, WorkoutModel } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.create([
      {
        username: 'alex.runner',
        email: 'alex.runner@mergington.edu',
        profile: { displayName: 'Alex Runner' },
      },
      {
        username: 'jamie.strength',
        email: 'jamie.strength@mergington.edu',
        profile: { displayName: 'Jamie Strength' },
      },
      {
        username: 'taylor.moves',
        email: 'taylor.moves@mergington.edu',
        profile: { displayName: 'Taylor Moves' },
      },
    ]);

    await TeamModel.create([
      { name: 'Mountain Movers', members: [users[0]._id, users[1]._id] },
      { name: 'Trail Blazers', members: [users[1]._id, users[2]._id] },
    ]);

    await ActivityModel.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 35, points: 70, completedAt: new Date('2026-08-18') },
      { userId: users[0]._id, type: 'walking', durationMinutes: 45, points: 45, completedAt: new Date('2026-08-20') },
      { userId: users[1]._id, type: 'strength training', durationMinutes: 40, points: 80, completedAt: new Date('2026-08-19') },
      { userId: users[1]._id, type: 'running', durationMinutes: 25, points: 50, completedAt: new Date('2026-08-21') },
      { userId: users[2]._id, type: 'cycling', durationMinutes: 50, points: 75, completedAt: new Date('2026-08-17') },
    ]);

    await WorkoutModel.create([
      {
        title: 'Starter Circuit',
        description: 'A balanced full-body circuit to build a consistent routine.',
        difficulty: 'beginner',
        durationMinutes: 20,
      },
      {
        title: 'Cardio Builder',
        description: 'Intervals that improve endurance while keeping the pace varied.',
        difficulty: 'intermediate',
        durationMinutes: 30,
      },
      {
        title: 'Power Session',
        description: 'A challenging strength workout for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 45,
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
