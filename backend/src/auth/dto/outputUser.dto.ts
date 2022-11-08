export class OutputUserDto {
  readonly id: number;
  readonly email: string;
  readonly isActivated: boolean;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }
}
