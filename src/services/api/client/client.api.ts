import ApiService from '../api-service';
import { IClient } from "./dto/client.dto";
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';
import { UserTypesEnum } from '../../../enums/user-types.enum';

class ClientApiService extends ApiService {
  getById = async (id: number): Promise<IClient> =>
       await this.get(`/${id}`).then((res) => res.data[0]);

  getByQuery = async (query: object): Promise<DataTableResponse<IClient>> =>
    await this.get('', { ...query, type: UserTypesEnum.CLIENT }).then((res) => res.data);

  update = async (id: number, client: IClient): Promise<any> => {
    return await this.post(`/${id}/update`, client, false).then((res) => res.data);
  };

  deleteById = async (id: number): Promise<IClient> => await this.delete(`/${id}`).then((res) => res.data);
}

export const ClientApi = new ClientApiService('customers');
