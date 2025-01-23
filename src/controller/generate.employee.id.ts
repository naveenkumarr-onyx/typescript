import { Counter } from "../model/employee.id.counter.schma";

export const getNextEmployeeId = async (schemaName:String): Promise<String> => {
  const counter = await Counter.findOneAndUpdate(
    {
      modelName: `${schemaName}`,
    },
    {
      $inc: { seq: 1 },
    },
    {
      new: true,
      upsert: true
    }
  );
  return counter ? `EMP${counter.seq}`:"EMP"
};
