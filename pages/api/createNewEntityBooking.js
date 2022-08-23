import EntityBooking from '../../models/EntityBooking';
import dbConnect from '../../utilities/mongo';

export default async function handler(req, res) {
  const { name, description, date, startTime, endTime, entityId } = req.body;
  await dbConnect();
  try {
    const createBooking = await EntityBooking.create({
      name,
      description,
      date,
      startTime,
      endTime,
      entityId
    });
    res.status(201).json({ booking: createBooking });
  } catch (error) {
    res.status(200).json(error);
  }
}
