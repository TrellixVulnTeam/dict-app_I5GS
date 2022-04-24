import Language from "./language";

class Definition {
  id: number;
  word: string;
  definition: string;
  translation: string;

  constructor(
    id: number,
    word: string,
    definition: string,
    translation: string
  ) {
    (this.id = id), (this.word = word);
    this.definition = definition;
    this.translation = translation;
  }
}

export default Definition;
