import {LessonService} from './lesson.service'
import {LessonType} from './lesson.type'
import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'

@Resolver(_of => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query(_returns => LessonType)
  lesson() {
    return {
      id: 'asofihasjfo',
      name: 'Physics Class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    }
  }

  @Mutation(_returns => LessonType)
  async createLesson(
    @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string
  ) {
    return this.lessonService.createLesson({
      name,
      startDate,
      endDate,
    })
  }
}
