import { UserService } from './user.service';
import { RegisterDto } from './register.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: RegisterDto): Promise<object>;
    login(body: {
        username: string;
        password: string;
    }): Promise<object>;
}
