import { z } from 'zod';

export const createCycleSchema = z
  .object({
    startDate: z
      .string()
      .datetime({ message: 'startDate must be a valid ISO date' }),

    endDate: z
      .string()
      .datetime({ message: 'endDate must be a valid ISO date' }),

    sharePrice: z
      .number()
      .positive('sharePrice must be greater than 0'),

    minShares: z
      .number()
      .int()
      .min(1)
      .optional(),

    maxShares: z
      .number()
      .int()
      .min(1)
      .optional(),

    interestRate: z
      .number()
      .min(0, 'interestRate cannot be negative'),

    loanMultiplier: z
      .number()
      .int()
      .min(1)
      .optional(),

    socialContributionAmount: z
      .number()
      .min(0, 'socialContributionAmount cannot be negative'),
  })
  .refine(
    (data) => new Date(data.startDate) < new Date(data.endDate),
    {
      message: 'startDate must be before endDate',
      path: ['startDate'],
    },
  )
  .refine(
    (data) =>
      data.minShares === undefined ||
      data.maxShares === undefined ||
      data.maxShares >= data.minShares,
    {
      message: 'maxShares must be greater than or equal to minShares',
      path: ['maxShares'],
    },
  );
