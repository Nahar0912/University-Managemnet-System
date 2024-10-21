import { IsNotEmpty, MinLength } from "class-validator";

export class CreateStudentsDto{
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class RegisteredCourseDto{
  @IsNotEmpty()
  courseCode: string;

  @IsNotEmpty()
  courseName: string;
}



export class UpdateStudentsDto{
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class OfferedCoursesDto{
  @IsNotEmpty()
  courseCode: string;

  @IsNotEmpty()
  courseName: string;

  @IsNotEmpty()
  semister: string;
}

export class ParkingDto{
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  vehicle: string;
}

export class CoreCurriculamDto{
  @IsNotEmpty()
  courseCode: string;

  @IsNotEmpty()
  courseName: string;

  @IsNotEmpty()
  credit: number;

  @IsNotEmpty()
  semister: string;
}

export class OfferedClubsDto{
  @IsNotEmpty()
  clubName: string;

  @IsNotEmpty()
  clubDescription: string;
}

export class JoinClub{
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  clubName: string;
}

export class AppointmentDto{
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  teacherName: string;

  @IsNotEmpty()
  date: Date;
}

export class ApplyHostelDto{
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  roomNo: string;
}