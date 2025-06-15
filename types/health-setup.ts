export interface Disease {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
}

export interface UserHealthSetupProfile {
  diseases?: string[]; // Optional array of disease IDs
  allergies?: string[]; // Optional array of allergy IDs
}
