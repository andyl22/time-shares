import EntityBooking from '../../models/EntityBooking';
import dbConnect from '../../utilities/mongo';

export default async function handler(req, res) {
  const { id } = req.body;
  await dbConnect();
  const bookings = await EntityBooking.find({ entityId: id });
  res.status(200).json(bookings);
}
