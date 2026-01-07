import { Router } from 'express';
import { AvecController } from '../controllers';
import { authenticate, authorizeRole } from '../middlewares';
import { Role1 } from '../database/models';

const AvecRoute = Router();

AvecRoute.post(
  '/',
  authenticate,
  authorizeRole(Role1.USER, Role1.SUPER_ADMIN),
  AvecController.createAvec,
);

AvecRoute.patch(
  '/:id/validate',
  authenticate,
  authorizeRole(Role1.SUPER_ADMIN),
  AvecController.validateAvec,
);

AvecRoute.post(
  '/:id/members',
  authenticate,
  authorizeRole(Role1.USER, Role1.SUPER_ADMIN),
  AvecController.addMembersToAvec,
);

// router.get(
//   '/',
//   authenticate,
//   AvecController.getAllAvec
// );

// //  Récupérer une AVEC par ID
// router.get(
//   '/:id',
//   authenticate,
//   AvecController.getAvecById
// );

// // Ajouter un membre à l’AVEC
// // Seul le PRESIDENT peut ajouter des membres
// router.post(
//   '/:id/members',
//   authenticate,
//   AvecController.addMemberToAvec
// );

export default AvecRoute;
