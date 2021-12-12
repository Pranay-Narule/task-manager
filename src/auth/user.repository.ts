import { Repository, EntityRepository} from 'typeorm'
import { user } from './user.entity';

@EntityRepository(user)
export class userRepository extends Repository<user>{


}