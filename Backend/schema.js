import mongoose from 'mongoose';

// how our document look like
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    createdAt: Date,
});

// we need to turn it into a model
const schema = mongoose.model('user', userSchema);

export default schema;
