import {Lesson} from './lesson.entity'
import {Test, TestingModule} from '@nestjs/testing'
import {LessonService} from './lesson.service'
import {getRepositoryToken} from '@nestjs/typeorm'

const now = new Date().toISOString()
const mockTask = {
  name: 'Bapdopze',
  startDate: now,
  endDate: now,
  id: '1337',
  _id: 1337,
}

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
}

describe('LessonService', () => {
  let service: LessonService

  beforeEach(async () => {
    jest.restoreAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonService,
        Lesson,
        {provide: getRepositoryToken(Lesson), useValue: mockRepository},
      ],
    }).compile()

    service = module.get<LessonService>(LessonService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createLesson', () => {
    it('calls lessonRepository.create with the required inputs', async () => {
      expect(mockRepository.create).not.toHaveBeenCalled()

      mockRepository.create.mockResolvedValue(mockTask)
      const {name, startDate, endDate} = mockTask
      mockRepository.create.mockImplementation(input => mockTask)
      mockRepository.save.mockResolvedValue(mockTask)

      const result = await service.createLesson({name, startDate, endDate})

      expect(mockRepository.create).toHaveBeenCalledWith({
        name,
        startDate,
        endDate,
      })

      expect(mockRepository.save).toHaveBeenCalledWith(
        mockRepository.create({
          name,
          startDate,
          endDate,
        })
      )
      expect(result).toStrictEqual(mockTask)
    })
  })
})
