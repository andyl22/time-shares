import EntityBooking from '../../models/EntityBooking';
import dbConnect from '../../utilities/mongo';

export default async function handler(req, res) {
  await dbConnect();
  try {
    const createBooking = await EntityBooking.create(req.body);
    res.status(201).json({ booking: createBooking });
  } catch (error) {
    res.status(200).json(error);
  }
}
