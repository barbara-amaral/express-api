import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autor, livros} from "../models/index.js";

class LivroController {

  static async listarLivros (req, res, next) {
    try {
      const buscaLivros = livros.find();
      req.resultado = buscaLivros;
      next();
    }catch(erro) {
      next(erro);
    }  
  }

  static async listarLivroPorId (req, res, next) {

    try {
      const id = req.params.id;
      //const livroEncontrado = await livros.findById(id);
      const livroEncontrado = await livros.findById(id, {}, { autopopulate: false }) //desativa a autopopulate
        .populate("autor"); //população mais específica
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

  static async listarLivrosPorFiltro (req, res, next) {
    
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros.find(busca);

        req.resultado = livrosResultado;

        next();
      }else {
        res.status(200).send([]);
      }
      
    }catch(erro) {
      next(erro);
    }
  }
}

async function processaBusca(parametros) {
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = parametros;
  //const regex = new RegExp(titulo, "i");

  let busca = {};

  if (editora) busca.editora = {$regex: editora, $options: "i"};
  if (titulo) busca.titulo = {$regex: titulo, $options: "i"};

  if (minPaginas || maxPaginas) busca.numeroDePaginas = {};

  if (minPaginas) busca.numeroDePaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroDePaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autorBusca = await autor.findOne({ nome: new RegExp(nomeAutor, "i")});

    if (autorBusca !== null){
      busca.autor = autorBusca._id;
    } else {
      busca = null;
    }
    
  }

  return busca;
}

export default LivroController;