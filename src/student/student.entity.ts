// entity
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ObjectIdColumn,
} from 'typeorm'

@Entity()
export class Student extends BaseEntity {
  @ObjectIdColumn()
  _id: string

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string
}
