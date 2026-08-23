export interface FAQItem {
  question: string;
  answer: string;
}

export interface PetItem {
  id: number;
  name: string;
  gender: string;
  fileName: string;
}

export interface ShelterItem {
  title: string;
  location: string;
  fileName: string;
}

export interface BlogItem {
  title: string;
  desc: string;
  author: string;
  fileName: string;
  userFileName: string;
}