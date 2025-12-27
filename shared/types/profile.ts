import { Project } from "./project";

export interface profile {
  email: string;
  username: string;
  bio?: string;
  projects : Project[];
}