import {Student} from './student.entity'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Module} from '@nestjs/common'
import {StudentService} from './student.service'

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentService],
})
export class StudentModule {}
