import dbConnect from '../../utilities/mongo';

export default async function handler(req, res) {
  await dbConnect();
  res.status(200).json({ message: 'test' });
}
