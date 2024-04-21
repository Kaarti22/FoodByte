import { MongoClient } from 'mongodb';
import multer from 'multer';
import nextConnect from 'next-connect';

// Configure multer to handle file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory temporarily
});

const handler = nextConnect();

handler.use(upload.single('image')); // Handle single image file

handler.post(async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('image_uploads'); // Use the appropriate database
    const collection = db.collection('images');

    // Store image as Base64 in MongoDB
    const imageBase64 = req.file.buffer.toString('base64');
    const imageType = req.file.mimetype;

    const imageDoc = {
      data: imageBase64,
      type: imageType,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(imageDoc);
    const imageUrl = `/api/image/${result.insertedId}`; // URL to access the uploaded image

    res.status(200).json({ imageUrl }); // Return the image URL
  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    client.close();
  }
});

export default handler;
