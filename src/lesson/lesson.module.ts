import {LessonRepository} from './lesson.repository'
import {Module} from '@nestjs/common'
import {LessonResolver} from './lesson.resolver'
import {LessonService} from './lesson.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Lesson} from './lesson.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  providers: [LessonResolver, LessonService, LessonRepository],
})
export class LessonModule {}
