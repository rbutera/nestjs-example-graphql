import {Lesson} from './lesson.entity'
import {Test, TestingModule} from '@nestjs/testing'
import {LessonService} from './lesson.service'
import {getRepositoryToken} from '@nestjs/typeorm'
import {v4 as uuid} from 'uuid'
jest.mock('uuid')

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
  findOne: jest.fn(),
  find: jest.fn(),
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
    it('calls lessonRepository.create with the required inputs and an auto generated uuid', async () => {
      expect(mockRepository.create).not.toHaveBeenCalled()

      mockRepository.create.mockResolvedValue(mockTask)
      const {name, startDate, endDate} = mockTask
      mockRepository.create.mockImplementation(input => mockTask)
      mockRepository.save.mockResolvedValue(mockTask)
      uuid.mockReturnValue(1234)

      const result = await service.createLesson({name, startDate, endDate})

      expect(mockRepository.create).toHaveBeenCalledWith({
        id: 1234,
        name,
        startDate,
        endDate,
      })

      expect(mockRepository.save).toHaveBeenCalledWith(
        mockRepository.create({
          id: 1234,
          name,
          startDate,
          endDate,
        })
      )
      expect(result).toStrictEqual(mockTask)
    })
  })

  describe('getLesson', () => {
    it('exists', () => {
      expect(service.getLesson).toBeDefined()
    })

    it('gets a lesson by id from the repository', async () => {
      mockRepository.findOne.mockResolvedValue(mockTask)
      const result = await service.getLesson('1337')
      expect(mockRepository.findOne).toHaveBeenCalledWith({id: '1337'})
      expect(result).toStrictEqual(mockTask)
    })
  })

  describe('getLessons', () => {
    it('is defined', () => {
      expect(service.getLessons).toBeDefined
    })

    it('gets all lessons', async () => {
      mockRepository.find.mockResolvedValue([mockTask, mockTask])
      const result = await service.getLessons()
      expect(mockRepository.find).toHaveBeenCalled()
      expect(result).toStrictEqual([mockTask, mockTask])
    })
  })
})
