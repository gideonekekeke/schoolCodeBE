"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const performanceController_1 = require("../controller/performanceController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/create-student-performance").post(performanceController_1.createPerformance);
router.route("/:id/viewing-student-performance").get(performanceController_1.viewPerformance);
router.route("/:id/viewing-student-recent-performance").get(performanceController_1.recentPerformance);
exports.default = router;
