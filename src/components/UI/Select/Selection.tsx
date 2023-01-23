import { useContext, FC } from "react";
import { FormattedMessage } from "react-intl";

import { GlobalContext } from "@/context/globalState";

import { FormControl } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export const Selection: FC = () => {
  const { selectLang } = useContext(GlobalContext);
  const { locale } = useContext(GlobalContext);

  return (
    <FormControl style={{ width: "150px", height: "30px" }}>
      <Select
        style={{ height: "30px", opacity: "0.7", fontSize: "14px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={locale}
        onChange={selectLang}
      >
        <MenuItem value="ru-RU">
          <FormattedMessage id="app.language" defaultMessage="Русский" />
        </MenuItem>
        <MenuItem value="en" selected>
          English
        </MenuItem>
      </Select>
    </FormControl>
  );
};
