import { BadRequestException, PipeTransform } from "@nestjs/common";
import { taskStatus } from "../task.model";

//pass this pipe in controller
//pipe must implement PipeTransform interface
export class taskValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        taskStatus.OPEN,
        taskStatus.IN_PROGRESS,
        taskStatus.DONE
    ]
    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)){
            throw new BadRequestException('"${value}" is an invalid status');
        }
        return value;
    }
    private isStatusValid(status: any){
        //index of provide - if this index not present in array
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}