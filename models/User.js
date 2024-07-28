import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const blog_User = mongoose.models.User || mongoose.model('blog_User', UserSchema);

export default blog_User;
