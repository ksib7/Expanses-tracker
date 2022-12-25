export interface IAttributeType {
  type: string;
  placeholder: string | any;
  value: string | [];
  onChange: (string) => void;
  autoFocus?: boolean;
}
