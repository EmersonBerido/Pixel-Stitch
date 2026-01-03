import { Project } from "./project";

export interface Profile {
  email: string;
  username: string;
  bio?: string;
  projects : Project[];
}