export interface createProjectType {
    name: string;
    description: string;
    manager : string;
    admin : string | null;
    teamMembers : string[];
}