import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export function Different(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: DifferentConstraint,
        });
    };
}


@ValidatorConstraint({ name: 'Different' })
export class DifferentConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value !== relatedValue;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "As Senhas devem ser diferentes";
    }

}