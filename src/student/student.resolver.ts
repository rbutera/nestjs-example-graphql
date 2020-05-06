import {CreateStudentInput} from './create-student.input'
import {Resolver, Mutation, Args} from '@nestjs/graphql'
import {StudentService} from './student.service'
import {StudentType} from './student.type'
// typeORM graphql resolver

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation(returns => StudentType)
  async createStudent(@Args('createStudentInput') input: CreateStudentInput) {
    return this.studentService.createStudent(input)
  }
}
