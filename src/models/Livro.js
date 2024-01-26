import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { 
      type: String, 
      required: [true, "O titulo é obrigatório."]
    },
    numeroDePaginas: {
      type: Number,
      min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
      max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"]
    },
    editora: { 
      type: String, 
      required: [true, "O nome da editora é obrigatório."], 
      enum: {values: ["Casa do código", "Alura"], message: "A editora {VALUE} não é um valor permitido."}
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O autor é obrigatório"]}},{versionKey : false});

const livros = mongoose.model("livros", livroSchema);

export default livros;