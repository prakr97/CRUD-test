import mongoose from 'mongoose';

const Connection = async () => {
    const URL = `mongodb+srv://dummy:dummy@cluster0.d1w8trz.mongodb.net/?retryWrites=true&w=majority`

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
}

export default Connection;