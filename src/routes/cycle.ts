import { Router } from 'express';
import { CycleController } from '../controllers';
import { authenticate, validate } from '../middlewares';
import { createCycleSchema } from '../validators';

const CycleRoute = Router();

/**
 * CREATE CYCLE
 * POST /avecs/:avecId/cycles
 * PRESIDENT only (checked in service)
 */
CycleRoute.post(
  '/:avecId/cycles',
  authenticate,
  validate(createCycleSchema),
  CycleController.createCycle,
);

/**
 * GET ALL CYCLES OF AN AVEC
 * GET /avecs/:avecId/cycles
 */
CycleRoute.get(
  '/:avecId/cycles',
  authenticate,
  CycleController.getCyclesByAvec,
);

/**
 * GET ACTIVE CYCLE
 * GET /avecs/:avecId/cycles/active
 */
CycleRoute.get(
  '/:avecId/cycles/active',
  authenticate,
  CycleController.getActiveCycle,
);

export default CycleRoute;
