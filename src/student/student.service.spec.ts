import {getRepositoryToken} from '@nestjs/typeorm'
import {Test, TestingModule} from '@nestjs/testing'
import {StudentService} from './student.service'
import {Student} from './student.entity'

const mockStudentRepository = {
  create: jest.fn(),
  save: jest.fn(),
}

const student = {
  id: '1234',
  _id: '4321',
  firstName: 'Ariel',
  lastName: 'Weinberger',
}

describe('StudentService', () => {
  let service: StudentService

  beforeEach(async () => {
    jest.restoreAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {provide: getRepositoryToken(Student), useValue: mockStudentRepository},
      ],
    }).compile()

    service = module.get<StudentService>(StudentService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createStudent', () => {
    it('should call studentRepository.create', async () => {
      mockStudentRepository.create.mockResolvedValue(student)
      mockStudentRepository.save.mockResolvedValue(student)

      const {firstName, lastName} = student

      const result = await service.createStudent({firstName, lastName})
      expect(result).toBe(student)
      expect(mockStudentRepository.create).toHaveBeenCalledWith({
        firstName,
        lastName,
      })
      expect(mockStudentRepository.save).toHaveBeenCalledWith(
        mockStudentRepository.create({
          firstName,
          lastName,
        })
      )
    })
  })
})
