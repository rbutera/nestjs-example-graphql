// entity
import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  ObjectIdColumn,
} from 'typeorm'

@Entity()
export class Student extends BaseEntity {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string
}
