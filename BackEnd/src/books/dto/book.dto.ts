export class BookDto {
  title: string;
  author: string;
  ISBN: string;
  [key: string]: any;
}

export class RegisterUserDto {
  username: string;
  password: string;
}

export class SearchResultDto extends BookDto {
  field: string;
}
