import {Test} from '@nestjs/testing'
import {StudentResolver} from './student.resolver'
import {StudentService} from './student.service'

const mockStudentService = {
  createStudent: jest.fn(),
  getStudent: jest.fn(),
  getStudents: jest.fn(),
}

describe('StudentResolver', () => {
  let resolver: StudentResolver
  let studentService: StudentService

  beforeEach(async () => {
    jest.restoreAllMocks()
    const module = await Test.createTestingModule({
      providers: [
        {provide: StudentService, useValue: mockStudentService},
        StudentResolver,
      ],
    }).compile()

    studentService = module.get<StudentService>(StudentService)
    resolver = module.get<StudentResolver>(StudentResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createStudent', () => {
    it('calls studentService.createStudent with the right arguments', async () => {
      const student = {
        firstName: 'Emma',
        lastName: 'Butera',
      }

      mockStudentService.createStudent.mockResolvedValue(student)

      const result = await resolver.createStudent(student)
      expect(result).toBe(student)
      expect(mockStudentService.createStudent).toHaveBeenCalledWith(student)
    })
  })
})
