import Entity from '../../models/Entity';
import dbConnect from '../../utilities/mongo';

export default async function handler(req, res) {
  await dbConnect();
  const entities = await Entity.find({});
  res.status(200).json(entities);
}
