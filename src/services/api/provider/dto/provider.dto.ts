import { GendersEnum } from '../../../../enums/genders.enum';
import { ServiceCategoriesEnum } from '../../../../enums/service-categories.enum';
import { IAttachment } from '../../attachment/dto/attachment.dto';
import { Schedule } from '../../../../common/components/working-time-scheduler/day-item/types/schedule.type';
import { IUser } from "../../user/dto/user.dto";
import { WorkingVisaTypesEnum } from "../../../../enums/working-visa-types.enum";
import { ProviderContactTypesEnum } from "../enums/provider-contact-types.enum";
import { IService } from "../../service/dto/service.dto";

export type ProviderAdditional = { checked: boolean, file?: File | null };
export type ProviderAdditionals = { [key: number]: ProviderAdditional };

export type ProviderContact = { name: string, phone: string };
export type ProviderContacts = { [key: number]: ProviderContact };

export interface ProviderDetails {
  gender: GendersEnum;
  preferred_gender: GendersEnum;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string | File | null;
  image_id?: number;
  description: string;
  category_id: ServiceCategoriesEnum;
  visa: WorkingVisaTypesEnum;
  abn: string;
  ahrpa_number: string;
  remedial_number: string;
  contacts: ProviderContacts;
}

export interface IProvider extends IUser {
  details: ProviderDetails,
  services: number[] | IService[],
  schedule: Schedule,
  schedule_overrides: Schedule,
  uploads: IAttachment[],
  additionals?: ProviderAdditionals,
}
