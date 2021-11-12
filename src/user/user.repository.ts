import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
  async createUser(userDto: UserDto): Promise<void>{
    const { username, password } = userDto;

    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (error) {
      if (error.errno === 19) throw new ConflictException('Existing username');
      else throw new InternalServerErrorException();
    }
  }
}