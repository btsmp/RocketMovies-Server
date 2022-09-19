import { Response } from "express";
import { NotesRequest, MovieNotes, Tags } from "../utils/types";

import knex from "../database/knex"

export class NotesController {
  /* 
  Create - POST para poder criar um registro
  Update - PUT para atualizar um registro

  Index - GET para listar varios registros
  Show - GET para exibir um registro especifico
  Delete - DELETE para remover um registro
  */

  async create(request: NotesRequest, response: Response) {
    const { title, description, rating, tags } = request.body
    const { user_id } = request.params


    const note_id: MovieNotes = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = tags.map((tag: Tags) => {
      return {
        name: tag,
        note_id,
        user_id,
      }
    })

    await knex("tags").insert(tagsInsert)

    console.log(tagsInsert)
    console.log(note_id)

    response.json({
      message: "nota criada"
    })
  }
}