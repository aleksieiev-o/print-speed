export interface IAppFormInput {
  mode: 'input' | 'textarea';
  // eslint-disable-next-line
  formModel: any; // TODO change this type
  type: 'text' | 'email' | 'password' | 'number';
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
  isDataPending: boolean;
}
