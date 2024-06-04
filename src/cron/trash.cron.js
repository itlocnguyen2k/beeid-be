import Trashs from "../models/trash.models";

export async function deleteObject() {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() - 30);
  const trashs = await Trashs.find({ createdAt: { $lt: deadline } });

  trashs.forEach(async (trash) => {
    trash.isDelete = 1;
    await trash.save();
  });
}
