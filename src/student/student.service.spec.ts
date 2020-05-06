import {getRepositoryToken} from '@nestjs/typeorm'
import {Test, TestingModule} from '@nestjs/testing'
import {StudentService} from './student.service'
import {Student} from './student.entity'
import {v4 as uuid} from 'uuid'
jest.mock('uuid')

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
    it('should call studentRepository.create and assign a new id using uuid', async () => {
      mockStudentRepository.create.mockResolvedValue(student)
      mockStudentRepository.save.mockResolvedValue(student)

      const {firstName, lastName} = student

      uuid.mockReturnValue(1337)

      const result = await service.createStudent({firstName, lastName})
      expect(result).toBe(student)
      expect(mockStudentRepository.create).toHaveBeenCalledWith({
        id: 1337,
        firstName,
        lastName,
      })
      expect(mockStudentRepository.save).toHaveBeenCalledWith(
        mockStudentRepository.create({
          id: 1337,
          firstName,
          lastName,
        })
      )
    })
  })
})
