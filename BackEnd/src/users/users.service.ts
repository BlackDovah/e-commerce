import { Injectable } from '@nestjs/common';

interface User {
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  isValid(username: string): boolean {
    return this.users.some((user) => user.username === username);
  }

  registerUser(username: string, password: string): void {
    this.users.push({ username, password });
  }

  getUsers(): User[] {
    return this.users;
  }
}
