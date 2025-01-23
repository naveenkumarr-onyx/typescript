import { Counter } from "../model/employee.id.counter.schma";

export const getNextEmployeeId = async (): Promise<String> => {
  const counter = await Counter.findOneAndUpdate(
    {
      modeName: "Employee",
    },
    {
      $inc: { seq: 1 },
    },
    {
      new: true,
      upsert: true,
    }
  );
  return ""
};
