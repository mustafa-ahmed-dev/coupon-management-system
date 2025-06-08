import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { CouponApprovalStatus } from '@generated-prisma/client';

export function IsNotCancelledStatus(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotCancelledStatus',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value !== CouponApprovalStatus.cancelled;
        },
        defaultMessage(args: ValidationArguments) {
          return 'You can update the status to cancel unless you use the cancel operation.';
        },
      },
    });
  };
}
