import {autor} from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class AutorController {

  static async listarAutores (req, res, next) {

    try {
      const listaAutores = autor.find({});

      req.resultado = listaAutores;

      next();
    }catch(erro) {
      next(erro);
    }

  }

  static async listarAutorPorId (req, res, next) {

    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if(autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      }else {
        next(new NaoEncontrado("Autor não localizado."));
      }
    }catch(erro) {
      next(erro);
    }

  }

  static async cadastrarAutor (req, res, next) {

    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({message: "Autor cadastrado com sucesso.", autor: novoAutor});
    } catch (erro) {
      next(erro);
    }

        
  }

  static async atualizarAutor (req, res, next) {

    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);

      if(autorEncontrado !== null) {
        res.status(200).json({message: "Autor atualizado com sucesso."});
      }else{
        next(new NaoEncontrado("Autor não localizado."));
      }

    }catch(erro) {
      next(erro);
    }

  }

  static async deletarAutor (req, res, next) {

    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndDelete(id);

      if(autorEncontrado !== null) {
        res.status(200).json({message: "Autor deletado com sucesso."});
      }else{
        next(new NaoEncontrado("Autor não localizado."));
      }
      
    }catch(erro) {
      next(erro);
    }

  }

}

export default AutorController;