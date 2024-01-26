import NaoEncontrado from "../erros/NaoEncontrado.js";
import livros from "../models/Livro.js";

class LivroController {

  static async listarLivros (req, res, next) {

    try {
      const listaLivros = await livros.find({});
      res.status(200).json(listaLivros);
    }catch(erro) {
      next(erro);
    }

  }

  static async listarLivroPorId (req, res, next) {

    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findById(id);
      if(livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      }else{
        next(new NaoEncontrado("Livro não encontrado"));
      }
      
    }catch(erro) {
      next(erro);
    }

  }

  // static async cadastrarLivro (req, res, next) {

  //   const novoLivro = req.body;

  //   try {
  //     const autorEncontrado = await autor.findById(novoLivro.autor);
  //     const livroCompleto = {...novoLivro, autor: {...autorEncontrado._doc}};
  //     const livroCriado = await livro.create(livroCompleto);
  //     res.status(201).json({message: "Livro cadastrado com sucesso", livro: livroCriado});
      
  //   } catch (erro) {
  //     next(erro);
  //   }
  // }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).json(livroResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static async atualizarLivro (req, res, next) {

    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findByIdAndUpdate(id, req.body);
      if(livroEncontrado !== null) {
        res.status(200).json({message: "Livro atualizado com sucesso."});
      }else {
        next(new NaoEncontrado("Livro não encontrado"));
      }
      
    }catch(erro) {
      next(erro);
    }

  }

  static async deletarLivro (req, res, next) {

    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findByIdAndDelete(id);
      if(livroEncontrado !== null) {
        res.status(200).json({message: "Livro deletado com sucesso."});
      }else {
        next(new NaoEncontrado("Livro não encontrado"));
      }
      
    }catch(erro) {
      next(erro);
    }

  }

  static async listarLivrosPorEditora (req, res, next) {
    const editora = req.query.editora;

    try {
      const livrosPorEditora = await livros.find({editora : editora});
      res.status(200).json(livrosPorEditora);
    }catch(erro) {
      next(erro);
    }
  }

}

export default LivroController;