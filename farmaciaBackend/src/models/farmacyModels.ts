interface TermItem {
  termName: string;
  [key: string]: any;
}

export class farmacyModels {
  static getByName = async ({ names }: {names: string}) => {
    let formatNames = names?.replace(/ /g, "-");

    return await fetch(
      `https://webapis.cancer.gov/glossary/v1/Terms/search/Cancer.gov/Patient/es/${formatNames
        ?.normalize("NFD")
        ?.replace(/[\u0300-\u036f]/g, "")}?matchType=Begins&size=10`
    )
      .then((res) => res.json())
      .then((data) => data?.results?.map((item: TermItem) => item?.termName))
      .catch((err) => console.log("error al obtener la lista de nombres"))
  };

  static getAllData = async ({ name }: {name: string}) => {
    let formatName = name?.replace(/ /g, "-");

    return await fetch(
      `https://webapis.cancer.gov/glossary/v1/Terms/search/Cancer.gov/Patient/es/${formatName
        ?.normalize("NFD")
        ?.replace(/[\u0300-\u036f]/g, "")}?matchType=Begins&size=10`
    )
      .then((res) => res.json())
      .then((data) => data?.results?.map((item: object) => item))
      .catch((err) => console.log("error obteniendo la data"))
  };

 
}
