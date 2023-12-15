import ApiService from '../api-service';
import { IProvider } from "./dto/provider.dto";
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';
import { UserTypesEnum } from '../../../enums/user-types.enum';

class ProviderApiService extends ApiService {
  getById = async (id: number): Promise<IProvider> =>
       await this.get(`/${id}`).then((res) => res.data[0]);

  getByQuery = async (query: object): Promise<DataTableResponse<IProvider>> =>
    await this.get('', { ...query, type: UserTypesEnum.PROVIDER }).then((res) => res.data);

  update = async (id: number, provider: IProvider): Promise<any> => {
    return await this.post(`/${id}/update`, provider, false).then((res) => res.data);
  };

  deleteById = async (id: number): Promise<IProvider> => await this.delete(`/${id}`).then((res) => res.data);
}

export const ProviderApi = new ProviderApiService('therapists');
