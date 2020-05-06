import {CreateStudentInput} from './create-student.input'
import {InjectRepository} from '@nestjs/typeorm'
import {Injectable} from '@nestjs/common'
import {Student} from './student.entity'
import {Repository} from 'typeorm'

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>
  ) {}

  async createStudent(input: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create(input)
    return this.studentRepository.save(student)
  }
}
