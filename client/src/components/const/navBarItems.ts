import GTranslateIcon from "@mui/icons-material/GTranslate";
import LanguageIcon from "@mui/icons-material/Language";
import ListIcon from "@mui/icons-material/List";

export const navBarItems = [
  {
    id: 0,
    icon: ListIcon,
    label: "Words List",
    route: "list",
  },
  {
    id: 1,
    icon: LanguageIcon,
    label: "Add Language",
    route: "addLanguage",
  },
  {
    id: 2,
    icon: GTranslateIcon,
    label: "Add Definition",
    route: "addDefinition",
  },
];
