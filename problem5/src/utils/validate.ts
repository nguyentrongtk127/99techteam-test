import { validateSync, ValidationError } from "class-validator";
import { BadRequest } from "./error-handler";

export async function vaidateDto(dtoInstance: any) {
    const errors: ValidationError[] = validateSync(dtoInstance, { whitelist: true });
    if(errors.length === 0) {
        return true
    } else {
        const errorMessages = errors.map((error) => Object.values(error.constraints || {})).flat();
        throw new BadRequest('Invalid Input', errorMessages)
    }
}