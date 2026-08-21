import mongoose, { type Document, type Model } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  profile?: { displayName?: string; avatarUrl?: string };
}

export interface Team extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
}

export interface Activity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  points: number;
  completedAt: Date;
}

export interface Workout extends Document {
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  profile: { displayName: String, avatarUrl: String },
}, { timestamps: true });

const teamSchema = new mongoose.Schema<Team>({
  name: { type: String, required: true, trim: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const activitySchema = new mongoose.Schema<Activity>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  points: { type: Number, required: true, min: 0 },
  completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const workoutSchema = new mongoose.Schema<Workout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  durationMinutes: { type: Number, required: true, min: 1 },
}, { timestamps: true });

export const UserModel = mongoose.model<User>('User', userSchema) as Model<User>;
export const TeamModel = mongoose.model<Team>('Team', teamSchema) as Model<Team>;
export const ActivityModel = mongoose.model<Activity>('Activity', activitySchema) as Model<Activity>;
export const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema) as Model<Workout>;