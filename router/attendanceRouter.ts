import {
  createAttendancePresent,
  createAttendanceAbsent,
  viewStudentAttendanceByTeacher,
  viewStudentAttendance,
} from "../controller/attendanceController";
import upload from "../utils/multer";

import { Router } from "express";

const router = Router();

router.route("/:id/:studentID/present").post(createAttendancePresent);
router.route("/:id/:studentID/absent").post(createAttendanceAbsent);

router
  .route("/:id/teacher-viewing-student-attendance")
  .get(viewStudentAttendanceByTeacher);

router.route("/:id/viewing-student-attendance").get(viewStudentAttendance);

export default router;
