import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { ArticleUpdateDto } from '../dto/article-update.dto';
import { ArticleCreateDto } from '../dto/article-create.dto';

Injectable();
export class ArticleService {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getAllarticles() {
    return await this.articleRepository.find();
  }

  async createArticle(data: ArticleCreateDto) {
    try {
      return this.articleRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }
  async getOneArticleById(id: number) {
    return await this.articleRepository.findOneBy({ id });
  }

  async updateArticle(id: number, data: ArticleUpdateDto) {
    // on récupère l'article ciblé
    const article = await this.articleRepository.findOneBy({ id });
    // on "merge" les données du body de la requête
    // avec les données déjà présentes dans l'article
    const articleUpdate = { ...article, ...data };
    // on sauvegarde l'article mis à jour
    await this.articleRepository.save(articleUpdate);

    return articleUpdate;
  }
  async deleteArticle(id: number) {
    return await this.articleRepository.delete(id);
  }

  //requete qui va aller chercher tous les articles ayant pour auteur celui passé en paramètre.
  //méthode asynchrone qui va se mettre dans la stack de l'event loop et donc sort du processus initial
  //cela permet de continuer le processus sans avoir besoin d'attendre la réponse(tr-
  async getArticlesByAuthor(author: string) {
    // il y a un await pour attendre une réponse de la bdd avant de renvoyer le résultat.
    //findBy est une méthode par défaut du repository
    // qui va aller chercher autant de d'articles qui ont le même nom d'auteur
    return await this.articleRepository.findBy({ author: author });
  }
}
