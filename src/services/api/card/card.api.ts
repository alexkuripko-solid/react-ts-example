import ApiService from '../api-service';
import { ICard } from "./dto/card.dto";

class CardApiService extends ApiService {
  create = async (id: number, card: ICard): Promise<any> => {
    return await this.post(`/${id}/update`, card, false).then((res) => res.data);
  }
}

export const CardApi = new CardApiService('credit-card');
