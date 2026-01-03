
export interface Project {
  id?: number;
  userEmail: string;
  projectName: string;
  tapestryId?: number;
  description: string;
  isComplete?: boolean;
  createdAt: Date;
  updatedAt: Date;
}