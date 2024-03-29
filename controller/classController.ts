import schoolModel from "../model/schoolModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import crypto from "crypto";
import classModel from "../model/classModel";

export const createClass = async (req: Request, res: Response) => {
  try {
    const { className } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);

    if (getSchool) {
      const code = crypto.randomBytes(2).toString("hex");

      const classes = await classModel.create({
        className,
        classToken: code,
        schoolName: getSchool.schoolName,
      });

      getSchool!.classes!.push(new mongoose.Types.ObjectId(classes._id));
      getSchool?.save();

      return res.status(201).json({
        message: "class created",
        data: classes,
      });
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const assigClassTeacher = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const school = await schoolModel.findById(req.params.id);
    const classes = await classModel.findById(req.params.classID);
    const teacher = await teacherModel.findOne({ name });

    if (teacher?.schoolName === school?.schoolName) {
      await classModel.findByIdAndUpdate(
        req.params.classID,
        {
          classTeacher: teacher?.name,
        },
        { new: true }
      );
      await teacherModel.findByIdAndUpdate(
        teacher!._id,
        {
          classes: classes!.className,
        },
        { new: true }
      );

      return res.status(200).json({
        message: `Teacher has been assigned to this Class...!`,
      });
    } else {
      return res
        .status(404)
        .json({ message: `Please check if the Name is rightly spelt` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClassDetailFromSchool = async (
  req: Request,
  res: Response
) => {
  try {
    const school = await schoolModel.findById(req.params.id);

    const code = crypto.randomBytes(2).toString("hex");

    if (school) {
      const myClass = await schoolModel.findById(school._id).populate({
        path: "classes",
        options: {
          sort: { createdAt: -1 },
        },
      });

      return res.status(200).json({
        message: `Viewing class detail...!`,
        data: myClass,
      });
    } else {
      return res.status(404).json({ message: `Please fixed the school Name` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClassStudents = async (req: Request, res: Response) => {
  try {
    const classStudents = await classModel.findById(req.params.id);

    const code = crypto.randomBytes(2).toString("hex");

    if (classStudents) {
      const myClass = await classModel.findById(classStudents._id).populate({
        path: "students",
        options: {
          sort: { createdAt: -1 },
        },
      });

      return res.status(200).json({
        message: `Viewing class detail...!`,
        data: myClass,
      });
    } else {
      return res.status(404).json({ message: `Please fixed the school Name` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClassDetailInfo = async (req: Request, res: Response) => {
  try {
    const myClass = await classModel.findById(req.params.id);

    const code = crypto.randomBytes(2).toString("hex");
    return res.status(200).json({
      message: `Viewing class detail...!`,
      data: myClass,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClasses = async (req: Request, res: Response) => {
  try {
    const myClass = await classModel.find();

    return res.status(200).json({
      message: `Viewing class detail...!`,
      data: myClass,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
