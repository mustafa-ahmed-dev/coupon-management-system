import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * Custom decorator to compare two fields in a DTO.
 * Usage: @Match('fieldToCompare', { message: 'Fields must match' })
 */
export function MatchProperty(
  propertyToCompare: string, // This is the name of the property to match (e.g., 'password')
  validationOptions?: ValidationOptions, // Optional: custom error message and other validator settings
) {
  // Return the decorator function
  return function (object: Object, propertyName: string) {
    // Register a custom validator using class-validator's API
    registerDecorator({
      name: 'Match', // Name of the decorator (used internally)
      target: object.constructor, // The class the decorator is used on
      propertyName: propertyName, // The property the decorator is applied to (e.g., confirmPassword)
      options: validationOptions, // Pass any additional options
      constraints: [propertyToCompare], // This will be passed to the validate() method as args.constraints
      validator: {
        /**
         * Called during validation.
         * Compares value (confirmPassword) to related value (password).
         */
        validate(value: any, args: ValidationArguments): boolean {
          const [relatedPropertyName] = args.constraints; // 'password'
          const relatedValue = (args.object as any)[relatedPropertyName]; // DTO.password
          return value === relatedValue; // Return true if equal, false otherwise
        },

        /**
         * Optional: Custom error message when validation fails.
         */
        defaultMessage(args: ValidationArguments): string {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} must match ${relatedPropertyName}`;
        },
      },
    });
  };
}
