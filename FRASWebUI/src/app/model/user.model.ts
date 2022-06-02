// import 'firebase/auth';
// import 'firebase/firestore';

export class Account {
  constructor(
    public name: string,
    public id: number,
    public department: string,
    public collegeName: string,
    public onLeave: boolean,
    public onResigned: boolean,
  ) {}

  log() {
    console.log(
      `${this.name} ${this.id} ${this.department} ${this.collegeName} ${this.onLeave} ${this.onResigned}`,
    );
  }
  static fromJson(id: string, json: any): Account | null {
    try {
      return new Account(json.name, json.id, json.department, json.collegeName, json.onLeave, json.onResigned);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  toJson() {
    return {
      name: this.name,
      id: this.id,
      department: this.department,
      collegeName: this.collegeName,
      onLeave: this.onLeave,
      resigned: this.onResigned,
    };
  }
}