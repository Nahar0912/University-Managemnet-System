import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherEntity } from "./teacher.entity";
import { Like, Repository } from "typeorm";
import { TeacherDTO } from "./teacher.DTO";
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService{    
    constructor(
        @InjectRepository(TeacherEntity) 
        private teacherRepo: Repository<TeacherEntity>
    ) { }

    async getAllUsers(): Promise<TeacherEntity[]> {
        return this.teacherRepo.find();
    }
    
    async getUserByUsername(username: string): Promise<TeacherEntity> {
        const user = await this.teacherRepo.findOne({ where: { username } });
        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }
        return user;
    }
    
    async getUsersBySubstring(substring: string): Promise<TeacherEntity[]> {
        return await this.teacherRepo.find({
            where: {
                fullName: Like(`%${substring}%`),
            },
        });
    }

    async createUser(teacherDto: TeacherDTO): Promise<TeacherEntity[]> {
        const existingUser = await this.teacherRepo.findOne({
            where: [{ username: teacherDto.username }, { email: teacherDto.email }]
        });
    
        if (existingUser) {
            throw new Error('Username or email already exists');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(teacherDto.password, salt)
        teacherDto.password= hashedPassword;
        await this.teacherRepo.save(teacherDto);
        return this.teacherRepo.find();
    }
    
    async updateUser(username: string, teacherDto: TeacherDTO): Promise<TeacherEntity> {
    
        const existingTeacher = await this.teacherRepo.findOne({ where: { username } });
        if (!existingTeacher) {
            throw new NotFoundException('Teacher not found');
        }
        if (teacherDto.password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(teacherDto.password, salt);
            teacherDto.password = hashedPassword;
        }
        Object.assign(existingTeacher, teacherDto);
        return await this.teacherRepo.save(existingTeacher);
    }

    async removeUserByUsername(username: string): Promise<void> {
        const userToRemove = await this.teacherRepo.findOne({ where: { username } });
        if (!userToRemove) {
            throw new Error('User not found');
        }
        await this.teacherRepo.remove(userToRemove);
    }

    async login(teacherDto: TeacherDTO) {
        const data= await this.teacherRepo.findOneBy({email: teacherDto.email});
        const result= await bcrypt.compare(teacherDto.password, data.password);
        if(result) {
            return true;
        }
        else {
            return false;
        } 
    }






    
    addTeacher(myobj: object): object {
        return myobj;
    }
    getUserByNameAndID(name: string, id: string): object {
        return { message: 'Your name is:' + name + ' and your Id is:' + id };
    }
    getUserByID(id: number): object {
        console.log(id);
        return { message: 'Your Id is:' + id };
    }
    getIndex(): string {
        return 'this is teacher';
    }
    
}