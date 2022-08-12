import Entity from '../../models/Entity';
import dbConnect from '../../utilities/mongo';

export default async function handler(req, res) {
  const { id } = req.body;
  await dbConnect();
  const entities = await Entity.findById(id);
  res.status(200).json(entities);
}
