export type User = {
  id: string;
  username: string;
  email: string;
  provider: "github" | "credentials";
};

export type Document = {
  id: string;
  title: string;
  content: string;
  mesData: {
    "message": string[],
    "userID": string[],
    "block": boolean[],
    "creatTime": number[],
    "announceOfTime": number
  }
};
