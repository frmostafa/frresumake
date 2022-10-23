import { createContext } from "react";

export const currentcv = {
  id : "",
  activeCv:false,
  isSaved : false,
  cvName: "",
  name: "Zahra Rezapour",
  lName: "",
  dateOfBirth: "",
  jobTitle: "barber",
  email: "",
  number: "",
  website: "",
  address: "",
  data: {
    education: [
      {
        id: 0,
        primary: "diplom riazi",
        secondary: "rajaie",
        city: "kerman",
        country: "iran",
        startDate: "1376/06/28",
        endDate: "1376/07/12",
      },
      {
        id: 1,
        primary: "lisans adabiat",
        secondary: "sharif",
        city: "tehran",
        country: "iran",
        startDate: "1398/08/28",
        endDate: "1401/09/15",
      },
    ],

    skill: [
      {
        id: 1,
        primary: "hesabdar",
        secondary: "snapfood",
        city: "yazd",
        country: "afganestan",
        startDate: "1258/08/28",
        endDate: "1301/03/01",
      },
    ],
    work: [
      {
        id: 1,
        primary: "kargar maher",
        secondary: "amlak mahdavi",
        city: "isfahan",
        country: "usa",
        startDate: "1358/08/28",
        endDate: "1401/12/25",
      },
    ],
  },
};

export const cvsContext = createContext(
  currentcv.firstCv // default value
);
