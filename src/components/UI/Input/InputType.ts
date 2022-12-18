export interface IAttributeType {
  type: string;
  placeholder: string;
  value: string | [];
  onChange: (string) => void;
  autoFocus?: boolean;
}
