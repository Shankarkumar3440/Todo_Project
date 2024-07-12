import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, isNumber, IsString } from "class-validator";

export class CreateTodoDto {

    @IsNumber()
    id: number

    @ApiProperty()
    @IsString()
    title: string;

    @IsString()
    date: string;

    @IsBoolean()
    completed: boolean;

    // @IsNumber()
    todosId: number
}
