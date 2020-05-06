import {Test} from '@nestjs/testing'
import {LessonResolver} from './lesson.resolver'
import {LessonService} from './lesson.service'

const mockLessonService = {
  createLesson: jest.fn(),
  getLesson: jest.fn(),
}

describe('LessonResolver', () => {
  let lessonResolver: LessonResolver
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
    lessonResolver = module.get<LessonResolver>(LessonResolver)
  })

  it('should be defined', () => {
    expect(lessonResolver).toBeDefined()
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

      const result = await lessonResolver.createLesson(
        mockLesson.name,
        mockLesson.startDate,
        mockLesson.endDate
      )
      expect(result).toBe(resolved)
      expect(mockLessonService.createLesson).toHaveBeenCalledWith(mockLesson)
    })
  })

  describe('lesson', () => {
    it('calls lessonService.getLesson with the right id', async () => {
      mockLessonService.getLesson.mockResolvedValue('foo')

      await lessonResolver.lesson('1337')

      expect(mockLessonService.getLesson).toHaveBeenCalledWith('1337')
    })
  })
})
