import Entity from '../../models/Entity';
import dbConnect from '../../utilities/mongo';

export default async function handler(req, res) {
  const { name, description, rate, image, category } = req.body;
  await dbConnect();
  try {
    await Entity.create({
      name,
      description,
      rate,
      image,
      category
    });
    res.status(201).json({ message: 'test', req: req });
  } catch (error) {
    res.status(200).json(error);
  }
}
