export class UserEntity {
  id!: string;
  name!: string;
  email!: string;
  role!: string;
  phone?: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
