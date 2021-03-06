import {Test} from '@nestjs/testing'
import {LessonResolver} from './lesson.resolver'
import {LessonService} from './lesson.service'

const mockLessonService = {
  createLesson: jest.fn(),
  getLesson: jest.fn(),
  getLessons: jest.fn(),
}

describe('LessonResolver', () => {
  let resolver: LessonResolver
  let lessonService: LessonService

  beforeEach(async () => {
    jest.restoreAllMocks()
    const module = await Test.createTestingModule({
      providers: [
        {provide: LessonService, useValue: mockLessonService},
        LessonResolver,
      ],
    }).compile()

    lessonService = module.get<LessonService>(LessonService)
    resolver = module.get<LessonResolver>(LessonResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createLesson', () => {
    it('calls lessonService.createLesson with the right arguments', async () => {
      const mockLesson = {
        name: 'foo',
        startDate: 'bar',
        endDate: 'baz',
      }

      const resolved = 'Apebuuji'
      mockLessonService.createLesson.mockResolvedValue(resolved)

      const result = await resolver.createLesson(mockLesson)
      expect(result).toBe(resolved)
      expect(mockLessonService.createLesson).toHaveBeenCalledWith(mockLesson)
    })
  })

  describe('lesson', () => {
    it('calls lessonService.getLesson with the right id', async () => {
      mockLessonService.getLesson.mockResolvedValue('foo')

      await resolver.lesson('1337')

      expect(mockLessonService.getLesson).toHaveBeenCalledWith('1337')
    })
  })

  describe('lessons', () => {
    it('is defined', () => {
      expect(resolver.lessons).toBeDefined()
    })

    it('gets all the lessons from the lessonService', async () => {
      const result = ['foo', 'bar']
      mockLessonService.getLessons.mockResolvedValue(result)
      const final = await resolver.lessons()
      expect(mockLessonService.getLessons).toHaveBeenCalled()
      expect(final).toStrictEqual(result)
    })
  })
})
