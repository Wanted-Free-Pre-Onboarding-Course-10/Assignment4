import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";
import { SIGNUP_SUCCES_MSG } from "../message/message";
import { UserNameDuplicateException } from "src/exception/username_duplicate_exception";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
  async createUser(userDto: UserDto): Promise<string>{
    const { username, password } = userDto;

    const user = this.create({ username, password });

    try {
      await this.save(user);
      return SIGNUP_SUCCES_MSG;
    } catch (error) {
      if (error.errno === 19) throw new UserNameDuplicateException();
      else throw new InternalServerErrorException();
    }
  }
}