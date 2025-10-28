export interface Project {
    id: string
    
    name: string
    ownerId: string
   
    status:  "ACTIVE" | "COMPLETED" | "ARCHIVED";
    progress: number
    description: string

    createdAt: string
    updatedAt:string
}