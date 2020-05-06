import {Student} from './student.entity'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Module} from '@nestjs/common'
import {StudentService} from './student.service'
import {StudentResolver} from './student.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentService, StudentResolver],
})
export class StudentModule {}
