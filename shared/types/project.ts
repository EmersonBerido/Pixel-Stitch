
export interface Project {
  id?: number;
  userEmail?: string;
  projectName: string;
  tapestryId?: number;
  description: string;
  isComplete?: boolean;
  isVisible : boolean;
  createdAt: Date;
  updatedAt: Date;
  currentRow : number;
}