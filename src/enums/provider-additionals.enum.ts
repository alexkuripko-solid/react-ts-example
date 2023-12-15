export enum ProviderAdditionalsEnum {
  PROFESSIONAL_QUALIFICATIONS= 1 ,
  PROFESSIONAL_REFERENCES,
  WORK_WITH_CHILDREN_CLEARANCE,
  NATIONAL_POLICE_CLEARANCE,
  PROFESSIONAL_INDEMNITY_AND_DECLARATION,
  WORK_WITH_CHILDREN,
  OVERSEAS_RESIDENCY,
}

export const ProviderDocumentLabels = {
  [ProviderAdditionalsEnum.PROFESSIONAL_QUALIFICATIONS]: 'Professional Qualifications',
  [ProviderAdditionalsEnum.PROFESSIONAL_REFERENCES]: 'Professional References',
  [ProviderAdditionalsEnum.WORK_WITH_CHILDREN_CLEARANCE]: 'Working with children clearance',
  [ProviderAdditionalsEnum.NATIONAL_POLICE_CLEARANCE]: 'National Police Clearance',
  [ProviderAdditionalsEnum.PROFESSIONAL_INDEMNITY_AND_DECLARATION]: 'Professional indemnity and insurance',
};

export const ProviderAdditionalLabels = {
  [ProviderAdditionalsEnum.WORK_WITH_CHILDREN]: 'I work with children',
  [ProviderAdditionalsEnum.OVERSEAS_RESIDENCY]: 'I have overseas residency',
};
