export class farmacyModels {
  static getByName = async ({ names }) => {
    let formatNames = names?.replaceAll(" ", "-");

    return fetch(
      `https://webapis.cancer.gov/glossary/v1/Terms/search/Cancer.gov/Patient/es/${formatNames
        ?.normalize("NFD")
        ?.replace(/[\u0300-\u036f]/g, "")}?matchType=Begins&size=10`
    )
      .then((res) => res.json())
      .then((data) => data?.results?.map((item) => item?.termName))
      .catch((err) => res.status(500).json({ message: err.message }));
  };

  static getAllData = async ({ name }) => {
    let formatName = name?.replaceAll(" ", "-");

    return fetch(
      `https://webapis.cancer.gov/glossary/v1/Terms/search/Cancer.gov/Patient/es/${formatName
        ?.normalize("NFD")
        ?.replace(/[\u0300-\u036f]/g, "")}?matchType=Begins&size=10`
    )
      .then((res) => res.json())
      .then((data) => data?.results?.map((item) => item))
      .catch((err) => res.status(500).json({ message: "Error del sistema" }));
  };

 
}
