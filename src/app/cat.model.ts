import { service } from './service.model';

export interface Category {
    id: number,
    title: string,
    artitle: string,
    description: string,
    imageUrl: string,
    service: service[]
  
  }