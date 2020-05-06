import {CreateLessonInput} from './input/create-lesson.input'
import {LessonService} from './lesson.service'
import {LessonType} from './lesson.type'
import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'

@Resolver(_of => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query(_returns => LessonType)
  async lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id)
  }

  @Query(_returns => [LessonType])
  async lessons() {
    return this.lessonService.getLessons()
  }

  @Mutation(_returns => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput
  ) {
    return this.lessonService.createLesson(createLessonInput)
  }
}
